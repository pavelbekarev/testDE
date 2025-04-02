import CopyPlugin from "copy-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import webpack from "webpack";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buildDir = path.resolve(__dirname, "./build");
const publicDir = path.resolve(__dirname, "./public");
const appDir = path.resolve(__dirname, "./src/app");
const pagesDir = path.resolve(__dirname, "./src/pages");

const folders = ["fonts", "assets"];
const copyFolders = (folders) => {
  return folders.map((folder) => {
    const fromPath = path.resolve(publicDir, `./${folder}`);
    const toPath = path.resolve(buildDir, `./${folder}`);
    if (!fs.existsSync(fromPath)) {
      console.debug(`Source folder: ${fromPath} does not exist`);
    }
    return {
      from: fromPath,
      to: toPath,
      noErrorOnMissing: true,
    };
  });
};

/**
 *
 */
export default async (env, { mode }) => {
  const isDev = mode === "development";
  return {
    mode,
    entry: path.join(appDir, "app.ts"),
    output: {
      path: buildDir,
      filename: "js/[name].js",
      clean: true,
    },
    devServer: {
      static: {
        directory: publicDir,
      },
      port: 8888,
      open: true,
      historyApiFallback: true,
      hot: true,
      watchFiles: [
        "src/**/*.js",
        "src/**/*.ts",
        "src/**/*.scss",
        "src/**/*.html",
        "src/**/*.json",
      ],
    },
    module: {
      rules: [
        {
          test: /\.(jpg|png|svg|jpeg|gif)$/,
          type: "asset/resource",
        },
        {
          test: /\.(ts)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-typescript"],
            },
          },
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.(scss|css)$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 2,
                sourceMap: isDev,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: isDev,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.join(pagesDir, "index.ts"), // Убедитесь, что шаблон существует
      }),
      new MiniCssExtractPlugin({
        filename: "styles/[name][hash].css",
        ignoreOrder: true,
      }),
      new webpack.DefinePlugin({
        "process.env.API_URL": JSON.stringify(env.API_URL),
      }),
      new CopyPlugin({
        patterns: copyFolders(folders),
      }),
    ],
    resolve: {
      alias: {
        "#shared": path.resolve(__dirname, "src/shared"),
        "#entities": path.resolve(__dirname, "src/entities"),
        "#features": path.resolve(__dirname, "src/features"),
        "#pages": path.resolve(__dirname, "src/pages"),
        "#widgets": path.resolve(__dirname, "src/widgets"),
        "#app": path.resolve(__dirname, "src/app"),
        "#fonts": path.resolve(__dirname, "public/fonts"),
        "#assets": path.resolve(__dirname, "public/assets"),
      },
      extensions: [".js", ".ts", ".scss", ".css"],
    },
    optimization: {
      minimize: !isDev,
      minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    },
    devtool: isDev ? "source-map" : false,
  };
};
