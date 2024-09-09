import { categories } from "../../utils/constants";

const Select = () => {
  return (
    <div className="mb-5">
      <label className="mb-2 text-sm font-medium text-gray-900">Category</label>
      <select
        name="category"
        required
        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus-ring-blue-500 block w-full p-1.5 placeholder-gray-400 text-dark disabled:bg-gray-200 focus:border-blue-500"
      >
        <option value="">Select category</option>
        {categories.map((item, key) => (
          <option key={key} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
