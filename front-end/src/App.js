import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function getData() {
      const res = await fetch("http://localhost:8000/");
      const data = await res.json();
      setItems(data);
    }
    getData();
  }, []);
  async function autoAsign() {
    fetch("http://localhost:8000/auto-assign", { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        console.log(data);
      });
  }
  return (
    <div className="App">
      <button className="auto-assign" onClick={autoAsign}>
        Assign Electricians
      </button>
      <div className="jobs-display">
        {items.map((item) => (
          <JobBox item={item} />
        ))}
      </div>
    </div>
  );
}

function JobBox({ item }) {
  const [changeDateVisible, setChangeDateVisible] = useState(false);
  const [newDate, setNewDate] = useState(item.InstallationDate);
  function handleSubmit(id) {
    fetch("http://localhost:8000/sites", {
      method: "PUT",
      body: JSON.stringify({ id, date: newDate }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
  return (
    <div className="job-box">
      <div className="person-info">
        <div className="name">Name: {item.name}</div>
        <div className="phone">Phone: {item.phone}</div>
        <div className="city">City: {item.city}</div>
      </div>
      <div className="assignment-info">
        <div className="electrician-name">
          Electrician Assigned:{" "}
          {item.AssignedElectritian.length > 1
            ? item.AssignedElectritian[0].electricianName
            : "None"}
        </div>
        <div className="assigned-date">
          Assigned On:{" "}
          {item.AssignedElectritian.length > 1
            ? item.AssignedElectritian[0].electricianAssignDate.substring(0, 10)
            : "Not Assigned"}
        </div>
      </div>
      <div className="job-date">
        <div className="date">
          Installation Date: {newDate.substring(0, 10)}
        </div>
        {changeDateVisible ? (
          <div className="change-date-form">
            <input
              name="date"
              type="date"
              onChange={(e) => {
                setNewDate(e.target.value);
              }}
            ></input>
            <button
              onClick={() => {
                handleSubmit(item.id);
                setChangeDateVisible(false);
              }}
            >
              Change Date
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setChangeDateVisible(true);
            }}
          >
            Change Date
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
