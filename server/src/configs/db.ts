import { connect } from "mongoose";

const ConnectToDatabase = async () => {
  try {
    await connect(process.env.MONGO_DB_URL!);
    console.info("Database connection successful");
  } catch (error) {
    console.error("Database connection error\nServer Stopped");
    process.exit(0);
  }
};

export default ConnectToDatabase;
