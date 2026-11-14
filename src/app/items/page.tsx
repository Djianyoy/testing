"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ItemForm } from "@/features/items/components/item-form";
import { useItems } from "@/features/items/hooks/use-items";
import { useItemUIStore } from "@/features/items/stores/item.store";

export default function ItemsPage() {
  const search = useItemUIStore((s) => s.search);
  const setSearch = useItemUIStore((s) => s.setSearch);
  const { data, isPending, isError, error, refetch } = useItems(search);

  return (
    <main className="mx-auto grid max-w-5xl gap-8 px-6 py-12 md:grid-cols-[1fr_320px]">
      <section className="space-y-4">
        <h1 className="text-2xl font-semibold">Daftar Item</h1>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari item..."
          className="h-9 w-full rounded-md border bg-transparent px-3 text-sm"
        />

        {isPending && (
          <div className="space-y-3">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        )}

        {isError && (
          <div className="rounded-lg border border-destructive/40 p-4 text-sm">
            <p>Gagal memuat data: {error.message}</p>
            <button onClick={() => refetch()} className="mt-2 underline">
              Coba lagi
            </button>
          </div>
        )}

        {data?.length === 0 && (
          <p className="text-sm text-muted-foreground">Belum ada item.</p>
        )}

        {data?.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-base">
                {item.title}
                <Badge variant="secondary">{item.category}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {item.description} — Rp{item.price.toLocaleString("id-ID")}
            </CardContent>
          </Card>
        ))}
      </section>

      <aside>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Tambah Item</CardTitle>
          </CardHeader>
          <CardContent>
            <ItemForm />
          </CardContent>
        </Card>
      </aside>
    </main>
  );
}