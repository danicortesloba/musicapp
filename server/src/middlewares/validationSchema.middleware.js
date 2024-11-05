export  const validationSchema = (err, req, res, next) => {
    console.log("Error del middleware", err);
    let statusCode = err.statusCode || 500;
    let message = err.message || "Ocurrio un error";
    let name = err.name || "Error";
  
    if (err.name === "ValidationError" || err.name === "AxiosError") {
      console.log(err.errors);
      statusCode = 400;
      message = Object.values(err.errors)
        .map((error) => error.message)
        .join(", ");
    }
  
    if (err.name === "CastError") {
      console.log(err.errors);
      statusCode = 400;
      message = Object.values(err.errors)
        .map((error) => error.message)
        .join(", ");
    }
    const normalizedError = {
      statusCode,
      message,
      name
    };
    res.status(normalizedError.statusCode).json(normalizedError);
  };
  