import React from "react";
import Routers from "./Config/Routers/Routing";
import { UserContextProvider } from "./context/userContextProvider";
import { useState } from "react";

const App = () => {
  const [isImageChange, setisImageChange] = useState(false);
  return (
    <>
      <UserContextProvider value={{ isImageChange, setisImageChange }}>
        <Routers />
      </UserContextProvider>
    </>
  );
};

export default App;
