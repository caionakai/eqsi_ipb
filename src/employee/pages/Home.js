import React, { useEffect, useState } from "react";
import { Box, Clock, Button, Layer, Heading, Text } from "grommet";
import moment from "moment";
import swal from "sweetalert";

import SelectCompany from "../components/SelectCompany";
import { useUser } from "../hooks/user";
import { useWork } from "../hooks/work";

function Home() {
  const [show, setShow] = useState(false);
  const { userUid } = useUser();
  const {
    setWorkAmount,
    submitMessage,
    currentWork,
    updateWorkAmount
  } = useWork(userUid);
  const [isClockRunning, setIsClockRunning] = useState(false);
  const [companySelected, setCompanySelected] = useState(null);
  const [time, setTime] = useState("T00:00:00");
  const [isFirstTimeUpdate, setIsFirstTimeUpdate] = useState(true);

  const handleStartWork = ({ company: { id, name } }) => {
    const workAmount = {
      user: userUid,
      company: id,
      name: name,
      startTime: moment().toISOString(),
      endTime: null
    };
    setCompanySelected(name);
    setWorkAmount(workAmount);
  };

  const handleStopWork = () => {
    updateWorkAmount(currentWork.id, { endTime: moment().toISOString() });
  };

  useEffect(() => {
    if (currentWork) {
      setCompanySelected(currentWork.name);
      const now = moment();
      const start = moment(currentWork.startTime);
      const timeFromStart = moment(now.diff(start));
      setTime(timeFromStart.toISOString());
      setIsClockRunning(true);
    } else {
      setIsClockRunning(false);
      setTime("T00:00:00");
      setIsFirstTimeUpdate(true);
    }
  }, [currentWork]);

  useEffect(() => {
    if (!submitMessage) return;
    swal(submitMessage.msg, "", submitMessage.type).then(() => {
      if (submitMessage.type === "success") {
        setShow(false);
      }
    });
  }, [submitMessage]);

  return (
    <>
      <Box justify="center" align="center" pad="xlarge">
        <Clock
          type="digital"
          size="xxlarge"
          time={isFirstTimeUpdate ? time : undefined}
          alignSelf="center"
          onChange={time => {
            if (isFirstTimeUpdate) setIsFirstTimeUpdate(false);
            setTime(time);
          }}
          run={isClockRunning}
        />
        {isClockRunning && <Text>{companySelected}</Text>}
        <Box direction="row" flex>
          <Box pad="large">
            {!isClockRunning ? (
              <Button label="Start time" onClick={() => setShow(true)} />
            ) : (
              <Button label="Stop time" onClick={handleStopWork} />
            )}
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
            <SelectCompany onSubmit={handleStartWork} />
          </Box>
        </Layer>
      )}
    </>
  );
}

export default Home;
