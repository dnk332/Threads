module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.jsx',
          '.android.jsx',
          '.js',
          '.jsx',
          '.json',
          '.ts',
          '.tsx',
        ],
        alias: {
          '*': './src',
          '@services/*': './src/services',
          '@assets/*': './src/assets',
          '@components/*': './src/components',
          '@screens/*': './src/screens',
          '@themes/*': './src/themes',
          '@utils/*': './src/utils',
          '@constants/*': './src/constants',
          '@hooks/*': './src/hooks',
          '@navigation/*': './src/navigation',
          '@types/*': './src/types',
          '@locales/*': './src/locales',
          '@root/*': 'src/screens/Root',
        },
      },
    ],
    'inline-dotenv',
    'react-native-reanimated/plugin',
  ],
};
