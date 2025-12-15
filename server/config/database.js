const mongoose = require("mongoose");

// console.log("MONGO URI =", process.env.MONGODB_URL);

exports.connect = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("MONGODB_URL is missing in .env");
    }

    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("DB Connection Success");
  } catch (err) {
    console.error("DB Connection Failed");
    console.error(err.message);
    process.exit(1);
  }
};
