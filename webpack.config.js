const path = require("path");

module.exports = {
  entry: [
    "./js/consts.js",
    "./js/elements.js",
    "./js/avatar.js",
    "./js/debounce.js",
    "./js/backend.js",
    "./js/utils.js",
    "./js/form.js",
    "./js/pin.js",
    "./js/card.js",
    "./js/map.js",
    "./js/activate-page.js",
    "./js/filters.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
