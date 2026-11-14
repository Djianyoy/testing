export const publicApiUrl =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export const serverApiUrl = process.env.API_URL_INTERNAL ?? publicApiUrl;

export const useProxy = process.env.NEXT_PUBLIC_USE_PROXY === "true";
