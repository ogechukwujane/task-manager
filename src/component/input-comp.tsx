import type { FC, ReactNode } from "react";

interface IInputComp {
  label?: string;
  errorMessage?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  leftIcon?: ReactNode;
  type?: React.HTMLInputTypeAttribute;
}

export const InputComp: FC<IInputComp> = ({
  label,
  errorMessage,
  placeholder,
  leftIcon,
  value,
  onChange,
  type,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm capitalize">{label}</label>}
      <div className="flex gap-1 items-center px-2 border-[1px] border-[#E0E2E7] rounded-[8px] bg-white">
        {leftIcon && <>{leftIcon}</>}
        <input
          className="text-base h-[40px] outline-none w-[100%] text-[#161616] placeholder:text-gray-300"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          type={type}
        />
      </div>
      {errorMessage && <p className="text-xs text-[red]">{errorMessage}</p>}
    </div>
  );
};
