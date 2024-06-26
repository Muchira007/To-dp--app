export interface Task {
  title: string;
  dir: string;
  description: string;
  date: string;
  completed: boolean;
  important: boolean;
  id: string;
}


export interface Users {
  first_name: string;
  last_name: string;
  // dir: string;
  email: string;
  phone_number: string;
  created_at: string;
  // completed: boolean;
  // important: boolean;
  updated_at: string;
  id: string;
  // id: string;
}