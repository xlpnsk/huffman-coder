import { useState } from "react";
import classes from "./Form.module.css";
const Form = () => {
  const [textValue, setTextValue] = useState("");

  const uniqueLetters = (str) => {
    str = str.split("");
    str = new Set(str);
    str = [...str].join("");
    console.log(str)
    return str;
  };

  const handleSubmit = () => {
    console.log(textValue);
    uniqueLetters(textValue);
  };

  const handleClear = () => {
    console.log("cleared");
    setTextValue("");
  };

  return (
    <div>
      <div className={classes.form}>
        <form>
          <h1> Algorytm Huffmana</h1>
          <div className={classes.textfield}>
            <input
              value={textValue}
              type="textarea"
              onChange={(e) => setTextValue(e.target.value)}
            />
          </div>
          <div className={classes.buttons}>
            <button
              className={classes["button-ok"]}
              type="button"
              onClick={handleSubmit}
            >
              {" "}
              Submit{" "}
            </button>
            <button
              className={classes["button-clear"]}
              type="button"
              onClick={handleClear}
            >
              {" "}
              Clear{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
