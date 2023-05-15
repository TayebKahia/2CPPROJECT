const sql="SELECT * FROM enseignants WHERE email=?";
db.query(sql,email,(err, result) => {
    if (err) {
      return res.json("Credentials Error");
    }
    if (result.length === 0) {
      return res.json({ success: false });
    }
}
)
function checkEmailExists(email) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
  
      connection.query(query, [email], (error, results) => {
        if (error) {
          reject(error);
          return;
        }
  
        const count = results[0].count;
        resolve(count > 0);
      });
    });
  }
  
  exports.createUser= async (req, res) => {
    const { name, email, password, role } = req.body;
  
    checkEmailExists(email)
      .then((emailExists) => {
        if (emailExists) {
          res.status(409).json({ error: 'Email already exists' });
        } else {
            const sql =
            "INSERT INTO enseignants ('Nom', 'email','password','role') VALUES (?)";
            const encryptedpassword = await bcrypt.hash(password, 10);
            const values = [Nom, email, encryptedpassword, role];
            db.query(sql, values, (err, data) => {
                if (err) {
                  return res.json("Error");
                }
                return res.json(data);
              });
          //res.status(200).json({ message: 'Registration successful' });
        }
      /*})
      .catch((error) => {
        console.error('Error checking email existence:', error);
        res.status(500).json({ error: 'Internal server error' });
      });*/
  })
}
  
  
 // const { json } = require('body-parser');
const express = require('express');
const tourController = require('../controllers/tourController');
// const {getAllTours,getTour,createTour,etc..} = require('./../controllers/tourController');
const router = express.Router();

router
  .route('/top-5-cheap')
  .get(
    tourController.aliasTopTour,
    tourController.getAllTours
  );
router
  .route('/tours-stats')
  .get(tourController.getTourStats);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);

router
  .route('/monthly-plan/:year')
  .get(tourController.getMonthlyPlan);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.UpdateTour)
  .delete(tourController.deleteTour);

  app.post("/tableGroupe", (req, res) => {
    const sql = `SELECT tableGroupe.CodeMod,enseignants.Nom,tableGroupe.etatDavancement
    FROM tableGroupe
    JOIN enseignants on tableGroupe.IDEns=enseignants.IDEns
    WHERE codeClasse =? AND NumGroupe =?`;
  
    const values = [req.body.cycle, req.body.group];
    db.query(sql, values, (err, data) => {
      if (err) {
        return res.status(404).json({ message: "Error" });
      }
      if (data.length === 0) {
        return res.json([
          { CodeMod: "VIDE", Nom: "VIDE", etatDavancement: "VIDE" },
        ]);
      }
      return res.json(data);
    });
  });
 

  exports.loginUser = (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM enseignants WHERE email = ?";
    const values = [email];
  
    db.query(sql, values, async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
  
      if (result.length === 0) {
        return res
          .status(401)
          .json({ success: false, error: "Invalid credentials" });
      }
  
      const { password: hashedPassword, role } = result[0];
  
      try {
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
    });
  };
  


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


  / app.update('/tableGroupe/:id',(req,res) => {
   
    //   const sql2 = `UPDATE tableGroupe SET etatDavancement =? WHERE codeClass=? AND  NumGroup =?`
    //   const sql = `SELECT tableGroupe.CodeMod,enseignants.Nom,tableGroupe.etatDavancement
    //   FROM tableGroupe
    //   JOIN enseignants on tableGroupe.IDEns=enseignants.IDEns
    //   WHERE codeClasse =? AND NumGroupe =? AND CodeMod =?`
    //   const values = [req.body.cycle,req.body.group,req.body.module]
    //   const values2 = [req.body.etatDavancement,req.body.cycle,req.body.group,]
    //   db.query(sql,values,(err,data)=>{
    //     if(err) {return res.status(404).json({message : 'Error'})};
    //     if (data.length===0) {return res.status(404).json({message : 'Error'})}
    //     if (data[0].IDEns!=IdUser) {return res.status(404).json({message:'You cannot change a class that isnt yours!'})}
    //     return db.query(sql,values,(err2,data2)=>{
    //   })
    // })
    // })
    ////////////////////////////////

   

    const nodemailer = require('nodemailer');
    exports.ForgotPassword = async (req, res) => {
        try {
          const { email } = req.body;
          const sql = "SELECT * FROM enseignants WHERE email = ?";
          const values = [email];
      
          const result = await db.query(sql, values);
      
          if (result.length === 0) {
            return res.status(401).json({ error: "Invalid email" });
          }
      
          const { IDEns, password } = result[0];
          const tokenPayload = { IDEns, email };
          const secret = jwt_secret + password;
          const token = jwt.sign(tokenPayload, secret, { expiresIn: "5m" });
      
          const link = `https://localhost:8000/reset-password/${IDEns}/${token}`;
      
          await sendPasswordResetEmail(email, link);
      
          res.status(200).json({ message: "Password reset email sent successfully" });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      };
    
  exports.ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const sql = "SELECT * FROM enseignants WHERE email = ?";
    const values = [email];

    const result = await db.query(sql, values);

    if (result.length === 0) {
      return res.status(401).json({ error: "Invalid email" });
    }

    const { IDEns, email: resultEmail } = result[0]; // Destructure IDEns and rename email to resultEmail
    const tokenPayload = { IDEns, email: resultEmail };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: "30m" });

    const link = `https://localhost:8000/reset-password/${encodeURIComponent(IDEns)}/${encodeURIComponent(token)}`;

    await sendPasswordResetEmail(resultEmail, link);

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
    