/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@cargolinked/ui', '@cargolinked/utils', '@cargolinked/api', '@cargolinked/types'],
  serverExternalPackages: ['@supabase/supabase-js'],
};

module.exports = nextConfig;
