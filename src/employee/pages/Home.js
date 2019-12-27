import React, { useEffect, useState } from "react";
import { Box, Clock, Button, Text, Layer, Heading, Select } from "grommet";

import SelectCompany from "../components/SelectCompany";
import { useUser } from "../hooks/user";

function Home() {
  const [show, setShow] = useState(false);
  const { userUid } = useUser();

  const handleSubmit = values => {
    console.log(values);
  };

  return (
    <>
      <Box justify="center" align="center" pad="xlarge">
        <Clock
          type="digital"
          size="xxlarge"
          time="T00:00:00"
          alignSelf="center"
          run={false}
        />
        {/* <Text>Meu Super</Text> */}
        <Box direction="row" flex>
          <Box pad="large">
            <Button label="Start time" onClick={() => setShow(true)} />
          </Box>
          <Box pad="large">
            <Button label="Manage" primary />
          </Box>
        </Box>
      </Box>
      {show && (
        <Layer
          full
          margin={{ left: "20%", top: "10%", right: "20%", bottom: "50%" }}
          onEsc={() => setShow(false)}
          onClickOutside={() => setShow(false)}
        >
          <Box align="center" alignContent="center" pad="large">
            <Heading color="dark-2">Select company to work</Heading>
            <SelectCompany onSubmit={handleSubmit} />
          </Box>
        </Layer>
      )}
    </>
  );
}

export default Home;
