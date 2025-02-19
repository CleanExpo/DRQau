import { S3Client, ListObjectsCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const r2Client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
  }
});

async function testR2Connection() {
  try {
    console.log("Testing R2 connection...");
    console.log("Environment variables loaded:", {
      endpoint: process.env.R2_ENDPOINT,
      bucket: process.env.R2_BUCKET_NAME,
      hasAccessKey: !!process.env.R2_ACCESS_KEY_ID,
      hasSecretKey: !!process.env.R2_SECRET_ACCESS_KEY
    });

    // Test 1: List objects
    console.log("\nAttempting to list objects...");
    const listResponse = await r2Client.send(
      new ListObjectsCommand({
        Bucket: process.env.R2_BUCKET_NAME
      })
    );
    console.log("Successfully listed objects:", listResponse.Contents?.length ?? 0, "objects found");

    // Test 2: Upload test file
    console.log("\nAttempting to upload test file...");
    const testData = "Hello from R2 test!";
    const testKey = `test-${Date.now()}.txt`;

    await r2Client.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: testKey,
        Body: testData,
        ContentType: "text/plain"
      })
    );
    console.log("Successfully uploaded test file:", testKey);

    console.log("\n✅ All tests passed successfully!");
  } catch (error) {
    console.error("\n❌ Test failed:", error);
    process.exit(1);
  }
}

// Run the test
testR2Connection();
