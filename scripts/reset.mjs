import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

async function resetDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error('❌ MONGODB_URI est manquant dans .env.local');
    return;
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();

    const db = client.db('test'); // adapte ce nom si nécessaire
    const collectionName = 'users';

    const collections = await db
      .listCollections({ name: collectionName })
      .toArray();

    if (collections.length > 0) {
      await db.collection(collectionName).drop();
      console.log(`✅ Collection '${collectionName}' supprimée avec succès.`);
    } else {
      console.log(`ℹ️ Collection '${collectionName}' n'existe pas.`);
    }
  } catch (err) {
    console.error('❌ Erreur lors de la suppression :', err);
  } finally {
    await client.close();
  }
}

resetDB();
