"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateItem } from "../hooks/use-items";
import { itemSchema, type ItemInput } from "../schemas/item.schema";

export function ItemForm() {
  const form = useForm<ItemInput>({
    resolver: zodResolver(itemSchema),
    defaultValues: { title: "", description: "", price: 0, category: "food" },
  });
  const create = useCreateItem();

  return (
    <form
      onSubmit={form.handleSubmit((values) =>
        create.mutate(values, { onSuccess: () => form.reset() }),
      )}
      className="space-y-5"
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="title">Judul</FieldLabel>
          <Input id="title" placeholder="Nama item" {...form.register("title")} />
          <FieldError errors={[form.formState.errors.title]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="description">Deskripsi</FieldLabel>
          <Textarea id="description" {...form.register("description")} />
          <FieldError errors={[form.formState.errors.description]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="price">Harga</FieldLabel>
          <Input
            id="price"
            type="number"
            {...form.register("price", { valueAsNumber: true })}
          />
          <FieldError errors={[form.formState.errors.price]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="category">Kategori</FieldLabel>
          <select
            id="category"
            className="h-9 rounded-md border bg-transparent px-3 text-sm"
            {...form.register("category")}
          >
            <option value="food">Food</option>
            <option value="drink">Drink</option>
            <option value="other">Other</option>
          </select>
          <FieldError errors={[form.formState.errors.category]} />
        </Field>
      </FieldGroup>

      <Button type="submit" disabled={create.isPending} className="w-full">
        {create.isPending ? "Menyimpan..." : "Simpan"}
      </Button>
    </form>
  );
}