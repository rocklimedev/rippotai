// middleware/upload.js (or utils/ftpUpload.js)
const ftp = require("basic-ftp");
const { Readable, Writable } = require("stream");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
require("dotenv").config();

// Helper: Create a writable stream that collects data into a Buffer
function createBufferWritable() {
  const chunks = [];
  const writable = new Writable({
    write(chunk, encoding, callback) {
      chunks.push(Buffer.from(chunk));
      callback();
    },
  });

  writable.getBuffer = () => Buffer.concat(chunks);
  return writable;
}

async function uploadToFtp(
  buffer,
  originalName,
  remoteDir = "/uploads/default",
  options = {},
) {
  const ext = path.extname(originalName);
  const uniqueName = `${uuidv4()}${ext}`;

  const client = new ftp.Client();
  client.ftp.verbose = process.env.NODE_ENV === "development";

  try {
    await client.access({
      host: process.env.FTP_HOST,
      port: process.env.FTP_PORT || 21,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: process.env.FTP_SECURE === "true",
      timeout: 0,
      ...options,
    });

    // Normalize path: ensure it starts with /
    let normalizedDir = remoteDir.startsWith("/") ? remoteDir : `/${remoteDir}`;
    normalizedDir = normalizedDir.replace(/\/+$/, ""); // remove trailing slash

    // Split into segments
    const segments = normalizedDir.split("/").filter(Boolean);
    let currentPath = "";

    // Create each directory level one by one
    for (const segment of segments) {
      currentPath += `/${segment}`;

      try {
        // Try to create directory
        await client.send("MKD", currentPath);
        console.log(`[FTP] Created directory: ${currentPath}`);
      } catch (mkdirErr) {
        // 550 or 521 usually means already exists → safe to ignore
        if (
          mkdirErr.code === 550 ||
          mkdirErr.code === 521 ||
          mkdirErr.message.includes("already exists") ||
          mkdirErr.message.includes("File exists")
        ) {
          console.log(`[FTP] Directory already exists: ${currentPath}`);
        } else {
          console.error(
            `[FTP] Failed to create ${currentPath}:`,
            mkdirErr.message,
          );
          throw mkdirErr;
        }
      }
    }

    // Upload using full path (no need for cd)
    const fullRemotePath = `${normalizedDir}/${uniqueName}`;

    const stream = bufferToStream(buffer);
    await client.uploadFrom(stream, fullRemotePath);

    console.log(`[FTP] Uploaded to: ${fullRemotePath}`);

    return `${process.env.FTP_BASE_URL}${normalizedDir}/${uniqueName}`;
  } catch (err) {
    console.error("FTP upload failed:", err.message, err.stack || err);
    throw err;
  } finally {
    client.close();
  }
}

function bufferToStream(buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

async function downloadFromFtp(ftpPath) {
  const client = new ftp.Client();
  client.ftp.verbose = process.env.NODE_ENV === "development";

  try {
    // Extract remote path from URL if needed
    let remotePath = ftpPath;
    if (ftpPath.startsWith("http")) {
      const url = new URL(ftpPath);
      remotePath = url.pathname;
    }

    await client.access({
      host: process.env.FTP_HOST,
      port: process.env.FTP_PORT || 21,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: process.env.FTP_SECURE === "true",
      timeout: 0,
    });

    // Use a writable that collects into Buffer
    const bufferWritable = createBufferWritable();

    await client.downloadTo(bufferWritable, remotePath);

    return bufferWritable.getBuffer();
  } catch (err) {
    console.error("FTP download error:", err);
    throw new Error(`Failed to download file from FTP: ${err.message}`);
  } finally {
    client.close();
  }
}

module.exports = {
  uploadToFtp,
  downloadFromFtp,
};
