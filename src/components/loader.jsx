import {CircleLoader} from "react-spinners";

export default function Loader() {
  return (
    <div className="fixed h-screen bg-white w-screen z-10 top-0 left-0 items-center justify-center flex">
      <CircleLoader
        size={115}
        aria-label="Loading Spinner"
      />
    </div>
  );
}
