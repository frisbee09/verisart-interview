import * as React from "react";
import { IArtist, ICertificate } from "../service/types";
import styled from "styled-components";
import Certificate, { StyledCertificate } from "./Certificate";
import CertService from "../service/CertService";

interface ICertificateFormProps {
  hydrateId?: string;
}

const FormPane = styled.div`
  height: 100%;
  max-width: 45%;
  min-width: 300px;
  padding-left: 2rem;

  background: white;
  border: 1px solid rgb(190, 190, 190);
  box-shadow: 0 1px 4px rgb(0 0 0 / 25%);

  flex: 1;
  > button {
    display: block;
  }

  > * {
    margin-bottom: 10px;
  }
  > h3 {
    margin-bottom: 3px;
  }
`;

const DemoCertWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const FrostedGlass = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  display: flex;
  backdrop-filter: blur(3px);
  background: rgba(255, 255, 255, 0.5);

  ${StyledCertificate} {
    width: 15rem;
    flex: 0;
  }
`;

const getArtistName = (artist: IArtist) =>
  `${artist.firstName} ${artist.lastName}`;

const CertificateForm: React.FunctionComponent<ICertificateFormProps> = ({
  hydrateId,
}) => {
  const [art, setArt] = React.useState<ICertificate | undefined>(undefined);
  const [artists, setArtists] = React.useState<IArtist[]>([]);
  const [loadingArtists, setLoading] = React.useState<boolean>(false);
  const [failureMessage, setFail] = React.useState<string>("");

  React.useEffect(() => {
    const getArtists = async () => {
      setFail("");
      setLoading(true);
      try {
        const data = await CertService.getArtists();
        setArtists(data);
      } catch (e: any) {
        setFail(e.message);
      } finally {
        setLoading(false);
      }
    };

    getArtists();
  }, []);

  React.useEffect(() => {}, [hydrateId]);

  const formChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const fieldName = e.currentTarget.name;
    const newValue = e.currentTarget.value;

    setArt({ ...art, [fieldName]: newValue });
  };

  const createInput = (
    fieldName: keyof Omit<ICertificate, "dateAdded" | "_id" | "artist">
  ) => (
    <input
      name={fieldName}
      value={art?.[fieldName]}
      onChange={formChangeHandler}
    />
  );

  const selectedArtist = artists.find((a) => a._id === art?.artist?._id);

  return (
    <FrostedGlass>
      <DemoCertWrapper>
        <Certificate {...art} />
      </DemoCertWrapper>
      <FormPane>
        <h2>CREATE CERTIFICATION</h2>
        <h3>Title</h3>
        {createInput("title")}
        <h3>Image URL</h3>
        {createInput("imgUrl")}
        <h3>Year made</h3>
        {createInput("year")}
        <h3>Artist</h3>
        <select
          value={selectedArtist ? getArtistName(selectedArtist) : undefined}
          onChange={(e) => {
            const artist = artists.find(
              (a) => getArtistName(a) === e.currentTarget.value
            );
            setArt({ ...art, artistId: artist?._id, artist });
          }}
        >
          {artists.map((a) => (
            <option key={a._id}>
              {a.firstName} {a.lastName}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => {
            if (art) {
              CertService.createCertificate({
                title: art.title,
                imgUrl: art.imgUrl,
                year: Number(art.year),
                artistId: art.artistId,
              });
            }
          }}
          disabled={!art}
        >
          Save
        </button>
      </FormPane>
    </FrostedGlass>
  );
};

export default CertificateForm;
