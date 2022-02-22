import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="container"></div>

      <Link href="/">
        <h2>Marcus' Blog</h2>
      </Link>
    </header>
  );
}
