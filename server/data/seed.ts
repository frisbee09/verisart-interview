import { MongoClient } from "mongodb";
import type { ICertificate } from "./models/Certificate";
import type { IArtist } from "./models/Artist";
import dbConfig from "./dbConfig";
const { DB_NAME, DB_HOST } = dbConfig;
const client = new MongoClient(DB_HOST);

const seedData: (IArtist & {
  certificates: Omit<ICertificate, "artistId">[];
})[] = [
  {
    firstName: "Felisa",
    lastName: "Dittmar",
    certificates: [
      {
        imgUrl: "static/art/wolfgang-hasselmann-dRk71FQbHPA-unsplash.jpg",
        title: "",
        year: 2021,
        dateAdded: new Date(),
      },
      {
        imgUrl: "static/art/yasamine-june-wh9Cbrl9yGY-unsplash.jpg",
        title: "",
        year: 2021,
        dateAdded: new Date(),
      },
    ],
  },
  {
    firstName: "Kennedy",
    lastName: "Haywood",
    certificates: [
      {
        imgUrl: "static/art/simon-joseph-NjALg6fPKcc-unsplash.jpg",
        title: "",
        year: 2021,
        dateAdded: new Date(),
      },
      {
        imgUrl: "static/art/studio-blackthorns-yCpj5fPUTDY-unsplash.jpg",
        title: "",
        year: 2021,
        dateAdded: new Date(),
      },
    ],
  },
  {
    firstName: "Zilpa",
    lastName: "Sharma",
    certificates: [
      {
        imgUrl: "static/art/einar-ingi-sigmundsson-kPeG1lt_XRo-unsplash.jpg",
        title: "",
        year: 2021,
        dateAdded: new Date(),
      },
      {
        imgUrl: "static/art/samuele-giglio-qoe3bjEXhxI-unsplash.jpg",
        title: "",
        year: 2021,
        dateAdded: new Date(),
      },
    ],
  },
  {
    firstName: "Jaana",
    lastName: "Rey",
    certificates: [
      {
        imgUrl: "static/art/airam-dato-on-qyett91rz08-unsplash.jpg",
        title: "",
        year: 2021,
        dateAdded: new Date(),
      },
      {
        imgUrl: "static/art/azamat-zhanisov-I130du9thYk-unsplash.jpg",
        title: "",
        year: 2021,
        dateAdded: new Date(),
      },
      {
        imgUrl: "static/art/beth-smith-E428fsia70Y-unsplash.jpg",
        title: "",
        year: 2021,
        dateAdded: new Date(),
      },
      {
        imgUrl: "static/art/cedric-stoecklin-vC3QQKE8F04-unsplash.jpg",
        title: "",
        year: 2021,
        dateAdded: new Date(),
      },
    ],
  },
];

const seedArtists: ICertificate[] = [];

const seed = async () => {
  try {
    await client.connect();
    const db = client.db(DB_NAME);
    console.log(`Connection success`);

    // Drop DB
    console.log(`Dropping collections`);
    const collections = await db.collections();
    collections.forEach((c) => c.drop());

    // Create new collections
    const artists = db.collection("artists");
    const certs = db.collection("certificates");

    for await (const artist of seedData) {
      const insertedArtist = await artists.insertOne(artist);
      const certsToInsert = artist.certificates.map((c) => ({
        ...c,
        artistId: insertedArtist.insertedId,
      }));
      await certs.insertMany(certsToInsert);
    }

    await client.close();
  } catch (e) {
    //TODO
    throw e;
  }
};

seed();
