const { UnauthenticatedError } = require("../errors");
const { isTokenValid } = require("../utils");

const authenticate = async (req, res, next) => {
  console.log("inside authinticate");

  const token = req.signedCookies.token;
  if (!token) {
    throw new UnauthenticatedError("authentication Invalid");
  }
  try {
    const { name, id, role } = isTokenValid({ token });

    req.user = { name, id, role };
    console.log(req.user);
    next();
  } catch (error) {
    console.log(error);
    throw new UnauthenticatedError("authentication Invalid");
  }
};

module.exports = { authenticate };
