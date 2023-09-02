import {Link, useNavigate} from "react-router-dom";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {loginUser} from "../services/user";
import {useMutation} from "react-query";
import {toast} from "react-toastify";
import {useLoading} from "../context/loadingContext";

const schema = z.object({
  email: z.string().nonempty("Email is required").email(),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, {message: "Password must be atleast 6 characters"}),
});

export default function Login() {
  const {showSpinner, hideSpinner} = useLoading();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(schema),
  });

  const mutateLoginUser = useMutation({
    mutationKey: ["login_user"],
    mutationFn: loginUser,
    onSuccess: userCredential => {
      console.log(userCredential?.user);
      reset();
      toast("Logged in successfully");
      navigate("/");
      hideSpinner();
    },
    onError: e => {
      console.log(e);
      toast(e.code);
      hideSpinner();
    },
  });

  return (
    <div className="flex items-center justify-center mt-12">
      <form
        onSubmit={handleSubmit(formData => {
          mutateLoginUser.mutate(formData);
          showSpinner();
        })}
        className="xl:w-2/5 sm:w-3/5 w-full shadow-xl p-8 sm:p-12 mx-4 md:p-16"
      >
        <div className="text-center text-4xl md:text-5xl ">LOGIN</div>
        <div className="mt-8">
          <input
            {...register("email")}
            className="w-full border h-12 px-4 outline-none"
            placeholder="Email"
          />
          {errors?.email?.message && (
            <p className="text-sm text-rose-600 mt-1">
              {errors?.email?.message}
            </p>
          )}
        </div>
        <div className="mt-8">
          <input
            {...register("password")}
            className="w-full border h-12 px-4 outline-none"
            placeholder="Password"
            type="password"
          />
          {errors?.password?.message && (
            <p className="text-sm text-rose-600 mt-1">
              {errors?.password?.message}
            </p>
          )}
        </div>
        <button className="w-full bg-black text-white tracking-widest h-12 px-4 mt-8 text-sm">
          SUBMIT
        </button>
        <div className="mt-4 text-center text-slate-600">
          Don&apos;t have an account?
          <Link
            to="/sign-up"
            className="text-blue-500 border-b border-b-blue-500 ms-2"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
}
