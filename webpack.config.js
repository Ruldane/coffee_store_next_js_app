const path = require("path");

module.exports = {
  output: {
    filename: "my-first-webpack.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        use: "file?name=fonts/[name].[ext]!static",
      },
    ],
    resolve: {
      extensions: [".js", ".jsx", ".css", ".less", ".json"],
      modules: ["node_modules", "path/to/your/static_resource"],
    },
  },
};
