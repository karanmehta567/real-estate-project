/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'wphbqictviebjxzpygdc.supabase.co',
                port: '', // Leave this empty unless a specific port is required
                pathname: '/storage/v1/object/public/**' // Allows all paths under this directory
            }, {
                protocol: 'https',
                hostname: 'img.clerk.com',
                port: '',
                pathname: '/**'
            }
        ]
    }
};

export default nextConfig;
