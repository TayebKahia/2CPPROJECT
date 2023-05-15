const express = require("express");
const cors = require("cors");
const app = express();
const route=require('./route')
app.use(cors());
app.use(express.json());
app.use(route);
/*function merge(data) {
  () => {
    let i = 0;
    while (i < data.length) {
      const resutlt = { ...data };
    }
    delete result[i].HeureFin;
    result[i].HeureDeb = data[i].HeureDeb + "-" + data[i].HeureFin;
    i++;
  };
  return result;
}
// app.get("/", (req, res) => {
//   res.json({message:'Server Connection established'})})
*/
//   //////////////////////////////SIGN UP


//////////////////////////////LOG IN

//////////////////////////////
/*app.get("/", (req, res) => {
  const sql = `SELECT tablesalles.codeSalle,seances.CodeMod,seances.NumGroupe
  FROM tablesalles
  JOIN seances ON tablesalles.eightToTen = seances.IDSeance
              OR tablesalles.tenToTwelve = seances.IDSeance 
              OR tablesalles.twelveToFourteen = seances.IDSeance 
              OR tablesalles.fourteenToSixteen = seances.IDSeance
  `;
  // const values =["S1","DIM"]
  console.log(sql);
  db.query(sql, (err, data) => {
    if (err) {
      return res.json({ message: "Error" });
    }
    return res.json(data);
  });
});*/

////////////////////////////////////


///////////////////////////////////
// app.update('/tableGroupe/:id',(req,res) => {
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

module.exports = app;
