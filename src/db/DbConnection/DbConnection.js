import mongoose from "mongoose";
import { config } from "dotenv";
config();

const DbConnection = async () => {
  //   console.log(process.env.DB_URL);
  try {
    await mongoose.connect(process.env.DB_URI, { dbName: "portfolio_react" });
  } catch (err) {
    console.error(err.message);
  }
};

export default DbConnection;
