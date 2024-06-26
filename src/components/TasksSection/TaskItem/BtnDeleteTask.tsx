import React, { useState } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { tasksActions } from "../../../store/Tasks.store";
import ModalConfirm from "../../Utilities/ModalConfirm";
import { ReactComponent as Trash } from "../../../assets/trash.svg";

const BtnDeleteTask: React.FC<{ taskId: string }> = ({ taskId }) => {
  const [showModal, setIsModalShown] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const removeTaskHandler = async () => {
    try {
      const userToken = sessionStorage.getItem("userToken");
      const token = "Bearer " + userToken;
      const url = `https://task-api.sandbox.co.ke:8000/api/todos/delete/${taskId}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: userToken ? token : "",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      // Assuming successful deletion, dispatch the action to remove the task from Redux
      dispatch(tasksActions.removeTask(taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
      // Handle error (e.g., display an error message)
    }
  };

  return (
    <>
      {showModal && (
        <ModalConfirm
          onClose={() => setIsModalShown(false)}
          text="This task will be deleted permanently."
          onConfirm={removeTaskHandler}
        />
      )}
      <button
        onClick={() => setIsModalShown(true)}
        title="delete task"
        className="ml-2 transition hover:text-slate-700 dark:hover:text-slate-200"
      >
        <Trash className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </>
  );
};

export default React.memo(BtnDeleteTask);
