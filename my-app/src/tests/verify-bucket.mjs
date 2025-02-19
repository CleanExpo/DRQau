import { S3Client, CreateBucketCommand, ListBucketsCommand } from "@aws-sdk/client-s3";
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

async function verifyBucket() {
  try {
    console.log("Verifying R2 bucket access...");
    
    // List all buckets to confirm access
    const { Buckets } = await r2Client.send(new ListBucketsCommand({}));
    console.log("\nAvailable buckets:");
    Buckets?.forEach(bucket => {
      console.log(`- ${bucket.Name}${bucket.Name === process.env.R2_BUCKET_NAME ? " (target bucket)" : ""}`);
    });

    // Verify our target bucket exists
    const targetBucket = Buckets?.find(b => b.Name === process.env.R2_BUCKET_NAME);
    if (targetBucket) {
      console.log(`\n✅ Bucket "${process.env.R2_BUCKET_NAME}" is confirmed and accessible`);
    } else {
      console.log(`\n❌ Warning: Bucket "${process.env.R2_BUCKET_NAME}" not found in list`);
    }
  } catch (error) {
    console.error("\n❌ Verification failed:", error);
  }
}

verifyBucket();
