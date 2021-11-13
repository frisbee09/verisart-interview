import React from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";
import { ICertificate } from "./service/types";
import CertService from "./service/CertService";
import Loading from "./components/Loading";
import Certificate from "./components/Certificate";
import CertificateForm from "./components/CertificateForm";

const Header = styled.header`
  height: 4rem;
  width: 100%;
  box-shadow: 0 1px 4px rgb(0 0 0 / 25%);
  background: rgb(255, 255, 255);
`;

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  background: rgb(242, 242, 242);

  &,
  * {
    box-sizing: border-box;
  }

  /* position: relative; */
`;

const CertificatesWrapper = styled.div`
  padding: 0 2rem;
  > div {
    display: flex;
    flex-flow: row wrap;

    justify-content: space-between;

    > * {
      margin-right: 20px;
      margin-bottom: 20px;
    }
    /* So the margin looks nice on the right hand space, accounting for the
    margin-right of children */
    margin-right: -20px;
  }
`;

const CreateButton = styled.button`
  position: fixed;
  bottom: 15px;
  right: 15px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  font-size: 3rem;
  line-height: 0;
`;

const CloseButton = styled.button`
  position: fixed;
  top: 15px;
  right: 15px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  font-size: 3rem;
  line-height: 0;
`;

const App = () => {
  const [certData, setCertData] = React.useState<ICertificate[]>([]);
  const [loadingCert, setLoading] = React.useState<boolean>(false);
  const [failureMessage, setFail] = React.useState<string>("");

  const [showCreateUi, setCreateDisplay] = React.useState<boolean>(false);

  // On mount, fetch certs
  React.useEffect(() => {
    const getCerts = async () => {
      setFail("");
      setLoading(true);
      try {
        const data = await CertService.getCertificates();
        setCertData(data);
      } catch (e: any) {
        setFail(e.message);
      } finally {
        setLoading(false);
      }
    };

    getCerts();
  }, []);

  const renderCerts = () => {
    if (failureMessage) {
      return <p>{failureMessage}</p>;
    } else if (loadingCert) {
      return <Loading />;
    } else {
      return certData.map((c) => <Certificate {...c} key={c._id} />);
    }
  };

  return (
    <AppWrapper>
      <Header />
      <CertificatesWrapper>
        <h2>CERTIFICATES</h2>
        <div>{renderCerts()}</div>
      </CertificatesWrapper>
      <CreateButton onClick={(e) => setCreateDisplay(true)}>+</CreateButton>
      {showCreateUi && (
        <>
          <CertificateForm />
          <CloseButton onClick={(e) => setCreateDisplay(false)}>
            &times;
          </CloseButton>
        </>
      )}
    </AppWrapper>
  );
};

export default App;
