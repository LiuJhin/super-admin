import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), svgr(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": "/src", // 根别名
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@features": "/src/features",
      "@hooks": "/src/hooks",
      "@pages": "/src/pages",
      "@services": "/src/services",
      "@store": "/src/store",
      "@utils": "/src/utils",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://your-backend-url", // 替换为后端API
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000, // 大型项目调整chunk大小
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "antd"], // 提取vendor chunk
        },
      },
    },
  },
});
