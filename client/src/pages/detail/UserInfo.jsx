import { FaStar } from "react-icons/fa";
import { TbNorthStar } from "react-icons/tb";

const UserInfo = ({ user }) => {
  return (
    <div>
      <h1 className="font-bold text-lg mt-10 mb-3">
        Get To Know {user.username}
      </h1>

      <div className="flex flex-col items-center justify-center gap-5">
        <img className="size-24 rounded-full object-cover" src={user.photo} />

        <h4 className="font-semibold">{user.username}</h4>
        <p className="text-gray-600">{user.desc}</p>

        <div className="flex gap-5">
          <div className="flex items-center gap-1 ">
            <FaStar />
            <span className="font-semibold">4.5</span>
            <span className="text-gray-500">(142)</span>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-orange-300 p-1 rounded text-sm">
          <span>Top Rated</span>
          <TbNorthStar />
          <TbNorthStar />
          <TbNorthStar />
        </div>

        <button className="w-full p-2 border border-black rounded text-sm hover:bg-zinc-700 hover:text-white transition">
          Contact Me
        </button>
      </div>

      <div className="border my-10 p-4 grid md:grid-cols-2 gap-5">
        <Field label="Country" value={user.country} />
        <Field label="Member Since" value={user.createdAt} />
        <Field label="Phone Number" value={user.phone} />
        <Field label="Email" value={user.email} />
      </div>
    </div>
  );
};

export default UserInfo;

const Field = ({ label, value }) => {
  return (
    <p className="flex flex-col gap-1">
      <span className="text-gray-500">{label}</span>
      <span className="text-zinc-700 font-semibold">{value}</span>
    </p>
  );
};
