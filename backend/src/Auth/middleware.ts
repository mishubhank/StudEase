const jwt2 = require("jsonwebtoken");

const authReq = (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers["authorization"];
    console.log(authHeader, "auth header");

    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header missing",
      });
    }

    const token = authHeader.split(" ")[1];
    console.log("token", token);

    if (!token) {
      return res.status(401).json({
        message: "Token missing",
      });
    }

    const decode = jwt2.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next(); // Only call next() if everything is successful
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(401).json({
      message: "Auth failed - invalid token",
    });
  }
};

module.exports = authReq;
