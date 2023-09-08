import {NavLink, Outlet, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {
  authActions,
  authSelector,
  getAuthState,
  logoutUser,
} from "../redux/reducers/authReducer";
import {
  cartActions,
  cartSelector,
  getInitialCartItems,
} from "../redux/reducers/cartReducer";

export default function NavBar() {
  const dispatch = useDispatch();
  const {user, message} = useSelector(authSelector);
  const cartState = useSelector(cartSelector);
  const navigate = useNavigate();

  // logo click
  const handleLogo = () => {
    navigate("/");
    window.location.reload();
  };

  // initial auth state
  useEffect(() => {
    dispatch(getAuthState());
  }, []);

  // show notification
  useEffect(() => {
    if (message) {
      toast(message);
      dispatch(authActions.setMessage(null));
    }
    if (cartState.message) {
      toast(cartState.message);
      dispatch(cartActions.setMessage(null));
    }
  }, [message, cartState.message]);

  // get all cart item in user's card
  useEffect(() => {
    if (!user) return;
    dispatch(cartActions.setLoading(true));
    dispatch(getInitialCartItems(user));
  }, [user]);

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
                {cartState?.cart?.length ? (
                  <div className="absolute top-[-8px] right-[-10px] bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {cartState?.cart?.length}
                  </div>
                ) : null}
              </NavLink>

              <div
                onClick={() => dispatch(logoutUser())}
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
