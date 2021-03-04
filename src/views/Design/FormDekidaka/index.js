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
import DialpadIcon from "@material-ui/icons/Dialpad";
import ReportProblemIcon from "@material-ui/icons/ReportProblem";
import { GlobalConsumer } from "context/store/store";

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
};

const useStyles = makeStyles(styles);

function Dekidaka({ stateData, dispatch }) {
  const classes = useStyles();
  const [date, setDate] = useState();

  const saveInitialFunction = () => {
    let quantityOK = document.getElementById("quantityOK");
    let quantityNG = document.getElementById("quantityNG");
    let problem = document.getElementById("problem");
    if (date) {
      if (quantityOK.value !== null && quantityNG.value !== null) {
        if (stateData.date === date._d.toLocaleDateString()) {
          let newData = {
            name: date._d.toLocaleTimeString(),
            target: 2000,
            OK_PARTS: parseInt(quantityOK.value),
            NG_PARTS: parseInt(quantityNG.value),
            problem: problem.value,
          };
          dispatch({ type: SAVE, payload: newData });
        } else {
          let newData = {
            date: date._d.toLocaleDateString(),
            quantity: [
              {
                name: date._d.toLocaleTimeString(),
                target: 2000,
                OK_PARTS: parseInt(quantityOK.value),
                NG_PARTS: parseInt(quantityNG.value),
                problem: problem.value,
              },
            ],
          };
          dispatch({ type: CREATENEW, payload: newData });
        }
      } else {
        alert("Please Fill Quantity");
      }
    } else {
      alert("Please Fill The Production Date");
    }
  };

  const handleDateChange = (date) => {
    setDate(date);
  };

  let currentDate = new Date().toLocaleDateString();
  let booleanDataisCurrentData = stateData.date === currentDate ? true : false;

  return (
    <div style={{ margin: "50px 20px" }}>
      <Card className={classes.textCenter}>
        <CardHeader color="danger">Dekidaka Form</CardHeader>
        <form>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={3}>
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
                      onChange={handleDateChange}
                      value={date}
                    />
                  </FormControl>
                </div>
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                  labelText="Input Quantity OK Parts"
                  id="quantityOK"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <DialpadIcon />
                      </InputAdornment>
                    ),
                    type: "number",
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                  labelText="Input Quantity NG Parts"
                  id="quantityNG"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <DialpadIcon />
                      </InputAdornment>
                    ),
                    type: "number",
                  }}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={3}>
                <CustomInput
                  labelText="Problem"
                  id="problem"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <ReportProblemIcon />
                      </InputAdornment>
                    ),
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
