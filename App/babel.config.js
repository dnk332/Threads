module.exports = api => ({
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
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
          '@services': `${__dirname}/src/services`,
          '@assets': `${__dirname}/src/assets`,
          '@components': `${__dirname}/src/components`,
          '@screens': `${__dirname}/src/screens`,
          '@themes': `${__dirname}/src/themes`,
          '@utils': `${__dirname}/src/utils`,
          '@constants': `${__dirname}/src/constants`,
          '@hooks': `${__dirname}/src/hooks`,
          '@navigation': `${__dirname}/src/navigation`,
          '@local_types': `${__dirname}/src/types`,
          '@locales': `${__dirname}/src/locales`,
          '@root': `${__dirname}/src/screens/Root`,
          '@svg': `${__dirname}/src/assets/svg`,
          '@image': `${__dirname}/src/assets/image`,
          '@store': `${__dirname}/src/redux/store`,
          '@selector': `${__dirname}/src/redux/selectors`,
          '@reducer': `${__dirname}/src/redux/reducers`,
          '@action': `${__dirname}/src/redux/actions`,
          '@saga': `${__dirname}/src/redux/sagas`,
          '@sagaHelper': `${__dirname}/src/redux/sagaHelper`,
          // '@api': `${__dirname}/src/api`,
        },
      },
    ],
    'inline-dotenv',
    'react-native-reanimated/plugin',
    ...(api.env() !== 'development' ? ['transform-remove-console'] : []),
  ],
});
