import {useEffect, useState} from "react";
import {getItemsDetails, getOrder} from "../services/cart";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {authSelector} from "../redux/reducers/authReducer";
import Loader from "../components/loader";

export default function Order() {
  const {user} = useSelector(authSelector);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [allOrder, setAllOrders] = useState([]);

  // callback function in get orders
  const getOrderItems = async snapShot => {
    const orders = [];
    // map all order id and get relevant details from collections
    const orderPromises = snapShot?.docs?.map(async doc => {
      const newList = doc.data()?.order?.map(async e => {
        const data = await getItemsDetails(e.id);
        return {
          ...data.data(),
          ...e,
        };
      });
      const order = await Promise.all(newList);
      const price = order.reduce(
        (acc, curr) => curr.price * curr.quantity + acc,
        0
      );
      const date = new Date(doc.data()?.timeStamp?.seconds * 1000)
        ?.toUTCString()
        ?.slice(0, 17);
      return {
        order,
        id: doc.data().id,
        orderTime: date,
        price,
      };
    });
    orders.push(...(await Promise.all(orderPromises)));
    setAllOrders(orders);
    setLoading(false);
  };

  // get all orders
  useEffect(() => {
    if (!user) return;
    setLoading(true);
    const unsubscribe = getOrder(snapShot => getOrderItems(snapShot), user);
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user) navigate("/");
  });

  return (
    <>
      {loading && <Loader />}
      <main className=" xl:px-40 md:px-32 sm:px-12 p-6">
        <div className="py-12 p-4 md:px-8 flex flex-col">
          <div className="my-8 font-black sm:text-3xl text-2xl">
            <span className="border-b border-black">ORDER HISTORY</span>
          </div>
          {allOrder?.map((order, idx) => (
            <div key={idx} className="w-full bg-slate-50 p-6 mb-12">
              <div className="text-xl md:text-3xl sm:mb-8 mb-4 font-bold flex justify-between items-center flex-wrap">
                <span>Order Details</span>
                <span className="text-green-800">CONFIRMED</span>
              </div>
              {order.order?.map(e => (
                <div
                  key={e.id}
                  className="my-2 text-slate-600 flex items-center justify-between"
                >
                  <div>
                    <span>{e?.name}</span>
                    <span className="ms-4">{e?.quantity}</span>
                  </div>
                  <div>&#8377; {e?.price * e?.quantity}</div>
                </div>
              ))}
              <div className="flex justify-between items-center flex-wrap">
                <div className="font-bold md:text-xl my-4 text-sm">
                  Order Date {order?.orderTime}
                </div>
                <div className="font-bold md:text-xl my-4 text-sm">
                  Total &#8377; {order?.price}
                </div>
              </div>
            </div>
          ))}
          {!allOrder?.length && (
            <div className="text-center mt-4 text-3xl text-slate-500 text-bold flex flex-col items-center">
              <img src="/images/panda.jpg" width="160px" alt="panda" />
              <span className="mt-4">
                Hmm.. Why this list is empty till now?
              </span>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
