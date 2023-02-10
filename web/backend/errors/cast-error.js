if (err.name === "CastError") {
  customError.msg = `No item found with id : ${err.value}`;
  customError.statusCode = 404;
}
