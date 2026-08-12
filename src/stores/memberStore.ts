import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { TierId } from "@/lib/catalog";

export interface MemberRecord {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  province: string;
  dateOfBirth: string;
  idLast4: string;
  tier: TierId;
  verifiedAt: string;
}

interface MemberStore {
  member: MemberRecord | null;
  joinOpen: boolean;
  setMember: (m: MemberRecord) => void;
  clearMember: () => void;
  openJoin: () => void;
  closeJoin: () => void;
}

export const useMemberStore = create<MemberStore>()(
  persist(
    (set) => ({
      member: null,
      joinOpen: false,
      setMember: (member) => set({ member, joinOpen: false }),
      clearMember: () => set({ member: null }),
      openJoin: () => set({ joinOpen: true }),
      closeJoin: () => set({ joinOpen: false }),
    }),
    {
      name: "loudmouf-member",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ member: s.member }),
    },
  ),
);
