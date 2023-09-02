import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {signOutUser} from "../services/user";
import {useMutation} from "react-query";
import {toast} from "react-toastify";
import {useAuth} from "../context/authContext";
import {useCart} from "../context/cartContext";

export default function NavBar() {
  const user = useAuth();
  const {cart} = useCart();
  const navigate = useNavigate();
  // logout
  const mutateLogout = useMutation({
    mutationKey: ["sign_out"],
    mutationFn: signOutUser,
    onSuccess: () => {
      toast("Logged out successfully");
      navigate("/login");
    },
    onError: e => console.log(e),
  });

  // logo click
  const handleLogo = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <div className="sticky top-0 flex bg-white justify-between items-center xl:px-40 md:px-32 sm:px-12 p-6 py-4">
        <div
          onClick={handleLogo}
          className="text-2xl font-bold tracking-wider flex items-center cursor-pointer hover:text-slate-500 duration-300"
        >
          <img src="/images/logo.png" className="w-16" alt="logo" />
          <span className="ms-[-10px]"> Buy Busy</span>
        </div>
        <div className="flex flex-wrap">
          <NavLink
            to="/"
            className={({isActive}) =>
              `${
                isActive ? "font-semibold border-b border-black" : ""
              } hover:text-slate-600 font-medium lg:me-8 me-4 `
            }
          >
            Home
          </NavLink>
          {!!user ? (
            <>
              <NavLink
                to="/orders"
                className={({isActive}) =>
                  `${
                    isActive ? "font-semibold border-b border-black" : ""
                  } hover:text-slate-600 font-medium lg:me-8 me-4 `
                }
              >
                Order
              </NavLink>
              <NavLink
                to="/cart"
                className={({isActive}) =>
                  `${
                    isActive ? "font-semibold border-b border-black" : ""
                  } hover:text-slate-600 font-medium lg:me-8 me-4 relative`
                }
              >
                Cart
                {cart?.length ? (
                  <div className="absolute top-[-8px] right-[-10px] bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {cart?.length}
                  </div>
                ) : null}
              </NavLink>

              <div
                onClick={() => mutateLogout.mutate()}
                className="hover:text-slate-600 font-medium cursor-pointer me-4"
              >
                Logout
              </div>
              <NavLink
                to="/admin"
                className={({isActive}) =>
                  `${
                    isActive ? "font-semibold border-b border-black" : ""
                  } hover:text-slate-600 font-medium lg:me-8`
                }
              >
                Admin
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({isActive}) =>
                `${
                  isActive ? "font-semibold border-b border-black" : ""
                } hover:text-slate-600 font-medium lg:me-8 `
              }
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}
