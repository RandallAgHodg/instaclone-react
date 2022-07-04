import { useEffect, useMemo, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import Auth from "./pages/Auth";
import ApolloClient from "./config/apollo.jsx";
import { ToastContainer } from "react-toastify";
import { decodeToken, getToken, removeToken } from "./utils/token.js";
import AuthContext from "./context/AuthContext.js";
import Navigation from "./routes/Navigation.jsx";

function App() {
  const [auth, setAuth] = useState(undefined);
  useEffect(() => {
    const token = getToken();
    const authenticate = (token) =>
      token ? setAuth(decodeToken(token)) : setAuth(null);
    authenticate(token);
  }, []);

  const logout = () => {
    removeToken();
    setAuth(null);
  };

  const setUser = (user) => {
    setAuth(user);
  };

  const authData = useMemo(
    () => ({
      auth,
      logout,
      setUser,
    }),
    [auth]
  );

  if (auth === undefined) return null;
  return (
    <ApolloProvider client={ApolloClient}>
      <AuthContext.Provider value={authData}>
        {auth ? <Navigation /> : <Auth />}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
