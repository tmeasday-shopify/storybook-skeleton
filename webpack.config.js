const argv = require("webpack-nano/argv");
const composeConfiguration = require("./compose-configuration");

module.exports = composeConfiguration({
  target: argv.target,
  project: process.env.PROJECT || "template",
  builder: process.env.BUILDER || "esbuild",
  compileLazily: process.env.COMPILE_LAZILY === "1",
  profileCpu: process.env.PROFILE_CPU === "1",
  enableSourceMaps: process.env.ENABLE_SOURCE_MAPS === "1",
});
