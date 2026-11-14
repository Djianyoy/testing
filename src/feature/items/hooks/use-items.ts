"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createItem, getItem, getItems, toggleFavorite } from "../api/items.api";
import { itemKeys } from "../lib/keys";
import type { Item, ItemInput } from "../schemas/item.schema";

export function useItems(q?: string) {
  return useQuery({
    queryKey: itemKeys.list(q),
    queryFn: ({ signal }) => getItems(q, signal),
    staleTime: 30_000,
  });
}

export function useItem(id: string) {
  return useQuery({
    queryKey: itemKeys.detail(id),
    queryFn: ({ signal }) => getItem(id, signal),
    enabled: Boolean(id),
  });
}

export function useCreateItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: ItemInput) => createItem(body),
    onSuccess: () => {
      toast.success("Berhasil disimpan");
      void qc.invalidateQueries({ queryKey: itemKeys.all });
    },
    onError: (err) => toast.error(err.message),
  });
}

/** Optimistic update + rollback */
export function useToggleFavorite() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => toggleFavorite(id),
    onMutate: async (id: string) => {
      await qc.cancelQueries({ queryKey: itemKeys.all });
      const previous = qc.getQueryData<Item[]>(itemKeys.list());
      qc.setQueryData<Item[]>(itemKeys.list(), (old) =>
        old?.map((it) => (it.id === id ? { ...it, favorite: !it.favorite } : it)),
      );
      return { previous };
    },
    onError: (err, _id, ctx) => {
      if (ctx?.previous) qc.setQueryData(itemKeys.list(), ctx.previous);
      toast.error(err.message);
    },
    onSettled: () => {
      void qc.invalidateQueries({ queryKey: itemKeys.all });
    },
  });
}