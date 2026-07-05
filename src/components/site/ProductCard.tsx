import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";
import { Loader2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const accentByTitle: Record<string, { label: string; accent: string; ring: string; text: string }> = {
  cheesecake: {
    label: "Sativa · Uplifting",
    accent: "from-loud-yellow/40 via-loud-yellow/10 to-transparent",
    ring: "ring-loud-yellow/40",
    text: "text-loud-yellow",
  },
  blueberry: {
    label: "Indica · Calming",
    accent: "from-loud-blue/40 via-loud-blue/10 to-transparent",
    ring: "ring-loud-blue/40",
    text: "text-[color:var(--loud-blue)]",
  },
  bubblegum: {
    label: "Hybrid · Balanced",
    accent: "from-loud-pink/40 via-loud-pink/10 to-transparent",
    ring: "ring-loud-pink/40",
    text: "text-[color:var(--loud-pink)]",
  },
};

function resolve(title: string) {
  const k = title.toLowerCase();
  for (const key of Object.keys(accentByTitle)) if (k.includes(key)) return accentByTitle[key];
  return accentByTitle.cheesecake;
}

export function ProductCard({ product, index }: { product: ShopifyProduct; index: number }) {
  const { addItem, isLoading } = useCartStore();
  const variant = product.node.variants.edges[0]?.node;
  const image = product.node.images.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;
  const cleanTitle = product.node.title.replace(/LOUDMOUF™\s*/i, "").replace(/—.*/, "").trim();
  const style = resolve(cleanTitle);

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={cn(
        "group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md",
        "hover:border-white/20 hover:-translate-y-1 transition-all duration-500",
      )}
    >
      <div className={cn("pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60", style.accent)} />
      <div className="relative">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-black/40 ring-1 ring-white/10">
          {image && (
            <img
              src={image.url}
              alt={image.altText ?? product.node.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className={cn("absolute inset-0 ring-2 rounded-2xl opacity-0 group-hover:opacity-100 transition", style.ring)} />
        </div>

        <div className="mt-5 flex items-start justify-between gap-3">
          <div>
            <p className={cn("text-[11px] uppercase tracking-[0.22em]", style.text)}>{style.label}</p>
            <h3 className="display mt-1 text-3xl text-white">{cleanTitle}</h3>
          </div>
          <div className="text-right">
            <p className="font-display text-3xl text-white leading-none">
              R{parseFloat(price.amount).toFixed(0)}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-white/40">per tin</p>
          </div>
        </div>

        <Button
          onClick={handleAdd}
          disabled={isLoading || !variant}
          className="mt-5 w-full bg-white text-black hover:bg-loud-yellow hover:glow-yellow uppercase tracking-widest text-xs font-semibold"
        >
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : (
            <>
              <Plus className="h-4 w-4 mr-1" /> Add to Cart
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
}
