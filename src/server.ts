import app from "./app";
import config from "./config/config";

console.log("1. server.ts started");

const server = app.listen(config.PORT, () => {
  console.log(`🚀 Server running on port ${config.PORT}`);
});

console.log("2. app.listen called");

server.on("error", (err) => {
  console.error("Server error:", err);
});