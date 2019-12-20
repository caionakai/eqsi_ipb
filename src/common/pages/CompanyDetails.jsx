import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { firestore } from "../../common/utils/firebase";

const CompanyDetails = ({ match }) => {
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

  return (
    <div className="">
      <h2>Nome da Empresa</h2>
      <div className="">{companyData.name}</div>

      <h2>CNPJ da Empresa</h2>
      <div className="">{companyData.cnpj}</div>
    </div>
  );
};

export default withRouter(CompanyDetails);
