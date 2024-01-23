module.exports = {
  "extends": "@istanbuljs/nyc-config-typescript",
  "all": true,
  "include": ["src/models/", "src//services"],
  "reporter": [
    "text",
    "text-summary",
    "json-summary",
    "html",
    "lcov"
  ],
}