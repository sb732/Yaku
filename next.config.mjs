/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      's3.amazonaws.com',
      'yakuapp.s3.amazonaws.com',
      'bafybeibkjcrnct6ihayjhk5567572a5ai2bhnwb7sk3mh4yhu7pa45al5e.ipfs.dweb.link',
      'bafybeigaq3x3iz3v24qjnv26ql7c7fstll6reolqbxkpncpbpa23bovgva.ipfs.dweb.link',
      'arweave.net',
      'img.yaku.ai',
      'i.imgur.com',
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  webpack: (config, { webpack }) => {
    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: { fullySpecified: false },
    });

    config.resolve.fallback = { crypto: false };

    return config;
  },
};

export default nextConfig;
