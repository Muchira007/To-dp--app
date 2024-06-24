import React, { useState } from "react";
import avatar1 from "../../assets/avatar-1.jpg";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { menusActions } from "../../store/Menu.store";
import LayoutMenus from "../Utilities/LayoutMenus";
import DarkMode from "./DarkMode";
import DeleteTasks from "./DeleteTasks";
import TasksDone from "./TasksDone";
import { updateUser } from "../../store/authSlice"; // Import the updateUser action

const AccountData: React.FC = () => {
  const menuOpen = useAppSelector((state) => state.menu.menuAccountOpened);
  const user = useAppSelector((state) => state.auth.user); // Get the user object from Redux
  // console.log(user);
  const dispatch = useAppDispatch();

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");

  const closeMenuHandler = () => {
    dispatch(menusActions.closeMenuAccount());
  };

  const updateDetailsHandler = () => {
    // Dispatch updateUser action with updated first name and last name
    dispatch(
      updateUser({
        first_name: newFirstName,
        last_name: newLastName,
      })
    );
  };

  return (
    <LayoutMenus
      menuOpen={menuOpen}
      closeMenuHandler={closeMenuHandler}
      className="top-0 right-0 "
    >
      <section className="p-5 flex flex-col h-full">
        <span className="flex items-center mx-auto">
          <span className="font-medium">Hi, {user?.first_name}!</span> {/* Display current first name */}
          <img src={avatar1} alt="cat" className="w-10 rounded-full ml-4" />
        </span>

        <DarkMode />

        <TasksDone />
        <DeleteTasks />

        {/* <div className="flex flex-col mt-4">
          <input
            type="text"
            placeholder="Enter new first name"
            value={newFirstName}
            onChange={(e) => setNewFirstName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mb-2"
          />
          <input
            type="text"
            placeholder="Enter new last name"
            value={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mb-2"
          />
          <button
            onClick={updateDetailsHandler}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Update Details
          </button>
        </div> */}
      </section>
    </LayoutMenus>
  );
};

export default AccountData;