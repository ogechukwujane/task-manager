import { Tag } from "antd";
import { StatusEnum } from "../utils";

export const StatusCard = ({ status }: { status: string }) => {
  let color = "";
  switch (status?.toLowerCase()) {
    case StatusEnum.PENDING:
      color = "yellow";
      break;
    case StatusEnum.DONE:
      color = "green";
      break;
    case StatusEnum.INPROGRESS:
      color = "red";
      break;
    default:
      color = "blue";
  }
  return <Tag color={color}>{status?.toUpperCase()}</Tag>;
};
