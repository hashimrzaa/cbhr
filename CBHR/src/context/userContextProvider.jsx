import { createContext, useContext } from "react";
const UserContext = createContext({
  isImageChange: false,
  setisImageChange: () => {},
  isUser: false,
  setisUser: () => {},
});

const UserContextProvider = UserContext.Provider;

function UserContexta() {
  return useContext(UserContext);
}

export { UserContext, UserContextProvider };

export default UserContexta;