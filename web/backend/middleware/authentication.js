const { UnauthenticatedError, UnauthorizedError } = require("../errors");
const { isTokenValid } = require("../utils");

const authenticate = (Role) => {
  return async (req, res, next) => {
    console.log("inside authinticate");

    const token = req.signedCookies.token;
    if (!token) {
      throw new UnauthenticatedError("authentication Invalid");
    }
    try {
      const { name, id, role } = isTokenValid({ token });

      if (role !== Role) {
        console.log("Unauthorized role != Role");
        throw new UnauthorizedError("Unauthorized");
      }
      req.user = { name, id, role };
      console.log(req.user);
      next();
    } catch (error) {
      console.log(error);
      throw new UnauthenticatedError("authentication Invalid");
    }
  };
};
module.exports = { authenticate };
