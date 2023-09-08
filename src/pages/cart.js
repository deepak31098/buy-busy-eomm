import {toast} from "react-toastify";
import Card from "../components/card";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {cartSelector, confirmOrder} from "../redux/reducers/cartReducer";
import {useDispatch, useSelector} from "react-redux";
import {authSelector} from "../redux/reducers/authReducer";
import Loader from "../components/loader";

export default function Cart() {
  const {cart, total, item, loading} = useSelector(cartSelector);
  const {user} = useSelector(authSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleConfirmOrder = () => {
    dispatch(confirmOrder({user, cart}));
    navigate("/orders");
    toast("Order confirmed");
  };
  useEffect(() => {
    if (!user) navigate("/");
  });

  return (
    <>
      {loading && <Loader />}
      <main className=" xl:px-40 md:px-32 sm:px-12 p-6">
        <div className="py-12 p-4 md:px-8 flex items-center justify-end bg-slate-50 mb-8 flex-wrap">
          <div className="flex justify-end bg-slate-50 flex-wrap w-full">
            {cart?.length !== 0 ? (
              <div className="flex grow justify-between flex-wrap">
                <div className="flex text-lg font-black">
                  <span className="mt-3 tracking-wider">
                    PRICE&#8377; {total}
                  </span>
                  <span className="mt-3 ms-4 tracking-wider">ITEMS {item}</span>
                </div>
                <button
                  onClick={handleConfirmOrder}
                  className="border bg-black border-black hover:text-black duration-300 text-white tracking-widest h-12 px-4 text-sm hover:bg-white text-bold"
                >
                  CONFIRM ORDER
                </button>
              </div>
            ) : (
              <div>
                <Link
                  to="/"
                  className="border flex items-center justify-center bg-black border-black hover:text-black duration-300 w-full text-white tracking-widest h-12 px-4 text-sm hover:bg-white text-bold"
                >
                  SHOP MORE
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="my-8 font-black sm:text-3xl text-2xl">
          <span className="border-b border-black">SHOPPING BAG</span>
        </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 gap-y-8">
          {cart?.map(product => (
            <Card key={product?.id} page="cart" product={product} />
          ))}
        </div>
        {!cart?.length && (
          <div className="text-center mt-4 text-3xl text-slate-500 text-bold flex flex-col items-center">
            <img src="/images/panda.jpg" width="160px" alt="panda" />
            <span className="mt-4">We have a lot for you in our store!</span>
          </div>
        )}
      </main>
    </>
  );
}
