import { composeMongoose } from "graphql-compose-mongoose";
import { schemaComposer } from "graphql-compose";
import { Artist } from "./data/models/Artist";
import { Certificate } from "./data/models/Certificate";

const ArtistTC = composeMongoose(Artist);
const CertificateTC = composeMongoose(Certificate);
CertificateTC.addRelation("artist", {
  resolver: () => ArtistTC.mongooseResolvers.dataLoader({ lean: true }),
  prepareArgs: {
    _id: (source) => source.artistId,
  },
  projection: {
    artistId: true,
  },
});

schemaComposer.Query.addFields({
  getCertificates: CertificateTC.mongooseResolvers.findMany(),
  getCertificate: CertificateTC.mongooseResolvers.findOne(),
});

schemaComposer.Mutation.addFields({
  createCertificate: CertificateTC.mongooseResolvers.createOne(),
});

const gqlSchema = schemaComposer.buildSchema();

export default gqlSchema;
