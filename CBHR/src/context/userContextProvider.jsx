import { createContext, useContext } from "react";
const UserContext = createContext({
  isImageChange: false,
  setisImageChange: () => {},
});

const UserContextProvider = UserContext.Provider;

function UserContexta() {
  return useContext(UserContext);
}

export { UserContext, UserContextProvider };

export default UserContexta;