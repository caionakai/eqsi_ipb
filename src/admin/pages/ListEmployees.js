import React, { useEffect } from "react";
import { useEmployees } from "../hooks/employees";
import Spinner from "../../common/components/Spinner";
import {
  Heading,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Button
} from "grommet";
import { useHistory } from "react-router-dom";
import * as Icons from "grommet-icons";
import swal from "sweetalert";

function ListEmployees() {
  const { fetching, employees, deleteEmployee, submitMessage } = useEmployees();
  const history = useHistory();

  const handleDelete = id => () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this employee?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Delete"]
    }).then(willDelete => {
      if (willDelete) {
        deleteEmployee(id);
      }
    });
  };

  useEffect(() => {
    if (!submitMessage) return;
    swal(submitMessage.msg, "", submitMessage.type);
    if (submitMessage.type === "success") history.push("/admin/employees/list");
  }, [history, submitMessage]);

  if (fetching) {
    return <Spinner />;
  }

  const renderRows = () =>
    employees &&
    employees.map(employee => (
      <TableRow key={employee.id}>
        <TableCell scope="row">{employee.name}</TableCell>
        <TableCell>{employee.identification}</TableCell>
        <TableCell>{employee.gender}</TableCell>
        <TableCell>{employee.birthday}</TableCell>
        <TableCell>
          <Button icon={<Icons.Edit color="neutral-3" />} />
          <Button
            icon={<Icons.Trash color="status-critical" />}
            onClick={handleDelete(employee.id)}
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
              Gender
            </TableCell>
            <TableCell scope="col" border="bottom">
              Birthday
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
}

export default ListEmployees;
