import { useState, useEffect } from "react";
import {
  getCharFrequency,
  buildTree,
  getCharCode,
  getCodeStr,
  getProb,
  getEntropy,
  getAvgLength,
} from "../huffman";
import classes from "./Form.module.css";
const Form = () => {
  const [textValue, setTextValue] = useState("");
  const [chars, setChars] = useState("");
  const [tree, setTree] = useState("");
  const [charCode, setCharCode] = useState("");
  const [codeStr, setCodeStr] = useState("");
  const [prob, setProb] = useState("");
  const [entropy, setEntropy] = useState("");
  const [avgLength, setAvgLength] = useState("");
  const [data, setData] = useState("");
  const [znakKod, setZnakKod] = useState("");
  const [znakWaga, setZnakWaga] = useState("");

  const handleSubmit = () => {
    const chars = getCharFrequency(textValue);
    console.log(chars);
    setChars(chars);
    const tree = buildTree(chars);
    console.log(tree);
    setTree(tree);
    const charCodes = getCharCode(tree);
    console.log(charCodes);
    setCharCode(charCodes);
    const codeStr = getCodeStr(charCodes, textValue);
    console.log(codeStr);
    setCodeStr(codeStr);
    const prob = getProb(chars, textValue);
    console.log(prob);
    setProb(prob);
    const entropy = getEntropy(prob);
    console.log(entropy);
    setEntropy(entropy);
    const avgLength = getAvgLength(prob, charCodes);
    console.log(avgLength);
    setAvgLength(avgLength);
    setData(charCodes);

    setZnakKod(Object.entries(charCode));
    setZnakWaga(Object.entries(chars));

    
  };

  const handleClear = () => {
    console.log("cleared");
    setTextValue("");
  };

useEffect(() =>{


  for (const [key, value] of Object.entries(charCode)) {
    console.log(`${key}: ${value}`);
    for(const i in (Object.entries(charCode).length)){
      console.log("test");
    }
    console.log();
     }

},[charCode,chars])

  return (
    <div>
      <div className={classes.form}>
        <form>
          <h1> Algorytm Huffmana</h1>
          <div className={classes.textfield}>
            <textarea
              aria-rowcount={5}
              id={classes.word}
              value={textValue}
              type="textarea"
              onChange={(e) => setTextValue(e.target.value)}
            ></textarea>
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
      <div>
        <h2> Tablica symboli</h2>
        <table className={classes.table}>
          <tbody>
            <tr>
              <th>Symbol</th>
              <th>Waga</th>
              <th>Kod Huffmana</th>
            </tr>
              {
              

              }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Form;
