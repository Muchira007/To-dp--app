import { Action, createSlice, Dispatch, MiddlewareAPI, PayloadAction } from "@reduxjs/toolkit";
import { Users } from "../interfaces";

const getSavedDirectories = (): string[] => {
  let dirList: string[] = [];
  if (sessionStorage.getItem("directories")) {
    dirList = JSON.parse(sessionStorage.getItem("directories")!);
    const mainDirExists = dirList.some((dir: string) => dir === "Main");
    if (!mainDirExists) {
      dirList.push("Main");
    }
  } else {
    dirList.push("Main");
  }

  if (sessionStorage.getItem("users")) {
    const savedusersList = JSON.parse(sessionStorage.getItem("users")!);
    let dirNotSaved: string[] = [];
    savedusersList.forEach((user: Users) => {
      if (!dirList.includes(user.first_name)) {
        if (!dirNotSaved.includes(user.first_name)) {
          dirNotSaved.push(user.first_name);
        }
      }
    });
    dirList = [...dirList, ...dirNotSaved];
  }
  return dirList;
};

const initialState: {
  users: Users[];
  directories: string[];
} = {
  users: sessionStorage.getItem("users")
    ? JSON.parse(sessionStorage.getItem("users")!)
    : [],
  directories: getSavedDirectories(),
};

const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    addNewUser(state, action: PayloadAction<Users>) {
      state.users = [action.payload, ...state.users];
    },
    removeUser(state, action) {
      const newusersList = state.users.filter((user) => user.id !== action.payload);
      state.users = newusersList;
    },
    editUser(state, action: PayloadAction<Users>) {
      const userId = action.payload.id;
      const newUserEdited: Users = state.users.find((user: Users) => user.id === userId)!;
      const indexUser = state.users.indexOf(newUserEdited);
      state.users[indexUser] = action.payload;
    },
    deleteAllData(state) {
      state.users = [];
      state.directories = ["Main"];
    },
    createDirectory(state, action: PayloadAction<string>) {
      const newDirectory: string = action.payload;
      const directoryAlreadyExists = state.directories.includes(newDirectory);
      if (directoryAlreadyExists) return;
      state.directories = [newDirectory, ...state.directories];
    },
    deleteDirectory(state, action: PayloadAction<string>) {
      const dirName = action.payload;
      state.directories = state.directories.filter((dir) => dir !== dirName);
      state.users = state.users.filter((user) => user.first_name !== dirName);
    },
    editDirectoryName(
      state,
      action: PayloadAction<{ newDirName: string; previousDirName: string }>
    ) {
      const newDirName: string = action.payload.newDirName;
      const previousDirName: string = action.payload.previousDirName;
      const directoryAlreadyExists = state.directories.includes(newDirName);
      if (directoryAlreadyExists) return;
      const dirIndex = state.directories.indexOf(previousDirName);
      state.directories[dirIndex] = newDirName;
      state.users.forEach((user) => {
        if (user.first_name === previousDirName) {
          user.first_name = newDirName;
        }
      });
    },
    setUsers(state, action: PayloadAction<Users[]>) {
      state.users = action.payload;
    },
  },
});

export const usersActions = usersSlice.actions;
export default usersSlice.reducer;

export const usersMiddleware =
  (store: MiddlewareAPI) => (next: Dispatch) => async (action: Action) => {
    const nextAction = next(action);
    const actionChangeOnlyDirectories = usersActions.createDirectory.match(action);
    const isADirectoryAction: boolean = action.type.toLowerCase().includes("directory");

    if (action.type.startsWith("users/") && !actionChangeOnlyDirectories) {
      const usersList = store.getState().users.users;
      sessionStorage.setItem("users", JSON.stringify(usersList));
    }
    if (action.type.startsWith("users/") && isADirectoryAction) {
      const dirList = store.getState().users.directories;
      sessionStorage.setItem("directories", JSON.stringify(dirList));
    }

    if (usersActions.deleteAllData.match(action)) {
      sessionStorage.removeItem("users");
      sessionStorage.removeItem("directories");
      sessionStorage.removeItem("darkmode");
    }

    if (usersActions.removeUser.match(action)) {
      if (sessionStorage.getItem("users")) {
        const sessionStorageUsers = JSON.parse(sessionStorage.getItem("users")!);
        if (sessionStorageUsers.length === 0) {
          sessionStorage.removeItem("users");
        }
      }
    }

    // Fetch users from API endpoint
    if (action.type === "users/fetchUsers") {
      try {
        const userToken = sessionStorage.getItem("userToken");
        const token = "Bearer " + userToken;
        const url = "https://task-api.sandbox.co.ke:8000/api";
        const response = await fetch(`${url}/user/get-all`, {
          method: "POST",
          headers: {
            Authorization: userToken ? token : "",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const usersData = await response.json();
        store.dispatch(usersActions.setUsers(usersData.data));
        sessionStorage.setItem("users", JSON.stringify(usersData.data));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    return nextAction;
  };