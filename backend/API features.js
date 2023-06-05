const nodemailer = require("nodemailer");
require("dotenv").config();
const db = require("./db-config");
const util = require("util");
const dbQuery = util.promisify(db.query).bind(db);
//exports.checkSalleExist=function (salle) {
  function checkGroupeExist(codeClasse,NumGroupe) {
    return new Promise((resolve, reject) => {
      const query = `SELECT COUNT(*) AS count FROM groupes WHERE codeClasse = ? AND NumGroupe = ?`;
  
      db.query(query, [codeClasse,NumGroupe], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
        const count = results[0].count;
        resolve(count > 0);
      });
    });
  }
function checkExist(whatToCheck, dbtable, whereToCheck) {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) AS count FROM ${dbtable} WHERE ${whereToCheck} = ?`;

    db.query(query, [whatToCheck], (error, results) => {
      if (error) {
        reject(error);
        return;
      }
      const count = results[0].count;
      resolve(count > 0);
    });
  });
}
async function sendPasswordResetEmail(email, html) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user:process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Password Reset",
      html: html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Failed to send password reset email");
  }
}
const isGroupFree = async (NumGroupe, day, hour, IDSeance) => {
  const groupSql = `SELECT * FROM seances WHERE jour = ? AND heure = ? AND NumGroupe = ?`;
  try {
    const result = await dbQuery(groupSql, [day, hour, NumGroupe]);
    return result.length === 0 || result[0]?.IDSeance === parseInt(IDSeance);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

 
 const isFreeUpdate = async (day, salle, hour, IDSeance) => {
   try {
     const freeSql =
       "SELECT * FROM seances WHERE jour = ? AND codeSalle = ? AND heure = ?";
     const freeValues = [day, salle, hour];
 
     const data = await dbQuery(freeSql, freeValues);
     return data.length === 0 || data[0]?.IDSeance === parseInt(IDSeance);
   } catch (err) {
     console.error(err);
     throw err;
   }
 };
 
 const isFreeAdd = async (day, salle, hour) => {
   try {
     const freeSql =
       "SELECT * FROM seances WHERE jour = ? AND codeSalle = ? AND heure = ?";
     const freeValues = [day, salle, hour];
 
     const data = await dbQuery(freeSql, freeValues);
     return data.length === 0;
   } catch (err) {
     console.error(err);
     throw err;
   }
 };





module.exports = {

  checkExist,sendPasswordResetEmail,checkGroupeExist,isFreeUpdate,isFreeAdd,isGroupFree

};
