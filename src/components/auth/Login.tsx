"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormValues = {
  username: string;
  password: string;
};

const fields: {
  name: keyof FormValues;
  placeholder: string;
  type: string;
  validation: Record<string, unknown>;
}[] = [
  {
    name: "username",
    placeholder: "Username or Email",
    type: "text",
    validation: { required: "Username or Email is required" },
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
    validation: {
      required: "Password is required",
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
  },
];

const providers = {
  CREDENTIALS: "credentials",
};

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  async function onSubmit(data: FormValues) {
    const { username, password } = data ?? {};

    try {
      setIsLoading(true);
      const res = await signIn(providers?.CREDENTIALS, {
        username,
        password,
        redirect: false,
      });

      reset();
      if (res?.error) {
        toast.error(res?.error);
      }

      if (res?.ok && !res?.error) {
        setIsLoading(false);
        toast.success("Login success");
        router.push("/");
        return;
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong! Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          Windows Faced House
        </h1>
        <p className="text-sm text-gray-500 mb-6">Log in to your account</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name}>
              <input
                type={field.type}
                placeholder={field.placeholder}
                {...register(field.name, field.validation)}
                className={`w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-primary ${
                  errors[field.name] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors[field.name] && (
                <p className="mt-1 text-xs text-red-500">
                  {errors[field.name]?.message as string}
                </p>
              )}
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="cursor-pointer w-full rounded-md bg-primary py-2 font-semibold text-white hover:bg-primary-200 transition"
            disabled={isLoading}
          >
            {isLoading ? `Loading...` : `Sign In`}
          </button>
        </form>
      </div>
    </div>
  );
}
