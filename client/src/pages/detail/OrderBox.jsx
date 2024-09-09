import { FaArrowRight, FaRegClock } from "react-icons/fa";
import { GiRecycle } from "react-icons/gi";
import { IoMdCheckmark } from "react-icons/io";

const OrderBox = ({ data }) => {
  return (
    <div className="h-fit flex flex-col gap-8 border shadow rounded-md p-5">
      <div className="flex justify-between">
        <h2 className="font-semibold text-lg">{data.shortTitle}</h2>
        <p className="text-lg">${data.price}</p>
      </div>

      <h2>{data.shortDesc}</h2>

      <div className="flex justify-between gap-5">
        <p className="font-semibold flex items-center gap-2 whitespace-nowrap">
          <FaRegClock />
          {data.deliveryTime}-day delivery
        </p>
        <p className="font-semibold flex items-center gap-2 whitespace-nowrap">
          <GiRecycle />
          {data.revisionNumber} Revisions
        </p>
      </div>

      <ul>
        {data.features.map((feature, index) => (
          <li key={index} className="flex gap-2 items-center">
            <IoMdCheckmark className="text-black" />
            <span className="text-gray-500">{feature}</span>
          </li>
        ))}
      </ul>

      <button className="flex bg-black text-white p-2 rounded-md hover:bg-zinc-700 transition">
        <span className="flex-1 font-semibold">Continue</span>
        <FaArrowRight />
      </button>
    </div>
  );
};

export default OrderBox;
