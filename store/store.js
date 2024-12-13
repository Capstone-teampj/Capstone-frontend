import { createContext, useEffect, useState } from "react";
import { Platform } from "react-native";
export const TokenContext = createContext({
  url: "",
  token: "",
  setStoreId: (storeId) => {},
  getStoreId: () => {},
  setToken: (tokenstr) => {},
  getToken: () => {},
  setRole: (role) => {},
});

function TokenContextProvider({ children }) {
  const [token, setToken] = useState();
  const [role, setRole] = useState("customer");
  const [storeId, setStoreId] = useState(1);

  function getToken() {
    return token;
  }
  function getStoreId() {
    return storeId;
  }

  const value = {
    url: `http://192.168.40.24:8080`,
    token: "",
    getToken: getToken,
    setToken: setToken,
    setRole: (role) => setRole(role),
    setStoreId: setStoreId,
    getStoreId: getStoreId,
  };
  return (
    <TokenContext.Provider value={value}>{children}</TokenContext.Provider>
  );
}
export default TokenContextProvider;
