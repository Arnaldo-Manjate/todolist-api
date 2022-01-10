const log = require("../utilities/common").log;
const utils = require("../utilities/request");
const performRequest = require("../utilities/request").performRequest;
const dao = require("../db/dao");

/**
 * handleGetRequests will handle all get requests
 * by call the approprite function for the task.
 * @param {Request} request
 */
async function handleGetRequests(request) {
  switch (request.path) {
    case "/":
      return { message: "Hello World !!!" };
    case "/get/tasks":
      return await performRequest(dao.GetAllTasks);
    default:
      return [null, utils.newError(404, `Unknown path ${request.path}`)];
  }
}

/**
 * handlePostRequests will handle all post requests
 * by calling the approprite function for the task.
 * @param {Request} request
 */
async function handlePostRequests(request) {
  switch (request.path) {
    case "/":
      return { message: "Hello Post World !!!" };
    case "/post/tasks":
      return await performRequest(dao.CreateTask.bind(null, request));
    default:
      return [null, utils.newError(404, `Unknown path ${request.path}`)];
  }
}

/**
 * handleDeleteRequests will handle all detelet requests
 * by calling the approprite function for the task.
 * @param {Request} request
 */
async function handleDeleteRequests(request) {
  if (request.path.includes("/delete/task/")) {
    return await performRequest(dao.DeleteTask.bind(null, request));
  }
}

/**
 * handleDeleteRequests will handle all detelet requests
 * by calling the approprite function for the task.
 * @param {Request} request
 */
async function handleUpdateRequests(request) {
  return await performRequest(dao.UpdateTask.bind(null, request));
}

module.exports = {
  handleGetRequests,
  handlePostRequests,
  handleUpdateRequests,
  handleDeleteRequests,
};
