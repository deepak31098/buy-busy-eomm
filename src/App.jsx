import {RouterProvider} from "react-router-dom";
// routes
import {router} from "./routes";
// toast notification
import {Flip, ToastContainer} from "react-toastify";
import {Provider} from "react-redux";
import "react-toastify/dist/ReactToastify.css";
// for async operation
import {QueryClient, QueryClientProvider} from "react-query";
import {store} from "./redux/store";

function App() {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
