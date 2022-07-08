import "./App.css";
import { Button, Grid } from "@material-ui/core";
import React from "react";
import Test1 from "./Test1";
import Test2 from "./Test2";
import Test3 from "./Test3";
import axios from "axios";

export default function App() {
  const [isTest1, setIsTest1] = React.useState(false);
  const [isTest2, setIsTest2] = React.useState(false);
  const [isTest3, setIsTest3] = React.useState(false);

  const [ftxData, setFtxData] = React.useState();
  const [binanceData, setBinanceData] = React.useState();
  const [candleStickData, setCandleStickData] = React.useState();

  //Test1
  const getFTX = () => {
    console.log("getFTX");

    axios
      .get("https://ftx.com/api/markets/BTC/USDT")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        throw err;
      });
  };
  const getBinance = () => {
    console.log("getBinance");

    axios
      .get("https://api1.binance.com/api/v3/avgPrice?symbol=BTCUSDT")
      .then((res) => {
        console.log(res);
        setBinanceData(res.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  //Test2
  const getCandleStickData = () => {
    console.log("getCandleStickData");

    axios
      .get("https://api1.binance.com/api/v3/klines?interval=1h&symbol=BTCUSDT")
      .then((res) => {
        console.log(res);
        setCandleStickData(res.data);
      })
      .catch((err) => {
        throw err;
      });
  };

  const ShowTest = (num) => {
    console.log(num);
    if (num === 1) {
      setIsTest1(true);
      setIsTest2(false);
      setIsTest3(false);
    } else if (num === 2) {
      setIsTest1(false);
      setIsTest2(true);
      setIsTest3(false);
    } else {
      setIsTest1(false);
      setIsTest2(false);
      setIsTest3(true);
    }
  };

  const handleUpdateSearch = (t1, t2, t3) => {
    //   alert(JSON.stringify(values));
    console.log(t1, t2, t3);
    setIsTest1(t1);
    setIsTest2(t2);
    setIsTest3(t3);
  };

  React.useEffect(() => {
    getBinance();
    getFTX();
    getCandleStickData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {!isTest1 && !isTest2 && !isTest3 && (
          <Grid container justifyContent="center">
            <Grid item md={3}>
              <Button
                size="large"
                style={{
                  backgroundColor: "#62b59c",
                  color: "white",
                  fontSize: 40,
                  fontWeight: "bold",
                  borderRadius: 18,
                }}
                onClick={() => {
                  ShowTest(1);
                }}
              >
                Test 1 (Simple)
              </Button>
            </Grid>
            <Grid item md={3}>
              <Button
                size="large"
                style={{
                  backgroundColor: "#ccca5a",
                  color: "white",
                  fontSize: 40,
                  borderRadius: 18,
                  fontWeight: "bold",
                }}
                onClick={() => {
                  ShowTest(2);
                }}
              >
                Test 2 (Medium)
              </Button>
            </Grid>
            <Grid item md={3}>
              <Button
                size="large"
                style={{
                  backgroundColor: "#d1525e",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: 18,
                  fontSize: 40,
                }}
                onClick={() => {
                  ShowTest(3);
                }}
              >
                Test 3 (Hard)
              </Button>
            </Grid>
          </Grid>
        )}

        {isTest1 && (
          <Test1
            updateSearch={handleUpdateSearch.bind(this)}
            binanceData={binanceData}
            ftxData={ftxData}
          ></Test1>
        )}
        {isTest2 && (
          <Test2
            updateSearch={handleUpdateSearch.bind(this)}
            candleStickData={candleStickData}
          ></Test2>
        )}
        {isTest3 && (
          <Test3 updateSearch={handleUpdateSearch.bind(this)}></Test3>
        )}
      </header>
    </div>
  );
}
