export const StatusEnum = {
  PENDING: "pending",
  INPROGRESS: "in-progress",
  DONE: "done",
};

export const PriorityEnum = {
  HIGH: "high-priority",
  MEDIUM: "medium-priority",
  LOW: "low-priority",
};

export const priorityData = [
  { label: "High Priority", value: PriorityEnum.HIGH },
  { label: "Medium Priority", value: PriorityEnum.MEDIUM },
  { label: "Low Priority", value: PriorityEnum.LOW },
];
export const statusData = [
  { label: "Pending", value: StatusEnum.PENDING },
  { label: "In Progress", value: StatusEnum.INPROGRESS },
  { label: "Done", value: StatusEnum.DONE },
];