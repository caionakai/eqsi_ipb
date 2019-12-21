import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { firestore } from "../../common/utils/firebase";
import { Box, Button } from "grommet";
import { Close, Edit } from "grommet-icons";
import { useHistory } from "react-router-dom";
import ReactModal from "react-modal";
import { useModal } from "react-modal-hook";
import RegisterCompanies from "../../admin/pages/RegisterCompanies";

const CompanyDetails = ({ history, match }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)"
    }
  };
  const onSubmit = val => {};

  const [showModal, hideModal] = useModal(() => (
    <ReactModal isOpen style={customStyles}>
      <p>Update Company's Details</p>

      <button onClick={hideModal}>Hide modal</button>
    </ReactModal>
  ));

  const [companyData, setCompanyData] = useState({});

  useEffect(() => {
    console.log(match.params.companyId);
    firestore
      .collection("companies")
      .doc(match.params.companyId)
      .get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          setCompanyData(doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  }, [match.params.companyId]);

  const deleteCompany = () => {
    firestore
      .collection("companies")
      .doc(match.params.companyId)
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
        history.push("/admin/companies/list");
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <div className="geral">
      <div className="botao">
        <Box align="center" pad="small">
          <Button
            plain={false}
            icon={<Close />}
            onClick={deleteCompany}
            primary
          />
        </Box>
        <Box align="center" pad="small">
          <Button icon={<Edit />} plain={false} primary onClick={showModal} />
        </Box>
      </div>
      <div className="dados">
        <h2>Company's Name</h2>
        <div className="">{companyData.name}</div>

        <h2>Company's CNPJ</h2>
        <div className="">{companyData.cnpj}</div>
      </div>
    </div>
  );
};

export default withRouter(CompanyDetails);
