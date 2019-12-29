import React, { useState, useEffect } from "react";
import { firebase } from "../../common/utils/firebase";
import { withRouter } from "react-router-dom";
import { useCompanies } from "../hooks/companies";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "Mini preço",
    horas: 4000
  },
  {
    name: "Meu super",
    horas: 3000
  }
];

const db = firebase.firestore();

const Report = ({ history }) => {
  const [workAmount, setWorkAmount] = useState([]);
  const [hoursWorked, setHoursWorked] = useState([]);

  const { companies } = useCompanies();

  console.log(companies);

  useEffect(() => {
    const unsubscribe = db.collection("workAmount").onSnapshot(snapshot => {
      const tmpData = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));

      setWorkAmount(tmpData);
    });
  }, []);

  useEffect(() => {
    console.log(workAmount);
    companies.map(val => {
      const company_name = val.name;
      const company_id = val.id;
      let dataObj = { name: company_name, hours: 0 };

      workAmount.map(val => {
        if (val.company === company_id) {
          dataObj.hours +=
            Math.abs(
              new Date(val.endTime).getTime() -
                new Date(val.startTime).getTime()
            ) / 3600000;
        }
      });

      setHoursWorked(prevState => {
        const oldArr = [...prevState];
        oldArr.push(dataObj);
        return [...oldArr];
      });
    });
  }, [workAmount]);

  useEffect(() => {
    console.log(hoursWorked);
  }, [hoursWorked]);

  return (
    <>
      <p style={{ color: "red" }}>Amount of hours worked per company</p>
      <BarChart
        width={500}
        height={300}
        data={hoursWorked}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="hours" fill="#03a9fc" />
      </BarChart>
    </>
  );
};

export default withRouter(Report);
