import { FaStar, FaTrashAlt } from "react-icons/fa";
import moment from "moment";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation } from "@tanstack/react-query";
import api from "../../utils/api";
import { toast } from "react-toastify";

const Review = ({ item, refetch }) => {
  const { user } = useContext(AuthContext);
  const { _id, star, user: reviewUser, desc, createdAt } = item;
  const arr = Array(Math.round(star)).fill();

  const isOwn = reviewUser._id === user._id;

  const { isPending, mutate } = useMutation({
    mutationFn: () => api.delete(`/review/${_id}`),
    onSuccess: () => {
      toast.warning("Review is deleted");
      refetch(); // Ensure refetch is called to update the data
    },
    onError: (error) => {
      toast.error(`Failed to delete review: ${error.message}`);
    },
  });

  return (
    <div className="flex flex-col gap-5 py-10 border-b relative">
      {isOwn && (
        <button
          onClick={() => mutate()}
          disabled={isPending}
          className="absolute top-12 right-1 p-2 bg-red-500 text-white rounded-md"
          aria-label="Delete Review"
        >
          <FaTrashAlt />
        </button>
      )}
      <div className="flex gap-5">
        <img
          src={reviewUser.photo}
          alt={`${reviewUser.username}'s profile`}
          className="w-12 h-12 rounded-full object-cover"
        />

        <div>
          <h4 className="font-semibold">{reviewUser.username}</h4>
          <p>{reviewUser.country}</p>
        </div>
      </div>

      <div className="flex items-center">
        {arr.map((_, key) => (
          <FaStar key={key} />
        ))}
        <span className="ms-1 me-3">{star}</span>
        <span className="text-sm text-gray-500">
          {moment(createdAt).fromNow()}
        </span>
      </div>

      <p>{desc}</p>

      <div className="flex gap-5">
        <span>Was it helpful?</span>
        <button className="flex gap-1 items-center" aria-label="Like Review">
          <AiOutlineLike />
          <span>Yes</span>
        </button>
        <button className="flex gap-1 items-center" aria-label="Dislike Review">
          <AiOutlineDislike />
          <span>No</span>
        </button>
      </div>
    </div>
  );
};

export default Review;
