import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	output: "standalone",
	typescript: { ignoreBuildErrors: true },
	reactCompiler: true
}

export default nextConfig
