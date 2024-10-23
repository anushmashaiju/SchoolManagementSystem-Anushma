import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).send("Access denied. No token provided.");
  const token = authHeader.split(" ")[1]; 
  if (!token) return res.status(401).send("Access denied. Token not found.");
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).send("Invalid token.");
  }
};


export { verifyToken };
