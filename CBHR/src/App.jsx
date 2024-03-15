import React from "react";
import Routers from "./Config/Routers/Routing";
import { UserContextProvider } from "./context/userContextProvider";
import { useState } from "react";

const App = () => {
  const [isUser, setIsUser] = useState(false);
  return (
    <>
      <UserContextProvider value={{ isUser, setIsUser }}>
        <Routers />
      </UserContextProvider>
    </>
  );
};

export default App;
