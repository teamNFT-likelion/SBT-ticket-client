const { override, addWebpackAlias, addBabelPlugins } = require('customize-cra');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    '@components': path.resolve(__dirname, 'src', 'components'),
    '@assets': path.resolve(__dirname, 'src', 'assets'),
    '@styles': path.resolve(__dirname, 'src', 'styles'),
    '@utils': path.resolve(__dirname, 'src', 'utils'),
    '@hooks': path.resolve(__dirname, 'src', 'hooks'),
    '@states': path.resolve(__dirname, 'src', 'states'),
    '@constants': path.resolve(__dirname, 'src', 'constants'),
    '@mock': path.resolve(__dirname, 'src', 'mock'),
    '@pages': path.resolve(__dirname, 'src/components', 'pages'),
    '@atoms': path.resolve(__dirname, 'src/components', 'atoms'),
    '@articles': path.resolve(__dirname, 'src/components', 'articles'),
  }),
  ...addBabelPlugins(['babel-plugin-styled-components']),
);
