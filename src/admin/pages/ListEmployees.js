import React from "react";
import { useEmployees } from "../hooks/employees";
import Spinner from "../../common/components/Spinner";
import { List, Heading } from "grommet";
import { useHistory } from "react-router-dom";

function ListEmployees() {
  const { fetching, emploees } = useEmployees();
  const history = useHistory();

  const handleClick = val => {
    history.push(`/admin/employees/${val.item.id}`);
  };

  if (fetching) {
    return <Spinner />;
  }

  return (
    <>
      <Heading color="dark-2">List of emploees</Heading>
      <List
        primaryKey="name"
        secondaryKey="identification"
        data={emploees}
        onClickItem={handleClick}
      />
    </>
  );
}

export default ListEmployees;
