const http = require("http");
const Router = require("./router");
const notes = require("./notes-data");
const host = "localhost";
const port = 8000;

const router = new Router();

router.options("*", (req, res) => {
  res.writeHead(204, {
    "Access-Control-Allow-Methods": "GET, POST, DELETE",
    "Access-Control-Allow-Headers": "X-Requested-With,content-type",
  });
  res.end();
});

router.get("/notes", (req, res) => {
  new Promise((resolve, reject) => {
    resolve(notes);
  })
  .then(notes => {
    res.writeHead(200);
    res.end(JSON.stringify(notes));
  })
  .catch(error => {
    res.writeHead(500);
    res.end(JSON.stringify({ error: "Internal Server Error" }));
  });
});

router.post("/notes", async (req, res) => {
  try {
    let body = "";
    for await (const chunk of req) {
      body += chunk.toString(); // convert Buffer to string
    }
    const newNote = JSON.parse(body);
    // TODO: Validate newNote here before pushing
    notes.push(newNote); // add the new note to the notes array
    res.writeHead(200);
    res.end(JSON.stringify(notes)); // send back the updated notes
  } catch (error) {
    res.writeHead(400);
    res.end(JSON.stringify({ error: "Invalid request" }));
  }
});

router.get('/notes/:id', (req, res, id) => {
  res.writeHead(200);
  res.end(JSON.stringify({ id }));
  res.end();
});



const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  router.route(req, res);
});

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
