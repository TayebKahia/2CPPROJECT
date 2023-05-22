const express = require('express');
const cors = require('cors');
const db =require('./db-config')
const path = require('path');
const cookieParser = require('cookie-parser');
const util = require("util");
const dbQuery = util.promisify(db.query).bind(db);

const app = express();

app.use(cors());
app.use(express.json())

db.connect((err)=>{
  if(err) throw err;
  console.log('Connected to database');
})



//   //////////////////////////////SIGN UP
/*app.post("/register",(req,res)=>{
  const sql = "INSERT INTO users ('name', 'email','password') VALUES (?)"
  const values = [req.body.name, req.body.email, req.body.password]
  db.query(sql, values, (err, data) => {
    if(err) {return res.json("Error")};
    return res.json(data);
  })
})*/


/////////////////////////////////Pour la carte des modifications
/*app.post("/settings",async (req,res)=>{
  const sql = `SELECT NumGroupe FROM groupes WHERE codeClasse=? `
  const values=[req.body.year]
  const sql2=`SELECT codeSalle FROM salles`
  const sql3=`SELECT CodeMod FROM modules Where codeClasse=?`
  const sql4=`SELECT heure FROM heures`
  ////////////////////////////////
  const groupes= await dbQuery(sql,values)
  const numGroupes = groupes.map(result => result.NumGroupe);
  ////////////////////////////////
  const rooms = await dbQuery(sql2)
  const salles = rooms.map(result => result.codeSalle);
  /////////////// //
  const matieres= await dbQuery(sql3,values)
  const numMatieres = matieres.map(result => result.CodeMod)
  ////////////////////////////////
  const hours = await dbQuery(sql4)
  const numHeures = hours.map(result => result.heure)
  const data=[numGroupes,salles,numMatieres,numHeures]
  res.json({groups:data[0],rooms:data[1],modules:data[2],hours:data[3]})
})*/

///////////////////////////////////////////////////////////Pour filtre le tableau Settings
/*app.post('/settingsTable', (req, res) => {
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
      return res.status(500).json({ error: 'An error occurred' });
    }
    
    return res.json(data);
  });
});*/


//////////////////////////////LOG IN
/*app.post("/",(req,res)=>{
  const sql = "SELECT * FROM enseignants WHERE email =? AND password =?"
  const values = [req.body.email, req.body.password]
  console.log(req.body)
  db.query(sql, [req.body.email, req.body.password], (err, result) => {
    if(err) {return res.json("Credentials Error")};
    if(result.length === 0) {return res.json({success: false})};
    return  res.status(200).json({role:result[0].role, success: true,IDEns:result[0].IDEns});})
    
  })*/

//////////////////////////////ROOM TABLE
/*app.post('/roomTable', (req, res) => {
  const sql = `SELECT salles.codeSalle as room_name, salles.capacite as capacity,
  COALESCE(GROUP_CONCAT(IF(seances.Heure = '8-10' AND seances.jour=?, CONCAT(seances.CodeMod, ' | ', seances.NumGroupe), NULL)), 'Empty') AS eightToTen,
  COALESCE(GROUP_CONCAT(IF(seances.Heure = '10-12' AND seances.jour=?, CONCAT(seances.CodeMod, ' | ', seances.NumGroupe), NULL)), 'Empty') AS tenToTwelve,
  COALESCE(GROUP_CONCAT(IF(seances.Heure = '12-14' AND seances.jour=?, CONCAT(seances.CodeMod, ' | ', seances.NumGroupe), NULL)), 'Empty') AS twelveToFourteen,
  COALESCE(GROUP_CONCAT(IF(seances.Heure = '14-16' AND seances.jour=?, CONCAT(seances.CodeMod, ' | ', seances.NumGroupe), NULL)), 'Empty') AS fourteenToSixteen
  FROM salles
  LEFT JOIN seances ON salles.codeSalle = seances.codeSalle
  GROUP BY salles.codeSalle, salles.capacite;`
  values=[req.body.jour,req.body.jour,req.body.jour,req.body.jour]
  db.query(sql,values,(err, data) => {
    if(err) {return res.json({message : "Error"})};
    return res.json(data)
  })  
})*/

////////////////////////////////////
/*app.post('/tableGroupe', (req, res) => {
  // Validate input
  const { cycle, group } = req.body;
  if (!cycle || !group) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  const sql = `SELECT COALESCE(CodeMod, 'VIDE') AS CodeMod, COALESCE(enseignants.Nom, 'VIDE') AS Nom, COALESCE(etatDavancement, 'VIDE') AS etatDavancement
               FROM seances
               JOIN enseignants ON seances.IDEns = enseignants.IDEns
               WHERE codeClasse = ? AND NumGroupe = ?`;

  const values = [cycle, group];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    return res.json(data);
  });
});*/


