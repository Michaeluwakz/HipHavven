
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cf.bstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.nigeriapropertycentre.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'isijayne.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'hutbay.blob.core.windows.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'imgservice.bedroomvillas.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.propertypro.ng',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.superiteafrica.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;

