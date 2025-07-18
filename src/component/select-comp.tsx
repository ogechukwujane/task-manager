import { Select } from "antd";

export type SelectProps = {
  options: { value: string; label: string }[];
  defaultValue?: string;
  onChange?: (selectedValue: string) => void;
  label?: string;
  errorMessage?: string;
  value?: string;
  customstyle?: string;
  placeholder?: string;
  showAsterisk?: boolean;
  disabled?: boolean;
  className?: string;
};

const style = {
  width: "100",
  height: 40,
  borderRadius: 8,
  color: "#161616",
  borderColor: "#E0E2E7",
};

export const SelectComp: React.FC<SelectProps> = ({
  options,
  onChange,
  label,
  defaultValue,
  errorMessage,
  value,
  customstyle,
  placeholder = "Please select",
  disabled,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm capitalize">{label}</label>}
      <Select
        placeholder={placeholder}
        defaultValue={defaultValue}
        style={style}
        onChange={onChange}
        options={options}
        value={value}
        className={customstyle}
        disabled={disabled}
      />
      {errorMessage && <p className="text-xs text-[red]">{errorMessage}</p>}
    </div>
  );
};
