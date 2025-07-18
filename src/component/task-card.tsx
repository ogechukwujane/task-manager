import { Dropdown, Tag } from "antd";
import type { FC } from "react";
import { BsThreeDots } from "react-icons/bs";
import {
  FcHighPriority,
  FcLowPriority,
  FcMediumPriority,
} from "react-icons/fc";
import { PriorityEnum } from "../utils";
import { StatusCard } from "./status-card";

interface ITaskCard {
  status: string;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  priority: string;
  onClickEdit: () => void;
  onClickDelete: () => void;
}
export const TaskCard: FC<ITaskCard> = ({
  status,
  title,
  description,
  tags,
  dueDate,
  priority,
  onClickEdit,
  onClickDelete,
}) => {
  return (
    <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-md cursor-pointer shadow-md hover:scale-105 duration-300 ease-in-out">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-bold capitalize">{title}</h4>
        <span className="w-[25px] h-[25px] rounded-sm bg-white overflow-hidden flex items-center justify-center border-[1px]">
          <Dropdown
            menu={{
              items: [
                {
                  key: 1,
                  label: "Edit Task",
                  onClick: onClickEdit,
                },
                {
                  key: 2,
                  label: "Delete Task",
                  onClick: onClickDelete,
                },
              ],
            }}
            trigger={["click"]}
          >
            <BsThreeDots className="cursor-pointer" cursor={"pointer"} />
          </Dropdown>
        </span>
      </div>
      <p className="text-base">{description}</p>
      {tags && (
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </div>
      )}
      <div className="flex items-baseline gap-2">
        <p className="text-sm font-medium">Due Date:</p>
        <p className="text-sm font-thin">{dueDate}</p>
      </div>
      <div className="flex items-center justify-between">
        <StatusCard status={status} />
        <span className="flex items-center gap-1">
          {priority === PriorityEnum.HIGH ? (
            <FcHighPriority />
          ) : priority === PriorityEnum.MEDIUM ? (
            <FcMediumPriority />
          ) : (
            <FcLowPriority />
          )}
          <p className="text-sm font-thin capitalize">
            {priority.replace("-", " ")}
          </p>
        </span>
      </div>
    </div>
  );
};
