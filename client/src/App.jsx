import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";


function App() {
  const [name, setName] = useState("");
  const [allNames, setAllNames] = useState([]);

  const PORT = import.meta.env.PORT || 4000;

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:${PORT}/api/name/removeName/${id}`
      );
      console.log(response.data);
      const updatedNames = allNames.filter((item) => item._id !== id);
      setAllNames(updatedNames);
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setName(name);
    console.log(name);

    try {
      const response = await axios.post(
        `http://localhost:${PORT}/api/name/createName`,
        {
          name: name,
        }
      );

      console.log(response.data);
      fetchAllNames();
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAllNames = async () => {
    try {
      const response = await axios.get(
        `http://localhost:${PORT}/api/name/getName`
      );

      console.log(response.data);
      setAllNames(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllNames();
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            style={{ padding: "1rem", borderRadius: ".5rem", border: "none" }}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button
            style={{
              margin: "0 .5rem",
              backgroundColor: "crimson",
              border: "none",
            }}
          >
            Submit
          </button>
        </form>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            width: "30%",
            height: "40%",
            border: "2px solid white",
            borderRadius: ".5rem",
            padding: "4rem"
          }}
        >
          <h1 style={{ color: "crimson" }}>PostBox</h1>
          {allNames.map((item, index) => {
            return (
              <span
                style={{
                  color: "lightseagreen",
                  margin: "2rem",
                  cursor: "pointer",
                }}
                key={index}
                onClick={() => handleDelete(item._id)}
              >
                {item.name}
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
