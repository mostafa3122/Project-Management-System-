import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import authLogo from "../../../assets/PMS3.png";
import AuthButton from "../../../components/AuthButton";
import { registerSchema } from "../../../schema/auth.schema";
import { RegisterApi } from "../../../services/api/auth";
import AuthHeader from "../../../shared/AuthHeader/AuthHeader";
import InputField from "../../../shared/InputField/InputField";
import { registerInputs } from "./register.inputs";
import type { AxiosError } from "axios";
import type { IUsersResponse } from "../../../interfaces/users.interface";

type RegisterFormData = z.infer<typeof registerSchema>;

// ── Step definitions ──────────────────────────────────────────────────────────
// Each step maps to 2 consecutive fields. Step advances automatically when
// both fields in a group are filled and valid.
// Adjust field names to match your actual registerInputs / registerSchema keys.
const STEP_FIELDS: (keyof RegisterFormData)[][] = [
  ["userName", "email"], // step 1 → 2
  ["country", "phoneNumber"], // step 2 → 3
  ["password", "confirmPassword"], // step 3 → 4
];

const STEPS = [
  { label: "Account" },
  { label: "Contact" },
  { label: "Security" },
  { label: "Done" },
];

// ── Password Generator Helpers ────────────────────────────────────────────────
const getRandomLower = () =>
  String.fromCharCode(Math.floor(Math.random() * 26) + 97);
const getRandomUpper = () =>
  String.fromCharCode(Math.floor(Math.random() * 26) + 65);
const getRandomNumber = () =>
  String.fromCharCode(Math.floor(Math.random() * 10) + 48);
const getRandomSymbol = () => {
  const s = "!@#$%^&*(){}[]=<>/,.";
  return s[Math.floor(Math.random() * s.length)];
};
const randomFunc: Record<string, () => string> = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};
function generatePassword(
  lower: boolean,
  upper: boolean,
  number: boolean,
  symbol: boolean,
  length: number
): string {
  const types = [
    lower && "lower",
    upper && "upper",
    number && "number",
    symbol && "symbol",
  ].filter(Boolean) as string[];
  if (!types.length) return "";
  let result = "";
  for (let i = 0; i < length; i += types.length)
    types.forEach((t) => {
      result += randomFunc[t]();
    });
  return result.slice(0, length);
}

