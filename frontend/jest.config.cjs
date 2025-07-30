module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^react$': require.resolve('react'),
    '^react-dom$': require.resolve('react-dom')
  },
  transformIgnorePatterns: [
    '/node_modules/(?!react)/'
  ]
};