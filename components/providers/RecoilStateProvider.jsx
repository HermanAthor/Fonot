"use client";

import { RecoilRoot } from "recoil";

export default function RecoilStateProvider({ children }) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
