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

exports.createUser = async (req, res) => {
  const { Nom, email, password, role } = req.body;

  try {
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      return res.status(409).json({ error: "Email already exists" });
    } else {
      const encryptedpassword = await bcrypt.hash(password);
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

    const result = await dbQuery(sql, [values]);
    console.log(result);
    if (result.length === 0) {
      console.log("erro if result is empty");
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }
    console.log(result[0]);
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
    const {IDEns}=result[0];
    await sendPasswordResetEmail(email, OTP);

    res.status(200).json({
      IDEns:IDEns,
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
    const { IDEns,password} = req.body;
    const IDsql = "SELECT * FROM enseignants WHERE IDEns = ?";
    const value = [IDEns];

    const result = await dbQuery(IDsql, value);
    if (result.length === 0) {
      return res.status(401).json({ success:false,error: "User Not Exist" });
    }
    /*const secret = jwt_secret + password;
    const verify = jwt.verify(token, secret);*/


    const encryptedpassword = await bcrypt.hash(password, 10);
    console.log(encryptedpassword)
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
    res.status(200).json({ success:true,message: "Password has been updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Failed to update password" });
  }
  
};




