const mongoose = require("mongoose");

const SeatSchema = new mongoose.Schema({
  seat_number: {
    type: Number,
    required: true,
  },
  is_available: {
    type: Boolean,
    default: true,
  },
  booked_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
});

const BusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  seats: {
    type: [SeatSchema],
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  bookings: {
    type: [
      {
        bus_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Bus",
        },
        seat_number: {
          type: Number,
          required: true,
        },
      },
    ],
    default: [],
  },
});

const Seat = mongoose.model("Seat", SeatSchema);
const Bus = mongoose.model("Bus", BusSchema);
const User = mongoose.model("User", UserSchema);

module.exports = { Seat, Bus, User };
