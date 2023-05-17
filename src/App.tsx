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
  const [isLoaded, setIsLoaded] = useState(false);
  const [serverActive, setServerActive] = useState(false);
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    // check if connected to backend.
    const fetchUser = async () => {
      try {
        const action: any = await dispatch(loadUser());

        action
          ? connectError(action?.error?.code)
            ? setServerActive(false)
            : setServerActive(true)
          : setServerActive(false);
      } catch (error) {
        setServerActive(false);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <>
      {isLoaded ? (
        serverActive ? (
          <>
            <RouteHandler />
            <Toaster
              position="top-right"
              // autoClose={750}
              // hideProgressBar={false}
              // newestOnTop={true}
              // closeOnClick
              // rtl={false}
              // pauseOnFocusLoss
              // draggable
              // theme={theme}
            />
          </>
        ) : (
          <ServerError />
        )
      ) : (
        <LoaderUI />
      )}
    </>
  );
}

export default App;
