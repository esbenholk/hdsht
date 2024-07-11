/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.glsl/,
      type: "asset/source",
    })
    return config
  },
  images: {
    domains: ["images.prismic.io", "hdsht2.cdn.prismic.io/", "hdsht2.cdn.prismic.io"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hdsht2.cdn.prismic.io',
        port: '',
      },
    ],
  },

};

module.exports = nextConfig
module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    //sass import rule
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        "style-loader",
        "css-loader",
        {
          loader: "sass-loader",
          options: {
            sassOptions: {
              includePaths: ["./styles"],
            },
          },
        },
      ],
    });

    return config;
  },
};
module.exports = nextConfig;
