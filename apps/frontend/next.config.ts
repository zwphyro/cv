import path from "node:path";

import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  sassOptions: {
    loadPaths: [path.join(import.meta.dirname, "src/styles")],
  },
};

export default withPayload(nextConfig);
