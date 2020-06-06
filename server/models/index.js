const db = require('../../database/index.js');

module.exports = {
  tagCarpet: (carpetId, tagNum = null) => {
    const sqlString = 'UPDATE carpet SET tag_num = $1 WHERE carpet_id = $2';
    const sqlValues = [tagNum, carpetId];

    return db.query(sqlString, sqlValues);
  },

  locateCarpet: (carpetId, location = null) => {
    const sqlString = 'UPDATE carpet SET location = $1 WHERE carpet_id = $2';
    const sqlValues = [location, carpetId];

    return db.query(sqlString, sqlValues);
  },

  updateRemover: (carpetId, remover = null) => {
    const sqlString = 'UPDATE carpet SET removedBy = $1 WHERE carpet_id = $2';
    const sqlValues = [remover, carpetId];

    return db.query(sqlString, sqlValues);
  },
};
