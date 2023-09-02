import {RouterProvider} from "react-router-dom";
// routes
import {router} from "./routes";
// toast notification
import {Flip, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {AuthContextProvider} from "./context/authContext";
import {LoadingContextProvider} from "./context/loadingContext";
// for async operation
import {QueryClient, QueryClientProvider} from "react-query";
import {CartContextProvider} from "./context/cartContext";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <LoadingContextProvider>
        <AuthContextProvider>
          <CartContextProvider>
            <ToastContainer
              position="top-left"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              transition={Flip}
              pauseOnHover
              theme="colored"
            />
            <RouterProvider router={router} />
          </CartContextProvider>
        </AuthContextProvider>
      </LoadingContextProvider>
    </QueryClientProvider>
  );
}

export default App;
