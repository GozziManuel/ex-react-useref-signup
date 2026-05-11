import { useState } from "react";

import "./css/App.css";

function App() {
  const [inputs, setInputs] = useState({
    name: "",
    username: "",
    password: "",
    year: 0,
    description: "",
    select: "",
  });
  const [isErrorSelect, setIsErrorSelect] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setInputs({
      ...inputs,
      [name]: value,
    });
  };
  const handleForm = (e) => {
    e.preventDefault();
    if (inputs.select === "") {
      setIsErrorSelect(true);
    } else {
      setIsErrorSelect(false);
      console.log(inputs);
    }
    if (
      inputs.name === "" ||
      inputs.description === "" ||
      inputs.username === "" ||
      inputs.password === ""
    ) {
      setIsError(true);
      setIsErrorSelect(false);
    } else {
      setIsError(false);
    }
  };
  return (
    <>
      <form action="" className="formSign" onSubmit={handleForm}>
        <div>
          <label className="labelForm"> Real name:</label>
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleInputs}
            className="inputs"
          />
        </div>
        <div>
          <label className="labelForm"> Username:</label>
          <input
            type="text"
            name="username"
            value={inputs.username}
            onChange={handleInputs}
            className="inputs"
          />
        </div>
        <div>
          <label className="labelForm"> Password:</label>

          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleInputs}
            className="inputs"
          />
        </div>
        <div className="selectForm">
          <label className="labelForm"> Ruolo:</label>
          <select
            name="select"
            value={inputs.select}
            onChange={handleInputs}
            className="inputs"
          >
            <option value="">Scegli un Ruolo</option>
            <option value="Frontend">Frontend</option>
            <option value="Full Stack">Full Stack</option>
            <option value="Backend">Backend</option>
          </select>
        </div>
        <div>
          <label className="labelForm"> Anni di esperienza:</label>

          <input
            type="number"
            name="year"
            value={inputs.year}
            onChange={handleInputs}
            className="inputs"
            min={0}
          />
        </div>
        <div className="textareaContainer">
          <label className="labelForm"> Descrizione:</label>

          <textarea
            name="description"
            id=""
            value={inputs.description}
            onChange={handleInputs}
            className="textareaForm"
          ></textarea>
        </div>
        <button>Registrati!</button>
      </form>
      {isErrorSelect && (
        <div className="ErrorInput">
          <div>
            <p>Scegli un Ruolo Valido!</p>
          </div>
        </div>
      )}
      {isError && (
        <div className="ErrorInput">
          <div>
            <p>Input Vuoto ricontrolla!</p>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
