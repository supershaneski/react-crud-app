module.exports = {
    webpack: function(config) {
      config.module.rules.push({
        test: /\.md$/,
        use: 'raw-loader',
      })
      return config
    },
    env: {
        siteTitle: 'MERN Sample | React/Next Todo App',
    },
    exportTrailingSlash: true,
    exportPathMap: function() {
      return {
        '/': { page: '/' }
      };
    }
}