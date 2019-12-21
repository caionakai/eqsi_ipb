import React, { useState, useEffect } from "react";
import { Heading } from "grommet";
import swal from "sweetalert";
import CompanyForm from "../components/CompanyForm";
import { useCompanies } from "../hooks/companies";

const RegisterCompanies = () => {
  const { setCompany, submiting, submitMessage } = useCompanies();
  const [isReadyToReset, setIsReadyToReset] = useState(false);

  const onSubmit = values => {
    setCompany(values);
  };

  useEffect(() => {
    if (!submitMessage) return;
    swal(submitMessage.msg, "", submitMessage.type);
    if (submitMessage.type === "success") setIsReadyToReset(true);
  }, [submitMessage]);

  useEffect(() => {
    if (!submitMessage) return;
    swal(submitMessage.msg, "", submitMessage.type);
    if (submitMessage.type === "success") setIsReadyToReset(true);
  }, [submitMessage]);

  return (
    <>
      <Heading color="dark-2">Register Company</Heading>
      <CompanyForm
        onSubmit={onSubmit}
        isReadyToReset={isReadyToReset}
        setIsReadyToReset={setIsReadyToReset}
        submiting={submiting}
      />
    </>
  );
};

export default RegisterCompanies;
