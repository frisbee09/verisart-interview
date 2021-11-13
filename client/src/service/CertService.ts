const SERVICE_HOST = "http://localhost:3001";
const GQL_URL = `${SERVICE_HOST}/graphql`;
const gqlFetch = (query: string, variables?: any) =>
  fetch(GQL_URL, {
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((r) => r.json());

const getCertificates = () =>
  gqlFetch(`
  {
    getCertificates {
    _id
    imgUrl
    title
    year
    artist {
      firstName
      lastName
    }
  }
}
`).then((r) => r.data.getCertificates);

const CertService = {
  getCertificates,
};

export default CertService;
