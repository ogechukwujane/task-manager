import type { ReactNode } from "react";

interface IDeleteModal {
  deleteTitle: string;
  deleteItem: string;
  onClickDelete: () => void;
  onClickClose: () => void;
  isLoading?: boolean;
}

interface ILogoutModal {
  onClickClose: () => void;
  onClickLogout: () => void;
}

interface IModalComp {
  onClickClose: () => void;
  onClickContinue: () => void;
  btnText: string;
  children?: ReactNode;
}

export const DeleteModal = ({
  deleteTitle,
  deleteItem,
  onClickDelete,
  onClickClose,
  isLoading,
}: IDeleteModal) => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 bg-[#00000076] flex justify-center items-center">
      <div className="bg-white w-fit flex flex-col gap-5 px-6 py-7 rounded-md">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-medium capitalize">
            Delete {deleteTitle}?
          </p>
          <p className="text-sm">
            Are you sure you want to delete{" "}
            <span className="font-bold">{deleteItem}</span>?
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={onClickClose}
          >
            Close
          </button>
          <button
            className="border-2 text-black px-4 py-2 rounded-md"
            onClick={onClickDelete}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export const LogoutModal = ({ onClickLogout, onClickClose }: ILogoutModal) => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 bg-[#00000076] flex justify-center items-center">
      <div className="bg-white w-fit flex flex-col gap-5 px-6 py-7 rounded-md">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-medium capitalize">Logout!</p>
          <p className="text-sm">Are you sure you want to logout?</p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={onClickClose}
          >
            Close
          </button>
          <button
            className="border-2 text-black px-4 py-2 rounded-md"
            onClick={onClickLogout}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export const ModalComp = ({
  onClickContinue,
  onClickClose,
  btnText,
  children,
}: IModalComp) => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 bg-[#00000076] flex justify-center items-center">
      <div className="bg-white w-fit flex flex-col gap-5 px-6 py-7 rounded-md">
        <div className="flex flex-col gap-1">{children}</div>
        <div className="flex items-center justify-between">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded-md"
            onClick={onClickClose}
          >
            Close
          </button>
          <button
            className="border-2 text-black px-4 py-2 rounded-md"
            onClick={onClickContinue}
          >
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
};
