import React, { useState, useMemo } from "react";
import "./UsersPage.css";
import { useTable } from "react-table";
import UsersList from "../../../data/UsersList.json";
import { Columns } from "../../../data/columnsUsers";

export const UsersPage = () => {
  const [usersData, setUsersData] = useState([]);
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => usersData, []);
  const tableInstance = useTable({ columns, data });
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
 




  React.useEffect(() => {
    fetch("https://127.0.0.1:8000/Usersettings")
      .then((res) => res.json())
      .then((data) => {
        setUsersData(data);
      })
      .catch((err) => console.log(err));
  }, []);



  function handleRowClick(row) {
    setSelectedRow(row);
    setNom(row.original.nom);
    setPrenom(row.original.prenom);
    setEmail(row.original.email);
    setRole(row.original.role);
    setId(row.original.id);
  }
  function handleNom(event) {
    setNom(event.target.value);
  }

  function handlePrenom(event) {
    setPrenom(event.target.value);
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handleRole(event) {
    setRole(event.target.value);
  }

  function handleAdd(event) {
    event.preventDefault();
    fetch("https://127.0.0.1:8000/Usersettings", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        nom: nom,
        prenom: prenom,
        email: email,
        role: role,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log(
            { id: id, nom: nom, prenom: prenom, email: email, role: role } +
              " has updated"
          );
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("fetching error ");
      });




      fetch("https://127.0.0.1:8000/Usersettings")
      .then((res) => res.json())
      .then((data) => {
        setUsersData(data);
      })
      .catch((err) => console.log(err));
  }

  function handleDelete(event) {
    event.preventDefault();
  }

  function handleUpdate(event) {
    event.preventDefault();
  }

  return (
    <div className="main-container">
      <div className="form-container">
        <form className="users-settings">
          <div className="nom-container">
            <input
              className="nom-input"
              type="text"
              placeholder="nom"
              value={nom}
              onChange={handleNom}
            />
            <label htmlFor="nom">Nom</label>
          </div>

          <div className="prenom-container">
            <input
              className="prenom-input"
              type="text"
              placeholder="Prenom"
              value={prenom}
              onChange={handlePrenom}
            />
            <label htmlFor="prenom">Prenom</label>
          </div>
          <div className="email-container">
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={handleEmail}
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="role-container">
            <select className="role-select" value={role} onChange={handleRole}>
              <option value="Admin">Admin</option>
              <option value="Teacher">Teacher</option>
            </select>
          </div>
          <button className="add" onClick={handleAdd}>
            Add
          </button>
          <button className="remove" onClick={handleDelete}>
            Delete
          </button>
          <button className="update" onClick={handleUpdate}>
            Update
          </button>
        </form>
      </div>

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => handleRowClick(row)}
                className={row === selectedRow ? "selected" : ""}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
