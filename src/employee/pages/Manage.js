import React, { useState, useEffect } from "react";
import { Box, Layer } from "grommet";
import swal from "sweetalert";
import { ReactAgenda } from "react-agenda";
import { useUser } from "../hooks/user";
import { useWork } from "../hooks/work";
import moment from "moment";
import CalendarForm from "../components/CalendarForm";

var colors = {
  "color-1": "rgba(102, 195, 131 , 1)"
};

var now = new Date();

const Agenda = () => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState([]);
  const [initialValues, setInitialValues] = useState(null);
  const [items, setItems] = useState([]);
  const [itemId, setItemId] = useState(null);
  const { userUid } = useUser();
  const {
    workAmounts,
    setWorkAmount,
    submitMessage,
    updateWorkAmount,
    deleteWork
  } = useWork(userUid);

  useEffect(() => {
    setItems(
      workAmounts.map(amount => ({
        _id: amount.id,
        name: amount.name,
        startDateTime: moment(amount.startTime).toDate(),
        endDateTime: amount.endTime
          ? moment(amount.endTime).toDate()
          : moment().toDate(),
        classes: "color-1",
        company: amount.company
      }))
    );
  }, [workAmounts]);

  const handleCellSelection = item => {
    if (selected && selected[0] === item) {
      setInitialValues({
        startTime: moment(item).format("DD/MM/YYYY hh:mm A")
      });
      return setShow(true);
    }
    setSelected([item]);
  };

  const handleItemEdit = (item, openModal) => {
    if (item && openModal === true) {
      setSelected([item]);
      setItemId(item._id);
      setInitialValues({
        company: { id: item.company, name: item.name },
        startTime: moment(item.startDateTime).format("DD/MM/YYYY hh:mm A"),
        endTime: moment(item.endDateTime).format("DD/MM/YYYY hh:mm A")
      });
      return setShow(true);
    }
  };

  const handleWork = ({ company: { id, name }, startTime, endTime }) => {
    const workAmount = {
      user: userUid,
      company: id,
      name: name,
      startTime: moment(startTime, "DD/MM/YYYY hh:mm A").format(),
      endTime: moment(endTime, "DD/MM/YYYY hh:mm A").format()
    };
    if (itemId) return updateWorkAmount(itemId, workAmount);
    setWorkAmount(workAmount);
  };

  const handleWorkDelete = (_items, item) => {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this work amount?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Delete"]
    }).then(willDelete => {
      if (willDelete) {
        deleteWork(item._id);
      }
    });
  };

  useEffect(() => {
    if (!submitMessage) return;
    swal(submitMessage.msg, "", submitMessage.type).then(() => {
      if (submitMessage.type === "success") {
        setItemId(null);
        setShow(false);
      }
    });
  }, [submitMessage]);

  return (
    <>
      <ReactAgenda
        disablePrevButton={false}
        items={items}
        numberOfDays={7}
        rowsPerHour={2}
        itemColors={colors}
        autoScale={false}
        fixedHeader={true}
        onItemEdit={handleItemEdit}
        startDate={moment()
          .startOf("week")
          .toDate()}
        onCellSelect={handleCellSelection}
        minDate={new Date(now.getFullYear(), now.getMonth() - 3)}
        onItemRemove={handleWorkDelete}
      />
      {show && (
        <Layer
          full
          margin={{ left: "20%", top: "10%", right: "20%", bottom: "50%" }}
          onEsc={() => {
            setItemId(null);
            setShow(false);
          }}
          onClickOutside={() => {
            setItemId(null);
            setShow(false);
          }}
        >
          <Box align="center" alignContent="center" pad="large">
            {/* <Heading color="dark-2">Select company to work</Heading> */}
            <CalendarForm onSubmit={handleWork} initialValues={initialValues} />
          </Box>
        </Layer>
      )}
    </>
  );
};

export default Agenda;
