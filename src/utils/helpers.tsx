export const LOGGEDIN_USER = "task_manager_user@@@@@";

export const SaveLoggedInUser = (data: { name: string }) => {
  localStorage.setItem(LOGGEDIN_USER, JSON.stringify(data));
};

export const GetLoggedInUser = () => {
  const storageString = localStorage.getItem(LOGGEDIN_USER);
  if (storageString) {
    return JSON.parse(storageString);
  }
  return null;
};
