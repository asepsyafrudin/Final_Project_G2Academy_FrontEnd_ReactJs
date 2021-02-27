import React, { useState } from "react";
import Header from "components/Header/Header.js";
import ListMenu from "views/Design/ListMenu";
import Footer from "views/Design/Footer";
import { Paper, Divider } from "@material-ui/core";
import { GlobalConsumer } from "context/store/store";

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

function ProductionReport(props) {
  const { stateData, dispatch, ...rest } = props;
  const [totalProduction] = useState(0);
  const [totalNoGood] = useState(0);

  let dataEntry = stateData;
  let data = dataEntry.quantity;
  let totalProductionData = totalProduction;
  let totalNoGoodData = totalNoGood;
  for (let i = 0; i < data.length; i++) {
    totalProductionData = parseInt(totalProductionData) + data[i].OK_PARTS;
    totalNoGoodData = parseInt(totalNoGoodData) + data[i].NG_PARTS;
  }

  let averageOperationRatio = Math.ceil(
    (totalProductionData * 100) / (2500 * data.length)
  );

  let averageNGRatio = Math.ceil((totalNoGoodData * 100) / totalProductionData);
  return (
    <div>
      <Header
        relative
        color="primary"
        brand="Production Monitoring System"
        rightLinks={<ListMenu />}
        {...rest}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <Paper elevation={3}>
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              margin: "10px 10px",
              fontSize: 20,
              color: "#413ea0",
            }}
          >
            Today Production Progress
          </div>
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
        </Paper>
        <Paper elevation={3}>
          <div
            style={{
              width: 400,
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
              }}
            >
              Line Information
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ padding: 5, width: "50%", fontWeight: "bold" }}>
                Production Line Name
              </div>
              <div style={{ padding: 5, width: "40%" }}>Center Electrode</div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ padding: 5, width: "50%", fontWeight: "bold" }}>
                Person In Charge
              </div>
              <div style={{ padding: 5, width: "40%" }}>Asep Syafrudin</div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ padding: 5, width: "50%", fontWeight: "bold" }}>
                Date
              </div>
              <div style={{ padding: 5, width: "40%" }}>{dataEntry.date}</div>
            </div>
            <Divider />
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ padding: 5, width: "50%", fontWeight: "bold" }}>
                Operation Ratio
              </div>
              <div style={{ padding: 5, width: "40%" }}>
                {averageOperationRatio}%
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ padding: 5, width: "50%", fontWeight: "bold" }}>
                No Good Ratio
              </div>
              <div style={{ padding: 5, width: "40%" }}>{averageNGRatio}%</div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ padding: 5, width: "50%", fontWeight: "bold" }}>
                Dandory
              </div>
              <div style={{ padding: 5, width: "40%" }}>2%</div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ padding: 5, width: "50%", fontWeight: "bold" }}>
                Setting Quality
              </div>
              <div style={{ padding: 5, width: "40%" }}>3%</div>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div style={{ padding: 5, width: "50%", fontWeight: "bold" }}>
                Breakdown
              </div>
              <div style={{ padding: 5, width: "40%" }}>
                {Math.ceil(100 - averageNGRatio - averageOperationRatio - 5)}%
              </div>
            </div>
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
      <Footer />
    </div>
  );
}

export default GlobalConsumer(ProductionReport);
