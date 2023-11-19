import { resolve } from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: "./src/index.js",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist"),
  },
};
