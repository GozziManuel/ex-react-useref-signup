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

  //
  // Keyboard
  const letters = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = `!@#$%^&*()-_=+[]{}|;:'\\£",.<>?/~`;

  //
  // ERROR STATES
  // Select Error
  const [isErrorSelect, setIsErrorSelect] = useState(false);

  // General Error Empty
  const [isError, setIsError] = useState(false);

  // Username Check
  const [isUsername, setIsUsername] = useState(false);
  const [isUsernameLength, setIsUsernameLength] = useState(false);

  // Password Check
  const [isPasswordLength, setIsPasswordLength] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const handleInputs = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  //
  //
  const handleForm = (e) => {
    e.preventDefault();

    const password = inputs.password;
    const username = inputs.username;
    const falseandtrue = [];

    for (let index = 0; index < username.length; index++) {
      const element = username[index];
      const contain = symbols.includes(element);
      const containNumber = numbers.includes(element);

      falseandtrue.push(contain);
      falseandtrue.push(containNumber);
      if (falseandtrue.find((el) => el === true)) {
        setIsUsername(true);
        return;
      }
    }

    //
    //

    const passwordNumber = [];
    const passwordSymbol = [];
    const passwordLetter = [];

    for (let index = 0; index < password.length; index++) {
      const element = password[index];
      const containNumber = numbers.includes(element);
      const containSymbol = symbols.includes(element);
      const containLetter = letters.includes(element);

      passwordSymbol.push(containSymbol);
      passwordNumber.push(containNumber);
      passwordLetter.push(containLetter);

      if (
        passwordNumber.find((el) => el === true) &&
        passwordSymbol.find((el) => el === true) &&
        passwordLetter.find((el) => el === true)
      ) {
        setIsPassword(false);
      } else {
        setIsPassword(true);
      }
    }
    //
    //

    if (
      inputs.name === "" ||
      inputs.description === "" ||
      inputs.username === "" ||
      inputs.password === ""
    ) {
      setIsError(true);
      setIsErrorSelect(false);
      setIsUsername(false);
      setIsUsernameLength(false);
      setIsPassword(false);
      setIsPasswordLength(false);
      return;
    } else {
      setIsError(false);
    }

    // Password validation and username validation for length
    if (inputs.password.length < 8 && inputs.username.length < 6) {
      setIsPasswordLength(true);
      setIsUsernameLength(true);

      return;
    } else {
      setIsPasswordLength(false);
      setIsUsernameLength(false);
    }
    if (inputs.username.length < 6) {
      setIsUsernameLength(true);
      return;
    } else {
      setIsUsernameLength(false);
    }

    if (inputs.password.length < 8) {
      setIsPasswordLength(true);
      return;
    } else {
      setIsPasswordLength(false);
    }

    //
    //
    // if () {
    // }
    console.log(inputs);
  };
  return (
    <>
      <form action="" className="formSign" onSubmit={handleForm}>
        {/* REAL NAME */}

        <div className="inputContainer">
          <label className="labelForm"> Real name:</label>
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleInputs}
            className="inputs"
          />
        </div>

        {/* USERNAME */}

        <div className="inputContainer">
          <label className="labelForm"> Username:</label>
          <input
            type="text"
            name="username"
            value={inputs.username}
            onChange={handleInputs}
            className="inputs"
          />
          <p style={{ marginTop: 0 }}>
            Deve contenere solo caratteri alfanumerici e almeno 6 caratteri (no
            spazi o simboli).
          </p>

          {/* Username Validation for symbols */}
          {isUsername && (
            <div className="ErrorInput">
              <div>
                <p>Metti un Carattere valido!</p>
              </div>
            </div>
          )}

          {/* Username Validation For length */}
          {isUsernameLength && (
            <div className="ErrorInput">
              <div>
                <p>Input Username almeno 6 caratteri!</p>
              </div>
            </div>
          )}
        </div>

        {/*  */}

        {/* PASSWORD */}
        <div className="inputContainer">
          <label className="labelForm"> Password:</label>

          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleInputs}
            className="inputs"
          />
          <p style={{ marginTop: 0 }}>
            Deve contenere almeno 8 caratteri, 1 lettera, 1 numero e 1 simbolo e
            una lettera
          </p>
          {/* Username Validation For length */}
          {isPasswordLength && (
            <div className="ErrorInput">
              <div>
                <p>Input Password almeno 8 caratteri!</p>
              </div>
            </div>
          )}
          {isPassword && (
            <div className="ErrorInput">
              <div>
                <p>La password deve almeno contenere 1 simbolo e 1 numero</p>
              </div>
            </div>
          )}
        </div>

        {/* RUOLO */}

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

        {/* YEAR */}
        <div className="inputContainer">
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

        {/* DESCRIPTION */}

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

      {/* ERROR FOR SELECT */}
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
