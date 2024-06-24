import { useEffect, useState } from "react";
import { Task } from "../../interfaces";
import { useAppSelector } from "../../store/hooks";

const useSearchQuery = (searchQuery: string): Task[] => {
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const [matchedTasks, setMatchedTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (!searchQuery.trim().length) {
      setMatchedTasks([]);
      return;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();

    const filteredTasks = tasks.filter((task: Task) => {
      const title = task.title?.toLowerCase() || "";
      const description = task.description?.toLowerCase() || "";
      return title.includes(lowerCaseQuery) || description.includes(lowerCaseQuery);
    });

    setMatchedTasks(filteredTasks);
  }, [searchQuery, tasks]);

  return matchedTasks;
};

export default useSearchQuery;
