import React, { useEffect, useState } from "react";
import { Box, Button } from "grommet";
import { Close } from "grommet-icons";
import { useEmployees } from "../hooks/employees";
import Spinner from "../../common/components/Spinner";
import swal from "sweetalert";
import { useHistory, useRouteMatch } from "react-router-dom";

const CompanyDetails = () => {
  const [employee, setEmployee] = useState(null);
  const {
    fetching,
    employees,
    deleteEmployee,
    submiting,
    submitMessage
  } = useEmployees();
  const history = useHistory();
  const match = useRouteMatch("/admin/employee/:employeeId");

  useEffect(() => {
    employees.forEach(employee => {
      if (employee.id === match.params.employeeId) setEmployee(employee);
    });
  }, [employee, employees, match.params.employeeId]);

  useEffect(() => {
    if (!submitMessage) return;
    swal(submitMessage.msg, "", submitMessage.type);
    if (submitMessage.type === "success") history.push("/admin/employees/list");
  }, [history, submitMessage]);

  if (fetching) return <Spinner />;

  return (
    employee && (
      <div className="geral">
        <div className="botao">
          <Box align="center" pad="small">
            <Button
              plain={false}
              icon={<Close />}
              onClick={() => deleteEmployee(employee.id)}
              disabled={submiting}
              primary
            />
          </Box>
        </div>
        <div className="dados">
          <h2>Employees's Name</h2>
          <div className="">{employee.name}</div>

          <h2>Employees's Identification</h2>
          <div className="">{employee.identification}</div>
        </div>
      </div>
    )
  );
};

export default CompanyDetails;
