import { Permission } from "node-appwrite";
import { attachmentBucket } from "../name";
import { storage } from "./config";

export default async function getOrCreateStorage() {
  try {
    await storage.getBucket(attachmentBucket);
    console.log("Storage Connected");
  } catch (error) {
    try {
      await storage.createBucket(
        attachmentBucket,
        attachmentBucket,
        [
          Permission.read("any"),
          Permission.create("users"),
          Permission.read("users"),
          Permission.update("users"),
          Permission.delete("users"),
        ],
        false,
        undefined,
        undefined,
        ["jpg", "png", "gif", "jpeg", "webp", "heic"]
      );

      console.log("Storage Created");
      console.log("Storage Connected");
    } catch (error) {
      console.error("Error creating storage:", error);
    }
  }
}
