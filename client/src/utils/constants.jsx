import {
  FaCode,
  FaPaintBrush,
  FaBullhorn,
  FaPenFancy,
  FaVideo,
  FaRobot,
  FaMusic,
  FaBriefcase,
  FaUserTie,
} from "react-icons/fa";

export const categories = [
  { name: "Programming and Technology", icon: <FaCode /> },
  { name: "Graphics and Design", icon: <FaPaintBrush /> },
  { name: "Digital Marketing", icon: <FaBullhorn /> },
  { name: "Writing and Translation", icon: <FaPenFancy /> },
  { name: "Video and Animation", icon: <FaVideo /> },
  { name: "Artificial Intelligence Services", icon: <FaRobot /> },
  { name: "Music and Sound", icon: <FaMusic /> },
  { name: "Business", icon: <FaBriefcase /> },
  { name: "Consulting", icon: <FaUserTie /> },
];

export const items = [
  {
    title: "Dedicated hiring experts",
    text: "Count on an account manager to find you the right talent and see to your project’s every need.",
  },
  {
    title: "Satisfaction guarantee",
    text: "Order confidently, with guaranteed refunds for less-than-satisfactory deliveries.",
  },
  {
    title: "Advanced management tools",
    text: "Seamlessly integrate freelancers into your team and projects.",
  },
  {
    title: "Flexible payment models",
    text: "Pay per project or opt for hourly rates to facilitate longer-term collaboration.",
  },
];

export const inputs = [
  { label: "Title", name: "title", isReq: true },

  { label: "Short Title", name: "shortTitle", isReq: true },
  {
    label: "Features (Separate with ',')",
    name: "features",
    isReq: true,
    type: "textarea",
  },
  {
    label: "Description",
    name: "desc",
    isReq: true,
    type: "textarea",
  },
  {
    label: "Revision Number",
    name: "revisionNumber",
    isReq: true,
    type: "number",
    min: 1,
  },
  { label: "Short Description", name: "shortDesc", isReq: true },
  {
    label: "Delivery Time",
    name: "deliveryTime",
    isReq: true,
    type: "number",
    min: 1,
    max: 90,
  },
  { label: "Price", name: "price", isReq: true, type: "number", min: 1 },
  { label: "Main Picture", name: "cover", isReq: true, type: "file" },
  { label: "Photos", name: "images", isReq: true, type: "file", isMulti: true },
];
