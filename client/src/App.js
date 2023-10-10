import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUserName] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const createUserHandler = () => {
    Axios.post("http://localhost:3001/createUser", {
      name: name,
      age: age,
      username: username,
    }).then((response) => {
      setListOfUsers((prevState) => {
        return [...prevState, {name, age, username }];
      });
    });
  };

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setAge(event.target.value);
  };

  const userNameChangeHandler = (event) => {
    setUserName(event.target.value);
  };

  return (
    // get the data from DB
    <div className="App">
      <div className="usersDisplay">
        {listOfUsers.map((user) => {
          return (
            <div>
              <h1>Name: {user.name}</h1>
              <h1>Age: {user.age}</h1>
              <h1>User: {user.username}</h1>
            </div>
          );
        })}

        {/* post the data to DB*/}
        <div>
          <input
            type="text"
            placeholder="Enter Name"
            onChange={nameChangeHandler}
          />
          <input
            type="number"
            placeholder="Enter Age"
            onChange={ageChangeHandler}
          />
          <input
            type="text"
            placeholder="Enter Username"
            onChange={userNameChangeHandler}
          />
          <button onClick={createUserHandler}>Add User</button>
        </div>
      </div>
    </div>
  );
}

export default App;
