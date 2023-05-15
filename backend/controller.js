
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

exports.createUser = async (req, res) => {
  const { Nom, email, password, role } = req.body;

  try {
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      return res.status(409).json({ error: "Email already exists" });
    } else {
      const encryptedpassword = await bcrypt.hash(password, 10);
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
    const sql = "SELECT * FROM enseignants WHERE email = ?";
    const values = [email];

    const result = await db.query(sql, values);

    if (result.length === 0) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    const { password: hashedPassword, role } = result[0];

    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (!passwordMatch) {
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
    const { email } = req.body;
    console.log(email);
    const sql = "SELECT * FROM enseignants WHERE email = ?";
    const values = [email];

    const result = await db.query(sql, values);

    if (result.length === 0) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const { IDEns } = result[0];
    const tokenPayload = { IDEns, email };
    const token = jwt.sign(tokenPayload,jwt_secret, { expiresIn: "5m" });

    const link = `https://localhost:8000/reset-password/${IDEns}/${token}`;

    await sendPasswordResetEmail(email, link);

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

async function sendPasswordResetEmail(email, link) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "t.kahia@esi-sba.dz",
        pass: "yourpassword",
      },
    });

    const mailOptions = {
      from: "t.kahia@esi-sba.dz",
      to: email,
      subject: "Password Reset",
      text: `Click the following link to reset your password: ${link}`,
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
    const { IDEns, token } = req.params;
    const IDsql = "SELECT * FROM enseignants WHERE IDEns = ?";
    const value = [IDEns];

    const result = await db.query(IDsql, value);
    if (result.length === 0) {
      return res.status(401).json({ error: "User Not Exist" });
    }
    const secret = jwt_secret + password;
    const verify = jwt.verify(token, secret);
    const { password } = req.body;
    const encryptedpassword = await bcrypt.hash(password, 10);
    const sql = "UPDATE enseignants SET password =? WHERE IDEns =?";
    const values = [encryptedpassword, IDEns];
    const updated = await db.query(sql, values);
    res.status(200).json({ message: "Password has been updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
