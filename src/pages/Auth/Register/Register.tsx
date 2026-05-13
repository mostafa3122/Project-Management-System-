import authLogo from "../../../assets/PMS3.png";
import { FaCamera } from "react-icons/fa";
import AuthHeader from "../../../shared/AuthHeader/AuthHeader";
import InputField from "../../../shared/InputField/InputField";
import { registerInputs } from "./register.inputs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { registerSchema } from "../../../schema/auth.schema";
import { RegisterApi } from "../../../services/api/auth";

type RegisterFormData = z.infer<typeof registerSchema>;
export default function Register() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = async (data: RegisterFormData) => {
    try {
      const formData = new FormData();
      formData.append("userName", data.userName);
      formData.append("email", data.email);
      formData.append("country", data.country);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      if (data.profileImage?.[0]) {
        formData.append("profileImage", data.profileImage[0]);
      }
      await RegisterApi(formData);
      toast.success("Account created successfully!");
      navigate("/verify-account");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="h-screen register-bg flex justify-center items-center">
      <div className="w-11/12 md:w-3/4 flex flex-col items-center  ">
        <div className="auth-logo mb-5">
          <img src={authLogo} alt="PMS logo" className="w-48 md:w-48 " />
        </div>
        <div className="form w-full p-12 md:px-20 md:py-12 bg-[#315951E5] rounded-2xl">
          {/* Auth Header */}
          <AuthHeader title={"Create New Account"} />
          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="profile-img  md:mx-auto bg-amber-50 rounded-full w-20 h-20 md:w-24 md:h-21 ">
              <div className="bg-profile-overlay bg-[#3159518A] w-full h-full rounded-full flex justify-center items-center">
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  {...register("profileImage")}
                  accept="image/*"
                />
                <label
                  htmlFor="fileInput"
                  className="btn py-4 fs-6 d-flex  flex-column input-file align-items-center gap-2 cursor-pointer"
                >
                  <FaCamera color="rgba(239, 155, 40, 0.6)" size={25} />
                </label>
              </div>
            </div>
            {/* inputs */}
            <div className="flex flex-wrap gap-x-9 gap-y-3 mb-16 ">
              {registerInputs.map((input) => (
                <InputField
                  key={input.name}
                  label={input.label}
                  inputName={input.name}
                  type={input.type}
                  register={register}
                  error={
                    errors[input.name as keyof RegisterFormData]
                      ?.message as string
                  }
                  placeholder={input.placeholder}
                />
              ))}
            </div>
            {/* button */}
            <div className=" text-center text-white">
              <button className="w-1/2 cursor-pointer  bg-[#EF9B28] rounded-[96px] py-3">
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
