// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  redirect("/pokemon");
}