import React from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";

export default function Test1(props) {
  const [diff, setDiff] = React.useState();
  const [percDiff, setPercDiff] = React.useState();

  React.useEffect(() => {
    // 100*diff / mostNum
    var percDiff = Math.abs(
      ((20183.0 - props.binanceData.price) / props.binanceData.price) * 100
    );

    setDiff(Math.abs(20183.0 - props.binanceData.price));
    setPercDiff(percDiff);
  }, [props]);

  return (
    <Grid container style={{ padding: 20 }}>
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
              {props.binanceData.price} USDT
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
        {JSON.stringify(props.binanceData)}
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="flex-end"
        justifyContent="flex-end"
      >
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
  );
}
