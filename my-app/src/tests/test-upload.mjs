import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
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

async function testUpload() {
  try {
    console.log("Testing file upload...");
    
    // Create a test file
    const testContent = "Hello, this is a test file " + new Date().toISOString();
    const fileName = `test-${Date.now()}.txt`;
    
    console.log(`\nUploading file: ${fileName}`);
    await r2Client.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileName,
        Body: testContent,
        ContentType: "text/plain"
      })
    );
    
    console.log("✅ Upload successful!");
    
    // Try to retrieve the file
    console.log("\nVerifying file retrieval...");
    const getResponse = await r2Client.send(
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: fileName
      })
    );
    
    const retrievedContent = await getResponse.Body?.transformToString();
    console.log("Retrieved content:", retrievedContent);
    console.log("✅ File retrieval successful!");
    
    if (retrievedContent === testContent) {
      console.log("\n🎉 Full test passed successfully!");
    } else {
      console.log("\n⚠️ Content verification failed");
    }
    
  } catch (error) {
    console.error("\n❌ Test failed:", error);
  }
}

testUpload();
