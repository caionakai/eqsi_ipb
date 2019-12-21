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

import { useCompanies } from "../hooks/companies";

const CompaniesList = () => {
  const [company, setCompany] = useState({});
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
              // setShow(true);
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
      <Heading color="dark-2">List of employees</Heading>
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
    </>
  );
};

export default CompaniesList;
