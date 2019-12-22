import React, { useEffect, useState } from "react";
import { Heading } from "grommet";
import swal from "sweetalert";

import AdminForm from "../components/AdminForm";
import { useAdmin } from "../hooks/admin";

function RegisterAdmin() {
  const { setAdmin, submiting, submitMessage } = useAdmin();
  const [isReadyToReset, setIsReadyToReset] = useState(false);

  const onSubmit = values => {
    setAdmin(values);
  };

  useEffect(() => {
    if (!submitMessage) return;
    swal(submitMessage.msg, "", submitMessage.type);
    if (submitMessage.type === "success") setIsReadyToReset(true);
  }, [submitMessage]);

  return (
    <>
      <Heading color="dark-2">Register Admin</Heading>
      <AdminForm
        onSubmit={onSubmit}
        isReadyToReset={isReadyToReset}
        setIsReadyToReset={setIsReadyToReset}
        submiting={submiting}
      />
    </>
  );
}

export default RegisterAdmin;
