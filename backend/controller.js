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
const {
  checkExists,
  sendPasswordResetEmail,
} = require("./API features");
//Salles Info

exports.getAllInfos = async (req, res) => {
  const sql = "SELECT * from salles ";
  const sql1 = "SELECT * from modules ";
  const sql2 = "SELECT * from groupes ";
  const salles = await dbQuery(sql);
  const modules = await dbQuery(sql1);
  const groupes = await dbQuery(sql2);
  res.json({ salles: salles, modules: modules, groupes: groupes });
};

exports.createSalle = async (req, res) => {
  const { codeSalle, desSalle, capacite } = req.body;
  try {
    const salleExist = await checkExist(codeSalle,"salles","codeSalle");
    if (salleExist) {
      return res.status(409).json({ error: "Salle deja exister" });
    } else {
      const sql = "INSERT INTO salles (codeSalle,desSalle,capacite) VALUES (?)";
      const values = [codeSalle, desSalle, capacite];
      const data = await dbQuery(sql, [values]);
      return res
        .status(200)
        .json({ message: "Salle added successful", data: data });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateSalle = async (req, res) => {
  const sql = `UPDATE salles
  SET desSalle = ?, capacite = ?
  WHERE codeSalle = ?`;

  const { desSalle, capacite, codeSalle } = req.body;
  const values = [desSalle, parseInt(capacite), codeSalle];

  const result = await dbQuery(sql, values);
  res.json(result);
};

exports.deleteSalle = async (req, res) => {
  sql = "DELETE FROM salles WHERE codeSalle=?";
  const { codeSalle } = req.body;
  const result = await dbQuery(sql, [codeSalle]);
  res.json({ message: "Salle deleted successfully" });
};

// Modules INFO
exports.createModule = async (req, res) => {
  const { CodeMod, DesMod, codeClasse } = req.body;
  try {
    const moduleExist = await checkExist(CodeMod,"modules","CodeMod");
    if (moduleExist) {
      return res.status(409).json({ error: "Module already exists" });
    } else {
      const sql = "INSERT INTO modules (CodeMod,DesMod,codeClasse) VALUES (?)";
      const values = [CodeMod, DesMod, codeClasse];
      const data = await dbQuery(sql, [values]);
      return res
        .status(200)
        .json({ message: "Module added  successful", data: data });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateModule = async (req, res) => {
  const sql = `UPDATE modules
  SET CodeMod = ?, DesMod = ? , codeClasse = ?
  WHERE IDMod=?`;
  const { CodeMod, DesMod, codeClasse, IDMod } = req.body;
  const values = [CodeMod, DesMod, codeClasse, IDMod];
  const result = await dbQuery(sql, values);
  res.json(result);
};

exports.deleteModule = async (req, res) => {
  sql = "DELETE FROM modules WHERE IDMod=?";
  const { IDMod } = req.body;
  const result = await dbQuery(sql, [parseInt(IDMod)]);
  res.json({ message: "Module deleted successfully" });
};

// Users Info
exports.getUser = async (req, res) => {
  const sql = "SELECT * FROM enseignants "; // enseignants hold all users infos such as emaill pass etc..
  const result = await dbQuery(sql);
  res.json(result);
};

exports.updateUser = async (req, res) => {
  const sql = `UPDATE enseignants
  SET Nom = ?, email =?, role=?
  WHERE IDEns=?`;
  const { IDEns, Nom, email, role } = req.body;
  console.log(req.body);

  const values = [Nom, email, role, parseInt(IDEns)];
  const result = await dbQuery(sql, values);

  res.json(result);
};
exports.createUser = async (req, res) => {
  const { Nom, email, password, role } = req.body;
  console.log(req.body);
  try {
    const emailExists = await checkExists(email,"enseignants","email");
    if (emailExists) {
      return res.status(409).json({ error: "Email already exists" });
    } else {
      const encryptedpassword = await bcrypt.hash(password, 10);
      const sql =
        "INSERT INTO enseignants (Nom, email, password, role) VALUES (?)";
      const values = [Nom, email, encryptedpassword, role];
      const data = await dbQuery(sql, [values]);
      console.log(data);
      return res
        .status(200)
        .json({ message: "Registration successful", data: data });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteUser = async (req, res) => {
  sql = "DELETE FROM enseignants WHERE IDEns=?";
  const { IDEns } = req.body;
  const result = await dbQuery(sql, [parseInt(IDEns)]);
  res.json({ message: "User deleted successfully" });
};

// LOGIN API
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const sql = "SELECT * FROM enseignants WHERE email = ?";
    const values = [email];

    const result = await dbQuery(sql, [values]);
    if (result.length === 0) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }
    const { password: hashedPassword, role, IDEns } = result[0];
    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    const tokenPayload = { email, role };
    const token = jwt.sign(tokenPayload, jwt_secret, { expiresIn: "1h" });

    return res.status(200).json({ success: true, role, IDEns });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Forgot Password

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
exports.getSettings = async (req, res) => {
  try {
    const year = req.query.year;
    const sql = `SELECT NumGroupe FROM groupes WHERE codeClasse=? `;
    const sql2 = `SELECT codeSalle FROM salles`;
    const sql3 = `SELECT CodeMod FROM modules Where codeClasse=?`;
    const sql4 = `SELECT heure FROM heures`;
    const sql5 = `SELECT IDEns as IDTeach,Nom FROM enseignants `;
    ////////////////////////////////
    const groupes = await dbQuery(sql, year);
    const numGroupes = groupes.map((result) => result.NumGroupe);
    ////////////////////////////////
    const rooms = await dbQuery(sql2);
    const salles = rooms.map((result) => result.codeSalle);
    /////////////// //
    const matieres = await dbQuery(sql3, year);
    const numMatieres = matieres.map((result) => result.CodeMod);
    ////////////////////////////////
    const hours = await dbQuery(sql4);
    const numHeures = hours.map((result) => result.heure);
    ////////////////////////////////
    const prof = await dbQuery(sql5);
    const teach = prof.map((result) => result.Nom);
    const data = [numGroupes, salles, numMatieres, numHeures, teach];
    res.json({
      groups: data[0],
      rooms: data[1],
      modules: data[2],
      hours: data[3],
      teacher: data[4],
    });
  } catch (err) {
    res.json(err);
  }
};

exports.getSettingsTable = async (req, res) => {
  const { year, day } = req.query;
  const sql = `SELECT IDSeance,seances.IDEns , codeClasse AS 'year', jour AS day, heure AS hour, codeType AS type, codeSalle AS salle, CodeMod AS module, enseignants.Nom AS teacher, NumGroupe AS 'group' FROM seances
     JOIN enseignants ON seances.IDEns = enseignants.IDEns
    WHERE jour = ? AND codeClasse = ?
    ORDER BY NumGroupe`;
  try {
    const data = await dbQuery(sql, [day, year]);
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }
};

exports.getRoomTable = async (req, res) => {
  try {
    const { jour, isEvery, salle } = req.query;
    console.log({ jour, isEvery, salle });
    const roomSql = `SELECT codeSalle as room_name FROM salles ORDER BY room_name`;
    const rooms = await dbQuery(roomSql);
    let sql;
    let values;

    if (isEvery === "true") {
      sql = `SELECT salles.codeSalle as room_name, salles.capacite as capacity,
  COALESCE(GROUP_CONCAT(IF(seances.Heure = '8-10' AND seances.jour=?, CONCAT(seances.CodeMod, ' | ', seances.NumGroupe), NULL)), 'Empty') AS eightToTen,
  COALESCE(GROUP_CONCAT(IF(seances.Heure = '10-12' AND seances.jour=?, CONCAT(seances.CodeMod, ' | ', seances.NumGroupe), NULL)), 'Empty') AS tenToTwelve,
  COALESCE(GROUP_CONCAT(IF(seances.Heure = '12-14' AND seances.jour=?, CONCAT(seances.CodeMod, ' | ', seances.NumGroupe), NULL)), 'Empty') AS twelveToFourteen,
  COALESCE(GROUP_CONCAT(IF(seances.Heure = '14-16' AND seances.jour=?, CONCAT(seances.CodeMod, ' | ', seances.NumGroupe), NULL)), 'Empty') AS fourteenToSixteen
  FROM salles
  LEFT JOIN seances ON salles.codeSalle = seances.codeSalle
  GROUP BY salles.codeSalle, salles.capacite;`;
      values = [jour, jour, jour, jour];
      const data = await dbQuery(sql, values);
      const salles = rooms.map((result) => result.room_name);
      // console.log(data)
      res.json({ roomData: data, rooms: salles });
    } else {
      sql = `SELECT salles.codeSalle as room_name, salles.capacite as capacity,
  COALESCE(GROUP_CONCAT(IF(seances.Heure = '8-10' AND seances.jour=?, CONCAT(seances.CodeMod, ' | ', seances.NumGroupe), NULL)), 'Empty') AS eightToTen,
  COALESCE(GROUP_CONCAT(IF(seances.Heure = '10-12' AND seances.jour=?, CONCAT(seances.CodeMod, ' | ', seances.NumGroupe), NULL)), 'Empty') AS tenToTwelve,
  COALESCE(GROUP_CONCAT(IF(seances.Heure = '12-14' AND seances.jour=?, CONCAT(seances.CodeMod, ' | ', seances.NumGroupe), NULL)), 'Empty') AS twelveToFourteen,
  COALESCE(GROUP_CONCAT(IF(seances.Heure = '14-16' AND seances.jour=?, CONCAT(seances.CodeMod, ' | ', seances.NumGroupe), NULL)), 'Empty') AS fourteenToSixteen
  FROM salles
  LEFT JOIN seances ON salles.codeSalle = seances.codeSalle
  WHERE salles.codeSalle =?
  GROUP BY salles.codeSalle, salles.capacite;`;
      values = [jour, jour, jour, jour, salle];
      const data = await dbQuery(sql, values);
      const salles = rooms.map((result) => result.room_name);
      // console.log(data)
      res.json({ roomData: data, rooms: salles });
    }
  } catch (err) {
    res.json({ message: "An error occurred" });
  }
};

exports.getTableGroupe = async (req, res) => {
  const { cycle, group } = req.query;
  if (cycle && !group) {
    const groupSql = `SELECT NumGroupe AS groups FROM groupes WHERE codeClasse=? `;
    try {
      const groupes = await dbQuery(groupSql, cycle);
      const data = groupes.map((result) => result.groups);
      return res.json(data);
    } catch (err) {
      res.json({ message: err });
    }
  } else {
    const sql = `SELECT COALESCE(CodeMod, 'VIDE') AS CodeMod, COALESCE(enseignants.Nom, 'VIDE') AS Nom,COALESCE(chapter, 'VIDE') AS Chapitre,COALESCE(etatDavancement, 'VIDE') AS etatDavancement
      FROM seances
      LEFT JOIN enseignants ON seances.IDEns = enseignants.IDEns
      WHERE codeClasse = ? AND NumGroupe = ?`;
    const values = [cycle, group];
    try {
      const data = await dbQuery(sql, values);
      res.json(data);
    } catch (err) {
      res.json({ message: err });
    }
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

exports.updateTest = async (req, res) => {
  try {
    const { year, day, hour, salle, type, group, module, IDSeance, teacher } =
      req.body.infos;

    const teachSql = `SELECT IDEns FROM enseignants WHERE Nom = ?`;
    const result = await dbQuery(teachSql, teacher);
    console.log(result[0].IDEns);

    const isRoomFree = await isFreeUpdate(day, salle, hour, IDSeance);

    if (isRoomFree) {
      const updateSql = `UPDATE seances 
      SET codeClasse = ?, jour = ?, Heure = ?, codeSalle = ?, codeType = ?, NumGroupe = ?, CodeMod = ?,IDEns=?
      WHERE IDSeance = ?`;
      const updateValues = [
        year,
        day,
        hour,
        salle,
        type,
        group,
        module,
        result[0].IDEns,
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
    const { year, day, hour, salle, type, group, module, teacher } =
      req.body.Info;
    const teachSql = `SELECT IDEns FROM enseignants WHERE Nom = ?`;
    const result = await dbQuery(teachSql, teacher);
    const isRoomFree = await isFreeAdd(day, salle, hour);
    if (isRoomFree) {
      const postSql = `INSERT INTO seances (codeClasse,jour,Heure,codeSalle,CodeMod,codeType,IDEns,NumGroupe) VALUES (?,?,?,?,?,?,?,?)`;
      const postValues = [
        year,
        day,
        hour,
        salle,
        module,
        type,
        result[0].IDEns,
        group,
      ];
      await dbQuery(postSql, postValues);
      return res.json({ message: "success" });
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

exports.addRoom = async (req, res) => {
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

exports.getChapters = async (req, res) => {
  const {module,chapitre}=req.query
  console.log(chapitre)
  if (!chapitre){
    try {
      let data = await dbQuery(`SELECT DISTINCT chapter FROM chaptertable WHERE CodeMod = ? ORDER BY chapter ASC
      `,module)
      const chapter = data.map((result) => result.chapter);
      res.json({chapter})
    } catch(err){
      console.log(err)
      res.json({message:err})
    }}
    else if (chapitre){
      try {
        data = await dbQuery(`SELECT sousChapitre from chaptertable WHERE CodeMod=? AND chapter =? ORDER BY sousChapitre ASC`,[module,chapitre])
        const sousChapitre = data.map((result) => result.sousChapitre)
        console.log(chapitre)
        console.log(sousChapitre)
        res.json({sousChapitre})
      }catch(err){
        console.log(err)
        res.json({message:err})
      }
}
};

exports.getGroupTableSettings = async (req, res) => {
  console.log(req.query);
  const IDEns = req.query.IDEns;
  const IDProf = parseInt(IDEns);
  console.log(IDProf);
  sql = `SELECT COALESCE(CodeMod, 'VIDE') AS CodeMod,codeClasse,NumGroupe as groupe, COALESCE(enseignants.Nom, 'VIDE') AS Nom,COALESCE(chapter, 'VIDE') AS Chapitre,COALESCE(etatDavancement, 'VIDE') AS etatDavancement
  FROM seances
  JOIN enseignants ON seances.IDEns = enseignants.IDEns
  WHERE seances.IDEns =?`;
  try {
    const data = await dbQuery(sql, IDProf);
    console.log(data)
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }
};
