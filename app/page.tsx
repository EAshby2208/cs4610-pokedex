import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-row items-center justify-center min-h-screen py-2 gap-8">
      <Link href="/pokemon">Pokemon</Link>
      <Link href="/locations">Locations</Link>
      <Link href="/moves">Moves</Link>
      <Link href="/generations">Generations</Link>
    </div>
  );
}