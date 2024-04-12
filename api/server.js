const http = require("http");
const host = "localhost";
const port = 8000;

const notes = {
  tkwvorm0: {
    title: "Note 1",
    content: "this is note 1",
    id: "tkwvorm0",
    createdAtDate: "4/11/2024, 8:32:20 PM",
    updatedAtDate: "4/11/2024, 8:32:29 PM",
  },
  yxvnkxuk: {
    title: "Note 2",
    content: "this is another note",
    id: "yxvnkxuk",
    createdAtDate: "4/11/2024, 8:32:32 PM",
    updatedAtDate: "4/11/2024, 8:32:40 PM",
  },
};

const requestListener = (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Content-Type", "application/json");
  switch (req.url) {
    case "/notes":
      if (req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString(); // convert Buffer to string
        });
        req.on("end", () => {
          notes.push(JSON.parse(body)); // add the new note to the notes array
          res.end(JSON.stringify(notes)); // send back the updated notes
        });
      } else {
        res.writeHead(200);
        res.end(JSON.stringify(notes));
      }
      break;
    case "/":
      res.writeHead(200);
      res.end("Nest Notes API");
      break;
    default:
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Resource not found" }));
  }
};

const server = http.createServer(requestListener);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
