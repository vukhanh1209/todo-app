"use client";

import { RecoilRoot } from "recoil";

export default function ProviderRecoil({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
