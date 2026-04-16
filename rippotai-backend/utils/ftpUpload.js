const ftp = require("basic-ftp");
const { Readable, Writable } = require("stream");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

require("dotenv").config();

/**
 * Buffer → Stream
 */
function bufferToStream(buffer) {
  const stream = new Readable();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

/**
 * Stream → Buffer
 */
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

/**
 * 🔥 FINAL FTP UPLOAD FUNCTION (FULLY FIXED)
 */
async function uploadToFtp(buffer, filename, options = {}) {
  const client = new ftp.Client();
  client.ftp.verbose = process.env.NODE_ENV === "development";

  try {
    // ==================== BASE URL ====================
    let baseUrl = (
      process.env.MEDIA_BASE_URL || "https://media.cmtradingco.com"
    ).trim();

    if (!baseUrl.includes("://")) baseUrl = "https://" + baseUrl;
    baseUrl = baseUrl.replace(/\/+$/, "");

    // ==================== FILE NAME ====================
    const ext = path.extname(filename) || ".jpg";
    const uniqueName = `${uuidv4()}${ext}`;

    // ==================== REMOTE DIR ====================
    let remoteDir = "/uploads";

    if (typeof options === "string") {
      remoteDir = options;
    } else if (options?.remoteDir) {
      remoteDir = options.remoteDir;
    }

    if (!remoteDir.startsWith("/")) remoteDir = "/" + remoteDir;

    const fullDir = remoteDir.replace(/\/+$/, "");

    console.log("📁 Upload dir:", fullDir);

    // ==================== CONNECT ====================
    await client.access({
      host: process.env.FTP_HOST,
      port: parseInt(process.env.FTP_PORT) || 21,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: process.env.FTP_SECURE === "true",
    });

    // ==================== ENSURE DIR ====================
    await client.ensureDir(fullDir);

    // 🔥 SET FOLDER PERMISSION (755)
    try {
      await client.send(`SITE CHMOD 755 ${fullDir}`);
    } catch (e) {
      console.warn("⚠️ Folder CHMOD skipped");
    }

    // 🔥 CRITICAL FIX → MOVE INTO DIRECTORY
    await client.cd(fullDir);

    // ==================== UPLOAD ====================
    console.log("⬆️ Uploading:", uniqueName);

    await client.uploadFrom(bufferToStream(buffer), uniqueName);

    // 🔥 SET FILE PERMISSION (775) — RELATIVE PATH
    try {
      await client.send(`SITE CHMOD 775 ${uniqueName}`);
    } catch (e) {
      console.warn("⚠️ File CHMOD skipped");
    }

    // ==================== FINAL URL ====================
    let finalUrl = `${baseUrl}${fullDir}/${uniqueName}`;
    finalUrl = finalUrl.replace(/([^:]\/)\/+/g, "$1");

    console.log("✅ Uploaded:", finalUrl);

    return {
      url: finalUrl,
      remotePath: `${fullDir}/${uniqueName}`,
    };
  } catch (error) {
    console.error("❌ FTP Upload Error:", error.message);
    throw new Error(`FTP upload failed: ${error.message}`);
  } finally {
    client.close();
  }
}

/**
 * 📥 DOWNLOAD FUNCTION
 */
async function downloadFromFtp(ftpPath) {
  const client = new ftp.Client();
  client.ftp.verbose = process.env.NODE_ENV === "development";

  try {
    let remotePath = ftpPath;

    // Convert URL → FTP path if needed
    if (ftpPath.startsWith("http")) {
      const url = new URL(ftpPath);
      remotePath = `/public_html${url.pathname}`;
    }

    await client.access({
      host: process.env.FTP_HOST,
      port: parseInt(process.env.FTP_PORT) || 21,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: process.env.FTP_SECURE === "true",
    });

    const bufferWritable = createBufferWritable();

    console.log("⬇️ Downloading:", remotePath);

    await client.downloadTo(bufferWritable, remotePath);

    return bufferWritable.getBuffer();
  } catch (err) {
    console.error("❌ FTP download error:", err.message);
    throw new Error(`Download failed: ${err.message}`);
  } finally {
    client.close();
  }
}

module.exports = {
  uploadToFtp,
  downloadFromFtp,
};
