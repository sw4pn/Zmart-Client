import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import RouteHandler from "./routes/RouteHandler";
import ServerError from "./components/ServerError";
import LoaderUI from "./components/loaders/LoaderUI";
import { useDispatch } from "react-redux";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [serverActive, setServerActive] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch();
  }, []);

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
