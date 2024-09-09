import { useMutation, useQuery } from "@tanstack/react-query";
import api from "../../utils/api";
import Loader from "../../components/loader";
import Error from "../../components/error";
import Review from "./Review";
import { toast } from "react-toastify";

const Reviews = ({ gigId, avgRating }) => {
  // Get all the reviews
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["reviews", gigId],
    queryFn: () => api.get(`/review/${gigId}`).then((res) => res.data.reviews),
  });

  // sent review
  const { isPending, mutate } = useMutation({
    mutationFn: (newReview) => {
      return api.post("/review", newReview);
    },

    onSuccess: () => {
      toast.success("Review posted successfully");
      refetch();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const arr = [
      e.target[0],
      e.target[1],
      e.target[2],
      e.target[3],
      e.target[4],
    ];

    // find the checked radio button
    const found = arr.find((inp) => inp.checked == true);

    // create a review
    const newComment = { star: found.value, desc: e.target[5].value, gigId };

    // send the a post
    mutate(newComment);

    // reset the form
    e.target.reset();
  };

  return (
    <div>
      <h1 className="font-semibold text-lg">Reviews</h1>
      <p className="font-semibold my-2">
        {data?.length || 0} reviews for this Gig
      </p>

      <p>
        Average rating:{" "}
        <span className="font-semibold">{avgRating || "No ratings yet"}</span>
      </p>

      <div>
        <form onSubmit={handleSubmit} className="flex flex-col mt-5 my-5">
          <label>Give Us A Feedback</label>

          <div className="flex">
            <div className="rating">
              <input value="5" name="rate" id="star5" type="radio" />
              <label title="text" htmlFor="star5"></label>
              <input value="4" name="rate" id="star4" type="radio" />
              <label title="text" htmlFor="star4"></label>
              <input value="3" name="rate" id="star3" type="radio" checked="" />
              <label title="text" htmlFor="star3"></label>
              <input value="2" name="rate" id="star2" type="radio" />
              <label title="text" htmlFor="star2"></label>
              <input value="1" name="rate" id="star1" type="radio" />
              <label title="text" htmlFor="star1"></label>
            </div>
          </div>

          <label className="mt-2">Write a feedback</label>
          <input
            className="border p-2 rounded-md shadow mt-2"
            type="text"
            placeholder="write you feedback in here..."
          />

          <div className="flex justify-end">
            <button
              disabled={isPending}
              className="bg-green-500 rounded-md p-2 px-3 font-bold text-white mt-3 transition hover:bg-green-600"
            >
              Send
            </button>
          </div>
        </form>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Error info={error.message} refetch={refetch} />
      ) : (
        data.map((item) => (
          <Review key={item._id} item={item} refetch={refetch} />
        ))
      )}
    </div>
  );
};

export default Reviews;
