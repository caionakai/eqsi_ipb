import React, { useEffect, useState } from "react";
import { useEmployees } from "../hooks/employees";
import Spinner from "../../common/components/Spinner";
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
import { useHistory } from "react-router-dom";
import * as Icons from "grommet-icons";
import swal from "sweetalert";
import EmployeeForm from "../components/EmployeeForm";

function ListEmployees() {
  const [show, setShow] = useState(false);
  const [employee, setEmployee] = useState({});
  const {
    fetching,
    employees,
    deleteEmployee,
    submitMessage,
    submiting,
    updateEmployee
  } = useEmployees();
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

  const handleUpdate = employee => {
    updateEmployee(employee.id, employee);
  };

  useEffect(() => {
    if (!submitMessage) return;
    swal(submitMessage.msg, "", submitMessage.type).then(() => {
      if (submitMessage.type === "success") setShow(false);
    });
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
          <Button
            icon={<Icons.Edit color="neutral-3" />}
            onClick={() => {
              setEmployee(employee);
              setShow(true);
            }}
          />
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
      {show && (
        <Layer
          full
          margin={{ left: "20%", top: "10%", right: "20%", bottom: "30%" }}
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >
          <Box align="center" alignContent="center" pad="large">
            <EmployeeForm
              onSubmit={handleUpdate}
              initialValues={employee}
              cancel={() => setShow(false)}
              submiting={submiting}
            />
          </Box>
        </Layer>
      )}
    </>
  );
}

export default ListEmployees;
