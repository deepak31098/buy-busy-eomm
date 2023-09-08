import {useDispatch, useSelector} from "react-redux";
import Card from "../components/card";
import {category} from "../constant";
import {useEffect, useState} from "react";
import {
  getAllProductsAvailable,
  productActions,
  productSelector,
  queryAllProducts,
} from "../redux/reducers/productReducer";
import Loader from "../components/loader";
import {MAX_PRICE} from "../constant";

export default function Products() {
  const dispatch = useDispatch();
  const {loading, currentProducts, products} = useSelector(productSelector);
  const [filterPrice, setFilterPrice] = useState(MAX_PRICE);
  const [filterItem, setFilterItem] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // fetch all products
  useEffect(() => {
    dispatch(productActions.setLoading(true));
    dispatch(getAllProductsAvailable(filterItem));
  }, []);

  // query items
  useEffect(() => {
    const query = {filterCategory, filterPrice, filterItem};
    dispatch(queryAllProducts(query));
  }, [filterCategory, filterPrice]);

  const handleItemSearch = e => {
    setFilterItem(e.target.value);
    const newProductList = products?.filter(product =>
      product.name.toLowerCase().includes(e.target.value)
    );
    dispatch(productActions.setCurrentProducts(newProductList));
  };

  return (
    <>
      {loading && <Loader />}
      <main className=" xl:px-40 md:px-32 sm:px-12 p-6">
        <div className="py-12 p-4 md:px-8 flex items-center justify-between bg-slate-50 mb-8 flex-wrap">
          <input
            onChange={handleItemSearch}
            type="text"
            placeholder="Search"
            className="bg-white p-3 sm:w-[18rem] w-full outline-none border lg:grow grow-0 lg:me-8"
            value={filterItem}
          />

          <div className="flex items-center bg-slate-50 flex-wrap lg:grow-0 grow">
            <div className="flex flex-col sm:me-12 items-center my-4 sm:w-auto w-full">
              <label>Price &#8377; {filterPrice}</label>
              <input
                type="range"
                className="sm:w-48 w-full cursor-pointer"
                name="price"
                min="0"
                max={MAX_PRICE}
                onChange={e => setFilterPrice(e.target.value)}
                value={filterPrice}
              />
            </div>
            <div className="grid grid-col-1 mt-4 sm:grid-cols-2 gap-2">
              {category?.map((e, index) => (
                <div key={index} className="flex justify-between">
                  <label className="me-4">{e.name}</label>
                  <input
                    type="radio"
                    value={e.value}
                    name="category"
                    className="cursor-pointer"
                    onChange={e => setFilterCategory(e.target.value)}
                  />
                </div>
              ))}
              <div className="flex justify-between">
                <label className="me-4">None</label>
                <input
                  type="radio"
                  value={""}
                  checked={!filterCategory}
                  name="category"
                  className="cursor-pointer"
                  onChange={e => setFilterCategory(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="my-8 font-black sm:text-3xl text-2xl">
          <span className="border-b border-black">OUR PRODUCTS</span>
        </div>
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 gap-y-8">
          {currentProducts?.map(product => (
            <Card key={product.id} product={product} />
          ))}
        </div>
        {!currentProducts?.length && (
          <div className="text-center mt-4 text-3xl text-slate-500 text-bold flex flex-col items-center">
            <img src="/images/panda.jpg" width="160px" alt="panda" />
            <span className="mt-4">Is that a new product?</span>
          </div>
        )}
      </main>
    </>
  );
}
