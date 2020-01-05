import React, { useState, useEffect } from "react";
import { firebase } from "../../common/utils/firebase";
import { withRouter } from "react-router-dom";
import { useCompanies } from "../hooks/companies";

import { useEmployees } from "../hooks/employees";
import { PieChart, Pie, Tooltip } from "recharts";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "grommet";

const db = firebase.firestore();

const Report = () => {
  const [workAmount, setWorkAmount] = useState([]);
  const [hoursWorked, setHoursWorked] = useState([]);

  const [employeesWorking, setemployeesWorking] = useState(0);

  const { companies } = useCompanies();
  const { employees } = useEmployees();

  useEffect(() => {
    db.collection("workAmount").onSnapshot(snapshot => {
      const tmpData = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      console.log(tmpData);

      setWorkAmount(tmpData);
    });
  }, []);

  const renderRows = () =>
    employees &&
    employees.map(employee => (
      <TableRow key={employee.id}>
        <TableCell scope="row">{employee.name}</TableCell>
        <TableCell>
          {workAmount.map(val => {
            return val.user === employee.id && val.endTime === null
              ? val.name
              : "";
          })}
        </TableCell>
      </TableRow>
    ));

  useEffect(() => {
    console.log(workAmount);
    companies.map(val => {
      const company_name = val.name;
      const company_id = val.id;
      let dataObj = { name: company_name, hours: 0 };

      workAmount.map(val => {
        if (val.company === company_id && val.endTime) {
          dataObj.hours += parseFloat(
            (
              Math.abs(
                new Date(val.endTime).getTime() -
                  new Date(val.startTime).getTime()
              ) / 3600000
            ).toFixed(2)
          );
        }
        if (!val.endTime) {
          setemployeesWorking(employeesWorking + 1);
        }
      });

      setHoursWorked(prevState => {
        const oldArr = [...prevState];
        dataObj.hours = parseFloat(dataObj.hours.toFixed(2));
        oldArr.push(dataObj);
        return [...oldArr];
      });
    });
  }, [workAmount]);

  useEffect(() => {
    console.log(hoursWorked);
  }, [hoursWorked]);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(20, 1fr)",
        gridTemplateRows: "repeat(20, 5%)"
      }}
    >
      <div
        style={{
          border: "0.01px solid grey",
          padding: "20px",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          gridColumn: "2 / 10",
          gridRow: "1 / 7"
        }}
      >
        <Table alignSelf="stretch">
          <TableHeader>
            <TableRow>
              <TableCell scope="col" border="bottom">
                Name
              </TableCell>
              <TableCell scope="col" border="bottom">
                Working At
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>{renderRows()}</TableBody>
        </Table>
      </div>

      <div
        style={{
          border: "0.01px solid grey",
          padding: "20px",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          gridColumn: "2 / 10",
          gridRow: "8 / 20"
        }}
      >
        <p
          style={{
            fontSize: "20px",
            textAlign: "center"
          }}
        >
          Amount of hours worked per company
        </p>
        <PieChart width={400} height={400}>
          <Pie
            dataKey="hours"
            isAnimationActive={false}
            data={hoursWorked}
            cx={200}
            cy={200}
            outerRadius={80}
            fill="#34a4eb"
            label
          />

          <Tooltip />
        </PieChart>
      </div>

      <div
        style={{
          border: "0.01px solid grey",
          padding: "20px",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          gridColumn: "11 / 14",
          gridRow: "1 / 7"
        }}
      >
        <p>Employees current working</p>
        <p
          style={{
            fontSize: "35px",
            fontWeight: "bold",
            textAlign: "center"
          }}
        >
          {employeesWorking}
        </p>
      </div>

      <div
        style={{
          border: "0.01px solid grey",
          padding: "20px",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          gridColumn: "15 / 18",
          gridRow: "1 / 7"
        }}
      >
        <p>Number of employees</p>
        <p
          style={{
            fontSize: "35px",
            fontWeight: "bold",
            textAlign: "center"
          }}
        >
          {employees.length}
        </p>
      </div>
    </div>
  );
};

export default withRouter(Report);