const isFree = async (day, salle, hour, IDSeance) => {
  try {
    const freeSql = 'SELECT * FROM seances WHERE jour = ? AND codeSalle = ? AND heure = ?';
    const freeValues = [day, salle, hour];

    const data = await dbQuery(freeSql, freeValues);
    return data.length === 0 || (data[0]?.IDSeance === parseInt(IDSeance));
  } catch (err) {
    console.error(err);
    throw err;
  }
};
const isFree2 = async (day, salle, hour) => {
  try {
    const freeSql = 'SELECT * FROM seances WHERE jour = ? AND codeSalle = ? AND heure = ?';
    const freeValues = [day, salle, hour];

    const data = await dbQuery(freeSql, freeValues);
    return data.length === 0 ;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

/*app.put('/test', async (req, res) => {
  try {
    const { year, day, hour, salle, type, group, module, IDSeance, teacher } = req.body.infos;

    // const teachSql = `SELECT IDEns FROM enseignants WHERE Nom = ?`;
    // const [teacherRow] = await dbQuery(teachSql, [teacher.nom]);
    // const IDEns = teacherRow?.IDEns || null;

    const isRoomFree = await isFree(day, salle, hour, IDSeance);

    if (isRoomFree) {
      const updateSql = `UPDATE seances 
        SET codeClasse = ?, jour = ?, Heure = ?, codeSalle = ?, codeType = ?, NumGroupe = ?, CodeMod = ?
        WHERE IDSeance = ?`;
      const updateValues = [year, day, hour, salle, type, group, module, IDSeance];

      await dbQuery(updateSql, updateValues);
      return res.json({ message: 'Success' });
    } else {
      return res.json({ message: 'Room Is Already Being Used' });
    }
  } catch (err) {
    console.error(err);
    return res.json({ message: 'An error occurred' });
  }
});*/

/*app.post('/test',async (req,res)=>{
  try{
    const { year, day, hour, salle, type, group, module } = req.body.Info;
    const isRoomFree = await isFree2(day,salle,hour);
    if (isRoomFree){
      const postSql=`INSERT INTO seances (codeClasse,jour,Heure,codeSalle,CodeMod,codeType,IDEns,NumGroupe) VALUES (?,?,?,?,?,?,1,?)`
      const postValues =[year,day,hour,salle,module,type,group]
      await dbQuery(postSql,postValues)
      return res.json({message : 'Success'})
    }
    else {return res.json({message:'Room Is Already Being Used'})
  }
}  catch (err) {
  return res.json({message:'An error occurred'})
}
})*/

/*app.delete('/settingsTable',async (req,res)=>{
  try{
    const IDSeances=req.body.IDSeance
    console.log(IDSeances)
    await dbQuery(`DELETE FROM seances WHERE IDSeance=?`,parseInt(IDSeances))
    return res.json({message : `Seance deleted successfully`})
  }
  catch (err) {
    return res.json({message:'An error occurred'})
  }
})*/








// /////////////////////////////////
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
// //////////////////////////////

// app.post('room',(req,res)=>{
//   const sql = "Select * from salles where codeSalle=?"
//   const values = [req.body.codeSalle, req.body.desSalle,req.body.capacite];
//   db.query(sql,values,(err,data)=>{
//     if (err) {return res.json({success:false,message:err})}
//     else if (data.length===0) {db.query('INSERT INTO `salles` (`codeSalle`, `desSalle`, `capacite`) VALUES=(?,?,?)',values,(err2,data2)=>{
//       if (err2) {return res.json(err2)}
//       return res.status(201).json({success:true,message:'Room created successfully'})
//     })}
//     return res.json({message : 'Room already exists'})
//   })
// })
/*app.post('/room', async (req, res) => {
  try {
    const selectQuery = "SELECT * FROM salles WHERE codeSalle=?";
    const selectValues = [req.body.codeSalle];
    console.log(selectValues)
    const rooms =  await dbQuery(selectQuery, selectValues);
    
    if (rooms.length ===0 ) {
      const insertQuery = "INSERT INTO salles (codeSalle, desSalle, capacite) VALUES (?, ?, ?)";
      const insertValues = [req.body.codeSalle, req.body.desSalle, req.body.capacite];
      await db.query(insertQuery, insertValues);
      return res.status(201).json({ success: true, message: 'Room created successfully' });
    }
    
    return res.json({ message : 'Room already exists' })
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
});*/

app.get(`/timeTable`,(req,res)=>{
    const sql =`SELECT jour as day,heure as heur,codeType as type,CodeMod as moduleName,NumGroupe as 'group',codeSalle as salle FROM seances
    JOIN enseignants on seances.IDEns =enseignants.IDEns`
    db.query(sql,(err,data)=>{
      if(err) throw err
      return res.json(data)
   })
})


app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});


