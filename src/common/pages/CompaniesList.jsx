import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { firestore } from "../../common/utils/firebase";
import { List } from "grommet";

const CompaniesList = () => {
  const [arrData, setArrData] = useState([]);
  let history = useHistory();
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

  return (
    <List
      primaryKey="name"
      secondaryKey="cnpj"
      data={arrData}
      onClickItem={handleClick}
    />
  );
};

export default CompaniesList;
