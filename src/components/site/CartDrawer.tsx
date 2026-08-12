import { useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Minus, Plus, Trash2, MessageCircle, ShieldCheck } from "lucide-react";
import { useCartStore, productImage } from "@/stores/cartStore";
import { useMemberStore } from "@/stores/memberStore";
import { COURIER_FEE, WHATSAPP_NUMBER } from "@/lib/catalog";
import { incrementEarlyAccessClaimed } from "./EarlyAccessBar";

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, updateQuantity, removeItem, clearCart } = useCartStore();
  const member = useMemberStore((s) => s.member);
  const openJoin = useMemberStore((s) => s.openJoin);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const total = subtotal === 0 ? 0 : subtotal + COURIER_FEE;

  const placeOrder = () => {
    if (!member) {
      setOpen(false);
      openJoin();
      return;
    }
    const lines = items.map((i) => `• ${i.quantity} × ${i.title} — R${(i.price * i.quantity).toFixed(2)}`);
    const message = [
      "LOUDMOUF™ ALLOCATION REQUEST",
      "",
      `Member: ${member.fullName}`,
      `Tier: ${member.tier === "premium" ? "Premium" : "Standard"} Member`,
      `Phone: ${member.phone}`,
      `Email: ${member.email}`,
      `Delivery: ${member.city}${member.province ? `, ${member.province}` : ""}`,
      `ID verified: ****${member.idLast4}`,
      "",
      "Requested shares:",
      ...lines,
      "",
      `Subtotal: R${subtotal.toFixed(2)}`,
      `Courier: R${COURIER_FEE.toFixed(2)}`,
      `Total contribution: R${total.toFixed(2)}`,
      "",
      "Please confirm my allocation and send payment details.",
    ].join("\n");

    incrementEarlyAccessClaimed(totalItems);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
    clearCart();
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-full glass hover:glow-purple transition"
          aria-label="Open your allocation"
        >
          <ShoppingBag className="h-4 w-4" />
          {totalItems > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-[10px] bg-loud-yellow text-black">
              {totalItems}
            </Badge>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full bg-loud-ink border-l border-white/10">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl uppercase">Your Allocation</SheetTitle>
          <SheetDescription>
            {totalItems === 0
              ? "No shares reserved yet."
              : `${totalItems} share${totalItems !== 1 ? "s" : ""} — confirmed manually via WhatsApp.`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col flex-1 pt-4 min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 grid place-items-center text-center">
              <div>
                <ShoppingBag className="mx-auto h-10 w-10 text-white/30" />
                <p className="mt-3 text-sm text-white/50">Your allocation is empty.</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto pr-1 min-h-0 space-y-3">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-black/40">
                      <img src={productImage(item.productId)} alt={item.title} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-sm font-semibold">{item.title}</h4>
                      <p className="text-xs text-white/50">1 Tin · 20 pouches</p>
                      <p className="mt-1 text-sm font-semibold text-loud-yellow">R{item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-white/40 hover:text-white"
                        onClick={() => removeItem(item.productId)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 border-white/20"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-xs tabular-nums">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6 border-white/20"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-4 border-t border-white/10 pt-4">
                <div className="flex items-center justify-between text-sm text-white/60">
                  <span>Courier</span>
                  <span>R{COURIER_FEE.toFixed(2)} · 3–5 days · Courier Guy</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm uppercase tracking-widest text-white/60">Total contribution</span>
                  <span className="font-display text-2xl">R{total.toFixed(2)}</span>
                </div>

                {!member && (
                  <p className="flex items-start gap-2 rounded-xl border border-loud-yellow/30 bg-loud-yellow/10 p-3 text-[11px] text-loud-yellow">
                    <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                    Allocations are members-only. Complete your registration and ID verification to continue.
                  </p>
                )}

                <Button
                  onClick={placeOrder}
                  size="lg"
                  disabled={items.length === 0}
                  className="cta-gradient w-full text-black hover:opacity-90 font-semibold uppercase tracking-widest"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {member ? "Confirm via WhatsApp" : "Register to Confirm"}
                </Button>
                <p className="text-[10px] text-center uppercase tracking-widest text-white/40">
                  Manual confirmation · EFT & cash on delivery · 18+ members only
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
