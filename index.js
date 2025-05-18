// // const fs = require("fs");

// // const callback = (err, data) => {
// //   if (err) {
// //     console.error(err);
// //     return;
// //   }

// //   fs.writeFile("output.txt", data.toLowerCase(), (error) => {
// //     if (error) {
// //       console.log(error);
// //       return;
// //     }
// //   });
// // };

// // fs.readFile("test.txt", "utf8", callback);

// // const url = require("url");
// // const address = "http://localhost:8080/default.html?year=2017&month=february";
// // const query = url.parse(address, true);

// // console.log(query.host); //'localhost:8080'
// // console.log(query.pathname); //'/default.html'
// // console.log(query.search); //'?year=2017&month=february'

// // const queryData = query.query; //{ year: 2017, month: 'february' }
// // console.log(queryData);
// // console.log(queryData.year); //'2017'
// // console.log(queryData.month); //'february'

// const http = require("http");
// const fs = require("fs");

// // http
// //   .createServer((req, res) => {
// //     res.writeHead(200, { "Content-Type": "text/html" });
// //     res.end("Aprendiendo en The Bridge!");
// //   })
// //   .listen(8080);

// // http
// //   .createServer((req, res) => {
// //     fs.readFile("test.html", (err, data) => {
// //       res.writeHead(200, { "Content-Type": "text/html" });
// //       res.write(data);
// //       return res.end();
// //     });
// //   })
// //   .listen(8080);

// Modules' import
// const http = require("http");
// const fs = require("fs");
// const url = require("url");

// http
//   .createServer((req, res) => {
//     const query = url.parse(req.url, true);
//     const filename = `.${query.pathname}`;

//     fs.readFile(`./pages/${filename}`, (err, data) => {
//       if (err) {
//         fs.readFile("./pages/notFound.html", (err, data) => {
//           if (err) {
//             console.log(err);
//             res.writeHead(500, { "content-type": "text/html" });
//             return res.end("Error reading notFound.html");
//           }
//           res.writeHead(404, { "content-type": "text/html" });
//           return res.end(data);
//         });
//       } else {
//         res.writeHead(200, { "content-type": "text/html" });
//         if (data) {
//           res.write(data);
//         }
//         return res.end();
//       }
//     });
//   })
//   .listen(8080);

// We import the moudules
const http = require("http");
const fs = require("fs/promises");
const path = require("path");

http
  .createServer(async (req, res) => {
    const filePath = path.join(__dirname, "pages", req.url);

    try {
      const data = await fs.readFile(filePath, "utf-8");
      res.writeHead(200, { "content-type": "text/html" });
      res.end(data);
    } catch (error) {
      const notFoundData = await fs.readFile(
        path.join(__dirname, "pages", "notFound.html"),
        "utf-8"
      );
      res.writeHead(404, { "content-type": "text/html" });
      res.end(notFoundData);
    }
  })
  .listen(8080);
