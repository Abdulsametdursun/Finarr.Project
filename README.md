Finarr
Finarr is a web application inspired by Fiverr. It allows users to either browse or create gigs, depending on their role. The platform supports two types of users: regular users and sellers. Regular users can browse gigs, while sellers have the ability to create and manage gigs.

Features
User Authentication: Users can create an account, sign in, and sign out.
Role-Based Access: Regular users can browse gigs, while sellers can create new gigs and upload related images.
Cloudinary Integration: Sellers can upload images for their profiles or gigs, which are stored and managed through Cloudinary.
Responsive UI: The frontend is built with React and styled using Tailwind CSS for a responsive, modern design.
Data Management: Gigs and user data are handled via MongoDB, with Mongoose as the ODM.

Technologies

Backend
Express.js: Backend framework for handling HTTP requests and API logic.
Mongoose: For MongoDB object modeling.
Nodemon: For development with live server reloading.
Bcrypt: For hashing user passwords.
Cookie-Parser: To handle cookies for authentication.
JSON Web Tokens (JWT): For secure user authentication.
Dotenv: To manage environment variables.
Morgan: For logging HTTP requests.
CORS: For enabling Cross-Origin Resource Sharing.

Frontend
React: For building the user interface.
React Icons: For iconography.
React Router DOM: For routing in the single-page application.
React Toastify: For displaying toast notifications.
React Query: For data fetching and synchronization with the server.
Moment: For handling and formatting dates.
Axios: For making HTTP requests to the backend.
Tailwind CSS: For responsive and customizable UI components.

Start the server:

Usage
Regular Users: Can sign up, log in, and browse existing gigs.
Sellers: Can create new gigs, upload images, and manage their content.
Images: Profile pictures and gig images are stored using Cloudinary.
Contributing
Feel free to contribute to the project by opening a pull request or submitting issues.
