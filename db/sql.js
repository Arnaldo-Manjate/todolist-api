const sql = {
  ALL_TASK_QUERY: "SELECT * FROM Todos.tasks",

  INSERT_TASK_QUERY: (taskname, status, createdate, updateddate) => {
    return `INSERT INTO Todos.tasks (taskname,status,createdate,updateddate) VALUES ('${taskname}', '${status}', '${createdate}','${updateddate}');`;
  },

  UPDATE_TASK_QUERY: (taskname , status, taskid) => {
    return `UPDATE Todos.tasks set taskname = '${taskname}', status = '${status}' WHERE id = ${taskid};`;
  },

  DELETE_TASK_QUERY: (taskid) => {
    return `DELETE FROM Todos.tasks WHERE id = ${taskid};`;
  },
};

module.exports = sql;
