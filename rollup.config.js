import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import generatePackageJSON from "rollup-plugin-generate-package-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import styles from "rollup-plugin-styles";
import { terser } from "rollup-plugin-terser";
const dev = process.env.NODE_ENV !== "production";

export default {
  input: "src/index.tsx",
  output: {
    file: "dist/index.tsx",
    format: "esm",
  },
  external: ["react", "react-dom"],
  plugins: [
    nodeResolve({
      extensions: [".ts", ".tsx"],
    }),
    babel({
      extensions: [".ts", ".tsx"],
      exclude: "node_modules/**",
      presets: ["@babel/preset-react", "@babel/preset-typescript"],
    }),
    generatePackageJSON({
      outputFolder: "dist",
      baseContents: (pkg) => ({
        name: pkg.name,
        "version": "1.0.0",
  "private": false,
  "description": "Credit Card Component for React 19",
  "author": "Avci Ventures",
  "license": "MIT",
  "keywords": [
    "credit-card",
    "react",
    "react19",
    "credit-card-component",
    "credit-card-input",
    "credit-card-form",
    "credit-card-input-react",
    "credit-card-input-react19"
  ],
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
        peerDependencies: {
          "@types/jest": "^27.5.2",
          "@types/node": "^16.18.126",
          "@types/react": "^19.0.10",
          "@types/react-dom": "^19.0.4",
          "payment": "^2.4.7",
          "react": "^19.0.0",
          "react-dom": "^19.0.0",
          "react-scripts": "5.0.1",
          "styled-components": "^6.1.15",
          "typescript": "^4.9.5"
        },
      }),
    }),
    terser({
      ecma: 2015,
      mangle: { toplevel: true },
      compress: {
        toplevel: true,
        drop_console: !dev,
        drop_debugger: !dev,
      },
      output: { quote_style: 1 },
    }),
    commonjs(),
    styles(),
  ],
};