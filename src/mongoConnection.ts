import mongoose from "mongoose";

async function ConnectToDatabase({ mongoUri }: { mongoUri: string }) {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB with database-models");
  } catch (error) {
    console.error("Failed to connect to MongoDB with database-models:", error);
    return;
  }
}

export { ConnectToDatabase };
