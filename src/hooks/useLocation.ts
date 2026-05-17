"use client";

import { usePathname, useRouter } from "next/navigation";

export function useLocation(): [string, (href: string) => void] {
  const pathname = usePathname();
  const router = useRouter();

  const navigate = (href: string) => {
    router.push(href);
  };

  return [pathname, navigate];
}
