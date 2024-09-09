const Toggler = ({ setIsSeller }) => {
  return (
    <>
      <div className="flex gap-5 items-center mb-5">
        <p>Active Seller Account</p>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            onChange={(e) => setIsSeller(e.target.checked)}
            className="sr-only peer"
            value=""
            type="checkbox"
          />
          <div className="peer ring-2 ring-gray-500 bg-gradient-to-r from-rose-400 to-red-900 rounded-full outline-none duration-500 after:duration-300 w-12 h-4 shadow-inner peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-emerald-900 shadow-gray-900 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-500  after:content-[''] after:rounded-full after:absolute after:outline-none after:h-6 after:w-6 after:bg-gray-900 after:-top-1 after:-left-1 after:flex after:justify-center after:items-center after:border-4 after:border-gray-500 peer-checked:after:translate-x-8"></div>
        </label>
      </div>
    </>
  );
};

export default Toggler;
