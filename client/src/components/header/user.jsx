import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const User = ({ data }) => {
  const { logout } = useContext(AuthContext);
  return (
    <>
      <img
        src={data.photo}
        className="w-[40px] h-[40px] rounded-full object-cover"
      />
      <span>{data.username}</span>
      <div className="w-[110px] text-[13px] flex-col absolute top-[40px] left-0 transition duration-500 bg-gray-200 rounded-md hidden group-hover:flex text-left">
        {data.isSeller && (
          <>
            <Link className="px-3 py-2 hover:bg-gray-100" to="/my-gigs">
              Services
            </Link>
            <Link
              className="px-3 py-2 hover:bg-gray-100 text-nowrap"
              to="/add-gigs"
            >
              Add Services
            </Link>
          </>
        )}
        <Link className="px-3 py-2 hover:bg-gray-100" to="/orders">
          Orders
        </Link>
        <Link className="px-3 py-2 hover:bg-gray-100" to="/messages">
          Messages
        </Link>
        <button
          onClick={logout}
          className="px-3 py-2 hover:bg-gray-100 text-left"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default User;
