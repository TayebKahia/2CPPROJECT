const express = require("express");
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwt_secret = "dskjdafjhkvhjak25454h21xc(0][]{}dfkjahpsofjv05";
const db = require("./db-config");
const util = require("util");
const dbQuery = util.promisify(db.query).bind(db);
const nodemailer = require("nodemailer");
function checkEmailExists(email) {
  return new Promise((resolve, reject) => {
    const query = "SELECT COUNT(*) AS count FROM enseignants WHERE email = ?";

    db.query(query, [email], (error, results) => {
      if (error) {
        reject(error);
        return;
      }

      const count = results[0].count;
      resolve(count > 0);
    });
  });
}

exports.getUser = async (req, res) => {
  const sql = "SELECT * FROM enseignants "; // enseignants hold all users infos such as emaill pass etc..
  const result = await dbQuery(sql);
  console.log(result);
  res.json(result);
};

exports.updateUser = async (req, res) => {
  const sql = `UPDATE enseignants
  SET Nom = ?, email =?, role=?
  WHERE IDEns=?`;
  const { IDEns, Nom, email, role } = req.body;
  const values = [Nom, email, role, parseInt(IDEns)];
  const result = await dbQuery(sql, values);
  res.json(result);
};
exports.createUser = async (req, res) => {
  const { Nom, email, password, role } = req.body;

  try {
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      return res.status(409).json({ error: "Email already exists" });
    } else {
      const encryptedpassword = await bcrypt.hash(password,10);
      const sql =
        "INSERT INTO enseignants (Nom, email, password, role) VALUES (?)";
      const values = [Nom, email, encryptedpassword, role];
      const data = await dbQuery(sql, [values]);
      return res
        .status(200)
        .json({ message: "Registration successful", data: data });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const sql = "SELECT * FROM enseignants WHERE email = ?";
    const values = [email];

    const result = await dbQuery(sql, [values]);
    console.log(result);
    if (result.length === 0) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }
    const { password: hashedPassword, role } = result[0];
    console.log(password, role, hashedPassword);
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    console.log(passwordMatch);
    if (!passwordMatch) {
      console.log("err in password match");
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    const tokenPayload = { email, role };
    const token = jwt.sign(tokenPayload, jwt_secret, { expiresIn: "1h" });

    return res.status(200).json({ success: true, role, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
// post

exports.ForgotPassword = async (req, res) => {
  try {
    const { email, OTP } = req.body;
    const sql = "SELECT * FROM enseignants WHERE email = ?";
    const values = [email];
    const result = await dbQuery(sql, values);
    console.log(result);
    if (result.length === 0) {
      console.log("error happen in length");
      return res.status(401).json({ success: false, error: "Invalid email" });
    }
    const { IDEns } = result[0];
    await sendPasswordResetEmail(email, OTP);

    res.status(200).json({
      IDEns: IDEns,
      success: true,
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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

//get
// exports.resetPassword = async(req, res) => {
// const {IDEns,token} = req.params;
//   const sql = "SELECT * FROM enseignants WHERE IDEns = ?";
//   const values = [IDEns];

//   db.query(sql, values, async (err, result) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }

//     if (result.length === 0) {
//       return res
//         .status(401)
//         .json({error: "User Not Exist" });
//     }

//     const {password} = result[0];
//     const secret=jwt_secret+password;

//     try{
//       const verify=jwt.verify(token,secret);
//       res.send('Verified')
//     }catch(err){
//       res.send('Not Verified')
//     }

// })

// }

//post
exports.confirmPassword = async (req, res) => {
  try {
    const { IDEns, password } = req.body;
    const IDsql = "SELECT * FROM enseignants WHERE IDEns = ?";
    const value = [IDEns];

    const result = await dbQuery(IDsql, value);
    if (result.length === 0) {
      return res.status(401).json({ success: false, error: "User Not Exist" });
    }
    /*const secret = jwt_secret + password;
    const verify = jwt.verify(token, secret);*/
    console.log(result);
    const encryptedpassword = await bcrypt.hash(password, 10);
    console.log(encryptedpassword);
    const sql = "UPDATE enseignants SET password =? WHERE IDEns =?";
    const values = [encryptedpassword, IDEns];
    const updated = await dbQuery(sql, values);
    const affectedRows = updated.affectedRows;
    if (affectedRows === 0) {
      return res
        .status(400)
        .json({ success: false, error: "Password update failed" });
    }
    console.log(updated);
    res.status(200).json({
      success: true,
      message: "Password has been updated successfully",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, error: "Failed to update password" });
  }
};
exports.fillTable = async (req, res) => {
  const sql = `SELECT NumGroupe FROM groupes WHERE codeClasse=? `;
  const values = [req.body.year];
  const sql2 = `SELECT codeSalle FROM salles`;
  const sql3 = `SELECT CodeMod FROM modules Where codeClasse=?`;
  const sql4 = `SELECT heure FROM heures`;
  ////////////////////////////////
  const groupes = await dbQuery(sql, values);
  const numGroupes = groupes.map((result) => result.NumGroupe);
  ////////////////////////////////
  const rooms = await dbQuery(sql2);
  const salles = rooms.map((result) => result.codeSalle);
  /////////////// //
  const matieres = await dbQuery(sql3, values);
  const numMatieres = matieres.map((result) => result.CodeMod);
  ////////////////////////////////
  const hours = await dbQuery(sql4);
  const numHeures = hours.map((result) => result.heure);
  const data = [numGroupes, salles, numMatieres, numHeures];
  res.json({
    groups: data[0],
    rooms: data[1],
    modules: data[2],
    hours: data[3],
  });
};

exports.fillSettingsTable = (req, res) => {
  const year = req.body.year;
  const day = req.body.day;

  console.log(year, day);

  const sql = `SELECT IDSeance, codeClasse AS 'year', jour AS day, heure AS hour, codeType AS type, codeSalle AS salle, CodeMod AS module, enseignants.Nom AS teacher, NumGroupe AS 'group' FROM seances
    JOIN enseignants ON seances.IDEns = enseignants.IDEns
    WHERE jour = ? AND codeClasse = ?
    ORDER BY NumGroupe`;

  db.query(sql, [day, year], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "An error occurred" });
    }

    return res.json(data);
  });
};

exports.uploadRoomTable = (req, res) => {
  const sql = `SELECT salles.codeSalle as room_name, salles.capacite as capacity,
  COALESCE(GROUP_CONCAT(IF(seances.Heure = '8-10' AND seances.jour=?, CONCAT(seances.CodeMod, ' | ', seances.NumGroupe), NULL)), 'Empty') AS eightToTen,
  COALESCE(GROUP_CONCAT(IF(seances.Heure = '10-12' AND seances.jour=?, CONCAT(seances.CodeMod, ' | ', seances.NumGroupe), NULL)), 'Empty') AS tenToTwelve,
  COALESCE(GROUP_CONCAT(IF(seances.Heure = '12-14' AND seances.jour=?, CONCAT(seances.CodeMod, ' | ', seances.NumGroupe), NULL)), 'Empty') AS twelveToFourteen,
  COALESCE(GROUP_CONCAT(IF(seances.Heure = '14-16' AND seances.jour=?, CONCAT(seances.CodeMod, ' | ', seances.NumGroupe), NULL)), 'Empty') AS fourteenToSixteen
  FROM salles
  LEFT JOIN seances ON salles.codeSalle = seances.codeSalle
  GROUP BY salles.codeSalle, salles.capacite;`;
  values = [req.body.jour, req.body.jour, req.body.jour, req.body.jour];
  db.query(sql, values, (err, data) => {
    if (err) {
      return res.json({ message: "Error" });
    }
    return res.json(data);
  });
};

exports.uploadTableGroupe = (req, res) => {
  // Validate input
  const { cycle, group } = req.body;
  if (!cycle || !group) {
    return res.status(400).json({ message: "Invalid input" });
  }

  const sql = `SELECT COALESCE(CodeMod, 'VIDE') AS CodeMod, COALESCE(enseignants.Nom, 'VIDE') AS Nom, COALESCE(etatDavancement, 'VIDE') AS etatDavancement
               FROM seances
               JOIN enseignants ON seances.IDEns = enseignants.IDEns
               WHERE codeClasse = ? AND NumGroupe = ?`;

  const values = [cycle, group];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    return res.json(data);
  });
};

const isFree = async (day, salle, hour, IDSeance) => {
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

const isFree2 = async (day, salle, hour) => {
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

exports.updateTest = async (req, res) => {
  try {
    const { year, day, hour, salle, type, group, module, IDSeance, teacher } =
      req.body.infos;

    // const teachSql = `SELECT IDEns FROM enseignants WHERE Nom = ?`;
    // const [teacherRow] = await dbQuery(teachSql, [teacher.nom]);
    // const IDEns = teacherRow?.IDEns || null;

    const isRoomFree = await isFree(day, salle, hour, IDSeance);

    if (isRoomFree) {
      const updateSql = `UPDATE seances 
        SET codeClasse = ?, jour = ?, Heure = ?, codeSalle = ?, codeType = ?, NumGroupe = ?, CodeMod = ?
        WHERE IDSeance = ?`;
      const updateValues = [
        year,
        day,
        hour,
        salle,
        type,
        group,
        module,
        IDSeance,
      ];

      await dbQuery(updateSql, updateValues);
      return res.json({ message: "Success" });
    } else {
      return res.json({ message: "Room Is Already Being Used" });
    }
  } catch (err) {
    console.error(err);
    return res.json({ message: "An error occurred" });
  }
};

exports.postTest = async (req, res) => {
  try {
    const { year, day, hour, salle, type, group, module } = req.body.Info;
    const isRoomFree = await isFree2(day, salle, hour);
    if (isRoomFree) {
      const postSql = `INSERT INTO seances (codeClasse,jour,Heure,codeSalle,CodeMod,codeType,IDEns,NumGroupe) VALUES (?,?,?,?,?,?,1,?)`;
      const postValues = [year, day, hour, salle, module, type, group];
      await dbQuery(postSql, postValues);
      return res.json({ message: "Success" });
    } else {
      return res.json({ message: "Room Is Already Being Used" });
    }
  } catch (err) {
    return res.json({ message: "An error occurred" });
  }
};

exports.deleteSettingsTable = async (req, res) => {
  try {
    const IDSeances = req.body.IDSeance;
    console.log(IDSeances);
    await dbQuery(`DELETE FROM seances WHERE IDSeance=?`, parseInt(IDSeances));
    return res.json({ message: `Seance deleted successfully` });
  } catch (err) {
    return res.json({ message: "An error occurred" });
  }
};

exports.uploadRoom = async (req, res) => {
  try {
    const selectQuery = "SELECT * FROM salles WHERE codeSalle=?";
    const selectValues = [req.body.codeSalle];
    console.log(selectValues);
    const rooms = await dbQuery(selectQuery, selectValues);

    if (rooms.length === 0) {
      const insertQuery =
        "INSERT INTO salles (codeSalle, desSalle, capacite) VALUES (?, ?, ?)";
      const insertValues = [
        req.body.codeSalle,
        req.body.desSalle,
        req.body.capacite,
      ];
      await db.query(insertQuery, insertValues);
      return res
        .status(201)
        .json({ success: true, message: "Room created successfully" });
    }

    return res.json({ message: "Room already exists" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

exports.getTimeTable = (req, res) => {
  const sql = `SELECT jour as day,heure as heur,codeType as type,CodeMod as moduleName,NumGroupe as 'group',codeSalle as salle FROM seances
  JOIN enseignants on seances.IDEns =enseignants.IDEns`;
  db.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};
