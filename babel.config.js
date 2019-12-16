module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [['transform-remove-console', {exclude: ['error', 'warn']}]],
};
