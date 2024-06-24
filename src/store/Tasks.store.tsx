import { Action, createSlice, Dispatch, MiddlewareAPI, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../interfaces";

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

  if (sessionStorage.getItem("tasks")) {
    const savedTasksList = JSON.parse(sessionStorage.getItem("tasks")!);
    let dirNotSaved: string[] = [];
    savedTasksList.forEach((task: Task) => {
      if (!dirList.includes(task.dir)) {
        if (!dirNotSaved.includes(task.dir)) {
          dirNotSaved.push(task.dir);
        }
      }
    });
    dirList = [...dirList, ...dirNotSaved];
  }
  return dirList;
};

const initialState: {
  tasks: Task[];
  directories: string[];
} = {
  tasks: sessionStorage.getItem("tasks")
    ? JSON.parse(sessionStorage.getItem("tasks")!)
    : [],
  directories: getSavedDirectories(),
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState,
  reducers: {
    addNewTask(state, action: PayloadAction<Task>) {
      state.tasks = [action.payload, ...state.tasks];
    },
    removeTask(state, action) {
      const newTasksList = state.tasks.filter((task) => task.id !== action.payload);
      state.tasks = newTasksList;
    },
    markAsImportant(state, action: PayloadAction<string>) {
      const newTaskFavorited = state.tasks.find((task) => task.id === action.payload);
      newTaskFavorited!.important = !newTaskFavorited!.important;
    },
    editTask(state, action: PayloadAction<Task>) {
      const taskId = action.payload.id;
      const newTaskEdited: Task = state.tasks.find((task: Task) => task.id === taskId)!;
      const indexTask = state.tasks.indexOf(newTaskEdited);
      state.tasks[indexTask] = action.payload;
    },
    toggleTaskCompleted(state, action: PayloadAction<string>) {
      const taskId = action.payload;
      const currTask = state.tasks.find((task) => task.id === taskId)!;
      // console.log("Task toggled:", currTask);
      currTask.completed = !currTask.completed;
    },
    deleteAllData(state) {
      state.tasks = [];
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
      state.tasks = state.tasks.filter((task) => task.dir !== dirName);
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
      state.tasks.forEach((task) => {
        if (task.dir === previousDirName) {
          task.dir = newDirName;
        }
      });
    },
    setTasks(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
  },
});

export const tasksActions = tasksSlice.actions;
export default tasksSlice.reducer;

export const tasksMiddleware =
  (store: MiddlewareAPI) => (next: Dispatch) => async (action: Action) => {
    const nextAction = next(action);
    const actionChangeOnlyDirectories = tasksActions.createDirectory.match(action);
    const isADirectoryAction: boolean = action.type.toLowerCase().includes("directory");

    if (action.type.startsWith("tasks/") && !actionChangeOnlyDirectories) {
      const tasksList = store.getState().tasks.tasks;
      sessionStorage.setItem("tasks", JSON.stringify(tasksList));
    }
    if (action.type.startsWith("tasks/") && isADirectoryAction) {
      const dirList = store.getState().tasks.directories;
      sessionStorage.setItem("directories", JSON.stringify(dirList));
    }

    if (tasksActions.deleteAllData.match(action)) {
      sessionStorage.removeItem("tasks");
      sessionStorage.removeItem("directories");
      sessionStorage.removeItem("darkmode");
    }

    if (tasksActions.removeTask.match(action)) {
      // console.log(JSON.parse(sessionStorage.getItem("tasks")!));
      if (sessionStorage.getItem("tasks")) {
        const sessionStorageTasks = JSON.parse(sessionStorage.getItem("tasks")!);
        if (sessionStorageTasks.length === 0) {
          sessionStorage.removeItem("tasks");
        }
      }
    }

    // Fetch tasks from API endpoint
    if (action.type === "tasks/fetchTasks") {
      try {
        const userToken = sessionStorage.getItem("userToken");
        const token = "Bearer " + userToken;
        const url = "http://localhost:8000";
        const response = await fetch(`${url}/api/todos/get-all`, {
          method: "POST",
          headers: {
            Authorization: userToken ? token : "",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const tasksData = await response.json();
        // console.log(tasksData.data);
        // Dispatch an action to update the Redux state with the fetched tasks
        store.dispatch(tasksActions.setTasks(tasksData.data));
        // Store the fetched tasks in sessionStorage
        sessionStorage.setItem("tasks", JSON.stringify(tasksData.data));
      } catch (error) {
        console.error("Error fetching tasks:", error);
        // Handle error (e.g., display an error message)
      }
    }
    return nextAction;
  };