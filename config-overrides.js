const { override, addWebpackAlias, addBabelPlugins } = require("customize-cra");
const path = require("path");

module.exports = override(
	addWebpackAlias({
		"@components": path.resolve(__dirname, "src", "components"),
		"@assets": path.resolve(__dirname, "src", "assets"),
		"@styles": path.resolve(__dirname, "src", "styles"),
		"@util": path.resolve(__dirname, "src", "util"),
		"@hooks": path.resolve(__dirname, "src", "hooks"),
		"@constants": path.resolve(__dirname, "src", "constants"),
		"@pages": path.resolve(__dirname, "src/components", "pages"),
		"@atoms": path.resolve(__dirname, "src/components", "atoms"),
		"@articles": path.resolve(__dirname, "src/components", "articles"),
	}),
	...addBabelPlugins(["babel-plugin-styled-components"])
);