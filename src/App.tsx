import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import RouteHandler from "./routes/RouteHandler";
import ServerError from "./components/ServerError";
import LoaderUI from "./components/loaders/LoaderUI";
import { useDispatch } from "react-redux";
import { loadUser } from "./features/auth/authSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { connectError } from "./utils/utils";

function App() {
  const [isLoaded, setIsLoaded] = useState(true);
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(loadUser());

        // action
        //   ? connectError(action?.error?.code)
        //     ? setServerActive(false)
        //     : setServerActive(true)
        //   : setServerActive(false);
      } catch (error) {
        // setServerActive(false);
      } finally {
        setIsLoaded(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <>
      {isLoaded ? (
        <>
          <RouteHandler />
          <Toaster position="top-right" />
        </>
      ) : (
        <LoaderUI />
      )}
    </>
  );
}

export default App;
