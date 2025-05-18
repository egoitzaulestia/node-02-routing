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
