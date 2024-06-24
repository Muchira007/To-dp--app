import React from "react";
import { useAppDispatch } from "../../../store/hooks";
import { tasksActions } from "../../../store/Tasks.store";
import { ReactComponent as StarLine } from "../../../assets/star-line.svg";

const BtnMarkAsImportant: React.FC<{
  taskId: string;
  taskImportant: boolean;
}> = ({ taskId, taskImportant }) => {
  const dispatch = useAppDispatch();

  const markAsImportantHandler = async () => {
    try {
      const userToken = sessionStorage.getItem("userToken");
      const token = "Bearer " + userToken;
      const url = `https://task-api.sandbox.co.ke:8000/api/todos/important/${taskId}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: userToken ? token : "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ important: !taskImportant }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task importance");
      }

      // Assuming the server responds with updated task data
      const updatedTask = await response.json();
      console.log("Updated Task:", updatedTask);

      // Dispatch an action to update Redux state with the updated task importance
      dispatch(tasksActions.markAsImportant(taskId));
    } catch (error) {
      console.error("Error updating task importance:", error);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <button
      title={taskImportant ? "unmark as important" : "mark as important"}
      onClick={markAsImportantHandler}
      className="transition hover:text-slate-700 dark:hover:text-slate-200 ml-auto"
    >
      <StarLine
        className={`w-5 h-5 sm:w-6 sm:h-6 ${
          taskImportant ? "fill-rose-500 stroke-rose-500 " : "fill-none"
        }`}
      />
    </button>
  );
};

export default React.memo(BtnMarkAsImportant);
