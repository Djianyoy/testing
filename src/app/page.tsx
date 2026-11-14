import Link from "next/link";
import { Hero } from "@/shared/hero/Hero";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Hero title="Nama Produk" subtitle="Ganti teks ini besok setelah tema keluar." />
      <div className="flex justify-center pb-16">
        <Link href="/items" className={buttonVariants({ size: "lg" })}>
          Buka Demo
        </Link>
      </div>
    </div>
  );
}
