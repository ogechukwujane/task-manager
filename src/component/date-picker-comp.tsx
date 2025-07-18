import { DatePicker } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

interface IDatePickerProp {
  value?: Dayjs | null | string;
  placeholder?: string;
  size?: "large" | "middle" | "small";
  className?: string;
  onChange?: (value: Dayjs | null, dateString: string) => void;
  defaultValue?: Dayjs | null | string;
  label?: string;
  errorMessage?: string;
}
export const DatePickerComp = ({
  onChange,
  value,
  placeholder,
  size,
  className,
  defaultValue,
  label,
  errorMessage,
}: IDatePickerProp) => {
  const formattedValue = value
    ? dayjs(value) instanceof dayjs
      ? dayjs(value)
      : dayjs(value)
    : null;
  const formattedDefaultValue = value
    ? dayjs(defaultValue) instanceof dayjs
      ? dayjs(defaultValue)
      : dayjs(defaultValue)
    : null;
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm capitalize">{label}</label>}
      <DatePicker
        format="YYYY-MM-DD"
        onChange={onChange as (date: Dayjs) => void}
        value={formattedValue}
        placeholder={placeholder}
        size={size}
        className={className}
        defaultValue={formattedDefaultValue}
        style={{
          height: 50,
        }}
      />
      {errorMessage && <p className="text-xs text-[red]">{errorMessage}</p>}
    </div>
  );
};
