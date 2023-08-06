const db = require("../config/dbconfig");

exports.addData = (request, response) => {
  db.insert(
    {
      table: "messages",
      records: [
        {
          message: request.body.message,
          username: request.body.username,
          room: request.body.room,
        },
      ],
    },
    (err, res) => {
      if (err) response.status(500).json(err);

      response.status(res?.statusCode).json(res?.data);
    }
  );
};

exports.getData = (request, response) => {
  db.searchByValue(
    {
      table: "messages",
      searchAttribute: "room",
      searchValue: request?.params?.room,
      attributes: ["message", "username", "__createdtime__"],
      order: "desc",
      limit: 30,
    },
    (err, res) => {
      if (err) {
        response.status(500).json(err);
      } else {
        response.status(res?.statusCode).json(
          res?.data.sort((message1, message2) => {
            return message1["__createdtime__"] - message2["__createdtime__"];
          })
        );
      }
    }
  );
};

// db.searchByValue({
//   table
// })
