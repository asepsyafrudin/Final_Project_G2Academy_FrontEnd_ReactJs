import React, { useState } from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import { cardTitle } from "assets/jss/material-kit-react.js";

import InputAdornment from "@material-ui/core/InputAdornment";

import Datetime from "react-datetime";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

// @material-ui/icons
import TableProductionProgress from "../TableProductionProgress";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import { GlobalConsumer } from "context/store/store";

import Select from "@material-ui/core/Select";

import { SAVE, CREATENEW } from "context/const";

const styles = {
  cardTitle,
  textCenter: {
    textAlign: "center",
  },
  textMuted: {
    color: "#6c757d",
  },
  label: {
    cursor: "pointer",
    paddingLeft: "0",
    color: "rgba(0, 0, 0, 0.26)",
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    display: "inline-flex",
  },
  icons: {
    width: "17px",
    height: "17px",
    color: "#FFFFFF",
  },
};

const useStyles = makeStyles(styles);

function Dekidaka({ stateData, dispatch, currentUser }) {
  const classes = useStyles();
  const [date, setProductionDate] = useState("");
  const [line, setLine] = useState("");
  const [OKParts, setOKParts] = useState("");
  const [NGParts, setNGParts] = useState("");
  const [productionTime, setProductionTime] = useState("");
  const [problem, setProblem] = useState("");
  const [stopTime, setStopTime] = useState("");

  const saveInitialFunction = async () => {
    let currentDate = new Date().toLocaleDateString();
    if (date) {
      if (date === currentDate) {
        if (line !== "") {
          let lineTarget = 0;
          if (line === "station_1") {
            lineTarget = 2000;
          } else if (line === "station_2") {
            lineTarget = 3000;
          } else if (line === "station_3") {
            lineTarget = 4000;
          } else {
            lineTarget = 5000;
          }

          let newData = {
            id: new Date(),
            date: date,
            line: line,
            operatorName: currentUser,
            target: lineTarget,
            quantity_OK: OKParts,
            quantity_NG: NGParts,
            productionTime: productionTime._d.toLocaleTimeString(),
            problem: problem,
            stopTime: stopTime,
          };

          await dispatch({ type: SAVE, payload: newData });
          setNGParts("");
          setOKParts("");
          setProblem("");
          setStopTime("");
        } else {
          alert("Set Line");
        }
      } else {
        alert("Production Date Different with Current Date");
      }
    } else {
      alert("Please Select Date");
    }
  };

  let currentDate = new Date().toLocaleDateString();
  let todayData = stateData.find((value) => value.date === currentDate);
  let booleanDataisCurrentData = todayData ? true : false;

  return (
    <div style={{ margin: "50px 20px" }}>
      <Card className={classes.textCenter}>
        <CardHeader color="danger">Dekidaka Form</CardHeader>
        <form>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <div>
                  <InputLabel className={classes.label}>
                    Production Date
                  </InputLabel>
                  <br />
                  <FormControl fullWidth>
                    <Datetime
                      inputProps={{
                        placeholder: "Select Production Date",
                      }}
                      onChange={(date) =>
                        setProductionDate(date._d.toLocaleDateString())
                      }
                      value={date}
                      timeFormat={false}
                    />
                  </FormControl>
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <div style={{ paddingTop: "11px" }}>
                  <FormControl fullWidth>
                    <InputLabel
                      htmlFor="age-native-simple"
                      style={{ fontSize: "14px" }}
                    >
                      Select Line
                    </InputLabel>
                    <Select
                      native
                      value={line}
                      onChange={(event) => setLine(event.target.value)}
                      inputProps={{
                        name: "line",
                      }}
                      style={{ fontSize: "14px" }}
                    >
                      <option aria-label="None" value="" />
                      <option value="station_1">Station 1</option>
                      <option value="station_2">Station 2</option>
                      <option value="station_3">Station 3</option>
                      <option value="station_4">Station 4</option>
                    </Select>
                  </FormControl>
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <CustomInput
                  labelText="Input Quantity OK Parts"
                  id="quantityOK"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  onChange={(event) => setOKParts(event.target.value)}
                  value={OKParts}
                  inputProps={{
                    type: "number",
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={5}>
                <CustomInput
                  labelText="Input Quantity NG Parts"
                  id="quantityNG"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  onChange={(event) => setNGParts(event.target.value)}
                  value={NGParts}
                  inputProps={{
                    type: "number",
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={2}>
                <br></br>
                <FormControl fullWidth>
                  <Datetime
                    inputProps={{
                      placeholder: "Select Production Time",
                    }}
                    onChange={(time) => setProductionTime(time)}
                    value={productionTime}
                    dateFormat={false}
                  />
                </FormControl>
              </GridItem>
              <br />
              <br />
              <GridItem xs={12} sm={12} md={8}>
                <CustomInput
                  labelText="Problem"
                  id="problem"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  onChange={(event) => setProblem(event.target.value)}
                  value={problem}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <ReportProblemIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <CustomInput
                  labelText="Input Stop Time (minutes)"
                  id="Stop Time"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  onChange={(event) => setStopTime(event.target.value)}
                  value={stopTime}
                  inputProps={{
                    type: "number",
                  }}
                />
              </GridItem>
            </GridContainer>
            <div style={{ textAlign: "right" }}>
              <Button color="primary" onClick={saveInitialFunction}>
                Save
              </Button>
            </div>
            {booleanDataisCurrentData && <TableProductionProgress />}
          </CardBody>
        </form>
      </Card>
    </div>
  );
}

export default GlobalConsumer(Dekidaka);
