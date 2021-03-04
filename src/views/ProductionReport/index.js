import React, { useState } from "react";
import Header from "components/Header/Header.js";
import ListMenu from "views/Design/ListMenu";
import Footer from "views/Design/Footer";
import { makeStyles, Paper, Typography } from "@material-ui/core";
import style from "./style.module.css";
import { Pie } from "react-chartjs-2";
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

import {
  ComposedChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
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
  const [date, setDate] = useState();
  const [line, setLine] = useState();

  const handleDateChange = (date) => {
    setDate(date);
  };

  const filterFunction = () => {};

  let currentDate = new Date().toLocaleDateString();

  let dataEntry = stateData;
  let isDataUptodate = currentDate === dataEntry.date ? true : false;

  let data = isDataUptodate ? dataEntry.quantity : null;
  let totalProd = 0;
  let totalNG = 0;
  let averageNoGoodRatio = 0;
  let averageOperationRatioData = 0;
  let content;

  if (data) {
    for (let i = 0; i < data.length; i++) {
      totalProd = parseInt(totalProd) + data[i].OK_PARTS;
      totalNG = parseInt(totalNG) + data[i].NG_PARTS;
    }
    averageOperationRatioData = Math.ceil(
      (totalProd * 100) / (2500 * data.length)
    );
    averageNoGoodRatio = Math.ceil((totalNG * 100) / totalProd);
    const dataPieChart = {
      labels: ["OR", "NG Ratio", "Dandory", "Setting", "BM"],
      datasets: [
        {
          label: "# of Votes",
          data: [
            averageOperationRatioData,
            averageNoGoodRatio,
            2,
            3,
            Math.ceil(100 - averageNoGoodRatio - averageOperationRatioData - 5),
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    content = (
      <>
        <div className={style.content}>
          <div className={style.margin}>
            <Paper elevation={3}>
              <div className={style.graph}>
                <div className={style.title}>Today Production Progress</div>
                <ComposedChart width={800} height={250} data={data}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <CartesianGrid stroke="#f5f5f5" />
                  <Bar dataKey="OK_PARTS" barSize={50} fill="#413ea0" />
                  <Line type="monotone" dataKey="target" stroke="#9c27b0" />
                  <Line type="monotone" dataKey="NG_PARTS" stroke="#e73e3a" />
                </ComposedChart>
              </div>
            </Paper>
          </div>
          <Paper elevation={3}>
            <div
              style={{
                width: 350,
                height: 280,
                lineHeight: 1,
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  margin: "10px 10px",
                  fontSize: 20,
                  color: "#413ea0",
                  padding: 5,
                }}
              >
                Line Information
              </div>
              <div className={style.containerData}>
                <div className={style.contentItems}>
                  <div>Production Line</div>
                  <div>Center Electrode</div>
                </div>
                <div className={style.contentItems}>
                  <div>Person In Charge</div>
                  <div>Asep Syafrudin</div>
                </div>
                <div className={style.contentItems}>
                  <div>Date</div>
                  <div>{dataEntry.date}</div>
                </div>
              </div>

              <div className={style.pieChart}></div>
              <Pie data={dataPieChart} width={50} height={20} />
            </div>
          </Paper>
        </div>
        <div
          style={{
            width: "95%",
            margin: "20px auto",
          }}
        >
          <TableProductionReport />
        </div>
      </>
    );
  } else {
    content = (
      <div style={{ textAlign: "center" }}>
        <Typography variant="h4">No Data Available</Typography>
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
                        onChange={handleDateChange}
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
                      <option value="Center_Electrode">Center Electrode</option>
                      <option value="Housing">Housing</option>
                      <option value="Insulator">Insulator</option>
                      <option value="Final_Assy">Final Assy</option>
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
      {content}
      <Footer />
    </div>
  );
}

export default GlobalConsumer(ProductionReport);
