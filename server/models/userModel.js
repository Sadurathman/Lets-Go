import mongoose from "mongoose";
import bcrypt from "bcryptjs";

/*
    UsersBasic Details - Username, Password, Mail, Name, Mobile Number and User type
    Dealer - Nature of Material, Weight of Material, Quantity, location - (State and City)
    Driver - Age, Truck Number, Truck Capacity, Transport Name, Driving Experience, location[States and Cities]
*/

const dealerSchema = mongoose.Schema(
  {
    materialNature: { type: String, require: true },
    materialWeight: { type: Number, require: true },
    materialQuantity: { type: Number, require: true },
    location: {
      from: {
        states: { type: String, require: true },
        city: { type: String, require: true },
      },
      to: {
        states: { type: String, require: true },
        city: { type: String, require: true },
      },
    },
  },
  {
    timestamps: true,
  }
);

const driverSchema = mongoose.Schema(
  {
    age: { type: Number, require: true },
    transporterName: { type: String, require: true },
    truckNumber: { type: String, require: true },
    truckCapacity: { type: Number, require: true },
    drivingExperience: { type: Number, require: true },
    location: [
      {
        from: {
          states: { type: String, require: true },
          city: { type: String, require: true },
        },
        to: {
          states: { type: String, require: true },
          city: { type: String, require: true },
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    mobile: {
      type: Number,
      require: true,
    },
    userType: {
      type: Number,
      require: true,
    },
    dealer: dealerSchema,
    driver: driverSchema,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
