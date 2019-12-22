import React, { useEffect, useState } from "react";
import { Heading } from "grommet";
import swal from "sweetalert";

import { useEmployees } from "../hooks/employees";
import EmployeeForm from "../components/EmployeeForm";

function RegisterEmployees() {
  const { setEmployee, submiting, submitMessage } = useEmployees();
  const [isReadyToReset, setIsReadyToReset] = useState(false);

  const onSubmit = values => {
    setEmployee(values);
  };

  useEffect(() => {
    if (!submitMessage) return;
    swal(submitMessage.msg, "", submitMessage.type);
    if (submitMessage.type === "success") setIsReadyToReset(true);
  }, [submitMessage]);

  return (
    <>
      <Heading color="dark-2">Register employees</Heading>
      <EmployeeForm
        onSubmit={onSubmit}
        isReadyToReset={isReadyToReset}
        setIsReadyToReset={setIsReadyToReset}
        submiting={submiting}
        showAccountForm
      />
    </>
  );
}

export default RegisterEmployees;
