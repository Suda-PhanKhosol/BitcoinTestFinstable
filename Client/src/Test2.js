import React, { Component } from "react";
import CanvasJSReact from "./assets/canvasjs.react";
import { Button, Grid, Typography, Paper } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";

require("dayjs/locale/th");
var utc = require("dayjs/plugin/utc");
var dayjs = require("dayjs");
dayjs.locale("th");
dayjs.extend(utc);

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Test2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPointsNew: [],
    };
  }

  componentWillMount = () => {
    // [
    //   1499040000000,      //0 Open time
    //   "0.01634790",       //1 Open
    //   "0.80000000",       //2 High
    //   "0.01575800",       //3 Low
    //   "0.01577100",       //4 Close
    //   "148976.11427815",  //5 Volume
    //   1499644799999,      //6 Close time
    //   "2434.19055334",    //7 Quote asset volume
    //   308,                //8 Number of trades
    //   "1756.87402397",    //9 Taker buy base asset volume
    //   "28.46694368",      //10 Taker buy quote asset volume
    //   "17928899.62484339" //11 Ignore.
    // ]

    var newData = [];
    var OHLCData = [];
    this.props.candleStickData.forEach((element, index, array) => {
      var date = new Date(element[0]);
      var openPrice = parseFloat(element[1]);
      var highPrice = parseFloat(element[2]);
      var lowPrice = parseFloat(element[3]);
      var closePrice = parseFloat(element[4]);

      // if (index >= 0 && index <= 3) {
      //   console.log(index);
      //   console.log(element);
      //   console.log(date);
      //   console.log(closePrice.toFixed(8));

      var dateConvertFormat = new Date(
        dayjs(date).format("YYYY/MM/DD HH:mm:ss")
      );

      OHLCData.push({
        dateConvertFormat: {
          open: openPrice,
          high: highPrice,
          low: lowPrice,
          close: closePrice,
        },
      });

      newData.push({
        x: dateConvertFormat,
        y: [openPrice, highPrice, lowPrice, closePrice], //[open,high,low,close]
      });

      // }
    });

    console.log("newData");
    console.log(newData);
    this.setState({ dataPointsNew: newData });
  };

  // componentWillUnmount = () => {
  //   console.log("1");
  // };

  render(props) {
    const options = {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: " ราคาเหรียญ BTC/USDT ",
      },
      axisY: {
        title: "Number of Price ( USDT )",
        includeZero: false,
      },
      data: [
        {
          type: "candlestick",
          xValueFormatString: "YYYY/MMM/DD HH:mm:ss",
          yValueFormatString: "#,##0.############## USDT",
          dataPoints: this.state.dataPointsNew,
          // dataPoints: [
          //   //[open,high,low,close]
          //   {
          //     x: new Date("2017-01-01 11:00"),
          //     y: [36.61, 38.45, 36.19, 36.82],
          //   },
          //   { x: new Date("2017-02-01"), y: [36.82, 36.95, 34.84, 36.2] },
          //   { x: new Date("2017-03-01"), y: [35.85, 36.3, 34.66, 36.07] },
          //   { x: new Date("2017-04-01"), y: [36.19, 37.5, 35.21, 36.15] },
          //   { x: new Date("2017-05-01"), y: [36.11, 37.17, 35.02, 36.11] },
          //   { x: new Date("2017-06-01"), y: [36.12, 36.57, 33.34, 33.74] },
          //   { x: new Date("2017-07-01"), y: [33.51, 35.86, 33.23, 35.47] },
          //   { x: new Date("2017-08-01"), y: [35.66, 36.7, 34.38, 35.07] },
          //   { x: new Date("2017-09-01"), y: [35.24, 38.15, 34.93, 38.08] },
          //   { x: new Date("2017-10-01"), y: [38.12, 45.8, 38.08, 45.49] },
          //   { x: new Date("2017-11-01"), y: [45.97, 47.3, 43.77, 44.84] },
          //   { x: new Date("2017-12-01"), y: [44.73, 47.64, 42.67, 46.16] },
          // ],
        },
      ],
    };

    console.log("options");
    console.log(options);
    return (
      <Grid container style={{ padding: 20 }}>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          justifyContent="center"
          style={{ height: 800 }}
        >
          <Typography
            style={{ fontSize: 50, color: "black", fontWeight: "bold" }}
          >
            Test 2
          </Typography>
          {/* {JSON.stringify(this.props.candleStickData)} */}
          <br />
          <br />
          <CanvasJSChart options={options} />
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          style={{ padding: 20 }}
        >
          <Grid item md={1} justifyContent="flex-end">
            <Button
              onClick={() => {
                this.props.updateSearch(false, false, false);
              }}
              style={{
                backgroundColor: "#666666",
                color: "white",
                fontSize: 20,
                fontWeight: "bold",
              }}
              size="medium"
              fullWidth
              startIcon={<ArrowBack />}
            >
              Back
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Test2;
