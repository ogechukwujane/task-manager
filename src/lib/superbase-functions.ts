import { supabase } from "./superbase-client";

export const useLogin = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return { data, error };
};

export const useSignUp = async (payload: {
  email: string;
  password: string;
  options: {
    data: {
      display_name: string;
    };
  };
}) => {
  const { data, error } = await supabase.auth.signUp(payload);

  return { data, error };
};

export const useGetUser = async () => {
  const { data } = await supabase.auth.getUser();

  return { data };
};

export const useCreateTask = async (task: {
  title: string;
  description?: string;
  status: string;
  extras?: object;
}) => {
  const { data: userData } = await supabase.auth.getUser();
  const user_id = userData?.user?.id;

  if (!user_id) {
    return { data: null, error: new Error("User not logged in") };
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert([{ ...task, user_id }]);

  return { data, error };
};

export const useUpdateTask = async (
  taskId: string,
  updates: {
    title?: string;
    description?: string;
    status?: string;
    extras?: object;
  }
) => {
  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", taskId);

  return { data, error };
};

export const useDeleteTask = async (taskId: string) => {
  const { data, error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId);

  return { data, error };
};

export const useGetUserTasks = async (
  status?: string,
  searchQuery?: string
) => {
  const { data: userData } = await supabase.auth.getUser();
  const user_id = userData?.user?.id;

  let query = supabase
    .from("tasks")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });

  if (status) {
    query = query.eq("status", status);
  }

  if (searchQuery) {
    query = query.ilike("title", `%${searchQuery}%`);
  }

  const { data, error } = await query;

  return { data, error };
};
