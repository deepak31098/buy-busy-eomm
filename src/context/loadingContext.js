import {createContext, useContext, useReducer} from "react";
import {CircleLoader} from "react-spinners";

const loadingContext = createContext();
// custom hook
export const useLoading = () => useContext(loadingContext);

export function LoadingContextProvider({children}) {
  const reducer = (state, action) => {
    switch (action.type) {
      case "show":
        return true;
      case "hide":
        return false;
      default:
        return false;
    }
  };
  // use reduer to manage state
  const [state, dispatch] = useReducer(reducer, false);
  const showSpinner = () => dispatch({type: "show"});
  const hideSpinner = () => dispatch({type: "hide"});

  return (
    <loadingContext.Provider value={{showSpinner, hideSpinner}}>
      {children}
      {state && (
        <div className="fixed h-screen bg-white w-screen z-10 top-0 left-0 items-center justify-center flex">
          <CircleLoader
            loading={state}
            size={115}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </loadingContext.Provider>
  );
}
