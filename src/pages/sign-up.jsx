import {Link, useNavigate} from "react-router-dom";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {
  authActions,
  authSelector,
  signUpUser,
} from "../redux/reducers/authReducer";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../components/loader";
import {useEffect} from "react";

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().nonempty("Email is required").email(),
  password: z
    .string()
    .nonempty("Password is required")
    .min(6, {message: "Password must be atleast 6 characters"}),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const {path, loading} = useSelector(authSelector);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(schema),
  });

  // navigate to home page
  useEffect(() => {
    if (!!path) {
      navigate(path);
      dispatch(authActions.setPath(null));
    }
  }, [path]);

  return (
    <>
      {loading && <Loader />}
      <div className="flex items-center justify-center mt-4">
        <form
          onSubmit={handleSubmit(formData => {
            dispatch(signUpUser(formData));
            dispatch(authActions.loading(true));
            reset();
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
    </>
  );
}
