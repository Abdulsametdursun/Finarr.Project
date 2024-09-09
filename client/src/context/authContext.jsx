import { createContext, useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const navigate = useNavigate();

  // Login user
  const login = (user_data) => {
    api
      .post("/auth/login", user_data)
      .then((res) => {
        //sent response
        toast.success(res.data.message);

        // sent user data to state
        setUser(res.data.user);

        //save the user to local storage
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // save the jwt token to local storage
        localStorage.setItem("token", res.data.token);

        // sent the main page
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  // Register user
  const register = (newUser) => {
    // sent api request to create a new account
    api
      .post("auth/register", newUser, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        toast.success("Account created successfully. You can login now...");
        navigate("/login");
      })
      .catch((err) => toast.error(err.message));
  };

  // Logout user
  const logout = () => {
    api.post("/auth/logout").then(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      setUser(null);

      navigate("/");
    });
  };

  // Return the context provider with user state and methods
  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
