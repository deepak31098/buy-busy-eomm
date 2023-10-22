import {useDispatch, useSelector} from "react-redux";
import {authSelector} from "../redux/reducers/authReducer";
import {Add, Minus} from "./icons";
import {useNavigate} from "react-router-dom";
import {
  addNewCartItem,
  cartSelector,
  removeCartItem,
  updateCartItem,
} from "../redux/reducers/cartReducer";

export default function Card({page = "default", product}) {
  const navigate = useNavigate();
  const {user} = useSelector(authSelector);
  const {cart} = useSelector(cartSelector);
  const dispatch = useDispatch();

  // allow user to add to cart when he is signed in
  const handleAdd = () => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(addNewCartItem({id: product.id, user, cart}));
    }
  };

  return (
    <div className="flex flex-col justify-between">
      <div>
        <img
          src={product?.image}
          alt="product"
          className="w-full h-80 object-cover object-top"
        />
      </div>
      <div className="py-2 font-bold">{product?.name}</div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">&#x20B9; {product?.price}</span>
        {page === "cart" && (
          <div className="flex">
            <span
              onClick={() =>
                dispatch(
                  updateCartItem({change: 1, id: product.id, user, cart})
                )
              }
              className="cursor-pointer hover:text-slate-600 duration-300"
            >
              <Add />
            </span>
            <span className="mx-2">{product?.quantity}</span>

            <span
              onClick={() =>
                dispatch(
                  updateCartItem({change: -1, id: product.id, user, cart})
                )
              }
              className="cursor-pointer hover:text-slate-400 duration-300"
            >
              <Minus />
            </span>
          </div>
        )}
      </div>
      <button
        onClick={() =>
          page === "cart"
            ? dispatch(removeCartItem({id: product.id, user, cart}))
            : handleAdd()
        }
        className={`border ${
          page === "cart"
            ? "bg-rose-500 hover:text-rose-500"
            : "bg-black border-black hover:text-black"
        } duration-300 w-full text-white tracking-widest h-12 px-4 mt-8 text-sm hover:bg-white text-bold`}
      >
        {page !== "cart" ? "ADD TO CART" : "REMOVE FROM CART"}
      </button>
    </div>
  );
}
