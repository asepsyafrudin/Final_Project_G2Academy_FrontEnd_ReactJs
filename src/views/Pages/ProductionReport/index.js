import React, { useState } from "react";
import Header from "components/Header/Header.js";
import ListMenu from "views/Design/ListMenu";
import Footer from "views/Design/Footer";
import { makeStyles, Paper, Typography } from "@material-ui/core";
import style from "./style.module.css";
import { Pie, Bar } from "react-chartjs-2";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";

import Datetime from "react-datetime";

import { SearchOutlined } from "@material-ui/icons";

import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

// @material-ui/icons
import { GlobalConsumer } from "context/store/store";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

import { cardTitle } from "assets/jss/material-kit-react.js";

import Select from "@material-ui/core/Select";

import TableProductionReport from "views/Design/TableProductionReport";

const styles = {
  label: {
    cursor: "pointer",
    paddingLeft: "0",
    color: "rgba(0, 0, 0, 0.26)",
    fontSize: "14px",
    lineHeight: "1.428571429",
    fontWeight: "400",
    display: "inline-flex",
  },
  cardTitle,
  textCenter: {
    textAlign: "center",
  },
  textMuted: {
    color: "#6c757d",
  },
  icons: {
    width: "17px",
    height: "17px",
    color: "#FFFFFF",
  },
};

const useStyles = makeStyles(styles);

function ProductionReport(props) {
  const classes = useStyles();
  const { stateData, dispatch, ...rest } = props;
  const [line, setLine] = useState("");
  const [date, setDate] = useState("");

  let currentData = stateData.filter(
    (value) =>
      value.date === new Date().toLocaleDateString() &&
      value.line === "station_1"
  );

  const [dataSearch, setDataSearch] = useState(currentData);

  const filterFunction = async () => {
    if (date !== "" && line !== "") {
      let newData = stateData.filter(
        (value) =>
          value.date === date._d.toLocaleDateString() && value.line === line
      );
      setDataSearch(await newData);
    } else {
      alert("Please Fill Production Date & Station ");
    }
  };

  let labelData = [];
  let dataBar = [];
  let targetBar = [];

  if (dataSearch.length !== 0) {
    for (let i = 0; i < dataSearch.length; i++) {
      labelData.push(dataSearch[i].productionTime);
      dataBar.push(dataSearch[i].quantity_OK);
      targetBar.push(dataSearch[i].target);
    }
  }

  const data = {
    labels: labelData,
    datasets: [
      {
        type: "line",
        label: "Target",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 2,
        fill: false,
        data: targetBar,
      },
      {
        type: "bar",
        label: "Production Quantity",
        backgroundColor: "rgb(255, 99, 132)",
        data: dataBar,
        borderColor: "white",
        borderWidth: 2,
      },
    ],
  };

  let content;
  if (dataSearch.length === 0) {
    content = (
      <div>
        <p>Data is not avalaible</p>
      </div>
    );
  } else {
    content = (
      <div>
        <Bar data={data} />
      </div>
    );
  }

  return (
    <div>
      <Header
        relative
        color="primary"
        brand="Production Monitoring System"
        rightLinks={<ListMenu />}
        {...rest}
      />
      <div style={{ margin: "50px 20px" }}>
        <Card className={classes.textCenter}>
          <CardHeader color="danger">Filter</CardHeader>
          <form>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  <div>
                    <FormControl fullWidth>
                      <Datetime
                        inputProps={{
                          placeholder: "Select Production Date",
                        }}
                        onChange={(time) => setDate(time)}
                        value={date}
                        timeFormat={false}
                      />
                    </FormControl>
                  </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="age-native-simple">
                      Select Line
                    </InputLabel>
                    <Select
                      native
                      value={line}
                      onChange={(event) => setLine(event.target.value)}
                      inputProps={{
                        name: "line",
                      }}
                    >
                      <option aria-label="None" value="" />
                      <option value="station_1">Station 1</option>
                      <option value="station_2">Station 2</option>
                      <option value="station_3">Station 3</option>
                      <option value="station_4">Station 4</option>
                    </Select>
                  </FormControl>
                </GridItem>
              </GridContainer>
              <div style={{ textAlign: "right" }}>
                <Button color="primary" onClick={filterFunction}>
                  <SearchOutlined className={classes.icons} />
                  Search
                </Button>
              </div>
            </CardBody>
          </form>
        </Card>
      </div>
      <div style={{ margin: "50px 20px" }}>
        <Card className={classes.textCenter}>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                {content}
              </GridItem>
            </GridContainer>
          </CardBody>
        </Card>
      </div>
      <Footer />
    </div>
  );
}

export default GlobalConsumer(ProductionReport);
