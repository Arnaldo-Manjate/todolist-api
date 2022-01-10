const { log } = require("./common");

const request = {
  /**
   * perforRequest helps us escape trycatch hell but
   * dealing with error for us and returning an array
   * that the caller can destructure.
   * @param {Function} workerFunc
   * @returns
   */
  performRequest: async function (workerFunc) {
    try {
      const response = await workerFunc();
      return [response, null];
    } catch (error) {
      log("[performRequest] got error :" + JSON.stringify(error));
      return [null, error];
    }
  },

  getBody: function (request) {
    if (request && request.body) {
      return request.body;
    }

    return null;
  },

  getParam: function (params, key) {
    if (params && params[key]) {
      return params[key];
    }

    return null;
  },

  newError: function (statusCode, message) {
    return { statusCode, message };
  },

  newPromiseRejection: async function (message) {
    return new Promise((resolve, reject) => {
      reject(message);
    });
  },
};

module.exports = request;
