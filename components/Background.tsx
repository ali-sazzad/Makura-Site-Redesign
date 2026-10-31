"use client";
import dynamic from "next/dynamic";

const ThreadScene = dynamic(() => import("./ThreadScene"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 -z-10 bg-ink" />,
});

export default function Background() {
  return <ThreadScene />;
}
