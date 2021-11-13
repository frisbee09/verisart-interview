import * as React from "react";
import styled from "styled-components";
import { ICertificate } from "../service/types";

const StyledCertificate = styled.div`
  border-radius: 5px;
  border: 1px solid rgb(190, 190, 190);
  overflow: hidden;
  background: rgb(230, 230, 230);
  box-shadow: 0 1px 4px rgb(0 0 0 / 25%);
  
  /* Lay down the law for the images */
  min-height: 20rem;
  max-height: 40rem;
  min-width: 20rem;
  max-width: 40rem;
  flex: 1;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%;
  }

  /* Lay down the pos relative for the div to repos */
  position: relative;
  > div {
    position: absolute;
    bottom: 0;
    background: rgb(0, 0, 0);
    color: rgb(220, 220, 220);
    opacity: 0.5;
    width: 100%;

    display: flex;
    flex-direction: column;
    padding: 1rem;
    > p {
      margin: 0;
    }
  }
`;

interface ICertificateProps extends ICertificate {}

const Certificate: React.FC<ICertificateProps> = (props) => {
  return (
    <StyledCertificate>
      <img src={`http://localhost:3001/${props.imgUrl}`} />
      <div>
        <p>{props.title}</p>
        <p>
          {props.artist?.firstName} {props.artist?.lastName}
        </p>
        <p>{props.year}</p>
      </div>
    </StyledCertificate>
  );
};

export default Certificate;
