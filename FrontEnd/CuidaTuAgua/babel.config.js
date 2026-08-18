module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],

    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@assets": "./src/assets",
            "@components": "./src/components",
            "@hooks": "./src/hooks",
            "@i18n": "./src/i18n",
            "@navigation": "./src/navigation",
            "@screens": "./src/screens",
            "@theme": "./src/theme",
          },
        },
      ],

      "react-native-reanimated/plugin",
    ],
  };
};