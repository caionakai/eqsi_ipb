import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { firestore } from "../../common/utils/firebase";
import { Box, Button } from "grommet";
import { Close } from "grommet-icons";
import "./CompanyDetails.style.css";

const CompanyDetails = ({ history, match }) => {
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
  }, []);

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
