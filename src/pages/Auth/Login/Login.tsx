import InputField from "../../../shared/InputField/InputField";
import AuthHeader from "../../../shared/AuthHeader/AuthHeader";
import { AxiosError } from "axios";
import bgForget from "../../../assets/PMS3.png";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import type z from "zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../../../schema/auth.schema";
import axiosClient from "../../../services/api/axiosClient";
import { toast } from "react-toastify";
import { loginInputs } from "./login.inputs";
import { useContext } from "react";
import { userContext } from "../../../context/userContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUserToken } = useContext(userContext)!;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      const response = await axiosClient.post("/Users/Login", {
        email: data.email,
        password: data.password,
      });

      console.log("Success Response:", response);
      const token = response.data.token;

      if (token) {
        localStorage.setItem("token", token);
        setUserToken(token);
      }
      toast.success(response.data.message || " Login successfully!");
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Unexpected error");
      }
    }
  };
  return (
    <>
      {" "}
      <div className="h-screen register-bg flex justify-center items-center">
        <div className="w-11/12 md:w-1/2 lg:w-5/12 flex flex-col items-center ">
          <div className="auth-logo mb-5">
            <img src={bgForget} alt="PMS logo" className="w-32 md:w-48" />
          </div>
          <div className="form w-full p-6 sm:p-8 md:px-20 md:py-10 bg-[#315951E5] rounded-2xl">
            <AuthHeader title={"Login"} />
            <form onSubmit={handleSubmit(onSubmit)}>
              {loginInputs.map((input) => {
                const errorMessage =
                  errors[input.name as keyof typeof errors]?.message;

                return (
                  <InputField
                    key={input.name}
                    label={input.label}
                    inputName={input.name}
                    type={input.type}
                    register={register}
                    error={errorMessage}
                    placeholder={input.placeholder}
                    fullWidth={true}
                  />
                );
              })}
              <div className="flex justify-between mt-4">
                <Link
                  to="/register"
                  className="text-sm text-gray-300 hover:text-gray-400 transition-colors"
                >
                  Register Now ?
                </Link>
                <Link
                  to="/forget-password"
                  className="text-sm text-gray-300 hover:text-gray-400 transition-colors"
                >
                  Forget Password ?
                </Link>
              </div>

              <div className="text-center text-white mt-6">
                <button className="w-full cursor-pointer mx-auto bg-[#EF9B28] rounded-[96px] py-3 transition-colors hover:bg-orange-600">
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
