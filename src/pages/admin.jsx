import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useMutation} from "react-query";
import {toast} from "react-toastify";
import {addNewProduct} from "../services/products";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/authContext";

const schema = z.object({
  image: z.string().nonempty("URL is required"),
  name: z.string().nonempty("Product name is required"),
  price: z.number(),
  category: z
    .string()
    .refine(value => value !== "", {message: "Category is required"}),
});

export default function Admin() {
  const navigate = useNavigate();
  const user = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(schema),
  });

  const mutateAddProduct = useMutation({
    mutationKey: ["add_product"],
    mutationFn: addNewProduct,
    onSuccess: docRef => {
      reset();
      toast("New Product added to list");
    },
    onError: e => {
      console.log(e);
    },
  });

  useEffect(() => {
    if (!user) navigate("/");
  });

  return (
    <div className="flex justify-center mt-[-5px] flex-col items-center">
      <form
        onSubmit={handleSubmit(formData => mutateAddProduct.mutate(formData))}
        className="xl:w-2/5 sm:w-3/5 w-full shadow-xl p-8 sm:p-12 mx-4 md:p-16"
      >
        <div className="text-center text-4xl md:text-5xl ">ADD PRODUCTS</div>
        <div className="mt-8">
          <input
            {...register("name")}
            className="w-full border h-12 px-4 outline-none"
            placeholder="Name"
          />
          {errors?.name?.message && (
            <p className="text-sm text-rose-600 mt-1">
              {errors?.name?.message}
            </p>
          )}
        </div>
        <div className="mt-8">
          <input
            {...register("image")}
            className="w-full border h-12 px-4 outline-none"
            placeholder="URL"
          />
          {errors?.image?.message && (
            <p className="text-sm text-rose-600 mt-1">
              {errors?.image?.message}
            </p>
          )}
        </div>
        <div className="mt-8">
          <input
            {...register("price", {valueAsNumber: true})}
            className="w-full border h-12 px-4 outline-none"
            placeholder="Price"
            type="number"
          />
          {errors?.price?.message && (
            <p className="text-sm text-rose-600 mt-1">
              {errors?.price?.message}
            </p>
          )}
        </div>
        <div className="mt-8">
          <select
            className="w-full border h-12 px-4 outline-none "
            {...register("category")}
          >
            <option value="">Choose category</option>
            <option value="mens">Men's Clothing</option>
            <option value="womens">Women's Clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
          </select>
          {errors?.category?.message && (
            <p className="text-sm text-rose-600 mt-1">
              {errors?.category?.message}
            </p>
          )}
        </div>
        <button className="w-full bg-black text-white tracking-widest h-12 px-4 mt-8 text-sm">
          ADD TO LIST
        </button>
      </form>
      <div className="text-center mt-1 font-bold text-lg text-rose-900 xl:w-2/5 sm:w-3/5 w-full shadow-xl">
        This page is intended for owner (admins) only but for reiew purpose it
        is made accessible to logged in user
      </div>
    </div>
  );
}
