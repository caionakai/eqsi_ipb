import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { firestore } from "../../common/utils/firebase";
import { List } from "grommet";

import Spinner from "../components/Spinner";

const CompaniesList = ({ history }) => {
  const [arrData, setArrData] = useState([]);

  const handleClick = val => {
    // console.log(val.item.id);
    history.push(`/admin/company/${val.item.id}`);
  };
  
  useEffect(() => {
    firestore
      .collection("companies")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          setArrData(prevState => {
            let tmpArr = [...prevState];
            tmpArr.push({
              name: doc.data().name,
              cnpj: doc.data().cnpj,
              id: doc.id
            });
            return [...tmpArr];
          });
          //   console.log(`${doc.id} => ${doc.data().name}`);
        });
      });
  }, []);

  const waitData = () => {
    while (arrData.length === 0) {
      return <Spinner />;
    }
    return (
      <List
        primaryKey="name"
        secondaryKey="cnpj"
        data={arrData}
        onClickItem={handleClick}
      />
    );
  };

  return (
    // <List
    //   primaryKey="name"
    //   secondaryKey="cnpj"
    //   data={arrData}
    //   onClickItem={handleClick}
    // />
    <>{waitData()}</>
  );
};

export default withRouter(CompaniesList);
