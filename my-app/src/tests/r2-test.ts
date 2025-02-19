import { r2Client } from '../lib/cloudflare.js';
import { PutObjectCommand, GetObjectCommand, ListObjectsCommand } from '@aws-sdk/client-s3';
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function testR2Connection() {
  try {
    console.log("Environment variables loaded:", {
      endpoint: process.env.R2_ENDPOINT,
      bucket: process.env.R2_BUCKET_NAME,
      hasAccessKey: !!process.env.R2_ACCESS_KEY_ID,
      hasSecretKey: !!process.env.R2_SECRET_ACCESS_KEY
    });

    console.log("Testing R2 connection...");
    
    // Test 1: List objects
    console.log("Attempting to list objects...");
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
