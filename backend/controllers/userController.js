import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";

import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from "razorpay";
import crypto from "crypto";

// ======================= Register User =======================
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "Missing Details",
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Enter a strong password",
      });
    }

    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ======================= Login User =======================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ======================= Get Profile =======================
const getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await userModel
      .findById(userId)
      .select("-password");

    res.json({
      success: true,
      userData,
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ======================= Update Profile =======================
const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      name,
      phone,
      address,
      dob,
      gender,
    } = req.body;

    const imageFile = req.file;

    if (!name || !phone || !address || !dob || !gender) {
      return res.json({
        success: false,
        message: "Data Missing",
      });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(
        imageFile.path,
        {
          resource_type: "image",
        }
      );

      await userModel.findByIdAndUpdate(userId, {
        image: imageUpload.secure_url,
      });
    }

    res.json({
      success: true,
      message: "Profile Updated",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ======================= Book Appointment =======================
const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { docId, slotDate, slotTime } = req.body;

    const docData = await doctorModel
      .findById(docId)
      .select("-password");

    if (!docData) {
      return res.json({
        success: false,
        message: "Doctor not found",
      });
    }

    if (!docData.available) {
      return res.json({
        success: false,
        message: "Doctor not available",
      });
    }

    let slots_booked = docData.slots_booked || {};

    // Check Slot Availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({
          success: false,
          message: "Slot not available"
        });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel
      .findById(userId)
      .select("-password");

    const docDataObj = docData.toObject();
    delete docDataObj.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData: docDataObj,
      amount: docData.fee,
      slotDate,
      slotTime,
      date: Date.now(),
    };

    const newAppointment = new appointmentModel(
      appointmentData
    );

    await newAppointment.save();
    console.log("Updated Slots:", slots_booked);
    await doctorModel.findByIdAndUpdate(docId, {
      slots_booked,
    });

    res.json({
      success: true,
      message: "Appointment Booked Successfully",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Api to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const appointments = await appointmentModel.find({ userId })
    res.json({
      success: true,
      appointments
    })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

// Api to cancel Appointments
const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId; // from auth middleware (secure)
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    // Verify appointment belongs to the user
    if (appointmentData.userId.toString() !== userId.toString()) {
      return res.json({ success: false, message: "Unauthorized action" });
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    // Releasing doctor slot
    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;

    // Guard against missing slot date
    slots_booked[slotDate] = (slots_booked[slotDate] || []).filter(
      (e) => e !== slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Api to make payments of appointment using razorpay
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})
const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({ success: false, message: "Appointment cancelled or not found" })
    }
    // Creating options for Razorpay 
    const options = {
      amount: appointmentData.amount * 100,  // Amount in smallest currency unit (INR = paisa)
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    }

    // Creation of an order
    const order = await razorpayInstance.orders.create(options)
    res.json({ success: true, order })
  }
  catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }


}
// Api to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Create HMAC signature to verify authenticity
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Signature matched — fetch order to get receipt (appointmentId)
      const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      res.json({ success: true, message: "Payment Successful" });
    } else {
      res.json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay
};  