import Input from "../components/input";
import Button from "../components/button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const user = Object.fromEntries(formData.entries());

    login(user);
  };
  return (
    <div className="pt-24 max-w-[700px] mx-auto sm:min-[400px] max-sm:w-full">
      <h1 className="text-xl md:text-2xl font-bold mb-10 text-gray-500">
        Login to your account
      </h1>

      <form onSubmit={handleSubmit}>
        <Input label="Name" isReq={true} name="username" />
        <Input label="Password" isReq={true} name="password" type="password" />
        <Button text="Login to Account" />
      </form>

      <p className="mt-5 text-gray-500">
        Don't You Have Account?
        <Link className="ms-3 text-blue-500" to="/register">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Login;
