import React, { useEffect } from "react";
import _ from "lodash";
import CompleteTask from "./CompleteTask";
import Header from "./Header";
import TaskList from "./TaskList";
import { getTodo, markTaskComplete, markTaskFavorite } from "./TodoService";
import style from "./TodoList.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  logout,
  updateTodoList,
  updateLoadingTodo,
  updateLoadingError,
  updateLoadingCount,
} from "../redux/actionCreator";
export default function TodoList() {
  //useSelector <=> mapstatetoprops khác nhau return ra kiểu dữ liệu (lấy dữ liệu state mới)
  const taskList = useSelector((state) => state.todos.todoList);
  const isLoading = useSelector((state) => state.loadings.loading);
  const isError = useSelector((state) => state.loadings.error);
  const loadingCount = useSelector((state) => state.loadings.loadingCount);
  const convertDate = (time) => new Date(time).getTime();
  const dispatch = useDispatch(); //dispatch change state

  const currentUser = useSelector((state) => state.auth.user);

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const response = await getTodo();
        dispatch(
          updateTodoList(
            response.data.data.map((task) => {
              return {
                ...task,
                createdDate: convertDate(task.createdDate),
                completedDate: convertDate(task.completedDate),
                isFavorite: task.isFavorite ? 1 : 0,
              };
            })
          )
        );

        dispatch(updateLoadingError(false));
        dispatch(updateLoadingTodo(false));
      } catch (err) {
        console.log(err);
        dispatch(updateLoadingError(true));
      }
    };

    asyncFunc();
  }, [loadingCount, dispatch]);

  const [completedList, incompletedList] = _.partition(
    taskList,
    (e) => e.isCompleted
  );

  const handleChangeCompleteStatus = async (taskId, newStatus) => {
    try {
      dispatch(updateLoadingTodo(true));
      dispatch(updateLoadingError(false));
      await markTaskComplete(taskId, newStatus);
      dispatch(updateLoadingCount(loadingCount + 1));
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeFavoriteStatus = async (taskId, newStatus) => {
    try {
      dispatch(updateLoadingTodo(true));
      dispatch(updateLoadingError(false));
      await markTaskFavorite(taskId, newStatus);
      dispatch(updateLoadingCount(loadingCount + 1));
    } catch (err) {
      console.log(err);
    }
  };

  const renderContent = () => {
    return isLoading ? (
      "Loading..."
    ) : (
      <div className={style.todoList}>
        <Header onChangeLoading={setLoadingCount} userName={currentUser.name} />
        <TaskList
          incompletedList={incompletedList}
          onChangeCompleteStatus={handleChangeCompleteStatus}
          onChangeFavoriteStatus={handleChangeFavoriteStatus}
        />
        <CompleteTask
          completedList={completedList}
          onChangeCompleteStatus={handleChangeCompleteStatus}
          onChangeFavoriteStatus={handleChangeFavoriteStatus}
        />
        <button onClick={() => dispatch(logout())}>Log out</button>
      </div>
    );
  };

  const setLoadingCount = () => {
    dispatch(updateLoadingError(false));
    dispatch(updateLoadingTodo(true));
    dispatch(updateLoadingCount(loadingCount + 1));
  };

  const renderErrorContent = () => {
    return (
      <div>
        <div>"error"</div>
        <button
          onClick={() => {
            setLoadingCount();
          }}
        >
          ReLoad App
        </button>
      </div>
    );
  };

  return isError ? renderErrorContent() : renderContent();
}
