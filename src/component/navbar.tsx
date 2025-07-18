import { BiSearch } from "react-icons/bi";
import { InputComp, LogoutModal } from ".";
import { FaUser } from "react-icons/fa";
import { useState, type FC } from "react";
import { IoMdLogOut } from "react-icons/io";
import { Popover } from "antd";
import { LOGGEDIN_USER } from "../utils";
import { useNavigate } from "react-router";

interface INavbar {
  title?: string;
  value?: string;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Navbar: FC<INavbar> = ({ onSearch, value, title }) => {
  const navigate = useNavigate();
  const [logoutModal, setLogoutModal] = useState(false);

  const hoverText = (
    <span className="flex items-center justify-center text-center">
      click to logout
    </span>
  );
  return (
    <>
      <div className="flex justify-between h-[70px] px-12 items-center border-b-[1px] border-b-gray-400">
        <p className="text-xl font-bold capitalize">{title}</p>
        <div className="w-96 ">
          <InputComp
            placeholder="Search for task by title"
            leftIcon={<BiSearch size={20} color="gray" />}
            onChange={onSearch}
            value={value}
          />
        </div>
        <div className="flex gap-4 items-center">
          <div className="w-[40px] h-[40px] rounded-[50%] bg-gray-300 flex items-center justify-center overflow-hidden">
            <FaUser size={20} />
          </div>
          <Popover placement="bottom" title={hoverText}>
            <IoMdLogOut size={20} onClick={() => setLogoutModal(true)} />
          </Popover>
        </div>
      </div>
      {logoutModal && (
        <LogoutModal
          onClickLogout={() => {
            localStorage.removeItem(LOGGEDIN_USER), navigate("/");
          }}
          onClickClose={() => setLogoutModal(false)}
        />
      )}
    </>
  );
};
