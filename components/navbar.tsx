import Link from "next/link";

export default function Navbar() {
	return (
		<nav>
			<Link href="/">Accueil</Link>
			<Link href="/refuges">Refuges</Link>
		</nav>
	);
}
