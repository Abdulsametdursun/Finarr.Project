// according to error handling send a error message to middleware
const error = (status, message) => {
  // create a new error object
  const err = new Error();

  // update the error object
  err.message = message;
  err.status = status;

  return err;
};

export default error;
