import jwt from "jsonwebtoken";
import "dotenv/config";

// Admin Authentication Middleware
const authAdmin = async (req, res, next) => {
  try {
    // Express converts all header names to lowercase
    const { atoken } = req.headers;

    if (!atoken) {
      return res.json({
        success: false,
        message: "Not authorized, login again",
      });
    }

    // Verify JWT
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

    console.log("TOKEN:", token_decode);
    console.log("ENV EMAIL:", process.env.ADMIN_EMAIL);

    // Check that the email stored in the token matches the admin email
    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.json({
        success: false,
        message: "Not authorized, login again",
      });
    }

    next();
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export default authAdmin;