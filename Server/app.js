var express = require("express");
var app = express();
var router = express.Router();
var fs = require("fs");
var axios = require("axios");
var cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/ftx", function (req, res) {
  const makeGetRequest = async (path) => {
    return new Promise(function (resolve, reject) {
      axios.get(path).then(
        function (response) {
          var result = response.data;
          console.log("Processing Request", result);
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
    });
  };
  var result;
  var start = async function (a, b) {
    result = await makeGetRequest("https://ftx.com/api/markets/BTC/USDT"); //รอเสร็จ
    console.log("Test2", result);
  };
  start();

  console.log("Test1", result);
  setTimeout(() => {
    console.log("Test1", result);

    res.json(result);
  }, 1000);
});

app.get("/user", function (req, res) {
  fs.readFile(__dirname + "/" + "user.json", "utf8", function (err, data) {
    console.log(data);
    res.end(data);
  });
});

// router.get("/ftx", function (req, res, next) {
//   request({
//     uri: "https://ftx.com/api/markets/BTC/USDT",
//     qs: {
//       api_key: "123456",
//       query: "World of Warcraft: Legion",
//     },
//     function(error, response, body) {
//       if (!error && response.statusCode === 200) {
//         console.log(body);
//         res.json(body);
//       } else {
//         res.json(error);
//       }
//     },
//   });
// });

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log("http://%s:%s", host, port);
});
