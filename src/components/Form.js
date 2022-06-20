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
const Form = ({setTree}) => {
  const [textValue, setTextValue] = useState("");
  const [chars, setChars] = useState(null);
  
  const [charCode, setCharCode] = useState(null);
  const [codeStr, setCodeStr] = useState("");
  const [prob, setProb] = useState(null);
  const [entropy, setEntropy] = useState(null);
  const [avgLength, setAvgLength] = useState(null);
  const [data, setData] = useState("");

  const [codesTab, setCodesTab] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const chars = getCharFrequency(textValue);
    console.log(chars);
    setChars('chars',chars);
    const tree = buildTree(chars);
    console.log('tree',tree);
    setTree(tree);
    const charCodes = getCharCode(tree);
    console.log('charCodes',charCodes);
    setCharCode(charCodes);
    const codeStr = getCodeStr(charCodes, textValue);
    console.log('codeStr',codeStr);
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

    
  };

  const handleClear = () => {
    setTextValue("");
    setCodeStr("")
    setChars(null)
    setTree(null)
    setCharCode(null)
    setProb(null)
    setEntropy(null)
    setAvgLength(null);
    setCodesTab(null);
  };

useEffect(() =>{
  if(charCode){
    let codeTempTab = []
    for (const [key, value] of Object.entries(charCode)) {
      codeTempTab.push({letter: key, code: value, prob: prob[`${key}`]})  
    }
    setCodesTab(codeTempTab)
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
              onChange={(e) => setTextValue(e.target.value)}
            ></textarea>
          </div>
          <div className={classes.textfield}>
            <textarea
            style={{background:"#b38e5f", color:"#EEEEEE"}}
              aria-rowcount={5}
              id={`${classes.word}-2`}
              value={codeStr}
              disabled
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
              Zbuduj drzewo{" "}
            </button>
            <button
              className={classes["button-clear"]}
              type="button"
              onClick={handleClear}
            >
              {" "}
              Wyczyść dane{" "}
            </button>
          </div>
        </form>
      </div>
      {codesTab ?<div>
        <h2 style={{color:"white"}}> Tablica symboli</h2>
        <table className={classes.table}>
          <tbody>
            <tr>
              <th>Symbol</th>
              <th>Kod</th>
              <th>Prawdopodobieństwo</th>
            </tr>
            {codesTab.map(val => <tr key={val.letter}>
              <td>"{val.letter}"</td>
              <td>{val.code}</td>
              <td>{val.prob}</td>
            </tr>)}
          </tbody>
        </table>
      <p>Wartość entropii: {entropy}</p>
      <p>Średnia długość {avgLength}</p>
      </div>
      : <></>
                }
    </div>
  );
};

export default Form;
