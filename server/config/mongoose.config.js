import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const URI_MONGODB = process.env.MONGODB_URI;

const connectDB = async() => {
  try {
    await mongoose.connect("mongodb://localhost:27017/personas", {});
    console.log("¡Conexión exitosa a MongoDB!");
  } catch (error) {
    console.error("Error al conectar a MongoDB", error);
    throw error;
  }
}

export default connectDB;