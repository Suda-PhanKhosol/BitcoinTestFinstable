import React from "react";
import { Button, Grid, Typography, Paper } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import axios from "axios";

export default function Test1(props) {
  const [ftxData, setFtxData] = React.useState();
  const [binanceData, setBinanceData] = React.useState();

  const [diff, setDiff] = React.useState();
  const [percDiff, setPercDiff] = React.useState();

  //Test1
  const getFTX = () => {
    axios
      .get("http://localhost:8081/ftx")
      .then((res) => {
        console.log("getFTX", res);
        setFtxData(res.data.result);
      })
      .catch((err) => {
        console.log("getFTX err", err);

        throw err;
      });
  };
  const getBinance = () => {
    axios
      .get("https://api1.binance.com/api/v3/avgPrice?symbol=BTCUSDT")
      .then((res) => {
        console.log("getBinance", res);
        setBinanceData(res.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  React.useEffect(() => {
    if (ftxData !== undefined && binanceData !== undefined) {
      // 100*diff / mostNum
      var percDiff = Math.abs(
        ((ftxData.price - binanceData.price) / binanceData.price) * 100
      );

      setDiff(Math.abs(ftxData.price - binanceData.price));
      setPercDiff(percDiff);
      console.log(ftxData);
      console.log(binanceData);
    }
  }, [ftxData, binanceData]);

  React.useEffect(() => {
    getFTX();
    getBinance();
  }, [props]);

  return (
    <div>
      {binanceData !== undefined && ftxData !== undefined ? (
        <Grid>
          <Grid container style={{ padding: 20 }}>
            <Paper elevation={3}>
              <Grid
                container
                direction="row"
                alignItems="flex-start"
                justifyContent="center"
                style={{ height: 500 }}
              >
                <Typography
                  style={{ fontSize: 50, color: "black", fontWeight: "bold" }}
                >
                  Test 1
                </Typography>
                <Grid
                  container
                  direction="row"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                >
                  <Grid item md={6}>
                    <Typography style={{ fontSize: 30, color: "black" }}>
                      FTX BTC Price :
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography style={{ fontSize: 30, color: "black" }}>
                      20183.0 USDT
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container direction="row">
                  <Grid item md={6}>
                    <Typography style={{ fontSize: 30, color: "black" }}>
                      Binance BTC Price :
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography style={{ fontSize: 30, color: "black" }}>
                      {binanceData.price} USDT
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container direction="row">
                  <Grid item md={6}>
                    <Typography style={{ fontSize: 30, color: "black" }}>
                      Diff :
                    </Typography>
                  </Grid>
                  <Grid item md={6}>
                    <Typography style={{ fontSize: 30, color: "black" }}>
                      {diff} USDT ({percDiff}%)
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
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
                  props.updateSearch(false, false, false);
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
      ) : (
        <Grid>Please wait..</Grid>
      )}
    </div>
  );
}
