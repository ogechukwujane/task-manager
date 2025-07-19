import { useEffect, useState } from "react";
import {
  DatePickerComp,
  DeleteModal,
  InputComp,
  ModalComp,
  Navbar,
  StatusCard,
  TaskCard,
} from "../../component";
import { SelectComp } from "../../component/select-comp";
import { useFormik } from "formik";
import { addTaskValidation } from "./validation";
import {
  GetLoggedInUser,
  priorityData,
  statusData,
  StatusEnum,
} from "../../utils";
import {
  useCreateTask,
  useDeleteTask,
  useGetUserTasks,
  useUpdateTask,
} from "../../lib";
import { emptyImage } from "../../assets";
import { Dropdown, Tag } from "antd";
import { FiFilter } from "react-icons/fi";
import { RiResetRightFill } from "react-icons/ri";
import { Navigate } from "react-router";
import { BiLoaderCircle } from "react-icons/bi";

export const Home = () => {
  const [deleteModal, setDeleteModal] = useState({
    visible: false,
    title: "",
    id: "",
  });
  const [addModal, setAddModal] = useState({ visible: false, mode: "create" });
  const [fetchingData, setFetchingData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [allTaskData, setAllTaskData] = useState<ITaskResponse[] | null>();
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const user = GetLoggedInUser();

  if (!user?.name) {
    return <Navigate to="/" replace />;
  }

  useEffect(() => {
    setRefresh(false);
    const fetchTasks = async () => {
      setFetchingData(true);
      const { data } = await useGetUserTasks(filter, search);
      setAllTaskData(data);
      setFetchingData(false);
    };

    fetchTasks();
  }, [filter, search, refresh]);

  const onSubmit = async () => {
    setLoading(true);
    const payload = {
      title: values.title,
      ...(values.description && { description: values.description }),
      status: values.status,
      extras: {
        dueDate: values.dueDate,
        priority: values.priority,
        ...(values.tags && {
          tags: values.tags?.split(",").map((s) => s.trim()),
        }),
      },
    };
    if (addModal.mode === "create") {
      const { error } = await useCreateTask(payload);
      if (error) {
        alert(error.message);
      } else {
        setAddModal({ visible: false, mode: "create" });
        resetForm();
        setRefresh(true);
        alert("Task created successfully!");
      }
    } else {
      const { error } = await useUpdateTask(values.taskId, payload);
      if (error) {
        alert(error.message);
      } else {
        setAddModal({ visible: false, mode: "create" });
        resetForm();
        setRefresh(true);
        alert("Task updated successfully!");
      }
    }

    setLoading(false);
  };

  const handleDeleteTask = async () => {
    setLoading(true);
    const { error } = await useDeleteTask(deleteModal.id);
    if (error) {
      alert(error.message);
    } else {
      setDeleteModal({ visible: false, title: "", id: "" });
      alert("Task deleted successfully");
      setRefresh(true);
    }
    setLoading(false);
  };

  const {
    values,
    handleChange,
    touched,
    errors,
    setFieldValue,
    resetForm,
    handleSubmit,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
      status: "",
      dueDate: "",
      priority: "",
      tags: "",
      taskId: "",
    },
    enableReinitialize: true,
    validationSchema: addTaskValidation,
    onSubmit,
  });

  return (
    <>
      <div>
        <Navbar
          title={`Welcome ${user?.name?.split(" ")?.[0]}`}
          value={search}
          onSearch={(e) => setSearch(e.target.value)}
        />
        <section className="flex flex-col gap-6 px-4 md:px-12 py-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base md:text-xl font-bold">Your Task Board</h2>
            <button
              className="border-2 text-xs md:text-base px-2 md:px-4 py-[6px] md:py-2 rounded-md bg-[#F50057] text-white"
              onClick={() => setAddModal({ visible: true, mode: "create" })}
            >
              Add New Task
            </button>
          </div>
          <div className="flex items-center justify-between border-b-[1px] border-b-gray-100 pb-2">
            <div className="flex gap-1 md:gap-3">
              <p className="text-xs md:text-base">Overview</p>{" "}
              {filter && <StatusCard status={filter} />}
              {filter && (
                <p
                  className="flex items-center cursor-pointer text-gray-400 hover:text-black text-xs md:text-base"
                  onClick={() => setFilter("")}
                >
                  <RiResetRightFill className="size-3 md:size-15"/> Reset
                </p>
              )}
            </div>
            <Dropdown
              menu={{
                items: [
                  {
                    key: 1,
                    label: StatusEnum.PENDING.replace("-", " ").toUpperCase(),
                    onClick: () => setFilter(StatusEnum.PENDING),
                  },
                  {
                    key: 2,
                    label: StatusEnum.INPROGRESS.replace(
                      "-",
                      " "
                    ).toUpperCase(),
                    onClick: () => setFilter(StatusEnum.INPROGRESS),
                  },
                  {
                    key: 3,
                    label: StatusEnum.DONE.replace("-", " ").toUpperCase(),
                    onClick: () => setFilter(StatusEnum.DONE),
                  },
                ],
              }}
              trigger={["click"]}
            >
              <Tag
                className="flex items-center gap-1 text-gray-500 font-normal px-2 py-1 cursor-pointer text-xs md:text-sm"
                onClick={() => {}}
              >
                <FiFilter size={15} className="size-3 md:size-15" />
                Filters
              </Tag>
            </Dropdown>
          </div>
          {fetchingData ? (
            <div className="flex flex-col justify-center items-center gap-2 py-10">
              <BiLoaderCircle size={60} className="animate-spin" />
            </div>
          ) : (
            <>
              {allTaskData && allTaskData.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {allTaskData?.map((data, index) => (
                    <TaskCard
                      key={index}
                      title={data.title}
                      description={data.description}
                      tags={data.extras.tags}
                      status={data.status}
                      dueDate={data.extras.dueDate}
                      priority={data.extras.priority}
                      onClickEdit={() => {
                        setFieldValue("title", data.title);
                        setFieldValue("description", data.description);
                        setFieldValue("status", data.status);
                        setFieldValue("dueDate", data.extras.dueDate);
                        setFieldValue("priority", data.extras.priority);
                        setFieldValue("tags", data.extras.tags?.join(","));
                        setFieldValue("taskId", data.id);
                        setAddModal({ visible: true, mode: "edit" });
                      }}
                      onClickDelete={() =>
                        setDeleteModal({
                          visible: true,
                          title: data.title,
                          id: data.id,
                        })
                      }
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center gap-2 py-10">
                  <img src={emptyImage} alt="" className="w-52" />
                  <h2 className="text-3xl font-Medium">
                    Ops!, no available data
                  </h2>
                </div>
              )}
            </>
          )}
        </section>
      </div>
      {deleteModal.visible && (
        <DeleteModal
          deleteTitle={"Task"}
          deleteItem={deleteModal.title}
          isLoading={loading}
          onClickDelete={() => handleDeleteTask()}
          onClickClose={() =>
            setDeleteModal({ visible: false, title: "", id: "" })
          }
        />
      )}
      {addModal.visible && (
        <ModalComp
          btnText={loading ? "Loading..." : "Save"}
          onClickContinue={() => handleSubmit()}
          onClickClose={() => {
            setAddModal({ visible: false, mode: "add" });
            resetForm();
          }}
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <p className="text-lg font-medium capitalize">
                {addModal.mode === "edit" ? "Edit Task" : "Add New Task"}
              </p>
              <p className="text-sm">
                Manage and track your tasks by filling all the form with correct
                data.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <InputComp
                label="title*"
                placeholder="Enter title"
                value={values.title}
                onChange={handleChange("title")}
                errorMessage={touched.title ? errors.title : ""}
              />
              <InputComp
                label="description*"
                placeholder="Enter description"
                value={values.description}
                onChange={handleChange("description")}
                errorMessage={touched.description ? errors.description : ""}
              />
              <InputComp
                label="tags"
                placeholder="Enter tags with comma separated eg: school,fees,.."
                value={values.tags}
                onChange={handleChange("tags")}
                errorMessage={touched.tags ? errors.tags : ""}
              />
              <SelectComp
                options={priorityData}
                label="task priority*"
                placeholder="Select priority"
                onChange={handleChange("priority")}
                value={
                  priorityData.find((item) => item.value === values.priority)
                    ?.label
                }
                defaultValue={
                  priorityData.find((item) => item.value === values.priority)
                    ?.label
                }
                errorMessage={touched.priority ? errors.priority : ""}
              />
              <SelectComp
                options={statusData}
                label="status*"
                placeholder="Select status"
                onChange={handleChange("status")}
                value={
                  statusData.find((item) => item.value === values.status)?.label
                }
                defaultValue={
                  statusData.find((item) => item.value === values.status)?.label
                }
                errorMessage={touched.status ? errors.status : ""}
              />
              <DatePickerComp
                label="due date*"
                value={values.dueDate}
                onChange={(date) => {
                  const formattedDate = date ? date.format("YYYY-MM-DD") : "";
                  setFieldValue("dueDate", formattedDate);
                }}
                errorMessage={touched.dueDate ? errors.dueDate : ""}
              />
            </div>
          </div>
        </ModalComp>
      )}
    </>
  );
};
