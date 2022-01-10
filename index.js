// express gives me a function
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dao = require("./db/dao");
const log = require("./utilities/common").log;
const server = require("./server/server");

// calling the function gives me a server
const api = express();

// set up cors and body parser
api.use(cors());
api.use(bodyParser.json());

const port = process.env.PORT || 8080;
// connect to the database
dao.Connect();

api.get("/*", async (request, response) => {
  log("request : [index] hit path " + request.path);
  const [returnData, error] = await server.handleGetRequests(request);
  if (error) {
    return response.json(error);
  }

  return response.json(returnData);
});

api.post("/post/tasks", async (request, response) => {
  log("request : [index] hit path " + request.path);
  const [returnData, error] = await server.handlePostRequests(request);
  if (error) {
    return response.json(error);
  }

  return response.json(returnData);
});

api.put("/update/task/", async (request, response) => {
  log("request : [index] hit path " + request.path);
  const [returnData, error] = await server.handleUpdateRequests(request);
  if (error) {
    return response.json(error);
  }

  return response.json(returnData);
});

api.delete("/delete/task/:taskid", async (request, response) => {
  log("request : [index] hit path " + request.path);
  const [returnData, error] = await server.handleDeleteRequests(request);
  if (error) {
    return response.json(error);
  }

  return response.json(returnData);
});

// now we listen for a request
api.listen(port, () => {
  log("[index] [listen] 😎 listening on port", +  port);
});
