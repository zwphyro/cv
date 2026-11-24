import "server-only";

import { env } from "@/lib/env";

import { createApi } from "./createApi";

export const serverApi = createApi(env.BACKEND_INTERNAL_URL);
