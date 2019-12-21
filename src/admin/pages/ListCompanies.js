import React, { useEffect, useState } from "react";
import {
  Heading,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Layer,
  Box
} from "grommet";
import swal from "sweetalert";
import * as Icons from "grommet-icons";

import CompanyForm from "../components/CompanyForm";
import { useCompanies } from "../hooks/companies";

const CompaniesList = () => {
  const [company, setCompany] = useState({});
  const [show, setShow] = useState(false);
  const {
    companies,
    deleteCompany,
    submitMessage,
    submiting,
    updateCompany
  } = useCompanies();

  const handleDelete = id => () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this employee?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Delete"]
    }).then(willDelete => {
      if (willDelete) {
        deleteCompany(id);
      }
    });
  };

  const handleUpdate = employee => {
    updateCompany(employee.id, employee);
  };

  useEffect(() => {
    if (!submitMessage) return;
    swal(submitMessage.msg, "", submitMessage.type).then(() => {
      if (submitMessage.type === "success") setShow(false);
    });
  }, [submitMessage]);

  const renderRows = () =>
    companies &&
    companies.map(company => (
      <TableRow key={company.id}>
        <TableCell scope="row">{company.name}</TableCell>
        <TableCell>{company.identification}</TableCell>
        <TableCell>
          <Button
            icon={<Icons.Edit color="neutral-3" />}
            onClick={() => {
              setCompany(company);
              setShow(true);
            }}
          />
          <Button
            icon={<Icons.Trash color="status-critical" />}
            onClick={handleDelete(company.id)}
          />
        </TableCell>
      </TableRow>
    ));

  return (
    <>
      <Heading color="dark-2">List of companies</Heading>
      <Table alignSelf="stretch">
        <TableHeader>
          <TableRow>
            <TableCell scope="col" border="bottom">
              Name
            </TableCell>
            <TableCell scope="col" border="bottom">
              Identification
            </TableCell>
            <TableCell scope="col" border="bottom">
              Actions
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>{renderRows()}</TableBody>
      </Table>
      {show && (
        <Layer
          full
          margin={{ left: "20%", top: "10%", right: "20%", bottom: "50%" }}
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >
          <Box align="center" alignContent="center" pad="large">
            <CompanyForm
              onSubmit={handleUpdate}
              initialValues={company}
              cancel={() => setShow(false)}
              submiting={submiting}
            />
          </Box>
        </Layer>
      )}
    </>
  );
};

export default CompaniesList;
