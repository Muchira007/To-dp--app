import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Route, useNavigate } from "react-router-dom";
import AccountData from "./components/AccountSection/AccountData";
import Footer from "./components/Footer";
import Menu from "./components/Menu/Menu";
import Login from "./components/Login";
import TasksSection from "./components/TasksSection/TasksSection";
import ModalCreateTask from "./components/Utilities/ModalTask";
import { Task } from "./interfaces";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { modalActions } from "./store/Modal.store";
import { tasksActions } from "./store/Tasks.store";


const UsersApp: React.FC = () => {
  const modal = useAppSelector((state) => state.modal);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userToken = sessionStorage.getItem("userToken");
  const isAuthenticated = !!userToken;
  // console.log(userToken);

  if(!userToken){
    navigate('/')
  }

  useEffect(() => {
    dispatch({ type: "tasks/fetchTasks" });
  }, [dispatch]);
  // !isAuthenticated && <Navigate to="/" />

  // const dispatch = useAppDispatch();

  const closeModalCreateTask = () => {
    dispatch(modalActions.closeModalCreateTask());
  };

  const createNewTaskHandler = (task: Task) => {
    dispatch(tasksActions.addNewTask(task));
  };

  return (
    <div className="bg-slate-200 min-h-screen text-slate-600 dark:bg-slate-900 dark:text-slate-400 xl:text-base sm:text-sm text-xs">
      {modal.modalCreateTaskOpen && (
        <ModalCreateTask
          onClose={closeModalCreateTask}
          nameForm="Add a task"
          onConfirm={createNewTaskHandler}
        />
      )}
      <Menu />
      <TasksSection />
      <Footer />
      <AccountData />
    </div>
  );
};

export default UsersApp;