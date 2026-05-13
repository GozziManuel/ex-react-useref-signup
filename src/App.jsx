import { useEffect, useRef, useState } from "react";

import "./css/App.css";

function App() {
  const InputRefYear = useRef();
  const InputRefName = useRef();
  const ScrollUpRef = useRef();

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    description: "",
    select: "",
  });

  const [counter, setCounter] = useState(1000);
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

  // Description Check
  const [isDescriptionLength, setIsDescriptionLength] = useState(false);

  useEffect(() => {
    InputRefName.current.focus();
  }, []);

  const scrollUp = () => {
    ScrollUpRef.current.scrollIntoView({ behavior: "smooth" });
  };
  //
  //

  const handleInputs = (e) => {
    const { name, value } = e.target;
    console.log("alfa");

    if (name === "description") {
      const trimValue = value.trim();
      const descLength = trimValue.length;
      setCounter(1000 - descLength);
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const HandleReset = () => {
    InputRefName.current.value = "";
    InputRefYear.current.value = 0;
    setInputs({
      username: "",
      password: "",
      description: "",
      select: "",
    });
    setIsErrorSelect(false);
    setIsUsername(false);
    setIsUsernameLength(false);
    setIsPassword(false);
    setIsPasswordLength(false);
    setIsError(false);
    setIsDescriptionLength(false);
  };

  //
  //
  const handleForm = (e) => {
    e.preventDefault();
    const NameRef = InputRefName.current.value;
    const YearRef = InputRefYear.current.value;
    // // RESET
    setIsErrorSelect(false);
    setIsUsername(false);
    setIsUsernameLength(false);
    setIsPassword(false);
    setIsPasswordLength(false);
    setIsError(false);
    setIsDescriptionLength(false);

    // // INPUT EMPTY
    if (
      NameRef === "" ||
      inputs.description === "" ||
      inputs.username === "" ||
      inputs.password === ""
    ) {
      setIsError(true);

      return;
    } else {
      setIsError(false);
    }

    // // USERNAME CHAR
    const username = inputs.username;
    const falseandtrue = [];

    for (let index = 0; index < username.length; index++) {
      const element = username[index];
      const contain = symbols.includes(element);
      const containNumber = numbers.includes(element);

      falseandtrue.push(contain);
      falseandtrue.push(containNumber);
    }
    if (falseandtrue.find((el) => el === true)) {
      setIsUsername(true);
      return;
    } else {
      setIsUsername(false);
    }

    //
    //Password CHAR

    const password = inputs.password;
    const passwordNumber = [];
    const passwordSymbol = [];
    const passwordLetter = [];

    //
    //
    if (inputs.password.length < 8 && inputs.username.length < 6) {
      setIsPasswordLength(true);
      setIsUsernameLength(true);

      return;
    } else {
      setIsPasswordLength(false);
      setIsUsernameLength(false);
    }
    // Password validation and username validation for length
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

    for (let index = 0; index < password.length; index++) {
      const element = password[index];
      const containNumber = numbers.includes(element);
      const containSymbol = symbols.includes(element);
      const containLetter = letters.includes(element);

      passwordSymbol.push(containSymbol);
      passwordNumber.push(containNumber);
      passwordLetter.push(containLetter);
    }
    if (
      passwordNumber.find((el) => el === true) &&
      passwordSymbol.find((el) => el === true) &&
      passwordLetter.find((el) => el === true)
    ) {
      setIsPassword(false);
    } else {
      setIsPassword(true);
      return;
    }

    if (inputs.select === "") {
      setIsErrorSelect(true);
      return;
    } else {
      setIsErrorSelect(false);
    }
    if (inputs.description.length < 100) {
      setIsDescriptionLength(true);
      return;
    } else {
      setIsDescriptionLength(false);
    }

    console.log({
      ...inputs,
      realName: NameRef,
      year: YearRef,
    });
  };
  return (
    <>
      <div ref={ScrollUpRef}></div>
      <form action="" className="formSign" onSubmit={handleForm}>
        {/* REAL NAME */}

        <div className="inputContainer">
          <label className="labelForm"> Real name:</label>
          <input
            type="text"
            name="name"
            ref={InputRefName}
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
            ref={InputRefYear}
            defaultValue={0}
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
            maxLength={1000}
          ></textarea>
          <p>{counter}</p>
          {isDescriptionLength && (
            <div className="ErrorInput">
              <div>
                <p>Almeno 100 char</p>
              </div>
            </div>
          )}
        </div>
        <button>Registrati!</button>
      </form>
      <button onClick={() => HandleReset()}>Resetta </button>
      <button className="GoUp" onClick={scrollUp}>
        Sali
      </button>
      <div className="scrollbar"></div>

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
