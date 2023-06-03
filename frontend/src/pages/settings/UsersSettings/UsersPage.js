import React, { useState, useMemo } from "react";
import "./UsersPage.css";
import { useTable } from "react-table";
import { Columns } from "../../../data/columnsUsers";
import { server } from "../../../data/server";

function UsersPage() {
  const [usersData, setUsersData] = useState([]);
  const columns = useMemo(() => Columns, []);
  const data = useMemo(() => usersData, [usersData]);
  const tableInstance = useTable({ columns, data });
  const [email, setEmail] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [role, setRole] = useState("admin");
  const [id, setId] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  React.useEffect(() => {
    fetch(`${server}/UserSettings`,{
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "ngrok-skip-browser-warning":"any"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setUsersData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleRowClick(row) {
    setSelectedRow(row);
    setNom(row.original.Nom);
    setPrenom(row.original.Prenom);
    setEmail(row.original.email);
    setRole(row.original.role);
    setId(row.original.IDEns);
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

  async function handleAdd(event) {
    event.preventDefault();
    await fetch(`${server}/UserSettings`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "ngrok-skip-browser-warning":"any"
      },
      body: JSON.stringify({
        Nom: nom,
        email: email,
        role: role,
        password: "ismail",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.role);
      })
      .catch((err) => {
        console.log(err);
        console.log("fetching error ");
      });

    fetch(`${server}/UserSettings`,{
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "ngrok-skip-browser-warning":"any"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setUsersData(data);
      })
      .catch((err) => console.log(err));
  }

  async function handleDelete(event) {
    event.preventDefault();
    await fetch(`${server}/UserSettings`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "ngrok-skip-browser-warning":"any",
      },
      body: JSON.stringify({
        IDEns: id,
      }),
    })
      .then((res) => res.json())
      .then()
      .catch((err) => {
        console.log(err);
        console.log("fetching error ");
      });

    fetch(`${server}/UserSettings`,{
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "ngrok-skip-browser-warning":"any"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setUsersData(data);
      })
      .catch((err) => console.log(err));
  }

  async function handleUpdate(event) {
    event.preventDefault();
    await fetch(`${server}/UserSettings`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "ngrok-skip-browser-warning":"any"
      },
      body: JSON.stringify({
        IDEns: id,
        Nom: nom,
        email: email,
        role: role,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(
          { id: id, nom: nom, prenom: prenom, email: email, role: role } +
            " has updated"
        );
      })
      .catch((err) => {
        console.log(err);
        console.log("fetching error ");
      });

    fetch(`${server}/UserSettings`,{
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        "ngrok-skip-browser-warning":"any"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setUsersData(data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="main-container user-settings-case">
      <div className="user-form-container">
        <form className="user-form users-settings">
          <div className="nom-container">
            <label htmlFor="user-label">Nom</label>
            <input
              className="user-input nom-input"
              type="text"
              placeholder="nom"
              value={nom}
              onChange={handleNom}
              name={"nom"}
            />
          </div>

          <div className="prenom-container">
            <label htmlFor="user-label ">Prenom</label>
            <input
              className="user-input prenom-input"
              type="text"
              placeholder="Prenom"
              value={prenom}
              onChange={handlePrenom}
              name={"prenom"}
            />
          </div>
          <div className="email-container">
            <label htmlFor="user-label">Email</label>
            <input
              className="user-input"
              type="email"
              placeholder="email"
              value={email}
              onChange={handleEmail}
              name={"email"}
            />
          </div>
          <div className="role-container">
            <select className="role-select" value={role} onChange={handleRole}>
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <button className="user-btn add" onClick={handleAdd}>
            Add
          </button>
          <button className="user-btn remove" onClick={handleDelete}>
            Delete
          </button>
          <button className="user-btn update" onClick={handleUpdate}>
            Update
          </button>
        </form>
      </div>

      <table className="user-table" {...getTableProps()}>
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
}
export default UsersPage;
