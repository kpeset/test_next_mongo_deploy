import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		const client = await clientPromise;
		const refuges = await client
			.db("test")
			.collection("refuges")
			.find({})
			.toArray();
		res.status(200).json(refuges);
	} catch (error) {
		console.info("coucoucou");
		console.error("Erreur API /refuges:", error);
		res.status(500).json({ message: "Erreur serveur" });
	}
}
