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
  const sql = `UPDATE groupes
  SET  codeClasse= ?,NumGroupe= ?,section = ?
  WHERE IDGroupe=?`;
  const { codeClasse, NumGroupe, section, IDGroupe } = req.body;
  console.log(req.body);

  const values = [Nom, email, role, parseInt(IDGroupe)];
  const result = await dbQuery(sql, values);

  res.json(result);
};

exports.deleteModule = async (req, res) => {
  sql = "DELETE FROM modules WHERE IDMod=?";
  const { IDMod } = req.body;
  const result = await dbQuery(sql, [IDMod]);
  res.json({ message: "Module deleted successfully" });
};

exports.updateModule = async (req, res) => {
  const sql = `UPDATE modules
    SET (CodeMod,DesMod,codeClasse)
    VALUES (?)
    WHERE IDMod=?`;
  const { IDMod, CodeMod, DesMod, codeClasse } = req.body;
  const values = [IDMod, CodeMod, DesMod, codeClasse];
  const result = await dbQuery(sql, values);
  res.json(result);
};

exports.deleteUser = async (req, res) => {
  sql = "DELETE FROM enseignants WHERE IDEns=?";
  const { IDEns } = req.body;
  const result = await dbQuery(sql, [IDEns]);
  res.json({ message: "User deleted successfully" });
};
exports.deleteUser = async (req, res) => {
  sql = "DELETE FROM enseignants WHERE IDEns=?";
  const { IDEns } = req.body;
  const result = await dbQuery(sql, [IDEns]);
  res.json({ message: "User deleted successfully" });
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
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      return res.status(409).json({ error: "Email already exists" });
    } else {
      const encryptedPassword = await bcrypt.hash(password, 10);
      const sql =
        "INSERT INTO enseignants (Nom, email, password, role) VALUES (?)";
      const values = [Nom, email, encryptedPassword, role];
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
  const result = await dbQuery(sql, [IDEns]);
  res.json({ message: "User deleted successfully" });
};


exports.ForgotPassword = async (req, res) => {
  try {
    const { email} = req.body;
    const OTP = Math.floor(Math.random() * 9000 + 1000);
    const sql = "SELECT * FROM enseignants WHERE email = ?";
    const OTPSql="UPDATE enseignants SET OTP=? where email =? ";
    const otpvalues=[OTP,email];
    const otpSent=await dbQuery(OTPSql,otpvalues);
    const values = [email];
    const result = await dbQuery(sql, values);
    if (result.length === 0) {
      console.log("error happen in length");
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
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


exports.confirmOTP= async (req, res) => {
  try {
    const {IDEns} = req.body;
    const sql = "SELECT * FROM enseignants WHERE IDEns = ?";
    const values = [IDEns];
    const result = await dbQuery(sql, values);
    const {OTP} = result[0];
    res.status(200).json({
      OTP:OTP
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};