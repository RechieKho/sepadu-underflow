import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import * as fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react()],
    server: {
      port: 5000,
      https: {
        key: fs.readFileSync("key.development.pem"),
        cert: fs.readFileSync("cert.development.pem"),
      },
      proxy: {
        "^/__/auth/.*": {
          target: `https://${env.VITE_FIREBASE_AUTH_DOMAIN}`,
          changeOrigin: true,
        },
      },
    },
  };
});
