import {useAuth} from "../context/authContext";
import {useCart} from "../context/cartContext";
import {Add, Minus} from "./icons";
import {useNavigate} from "react-router-dom";

export default function Card({page = "default", product}) {
  const {addItem, removeItem, updateQuantity} = useCart();
  const user = useAuth();
  const navigate = useNavigate();

  // allow user to add to cart when he is signed in
  const handleAdd = () => {
    if (!user) {
      navigate("/login");
    } else {
      addItem(product.id);
    }
  };
  return (
    <div className="flex flex-col justify-between">
      <div>
        <img src={product?.image} alt="product" className="w-full h-80" />
      </div>
      <div className="py-2 font-bold">{product?.name}</div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">&#x20B9; {product?.price}</span>
        {page === "cart" && (
          <div className="flex">
            <span
              onClick={() => updateQuantity(1, product.id)}
              className="cursor-pointer hover:text-slate-600 duration-300"
            >
              <Add />
            </span>
            <span className="mx-2">{product?.quantity}</span>

            <span
              onClick={() => updateQuantity(-1, product.id)}
              className="cursor-pointer hover:text-slate-400 duration-300"
            >
              <Minus />
            </span>
          </div>
        )}
      </div>
      <button
        onClick={() => (page === "cart" ? removeItem(product.id) : handleAdd())}
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
