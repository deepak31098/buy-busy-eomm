import {Link, useNavigate} from "react-router-dom";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useMutation} from "react-query";
import {createNewUser, saveNewUserInfo} from "../services/user";
import {toast} from "react-toastify";
import {useLoading} from "../context/loadingContext";

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().nonempty("Email is required").email(),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, {message: "Password must be atleast 6 characters"}),
});

export default function SignUp() {
  const {showSpinner, hideSpinner} = useLoading();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(schema),
  });

  const mutateSaveNewUserInfo = useMutation({
    mutationKey: ["new_user_info"],
    mutationFn: saveNewUserInfo,
    onSuccess: () => {
      reset();
      toast("User created successfully");
      hideSpinner();
      navigate("/");
    },
    onError: e => {
      console.log(e);
      toast(e.code);
      hideSpinner();
    },
  });
  const mutateCreateNewUser = useMutation({
    mutationKey: ["new_user"],
    mutationFn: createNewUser,
    onSuccess: userCredential => {
      const info = {
        id: userCredential?.user?.uid,
        data: {
          name: watch("name"),
          cart: [],
        },
      };
      mutateSaveNewUserInfo.mutate(info);
    },
    onError: e => {
      console.log(e);
      toast(e.code);
      hideSpinner();
    },
  });

  return (
    <div className="flex items-center justify-center mt-4">
      <form
        onSubmit={handleSubmit(formData => {
          mutateCreateNewUser.mutate(formData);
          showSpinner();
        })}
        className="xl:w-2/5 sm:w-3/5 w-full shadow-xl p-8 sm:p-12 mx-4 md:p-16"
      >
        <div className="text-center text-4xl md:text-5xl ">SIGN UP</div>
        <div>
          <input
            {...register("name")}
            className="w-full border h-12 px-4 mt-4 outline-none"
            placeholder="Name"
          />
          {errors?.name?.message && (
            <p className="text-sm text-rose-600 mt-1">
              {errors?.name?.message}
            </p>
          )}
        </div>
        <div>
          <input
            {...register("email")}
            className="w-full border h-12 px-4 mt-8 outline-none"
            placeholder="Email"
          />
          {errors?.email?.message && (
            <p className="text-sm text-rose-600 mt-1">
              {errors?.email?.message}
            </p>
          )}
        </div>
        <div>
          <input
            {...register("password")}
            className="w-full border h-12 px-4 mt-8 outline-none"
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
          Already have an account?
          <Link
            to="/login"
            className="text-blue-500 border-b border-b-blue-500 ms-2"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
