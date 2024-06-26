import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { menusActions } from "../../store/Menu.store";
import { fetchUsers } from "../../store/Users.store"; // Import fetchUsers action
import LayoutMenus from "../Utilities/LayoutMenus";
import DarkMode from "./DarkMode";
import DeleteTasks from "./DeleteTasks";
import TasksDone from "./TasksDone";
import avatar1 from "../../assets/avatar-1.jpg";
import { updateUser } from "../../store/authSlice";
import { Users } from "../../interfaces"; // Import Users type

const AccountData: React.FC = () => {
  const dispatch = useAppDispatch();
  const menuOpen = useAppSelector((state) => state.menu.menuAccountOpened);
  const user = useAppSelector((state) => state.auth.user);
  const users = useAppSelector((state) => state.users.users); // Get users from Redux state

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers()); // Dispatch fetchUsers action
  }, [dispatch]);

  const closeMenuHandler = () => {
    dispatch(menusActions.closeMenuAccount());
  };

  const updateDetailsHandler = () => {
    dispatch(updateUser({
      first_name: newFirstName,
      last_name: newLastName,
    }));
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  return (
    <LayoutMenus
      menuOpen={menuOpen}
      closeMenuHandler={closeMenuHandler}
      className="top-0 right-0"
    >
      <section className="p-5 flex flex-col h-full">
        <span className="flex items-center mx-auto">
          <span className="font-medium">Hi, {user?.first_name}!</span>
          <img src={avatar1} alt="cat" className="w-10 rounded-full ml-4" />
        </span>

        

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

        <div className="mt-4">
          <h2 className="font-medium">User List</h2>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-gray-300 text-black px-4 py-2 rounded-md w-full text-left"
            >
              Select User
            </button>
            {dropdownOpen && (
              <ul className="absolute bg-white border border-gray-300 mt-2 rounded-md w-full max-h-40 overflow-y-auto z-10">
                {users.map((user: Users) => (
                  <li key={user.id} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    {user.first_name} {user.last_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <DarkMode />
        <TasksDone />
        <DeleteTasks />
      </section>
    </LayoutMenus>
  );
};

export default AccountData;
