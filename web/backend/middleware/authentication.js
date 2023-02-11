const { UnauthenticatedError } = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateHR = async (req, res, next) => {
  console.log("authinticate hr ");

  const token = req.signedCookies.token;

  if (!token) {
    throw new UnauthenticatedError("authentication Invalid");
  }
  try {
    const { name, hrId, role } = isTokenValid({ token });
    req.hr = { name, hrId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("authentication Invalid");
  }
};

module.exports = { authenticateHR };
