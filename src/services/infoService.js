const pool = require("./db"); // MySQL veritabanı bağlantısını içeri aktarın

async function getAllInfo() {
  try {
    const [rows] = await pool.query("SELECT * FROM info"); // Tüm kayıtları getir
    return rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllInfo,
};
