import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const refuges = [
  {
    nom: 'Refuge des Anges',
    adresse: '1 Rue du Paradis, Paris',
    chiens: [
      { nom: 'Buddy', race: 'Labrador', age: 2 },
      { nom: 'Max', race: 'Berger Allemand', age: 4 },
      { nom: 'Bella', race: 'Golden Retriever', age: 3 },
      { nom: 'Charlie', race: 'Beagle', age: 5 },
      { nom: 'Lucy', race: 'Bulldog', age: 1 }
    ]
  },
  {
    nom: 'Refuge Canin Heureux',
    adresse: '123 Avenue de la Joie, Lyon',
    chiens: [
      { nom: 'Rocky', race: 'Boxer', age: 3 },
      { nom: 'Daisy', race: 'Cocker', age: 2 },
      { nom: 'Milo', race: 'Border Collie', age: 4 },
      { nom: 'Luna', race: 'Chihuahua', age: 5 },
      { nom: 'Jack', race: 'Jack Russell', age: 3 }
    ]
  },
  {
    nom: 'Refuge Patte Douce',
    adresse: '5 Boulevard du Chien, Marseille',
    chiens: [
      { nom: 'Oscar', race: 'Caniche', age: 4 },
      { nom: 'Rex', race: 'Dobermann', age: 3 },
      { nom: 'Zoé', race: 'Dalmatien', age: 2 },
      { nom: 'Sam', race: 'Husky', age: 1 },
      { nom: 'Ginger', race: 'Setter', age: 6 }
    ]
  }
];

async function seedRefuges() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('❌ MONGODB_URI est manquant dans .env.local');
    return;
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db('test'); // adapte si besoin
    const collection = db.collection('refuges');

    // Supprime les anciens refuges si existants
    await collection.deleteMany({});

    const result = await collection.insertMany(refuges);
    console.log(`✅ ${result.insertedCount} refuges ajoutés avec succès.`);
  } catch (err) {
    console.error('❌ Erreur lors du seed :', err);
  } finally {
    await client.close();
  }
}

seedRefuges();
