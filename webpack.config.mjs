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

const folders = ["assets", "fonts"];

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

export default async (env, { mode }) => {
  const isDev = mode === "development";
  return {
    mode,
    entry: path.join(appDir, "app.ts"),
    output: {
      path: buildDir,
      filename: "js/[name].ts",
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
        "src/**/*.css",
        "src/**/*.html",
        "src/**/*.json",
      ],
    },
    module: {
      rules: [
        {
          test: /\.js$/, // Для всех .js файлов
          exclude: /node_modules/, // Игнорируем node_modules
          use: {
            loader: "babel-loader", // Используем babel-loader
          },
        },
        {
          test: /\.ts$/, // Для всех .ts файлов
          exclude: /node_modules/, // Игнорируем node_modules
          use: {
            loader: "babel-loader", // Используем babel-loader
          },
        },
        {
          test: /\.(css|scss)$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                importLoaders: 1,
                sourceMap: isDev ? true : false,
              },
            },
            "sass-loader",
          ],
        },
      ],
    },
    plugins: [
      // формируем html при билде
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: path.join(pagesDir, "index.ts"),
      }),
      new MiniCssExtractPlugin({
        filename: "styles/[name][hash].css",
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
      },
      extensions: [".js", ".scss", ".ts"],
    },
    optimization: {
      minimize: !isDev, //В режиме продакшена
      minimizer: [
        new CssMinimizerPlugin(), //Минификация CSS
        new TerserPlugin(),
      ],
    },
    devtool: isDev ? "source-map" : false,
  };
};
