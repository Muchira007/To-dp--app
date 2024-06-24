import React, { useEffect } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { tasksActions } from "../../../store/Tasks.store";
import { ReactComponent as SvgX } from "../../../assets/x.svg";
import { ReactComponent as Check } from "../../../assets/check.svg";
import { Task } from "../../../interfaces";

interface Props {
  taskCompleted: boolean;
  taskId: string;
  isListInView1: boolean;
}

const BtnToggleCompleted: React.FC<Props> = ({ taskCompleted, taskId, isListInView1 }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const markTaskAsCompleted = async () => {
      try {
        const userToken = sessionStorage.getItem("userToken");
        const token = "Bearer " + userToken;
        const url = `https://task-api.sandbox.co.ke:8000/api/todos/complete/${taskId}`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: userToken ? token : "",
            "Content-Type": "application/json",
          },
        });
    
        if (!response.ok) {
          throw new Error("Failed to mark task as completed");
        }
    
        const updatedTask = await response.json();
        // console.log("Updated Task:", updatedTask);
    
        // Get the current tasks from sessionStorage
        const currentTasks: Task[] = sessionStorage.getItem("tasks")
          ? JSON.parse(sessionStorage.getItem("tasks")!)
          : [];
    
        // Find the index of the task to be updated based on its ID
        const updatedTaskIndex = currentTasks.findIndex((task) => task.id === updatedTask.data.id);
    
        if (updatedTaskIndex !== -1) {
          // Update the task in the current tasks array
          currentTasks[updatedTaskIndex] = updatedTask.data;
    
          // Update sessionStorage with the updated tasks array
          sessionStorage.setItem("tasks", JSON.stringify(currentTasks));
    
          // Dispatch an action to update the Redux state with the updated tasks
          dispatch(tasksActions.setTasks(currentTasks));
    
          // Dispatch an action to update Redux state with the updated task data
          // dispatch(tasksActions.toggleTaskCompleted(taskId));
        } else {
          console.error("Task not found in sessionStorage:", updatedTask.data.id);
        }
      } catch (error) {
        console.error("Error marking task as completed:", error);
        // Handle error (e.g., display an error message)
      }
    };    

    if (taskCompleted) {
      markTaskAsCompleted();
    }
  }, [taskCompleted, taskId, dispatch]);

  const toggleTaskCompleted = (id: string) => {
    dispatch(tasksActions.toggleTaskCompleted(id));
  };

  return (
    <button
      title={taskCompleted ? "mark as uncompleted" : "mark as completed"}
      className={`${
        taskCompleted
          ? "bg-emerald-200 text-emerald-800 "
          : "bg-amber-200 text-amber-800 "
      } ${isListInView1 ? "mr-4" : "mr-4 order-0"} rounded-full font-medium`}
      onClick={() => toggleTaskCompleted(taskId)}
    >
      <span className="block py-1 px-3 absolute invisible sm:static sm:visible">
        {taskCompleted ? "completed" : "uncompleted"}
      </span>
      <span className=" sm:hidden w-6 h-6 grid place-items-center">
        {taskCompleted ? (
          <Check className="w-3 h-3" />
        ) : (
          <SvgX className="w-3 h-3" />
        )}
      </span>
    </button>
  );
};

export default React.memo(BtnToggleCompleted);