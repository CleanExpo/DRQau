import { S3Client, CreateBucketCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const r2Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
  }
});

async function createBucket() {
  try {
    console.log("Creating R2 bucket...");
    
    await r2Client.send(
      new CreateBucketCommand({
        Bucket: process.env.R2_BUCKET_NAME
      })
    );
    
    console.log(`✅ Successfully created bucket: ${process.env.R2_BUCKET_NAME}`);
  } catch (error) {
    if (error.name === "BucketAlreadyExists") {
      console.log(`Bucket ${process.env.R2_BUCKET_NAME} already exists`);
    } else {
      console.error("❌ Failed to create bucket:", error);
    }
  }
}

createBucket();
