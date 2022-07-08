import React from "react";
import { Button, Grid, Typography, TextField } from "@material-ui/core";
import axios from "axios";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Payment from "@material-ui/icons/Payment";

export default function Test3(props) {
  const [input, setInput] = React.useState(0);
  const [output, setOutput] = React.useState(0);
  const [dataAsks, setDataAsks] = React.useState();

  const calculateOutputAmount = (usdtAmount) => {
    if (usdtAmount != 0) {
      axios
        .get("https://api1.binance.com/api/v3/depth?symbol=BTCUSDT")
        .then((res) => {
          console.log(res);
          setDataAsks(res.data);
        })
        .catch((err) => {
          throw err;
        });

      // alert(usdtAmount);
      var output = 0;
      var inputPrice = usdtAmount;
      var isFinished = false;

      console.log("calculateOutputAmount");
      console.log(dataAsks);

      //ลองคีย์ input =100 จะได้ output = 15
      var test = [
        ["5", "10"],
        ["10", "20"],
        ["15", "30"],
      ];
      if (dataAsks != undefined) {
        dataAsks.asks.forEach((element, index, array) => {
          // test.forEach((element, index, array) => {
          debugger;
          if (!isFinished) {
            // 1. ตรวจสอบข้อมูล Index 0 พบว่า Price = 47,203.59, Volume = 5.15277
            var price = parseFloat(element[0]);
            var volume = parseFloat(element[1]);
            // console.log(index);
            // console.log(price);
            // console.log(volume);

            // 2. ทำการคำนวณ Volume ที่สามารถซื้อได้ จากจำนวน input = 290,000 ในช่วงราคาของ order ปัจจุบัน (Price = 47,203.59) จะมี ----------> InputVolume = input / price
            var inputVolume = inputPrice / parseFloat(price);

            //3. เนื่องจาก Input ที่กรอกเข้ามา (InputVolume = 6.1436) มี volume มากกว่า order book ปัจจุบัน (Volume = 5.15277) ดังนั้น จึงต้องคำนวณ Order book เท่าที่ order book รับได้ (5.15277)
            // 4. ทำการหักลบ Input เท่ากับมูลค่าของ Order book ที่คำนวณไปแล้ว ---------->  Input = Input - Volume * price
            inputPrice = inputPrice - parseFloat(volume) * parseFloat(price); //**inputPriceBalance ที่เหลืออยู่ในการซื้อแต่ละช่องหมดไป เกิดจาก เงิน - ที่ซื้อไป

            if (inputVolume > parseFloat(volume)) {
              //5. บวกเพิ่ม Output ที่ได้รับ
              output += parseFloat(volume); //**จำนวนหน่วยที่ได้ + เรื่อยๆ
            } else {
              //5. บวกเพิ่ม Output ที่ได้รับ
              output = parseFloat(output) + inputVolume; //**จำนวนหน่วยที่ได้ในตอนสุดท้าย + เศษจากชื่องสุดท้าย
            }
            //**หยุดเมื่อเงินที่ป้อนเข้ามาหมดแล้ว
            if (inputPrice <= 0) {
              isFinished = true;
            }
          }
        });
        console.log("output");
        console.log(parseFloat(output));
        setOutput(parseFloat(output));
      }
    } else {
      setOutput(0);
    }
  };

  React.useEffect(() => {
    console.log("Test3");
    console.log(props.orderBook);
  }, [props]);

  return (
    <Grid container style={{ padding: 20 }}>
      <Grid
        container
        direction="row"
        alignItems="flex-start"
        justifyContent="center"
        style={{ height: 400 }}
      >
        <Typography
          style={{ fontSize: 50, color: "black", fontWeight: "bold" }}
        >
          Test 3
        </Typography>
        <br />
        <Grid container direction="row" alignItems="center">
          <Grid item md={4}>
            <Typography style={{ fontSize: 30, color: "black" }}>
              Input USDT:
            </Typography>
          </Grid>
          <Grid item md={6}>
            <Grid container spacing={2}>
              <Grid item md={8}>
                <TextField
                  id="standard-basic"
                  label=""
                  variant="outlined"
                  name="usdtAmount"
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item md={3}>
                <Button
                  onClick={() => {
                    calculateOutputAmount(input);
                  }}
                  style={{
                    backgroundColor: "#20a167",
                    color: "white",
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                  fullWidth
                  size="large"
                  startIcon={<Payment style={{ color: "yellow" }} />}
                >
                  Buy
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="row">
          <Grid item md={4}>
            <Typography style={{ fontSize: 30, color: "black" }}>
              Output BTC :
            </Typography>
          </Grid>
          <Grid item md={4}>
            <TextField
              id="standard-basic"
              variant="outlined"
              fullWidth
              disabled
              value={output}
              style={{ fontSize: 20 }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="flex-end"
        justifyContent="flex-end"
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
  );
}
