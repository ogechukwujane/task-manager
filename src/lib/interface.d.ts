interface ITaskResponse {
  id: string;
  created_at: string;
  user_id: string;
  title: string;
  description: string;
  status: string;
  extras: {
    dueDate: string;
    priority: string;
    tags: string[];
  };
}
