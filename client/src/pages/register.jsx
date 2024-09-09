import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/input";
import Toggler from "../components/toggler";
import Button from "../components/button";
import { AuthContext } from "../context/authContext";

const Register = () => {
  const [isSeller, setIsSeller] = useState(false);

  const { register } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    // create a new formdata object
    const formData = new FormData(e.target);

    // get all inputs and add them to the form
    const newUser = Object.fromEntries(formData.entries());

    // if account is seller add the account
    newUser.isSeller = isSeller;

    // method to register the new user
    register(newUser);
  };

  return (
    <div className="max-w-[900px] mx-auto">
      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 md:gap-10 md:pt-24"
      >
        <div>
          <h1 className="text-xl md:text-2xl text-gray-500 font-bold mb-5">
            Create New User
          </h1>
          <Input label="Name" isReq={true} name="username" />
          <Input label="Email" isReq={true} name="email" />
          <Input
            label="Password"
            isReq={true}
            name="password"
            type="password"
          />
          <Input label="Country" isReq={true} name="country" />
          <Input label="Photograph" isReq={true} name="photo" type="file" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl text-gray-500 font-bold mb-5">
            Become A Seller
          </h1>

          <Toggler setIsSeller={setIsSeller} />
          <Input
            label="Phone"
            type="number"
            name="phone"
            disabled={!isSeller}
            isReq={isSeller}
          />
          <Input
            label="Description"
            name="desc"
            disabled={!isSeller}
            isReq={isSeller}
          />
          <Button text="Create a Account" />

          <p className="mt-5 text-gray-500">
            Do You Have Account?
            <Link className="ms-3 text-blue-500" to="/login">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
