var mysql = require("mysql");
const log = require("../utilities/common").log;
const utils = require("../utilities/request");
const sql = require("../db/sql");

var conection = null;

/**
 * Initialise database
 */
function Connect() {
  log("[sql] [init] attempting to connect");

  conection = mysql.createConnection({
    host: "localhost",
    user: "arnaldo",
    password: "Pass@word1",
  });

  conection.connect(function (err) {
    if (err) {
      log("[sql] [init] db connection error", err);
      return;
    }

    log("[sql] [init] database connection is ready");
  });
}

// GetAllTasks ...
function GetAllTasks() {
  log("[sql] [GetAllTasks] fetching tasks");
  return executeQuery(sql.ALL_TASK_QUERY);
}

// CreateTask ..
function CreateTask(request) {
  // chack that we have a request body
  const body = utils.getBody(request);
  if (!body) {
    return utils.newPromiseRejection("recieved empty request body");
  }
  log("[sql] [CreateTask] got body:" + JSON.stringify(body));

  // extract body and insrt into the db
  const { taskname, status, createdate, updateddate } = body;
  const insertStatement = sql.INSERT_TASK_QUERY(
    taskname,
    status,
    createdate,
    updateddate
  );

  return executeQuery(insertStatement);
}

// DeleteTask ..
function UpdateTask(request) {
  const body = utils.getBody(request);
  if (!body) {
    return utils.newPromiseRejection(
      "[dao] [UpdateTask]recieved empty request body"
    );
  }
  log("[dao] [UpdateTask] got body:" + JSON.stringify(body));

  // extract body and insrt into the db
  const { taskname, status, id } = body;
  const updateStatement = sql.UPDATE_TASK_QUERY(taskname, status, id);
  return executeQuery(updateStatement);
}

// DeleteTask ..
function DeleteTask(request) {
  // get the id for the task we need to delete
  const taskid = utils.getParam(request.params, "taskid");
  if (!taskid) {
    return utils.newPromiseRejection("[dao] [DeleteTask] recieved no taskid");
  }
  log("[dao] [DeleteTask] got task id : " + taskid);

  const deleteStatement = sql.DELETE_TASK_QUERY(taskid);
  return executeQuery(deleteStatement);
}

/**
 * executeQuery will execute generic query.
 * @param {String} query
 */
function executeQuery(query) {
  return new Promise((resolve, reject) => {
    conection.query(query, function (err, result) {
      if (err) {
        log("[dao] [executeQuery] query Error :", err);
        reject(err);
        return;
      }

      log("[dao] [executeQuery] query Success: " + JSON.stringify(result));
      resolve(result);
    });
  });
}

module.exports = {
  conection,
  Connect,
  GetAllTasks,
  CreateTask,
  UpdateTask,
  DeleteTask,
};
