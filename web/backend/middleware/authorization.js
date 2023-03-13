const { UnauthorizedError } = require("../errors");

const authorize = (Role) => {
  return (req, res, next) => {
    if (req.user.role !== Role) {
      console.log("Unauthorized role != Role");
      throw new UnauthorizedError("Unauthorized");
    }
    next();
  };
};

module.exports = { authorize };
