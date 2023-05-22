import React from "react";
import accounts from "../../data/accountsData";
import { Link, useNavigate } from "react-router-dom";
import { server } from "../../data/server";

function Login(props) {
  const [formData, setFormData] = React.useState({ email: "", password: "" });

  const navigate = useNavigate();

  const [formErrors, setFormErrors] = React.useState({});

  const [formIsValid, setFormIsValid] = React.useState(false);

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const [accountsData, setEmailData] = React.useState(accounts.data.accounts);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
    validateField(name, value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    if (formIsValid) {
      fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
              props.setRole(data.role);
              sessionStorage.setItem("role", data.role);
              localStorage.setItem("table", "Time Table");
              navigate("/tables");
            }
        })
        .catch((err) => {
          console.log("error is in login catch");
          console.log(err);
        });

      // for(let i=0 ; i<accountsData.length ; i++){
      //     if(formData.email=== accountsData[i].email){
      //         if(formData.password === accountsData[i].password){
      //             props.setRole(accountsData[i].role)
      //             sessionStorage.setItem("role",accountsData[i].role)

      //             navigate("/tables")
      //             break;
      //         }
      //     }
      // }
    }
  }

  const validateField = (name, value) => {
    let errors = { ...formErrors };
    switch (name) {
      case "email":
        errors.email =
          !value || !/\S+@\S+\.\S+/.test(value)
            ? "Please enter a valid email address"
            : "";
        break;
      case "password":
        errors.password =
          !value || value.length < 6
            ? "Password must be at least 6 characters long"
            : "";
        break;

      default:
        break;
    }
    setFormErrors(errors);
    setFormIsValid(Object.values(errors).every((err) => err === ""));
  };

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <div className="form-input">
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required="required"
          />
          <label htmlFor="email">Email </label>
          {isSubmitting && formErrors.email && (
            <div className="error err-email">{formErrors.email}</div>
          )}
        </div>
        <div className="form-input">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required="required"
          />
          <label htmlFor="password">Password</label>
        </div>
        {isSubmitting && formErrors.password && (
          <div className="error err-pass">{formErrors.password}</div>
        )}
        <button type="">SIGN IN</button>
      </form>
    </div>
  );
}

export default Login;