// ── Progress Stepper ──────────────────────────────────────────────────────────
function ProgressStepper({
  currentStep,
  steps,
}: {
  currentStep: number;
  steps: { label: string }[];
}) {
  const pct = ((currentStep - 1) / (steps.length - 1)) * 100;
  return (
    <div className="w-full mb-8">
      <div className="relative flex justify-between items-start">
        {/* Background track */}
        <div className="absolute top-4 left-0 -translate-y-1/2 h-1 w-full bg-white/20 rounded-full z-0" />
        {/* Fill track */}
        <div
          className="absolute top-4 left-0 -translate-y-1/2 h-1 rounded-full z-0 bg-[#EF9B28] transition-all duration-500 ease-in-out"
          style={{ width: `${pct}%` }}
        />
        {steps.map((step, idx) => {
          const num = idx + 1;
          const isCompleted = num < currentStep;
          const isActive = num === currentStep;
          return (
            <div
              key={step.label}
              className="relative z-10 flex flex-col items-center gap-1.5"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all duration-500
                ${
                  isCompleted
                    ? "bg-[#EF9B28] border-[#EF9B28] text-white"
                    : isActive
                    ? "bg-[#315951] border-[#EF9B28] text-[#EF9B28]"
                    : "bg-[#315951] border-white/25 text-white/30"
                }`}
              >
                {isCompleted ? (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  num
                )}
              </div>
              <span
                className={`text-[11px] font-medium tracking-wide transition-colors duration-300
                ${
                  isActive
                    ? "text-[#EF9B28]"
                    : isCompleted
                    ? "text-white/60"
                    : "text-white/25"
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Password Generator Panel ──────────────────────────────────────────────────
function PasswordGeneratorPanel({
  onUse,
  onClose,
}: {
  onUse: (p: string) => void;
  onClose: () => void;
}) {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setGenerated(generatePassword(lower, upper, numbers, symbols, length));
    setCopied(false);
  };
  const handleCopy = () => {
    if (!generated) return;
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const handleUse = () => {
    if (!generated) return;
    onUse(generated);
    onClose();
    toast.success("Password applied!");
  };

  return (
    <div className="fixed top-1/2 right-6 -translate-y-1/2 z-[9999] w-[300px] bg-[#1e3a35] border border-white/10 rounded-2xl p-5 shadow-[0_8px_32px_rgba(0,0,0,0.45)] text-white">
      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold text-[15px] tracking-tight">
          Password Generator
        </span>
        <button
          onClick={onClose}
          className="bg-white/10 border-none rounded-lg text-white cursor-pointer px-2 py-1 text-base leading-none hover:bg-white/20 transition-colors"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
      <div className="bg-black/35 rounded-xl px-3 py-2.5 mb-4 flex items-center gap-2 min-h-[44px]">
        <span
          className={`flex-1 font-mono text-[13px] break-all ${
            generated ? "text-[#a3d9c8]" : "text-white/30"
          }`}
        >
          {generated || "Click Generate…"}
        </span>
        <button
          onClick={handleCopy}
          title="Copy"
          className={`bg-transparent border-none flex-shrink-0 px-1 py-0.5 text-base transition-colors ${
            generated ? "cursor-pointer" : "cursor-default"
          } ${copied ? "text-[#EF9B28]" : "text-white/55"}`}
        >
          {copied ? "✓" : "⧉"}
        </button>
      </div>
      <div className="mb-3.5">
        <div className="flex justify-between text-[13px] mb-1.5 text-white/75">
          <span>Length</span>
          <span className="font-semibold text-[#EF9B28]">{length}</span>
        </div>
        <input
          type="range"
          min={8}
          max={32}
          value={length}
          onChange={(e) => setLength(+e.target.value)}
          className="w-full accent-[#EF9B28]"
        />
      </div>
      {[
        { label: "Uppercase (A–Z)", value: upper, set: setUpper },
        { label: "Lowercase (a–z)", value: lower, set: setLower },
        { label: "Numbers (0–9)", value: numbers, set: setNumbers },
        { label: "Symbols (!@#…)", value: symbols, set: setSymbols },
      ].map(({ label, value, set }) => (
        <label
          key={label}
          className="flex justify-between items-center text-[13px] text-white/75 mb-2.5 cursor-pointer"
        >
          {label}
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => set(e.target.checked)}
            className="accent-[#EF9B28] w-4 h-4"
          />
        </label>
      ))}
      <div className="flex gap-2 mt-1">
        <button
          onClick={handleGenerate}
          className="flex-1 py-2.5 bg-[#315951] border border-white/15 rounded-xl text-white text-[13px] font-semibold cursor-pointer hover:bg-[#3d6e63] transition-colors"
        >
          Generate
        </button>
        <button
          onClick={handleUse}
          disabled={!generated}
          className={`flex-1 py-2.5 border-none rounded-xl text-white text-[13px] font-semibold transition-colors ${
            generated
              ? "bg-[#EF9B28] cursor-pointer hover:bg-[#d98820]"
              : "bg-[#EF9B28]/30 cursor-default"
          }`}
        >
          Use Password
        </button>
      </div>
    </div>
  );
}

// ── Main Register Component ───────────────────────────────────────────────────
export default function Register() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showGenerator, setShowGenerator] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  // Watch all field values to derive progress automatically
  const watchedValues = watch();

  // A field is "done" when it has a non-empty value AND no validation error
  const isFieldDone = (name: keyof RegisterFormData) =>
    !!watchedValues[name] && !errors[name];

  // A step group is complete when both its fields are done
  const isGroupComplete = (groupIdx: number) =>
    STEP_FIELDS[groupIdx].every((f) => isFieldDone(f));

  const watchedFields = watch([
    "userName",
    "email",
    "country",
    "phoneNumber",
    "password",
    "confirmPassword",
  ]);
  useEffect(() => {
    let completedGroups = 0;

    for (let i = 0; i < STEP_FIELDS.length; i++) {
      if (isGroupComplete(i)) completedGroups = i + 1;
      else break;
    }

    setCurrentStep(Math.min(completedGroups + 1, STEPS.length));
  }, [watchedFields]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const formData = new FormData();
      formData.append("userName", data.userName);
      formData.append("email", data.email);
      formData.append("country", data.country);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      if (data.profileImage?.[0])
        formData.append("profileImage", data.profileImage[0]);
      await RegisterApi(formData);
      toast.success("Account created successfully!");
      navigate("/verify-account");
    } catch (error) {
      const axiosError = error as AxiosError<IUsersResponse>;
      toast.error(axiosError.response?.data?.message || "Something went wrong");
   }
  };

  const handleUsePassword = (password: string) => {
    setValue("password", password, { shouldValidate: true });
    setValue("confirmPassword", password, { shouldValidate: true });
  };

  return (
    <div className="h-fit register-bg flex justify-center items-center">
      <div className="w-11/12 md:w-3/4 flex flex-col items-center">
        {/* Logo */}
        <div className="auth-logo mb-5">
          <img src={authLogo} alt="PMS logo" className="w-48" />
        </div>

        <div className="w-full p-8 md:px-20 md:py-10 bg-[#315951E5] rounded-2xl">
          <AuthHeader title={"Create New Account"} />

          {/* ── Progress Stepper — driven by field completion ── */}
          <ProgressStepper currentStep={currentStep} steps={STEPS} />

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Profile image */}
            <div className="profile-img md:mx-auto bg-amber-50 rounded-full w-20 h-20 md:w-24 md:h-24 mb-4">
              <div className="bg-[#3159518A] w-full h-full rounded-full flex justify-center items-center">
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  {...register("profileImage")}
                  accept="image/*"
                />
                <label
                  htmlFor="fileInput"
                  className="flex flex-col items-center gap-2 cursor-pointer py-4"
                >
                  <FaCamera color="rgba(239, 155, 40, 0.6)" size={25} />
                </label>
              </div>
            </div>

            {/* All inputs — always visible */}
            <div className="flex flex-wrap gap-x-9 gap-y-3 mb-4">
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

            {/* Generate Password button — always visible near password fields */}
            <div className="flex justify-end mb-8">
              <button
                type="button"
                onClick={() => setShowGenerator((prev) => !prev)}
                className={`flex items-center gap-1.5 border border-[#EF9B28]/50 rounded-lg text-[13px] font-semibold px-3.5 py-[7px] cursor-pointer tracking-wide transition-all duration-200 ${
                  showGenerator
                    ? "bg-[#EF9B28] text-white"
                    : "bg-[#EF9B28]/15 text-[#EF9B28]"
                }`}
              >
                <span className="text-[15px]">🔑</span>
                {showGenerator ? "Close Generator" : "Generate Password"}
              </button>
            </div>

            {/* Submit */}
            <div className="text-center text-white w-1/2 mx-auto">
              <AuthButton isSubmitting={isSubmitting} label="Save" />
            </div>
          </form>
        </div>
      </div>

      {showGenerator && (
        <PasswordGeneratorPanel
          onUse={handleUsePassword}
          onClose={() => setShowGenerator(false)}
        />
      )}
    </div>
  );
}
