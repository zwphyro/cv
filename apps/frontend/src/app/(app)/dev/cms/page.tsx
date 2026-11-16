import { notFound } from "next/navigation";

import { CmsDump } from "./CmsDump";

export default function CmsPlaygroundPage() {
  if (process.env.NODE_ENV === "production") notFound();

  return <CmsDump />;
}
