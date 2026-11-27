import { ImageResponse } from "next/og";

import { SiteIcon } from "@/components/SiteIcon/SiteIcon";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <SiteIcon
      size={32}
      cell={3}
    />,
    size,
  );
}
