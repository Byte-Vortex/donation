import serverOnlyContext from "@/helper/server-only-context";

export const [getSlug, setSlug] = serverOnlyContext(null);