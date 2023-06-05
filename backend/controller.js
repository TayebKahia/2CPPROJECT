const express = require("express");
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwt_secret = "dskjdafjhkvhjak25454h21xc(0][]{}dfkjahpsofjv05";
const db = require("./db-config");
const util = require("util");
const dbQuery = util.promisify(db.query).bind(db);
const {
  checkGroupeExist,
  checkExist,
  sendPasswordResetEmail,

  isFreeAdd,
  isFreeUpdate,
  isGroupFree

} = require("./API features");
//Salles Info

exports.getSalle = async (req, res) => {
  try {
    const sql = "SELECT * FROM salles";
    const result = await dbQuery(sql);
    res.json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the salle data." });
  }
};

exports.createSalle = async (req, res) => {
  const { codeSalle, desSalle, capacite } = req.body;
  try {
    const salleExist = await checkExist(codeSalle, "salles", "codeSalle");
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
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateSalle = async (req, res) => {
  try {
    const { IDSalle, desSalle, capacite, codeSalle } = req.body;
    const sql = `UPDATE salles
      SET desSalle = ?, capacite = ?, codeSalle = ?
      WHERE IDSalle = ?`;
    const values = [desSalle, parseInt(capacite), codeSalle, parseInt(IDSalle)];

    const result = await dbQuery(sql, values);
    res.json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the salle." });
  }
};

exports.deleteSalle = async (req, res) => {
  try {
    const { IDSalle } = req.body;
    const sql = "DELETE FROM salles WHERE IDSalle = ?";

    const result = await dbQuery(sql, [IDSalle]);
    res.json({ message: "Salle deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the salle." });
  }
};

// Modules INFO
exports.getModule = async (req, res) => {
  try {
    const sql = "SELECT * FROM modules ORDER BY codeMod";
    const result = await dbQuery(sql);
    res.json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the module data." });
  }
};

exports.createModule = async (req, res) => {
  const { CodeMod, DesMod, codeClasse } = req.body;
  try {
    const moduleExist = await checkExist(CodeMod, "modules", "CodeMod");
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
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateModule = async (req, res) => {
  try {
    const { CodeMod, DesMod, codeClasse, IDMod } = req.body;
    const sql = `UPDATE modules
      SET CodeMod = ?, DesMod = ?, codeClasse = ?
      WHERE IDMod = ?`;
    const values = [CodeMod, DesMod, codeClasse, IDMod];
    const result = await dbQuery(sql, values);
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the module." });
  }
};

exports.deleteModule = async (req, res) => {
  try {
    const { IDMod } = req.body;

    if (!IDMod) {
      return res.status(400).json({ error: "IDMod is required" });
    }

    const sql = "DELETE FROM modules WHERE IDMod = ?";
    const result = await dbQuery(sql, [parseInt(IDMod)]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Module not found" });
    }

    res.json({ message: "Module deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the module." });
  }
};

//Groupes INFO
exports.getGroupe = async (req, res) => {
  try {
    const sql = "SELECT * FROM groupes";
    const result = await dbQuery(sql);
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the groupes." });
  }
};

exports.createGroupe = async (req, res) => {
  const { codeClasse, NumGroupe, section } = req.body;
  try {
    const groupeExist = await checkGroupeExist(codeClasse, NumGroupe);
    if (groupeExist) {
      return res.status(409).json({ error: "Groupe deja exister" });
    } else {
      const sql =
        "INSERT INTO groupes (codeClasse,NumGroupe,section) VALUES (?)";
      const values = [codeClasse, NumGroupe, section];
      const data = await dbQuery(sql, [values]);
      return res
        .status(200)
        .json({ message: "Groupe added successful", data: data });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateGroupe = async (req, res) => {
  try {
    const { codeClasse, NumGroupe, section, IDGroupe } = req.body;

    if (!codeClasse || !NumGroupe || !section || !IDGroupe) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = `UPDATE groupes
      SET codeClasse = ?, NumGroupe = ?, section = ?
      WHERE IDGroupe = ?`;

    const values = [codeClasse, NumGroupe, section, parseInt(IDGroupe)];
    const result = await dbQuery(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Groupe not found" });
    }

    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the groupe." });
  }
};

exports.deleteGroupe = async (req, res) => {
  try {
    const { IDGroupe } = req.body;

    if (!IDGroupe) {
      return res.status(400).json({ error: "IDGroupe is required" });
    }
    const sql = "DELETE FROM groupes WHERE IDGroupe = ?";
    const values = [parseInt(IDGroupe)];
    const result = await dbQuery(sql, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Groupe not found" });
    }
    res.json({ message: "Groupe deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the groupe." });
  }
};

// Users Info
exports.getUser = async (req, res) => {
  try {
    const sql = `SELECT * FROM enseignants WHERE role <> 'admin'`;
    const result = await dbQuery(sql);
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the users." });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { IDEns, Prenom, Nom, email, role, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);
    const sql = `UPDATE enseignants
      SET Nom = ?, Prenom = ?, email = ?, role = ?, password = ?
      WHERE IDEns = ?`;
    const values = [
      Nom,
      Prenom,
      email,
      role,
      encryptedPassword,
      parseInt(IDEns),
    ];


    const result = await dbQuery(sql, values);

    res.json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the user." });
  }
};

exports.createUser = async (req, res) => {
  const { Nom, Prenom, email, password, role } = req.body;
  try {
    const emailExists = await checkExist(email, "enseignants", "email");
    if (emailExists) {
      return res.status(409).json({ error: "Email already exists" });
    } else {
      const encryptedpassword = await bcrypt.hash(password, 10);
      const sql =
        "INSERT INTO enseignants (Nom,Prenom, email, password, role) VALUES (?)";
      const values = [Nom, Prenom, email, encryptedpassword, role];
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
  try {
    const { IDEns } = req.body;
    if (!IDEns) {
      return res.status(400).json({ error: "IDEns is required" });
    }
    const sql = "DELETE FROM enseignants WHERE IDEns = ?";
    const values = [parseInt(IDEns)];
    const result = await dbQuery(sql, values);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user." });
  }
};

// LOGIN API
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
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

    // const tokenPayload = { email, role };
    // const token = jwt.sign(tokenPayload, jwt_secret, { expiresIn: "1h" });

    return res.status(200).json({ success: true, role, IDEns });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Forgot Password

exports.ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(req.body);
    const OTP = Math.floor(Math.random() * 9000 + 1000);
    const sql = "SELECT * FROM enseignants WHERE email = ?";
    const OTPSql = "UPDATE enseignants SET OTP=? where email =? ";
    const otpvalues = [OTP, email];
    const otpSent = await dbQuery(OTPSql, otpvalues);
    const values = [email];
    const result = await dbQuery(sql, values);
    if (result.length === 0) {
      return res.status(401).json({ success: false, error: "Invalid email" });
    }
    const { IDEns } = result[0];
    const html = process.env.HTML;
    const htmlWithOTP = html.replace("${OTP}", OTP);
    await sendPasswordResetEmail(email, htmlWithOTP);

    res.status(200).json({
      IDEns: IDEns,
      success: true,
      message: "Password reset email sent successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.confirmOTP = async (req, res) => {
  try {
    const { IDEns } = req.body;
    console.log(req.body);
    const sql = "SELECT * FROM enseignants WHERE IDEns = ?";
    const values = [IDEns];
    const result = await dbQuery(sql, values);
    const { OTP } = result[0];
    console.log(OTP);
    res.status(200).json({
      OTP: OTP,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updatePassword = async (req, res) => {
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
    const encryptedpassword = await bcrypt.hash(password, 10);
    const sql = "UPDATE enseignants SET password =? WHERE IDEns =?";
    const values = [encryptedpassword, IDEns];
    const updated = await dbQuery(sql, values);
    const affectedRows = updated.affectedRows;
    if (affectedRows === 0) {
      return res
        .status(400)
        .json({ success: false, error: "Password update failed" });
    }
    res.status(200).json({
      success: true,
      message: "Password has been updated successfully",
    });
  } catch (error) {
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
    const roomSql = `SELECT codeSalle as room_name FROM salles ORDER BY room_name`;
    const rooms = await dbQuery(roomSql);
    let sql;
    let values;
    let data;
    let salles;
    if (isEvery === "true") {
      sql = `SELECT salles.codeSalle as room_name, salles.capacite as capacity,
  COALESCE(GROUP_CONCAT(IF(seances.Heure = '8-10' AND seances.jour=?, CONCAT(seances.CodeMod, ' | ', seances.NumGroupe), NULL)), 'Libre') AS eightToTen,
  COALESCE(GROUP_CONCAT(IF(seances.Heure = '10-12' AND seances.jour=?, CONCAT(seances.CodeMod, ' | ', seances.NumGroupe), NULL)), 'Libre') AS tenToTwelve,
  COALESCE(GROUP_CONCAT(IF(seances.Heure = '12-14' AND seances.jour=?, CONCAT(seances.CodeMod, ' | ', seances.NumGroupe), NULL)), 'Libre') AS twelveToFourteen,
  COALESCE(GROUP_CONCAT(IF(seances.Heure = '14-16' AND seances.jour=?, CONCAT(seances.CodeMod, ' | ', seances.NumGroupe), NULL)), 'Libre') AS fourteenToSixteen,
  COALESCE(GROUP_CONCAT(IF(seances.Heure = '16-17' AND seances.jour=?, CONCAT(seances.CodeMod, ' | ', seances.NumGroupe), NULL)), 'Libre') AS sixteenToSeventeen
  FROM salles
  LEFT JOIN seances ON salles.codeSalle = seances.codeSalle
  GROUP BY salles.codeSalle, salles.capacite;`;
      values = [jour, jour, jour, jour];
      data = await dbQuery(sql, values);
      salles = rooms.map((result) => result.room_name);
      res.json({ roomData: data, rooms: salles });
    } else {
      sql = `SELECT salles.codeSalle as room_name, salles.capacite as capacity,
  COALESCE(GROUP_CONCAT(IF(seances.Heure = '8-10' AND seances.jour=?, CONCAT(seances.CodeMod, ' | ', seances.NumGroupe), NULL)), 'Libre') AS eightToTen,
  COALESCE(GROUP_CONCAT(IF(seances.Heure = '10-12' AND seances.jour=?, CONCAT(seances.CodeMod, ' | ', seances.NumGroupe), NULL)), 'Libre') AS tenToTwelve,
  COALESCE(GROUP_CONCAT(IF(seances.Heure = '12-14' AND seances.jour=?, CONCAT(seances.CodeMod, ' | ', seances.NumGroupe), NULL)), 'Libre') AS twelveToFourteen,
  COALESCE(GROUP_CONCAT(IF(seances.Heure = '14-16' AND seances.jour=?, CONCAT(seances.CodeMod, ' | ', seances.NumGroupe), NULL)), 'Libre') AS fourteenToSixteen
  COALESCE(GROUP_CONCAT(IF(seances.Heure = '16-17' AND seances.jour=?, CONCAT(seances.CodeMod, ' | ', seances.NumGroupe), NULL)), 'Libre') AS sixteenToSeventeen
  FROM salles
  LEFT JOIN seances ON salles.codeSalle = seances.codeSalle
  WHERE salles.codeSalle =?
  GROUP BY salles.codeSalle, salles.capacite;`;
      values = [jour, jour, jour, jour, salle];
      data = await dbQuery(sql, values);
      salles = rooms.map((result) => result.room_name);
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
    const sql = `SELECT COALESCE(CodeMod, 'Empty') AS CodeMod, COALESCE(enseignants.Nom, 'Empty') AS Nom,COALESCE(chapter, 'Empty') AS Chapitre,COALESCE(etatDavancement, 'Empty') AS etatDavancement
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


exports.updateTest = async (req, res) => {
  try {
    const { year, day, hour, salle, type, group, module, IDSeance, teacher } =
      req.body.infos;

    const teachSql = `SELECT IDEns FROM enseignants WHERE Nom = ?`;
    const result = await dbQuery(teachSql, teacher);
    const groupFree = await isGroupFree(day,hour,group)
    const isRoomFree = await isFreeUpdate(day, salle, hour, IDSeance);
    if (isRoomFree) {
      if (groupFree) {
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
    }else {res.json({message: "Group already has a session"})}} 
    else { return res.json({ message: "Room already being Used" });
    }
  } catch (err) {
    console.error(err);
    return res.json({ message: "An Update Error Occurred" });
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
      return res.json({ message: "Success" });
    } else {
      return res.json({ message: "Room Is Already Being Used" });
    }
  } catch (err) {
    return res.json({ message: "An Creation Error occurred" });
  }
};

exports.deleteSettingsTable = async (req, res) => {
  try {
    const IDSeances = req.body.IDSeance;
    await dbQuery(`DELETE FROM seances WHERE IDSeance=?`, parseInt(IDSeances));
    return res.json({ message: `Session deleted successfully` });
  } catch (err) {
    return res.json({ message: "An Delete Error occurred" });
  }
};

exports.getChapters = async (req, res) => {
  const { module } = req.query;
  console.log("GetChapter " + req.query);
  try {
    const selectQuery = "SELECT * FROM salles WHERE codeSalle=?";
    const selectValues = [req.body.codeSalle];
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
  const {module}=req.query
    try {
      let data = await dbQuery(`SELECT DISTINCT chapter FROM chaptertable WHERE CodeMod = ? ORDER BY chapter ASC
      `,module)
      const chapter = data.map((result) => result.chapter);
      // console.log(chapter)
      res.json({chapter})
    } catch(err){
    console.log(err)
    res.json({message:err})
  }
};



exports.getSousChapitre = async (req, res) => {
  const { module, chapitre } = req.query;
  try {
    data = await dbQuery(
      `SELECT sousChapitre from chaptertable WHERE CodeMod=? AND chapter =? ORDER BY sousChapitre ASC`,
      [module, chapitre]
    );
    const sousChapitre = data.map((result) => result.sousChapitre);
    console.log("GetSousChapitre" + sousChapitre);
    res.json({ sousChapitre });
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

exports.updateChapters = async (req, res) => {
  const { IDSeance, chapter, sousChapitre } = req.body.infos;
  console.log(req.body.infos);
  const sql = `UPDATE seances
 SET chapter = ?,etatDavancement = ?
 WHERE IDSeance=? `;
  const values = [chapter, sousChapitre, IDSeance];
  try {
    const result = await dbQuery(sql, values);
    console.log(result);
    res.json(result);
  } catch (err) {
    res.json({ message: err });
  }
};
exports.getGroupTableSettings = async (req, res) => {
  console.log(req.query);
  const IDEns = req.query.IDEns;
  const IDProf = parseInt(IDEns);
  console.log(IDProf);
  sql = `SELECT IDSeance,COALESCE(CodeMod, 'VIDE') AS CodeMod,codeClasse,NumGroupe as groupe, COALESCE(enseignants.Nom, 'VIDE') AS Nom,COALESCE(chapter, 'VIDE') AS Chapitre,COALESCE(etatDavancement, 'VIDE') AS etatDavancement
  FROM seances
  JOIN enseignants ON seances.IDEns = enseignants.IDEns
  WHERE seances.IDEns =?`;
  try {
    data = await dbQuery(`SELECT sousChapitre from chaptertable WHERE CodeMod=? AND chapter =? ORDER BY sousChapitre ASC`,[module,chapitre])
    const sousChapitre = data.map((result) => result.sousChapitre)
    console.log("GetSousChapitre " +sousChapitre)
    res.json({sousChapitre})
  }catch(err){
    console.log(err)
    res.json({message:err})
  }
}

exports.getScheduleTable = async (req,res)=>{
  const sql = `SELECT jours.jour AS day, heures.Heure AS heur, COALESCE(seances.NumGroupe, groupes.NumGroupe) AS "group",
  COALESCE(enseignants.Nom, 'Libre') AS prof,
  COALESCE(seances.codeType, 'Libre') AS type,
  COALESCE(seances.CodeMod, 'Libre') AS moduleName,
  COALESCE(seances.codeClasse, groupes.codeClasse) AS codeClasse,
  COALESCE(groupes.section, groupes.section) AS section,
  COALESCE(seances.codeSalle, 'Libre') AS salle
FROM (
SELECT DISTINCT jour
FROM jours
) jours
CROSS JOIN heures
CROSS JOIN (
SELECT DISTINCT NumGroupe, codeClasse, section
FROM groupes
) AS groupes
LEFT JOIN seances ON jours.jour = seances.jour AND heures.Heure = seances.Heure AND seances.NumGroupe = groupes.NumGroupe AND seances.codeClasse = groupes.codeClasse 
LEFT JOIN enseignants ON seances.IDEns = enseignants.IDEns
WHERE heures.Heure <> '12-14' AND groupes.codeClasse = '2CP' AND groupes.section = 'A'
ORDER BY "group";`
  try{
    data = await dbQuery(sql)
    res.json(data)
  }
  catch(err){
    res.json({message:err})
  }
}


exports.updateChapters=async (req,res)=>{
const{IDSeance,chapter,sousChapitre}=req.body.infos;
const sql=`UPDATE seances
 SET chapter = ?,etatDavancement = ?
 WHERE IDSeance=? `
const values=[chapter,sousChapitre,IDSeance];
try{const result=await dbQuery(sql, values);
  console.log("Success");
  res.json(result);}
  catch(err){res.json({message:err})}

}


exports.getGroupTableSettings = async (req, res) => {
  const {IDEns,role} = req.query;
  let sql;
  if (role !="teacher"){
    sql=`SELECT IDSeance,COALESCE(CodeMod, 'VIDE') AS CodeMod,codeClasse,NumGroupe as groupe, COALESCE(enseignants.Nom, 'VIDE') AS Nom,COALESCE(chapter, 'VIDE') AS Chapitre,COALESCE(etatDavancement, 'VIDE') AS etatDavancement
    FROM seances
    JOIN enseignants ON seances.IDEns = enseignants.IDEns`
  }
  else{const IDProf = parseInt(IDEns);
    sql = `SELECT IDSeance,COALESCE(CodeMod, 'VIDE') AS CodeMod,codeClasse,NumGroupe as groupe, COALESCE(enseignants.Nom, 'VIDE') AS Nom,COALESCE(chapter, 'VIDE') AS Chapitre,COALESCE(etatDavancement, 'VIDE') AS etatDavancement
    FROM seances
    JOIN enseignants ON seances.IDEns = enseignants.IDEns
    WHERE seances.IDEns =?`;
    try {
    const data = await dbQuery(sql, IDProf);
    res.json(data);
  } catch (err) {
    res.json({ message: err });
  }
}};


exports.getTeacherSettings= async (req,res)=>{
  try {
    const {year,IDEns} = req.query;
    const sql = `SELECT NumGroupe FROM seances WHERE codeClasse=? AND IDEns=? `;
    const sql2 = `SELECT codeSalle FROM salles`;
    const sql3 = `SELECT CodeMod FROM seances Where codeClasse=? AND IDEns=?`;
    const sql4 = `SELECT heure FROM heures`;
    ////////////////////////////////
    const groupes = await dbQuery(sql,[year,IDEns]);
    const numGroupes = groupes.map((result) => result.NumGroupe);
    ////////////////////////////////
    const rooms = await dbQuery(sql2);
    const salles = rooms.map((result) => result.codeSalle);
    /////////////// //
    const matieres = await dbQuery(sql3,[year,IDEns]);
    const numMatieres = matieres.map((result) => result.CodeMod);
    ////////////////////////////////
    const hours = await dbQuery(sql4);
    const numHeures = hours.map((result) => result.heure);
    ////////////////////////////////
    const data = [numGroupes, salles, numMatieres, numHeures];
    res.json({
      groups: data[0],
      rooms: data[1],
      modules: data[2],
      hours: data[3],
    });
  } catch (err) {
    res.json(err);
  }
} 
