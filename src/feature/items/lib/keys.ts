export const itemKeys = {
  all: ["items"] as const,
  list: (q?: string) => [...itemKeys.all, "list", q ?? ""] as const,
  detail: (id: string) => [...itemKeys.all, "detail", id] as const,
};
