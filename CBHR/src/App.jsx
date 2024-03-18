import React from "react";
import Routers from "./Config/Routers/Routing";
import { UserContextProvider } from "./context/userContextProvider";
import { useState } from "react";

const App = () => {
  const [isImageChange, setisImageChange] = useState(false);
  const [isUser, setisUser] = useState(false);
  return (
    <>
      <UserContextProvider
        value={{ isImageChange, setisImageChange, setisUser, isUser }}
      >
        <Routers />
      </UserContextProvider>
    </>
  );
};

export default App;
