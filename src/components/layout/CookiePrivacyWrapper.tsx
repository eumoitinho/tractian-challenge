"use client";

import { CookieBanner } from "./CookieBanner";
import { PrivacyModal } from "./PrivacyModal";
import { usePrivacyModal } from "@/lib/privacy-modal-context";

export function CookiePrivacyWrapper() {
  const { isOpen, open, close } = usePrivacyModal();

  return (
    <>
      <CookieBanner onOpenSettings={open} />
      <PrivacyModal isOpen={isOpen} onClose={close} />
    </>
  );
}
