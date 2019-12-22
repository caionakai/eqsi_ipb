import React, { useEffect } from "react";
import { useAdmin } from "../hooks/admin";
import {
  Heading,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "grommet";
import * as Icons from "grommet-icons";
import swal from "sweetalert";

function ListAdmins() {
  const {
    admins,
    submitMessage,
    deleteAdmin
  } = useAdmin();

  const handleDelete = id => () => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this employee?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Delete"]
    }).then(willDelete => {
      if (willDelete) {
        deleteAdmin(id);
      }
    });
  };

  useEffect(() => {
    if (!submitMessage) return;
    swal(submitMessage.msg, "", submitMessage.type);
  }, [submitMessage]);

  const renderRows = () =>
    admins &&
    admins.map(admin => (
      <TableRow key={admin.id}>
        <TableCell scope="row">{admin.name}</TableCell>
        <TableCell>{admin.email}</TableCell>
        <TableCell>
          <Button
            icon={<Icons.Trash color="status-critical" />}
            onClick={handleDelete(admin.id)}
          />
        </TableCell>
      </TableRow>
    ));

  return (
    <>
      <Heading color="dark-2">List of admins</Heading>
      <Table alignSelf="stretch">
        <TableHeader>
          <TableRow>
            <TableCell scope="col" border="bottom">
              Name
            </TableCell>
            <TableCell scope="col" border="bottom">
              email
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

export default ListAdmins;
