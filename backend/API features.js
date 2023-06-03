const db = require("./db-config");
//exports.checkSalleExist=function (salle) {

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
function checkGroupeExist(codeClasse,NumGroupe) {
  return new Promise((resolve, reject) => {
    const query = `SELECT COUNT(*) AS count FROM groupes WHERE codeClasse = ? AND numGroupe = ?`;

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

async function sendPasswordResetEmail(email, OTP) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "tayebkahia4@gmail.com",
        pass: "lpybqougcvfmfznl",
      },
    });

    const mailOptions = {
      from: "tayebkahia4@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `Click the following link to reset your password: ${OTP}`,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Failed to send password reset email");
  }
}

module.exports = {
  checkExist,
  sendPasswordResetEmail,
};
