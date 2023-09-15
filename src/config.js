const config = {
  db: {
    /* don't expose password or any sensitive info, done only for demo */
    host: "db4free.net",
    user: "dmn_dmn",
    password: "1905Gs15!!",
    database: "dmn_dmn",
    connectTimeout: 60000,
    multipleStatements: true,
  },
  listPerPage: 10,
};
module.exports = config;
