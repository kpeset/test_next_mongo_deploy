import clientPromise from "@/lib/mongodb";
import type { InferGetServerSidePropsType } from "next";

export default function Home({
	isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<main>
			<h1>Hello World!</h1>
			<p>Statut MongoDB : {isConnected ? "🟢 Connecté" : "🔴 Non connecté"}</p>
		</main>
	);
}

export async function getServerSideProps() {
	try {
		const client = await clientPromise;
		await client.db("admin").command({ ping: 1 }); // test rapide de la connexion
		return { props: { isConnected: true } };
	} catch (e) {
		console.error(e);
		return { props: { isConnected: false } };
	}
}
