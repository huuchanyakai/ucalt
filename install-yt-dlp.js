import { execSync } from "child_process";
import { platform } from "os";
import { existsSync, chmodSync, mkdirSync } from "fs";
import { join } from "path";

const BIN_DIR = "./bin";
const isWin = platform() === "win32";

const fileName = isWin ? "yt-dlp.exe" : "yt-dlp";
const outputPath = join(BIN_DIR, fileName);

const urlMap = {
  win32: "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe",
  linux: "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp",
  darwin: "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp"
};

// ディレクトリ作成
mkdirSync(BIN_DIR, { recursive: true });

if (!existsSync(outputPath)) {
  console.log("Downloading yt-dlp...");

  execSync(`curl -L ${urlMap[platform()]} -o ${outputPath}`, {
    stdio: "inherit"
  });

  if (!isWin) {
    chmodSync(outputPath, 0o755);
  }

  console.log("yt-dlp installed:", outputPath);
} else {
  console.log("yt-dlp already exists:", outputPath);
}