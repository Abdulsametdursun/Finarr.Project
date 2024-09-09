import { Link } from "react-router-dom";

const Links = () => {
  return (
    <>
      <Link className="transition hover:text-green-500" to="/login">
        Login
      </Link>
      <Link
        className="transition border border-green-500 p-1 rounded hover:bg-green-500 hover:text-white"
        to="/register"
      >
        Register
      </Link>
    </>
  );
};

export default Links;
