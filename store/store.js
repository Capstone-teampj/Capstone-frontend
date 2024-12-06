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
  // const customerToken =
  //   "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdHJpbmciLCJyb2xlcyI6WyJST0xFX1VTRVIiXSwiaWF0IjoxNzMzMjE4Njc2LCJleHAiOjE3MzQwODI2NzZ9.iBWTggpZMT2lN3N5rHnuZxqAaOTpm_mt71VIY6VCoN0";
  // const ownerToken =
  //   "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbIlJPTEVfQURNSU4iXSwiaWF0IjoxNzMzMjE5MDY1LCJleHAiOjE3MzQwODMwNjV9.FxEBAx2M4Klhln8o54Zzy5rn1qJVVsHtgEG5-kbqiZA";
  // const [ipAddress, setIpAddress] = useState("localhost");
  const [token, setToken] = useState();
  const [role, setRole] = useState("customer");
  const [storeId, setStoreId] = useState(1);
  // useEffect(() => {
  //   // 비동기로 IP 주소 가져오기
  //   const fetchIPAddress = async () => {
  //     const ip = await getIPAddress();
  //     setIpAddress(ip);
  //   };
  //   fetchIPAddress();
  // }, []); // 컴포넌트 마운트 시 실행

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
