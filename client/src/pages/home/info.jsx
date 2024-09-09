import { items } from "../../utils/constants";
import { BsFillPatchCheckFill } from "react-icons/bs";

const Info = () => {
  return (
    <section className="my-10 bg-green-100 bg-opacity-70 rounded-md p-4 sm:p-6">
      <h1 className="text-3xl">
        <span className="font-bold">finArr </span>
        <span>pro.</span>
      </h1>

      <p className="text-3xl font-light my-8 sm:my-8">
        The <span className="text-green-400"> premium </span>freelance solution
        for businesses
      </p>

      <div className="grid md:grid-cols-2 gap-5">
        {items.map((item) => (
          <div>
            <h5 className="font-semibold flex items-center gap-3">
              <BsFillPatchCheckFill className="text-lg" />
              {item.title}
            </h5>
            <h5 className="">{item.text}</h5>
          </div>
        ))}
      </div>
      <div className="flex justify-center my-6 sm:my-8">
        <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-zinc-800">
          Try Now
        </button>
      </div>
    </section>
  );
};

export default Info;
