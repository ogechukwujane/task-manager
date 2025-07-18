import { useFormik } from "formik";
import { InputComp } from "../../component";
import { loginValidation } from "./validation";
import { authImage } from "../../assets";
import { useNavigate } from "react-router";
import { useLogin } from "../../lib";
import { useState } from "react";
import { SaveLoggedInUser } from "../../utils";

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);

    const { data, error } = await useLogin(values.email, values.password);
    if (error) {
      alert(error.message);
    } else {
      SaveLoggedInUser({ name: data?.user?.user_metadata?.display_name });
      navigate("/home");
      alert("User successfully logged in");
    }
    setLoading(false);
  };

  const { values, handleChange, touched, errors, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    enableReinitialize: true,
    validationSchema: loginValidation,
    onSubmit,
  });

  return (
    <div className="bg-white h-[100vh] flex p-5 gap-5">
      <div className="flex flex-col gap-6 bg-gray-50 shadow-md rounded-md px-8 py-10 justify-center w-[40%]">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-medium capitalize">Login!!</h1>
          <p className="text-base">Nice to have you back.</p>
        </div>
        <div className="flex flex-col gap-4">
          <InputComp
            label="email*"
            placeholder="Enter email"
            value={values.email}
            onChange={handleChange("email")}
            errorMessage={touched.email ? errors.email : ""}
          />
          <InputComp
            label="password*"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange("password")}
            errorMessage={touched.password ? errors.password : ""}
            type="password"
          />
          <button
            className="bg-[#F50057] text-white px-4 py-2 rounded-md"
            onClick={() => handleSubmit()}
          >
            {loading ? "Loading..." : " Submit"}
          </button>
          <p className="text-sm text-center">
            Don't have an account?{" "}
            <span
              className="text-[#F50057] font-medium cursor-pointer"
              onClick={() => navigate("/sign-up")}
            >
              Sign up
            </span>
          </p>
        </div>
      </div>
      <div className="w-[60%] flex flex-col justify-center items-center">
        <h2 className="text-4xl font-Medium">Your Task Manager App</h2>
        <img src={authImage} alt="" className="w-96" />
      </div>
    </div>
  );
};
