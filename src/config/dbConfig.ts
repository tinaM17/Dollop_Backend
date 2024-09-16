import mongoose from "mongoose";
// Import the 'dotenv' module
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
 
export default function connectDB() {
  const url = process.env.MongoDbURL || "";
  
  try {
    mongoose.connect(url);
  } catch (err:any) {
    console.log(err.message);
    process.exit(1);
  }
  
  const dbConnection = mongoose.connection;

  dbConnection.once("open", () => {
    console.log(`Database connected`);
  });
 
  dbConnection.on("error", (err) => {
    console.error(`Connection error: ${err}`);
  });
}