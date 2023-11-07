import React, { useEffect, useState } from "react";
import { Editor, loader } from "@monaco-editor/react";
import { tokenizer, landoCompletion, landoTheme } from "./language"; // Importa los diccionarios
import { validateSintaxis } from "./validateSintaxis";
import './index.css'

loader.init().then((monaco) => {

  monaco.languages.register({ id: "lando" });

  monaco.languages.setMonarchTokensProvider("lando", { tokenizer });

  monaco.languages.registerCompletionItemProvider("lando", landoCompletion);

  monaco.editor.defineTheme("myCoolTheme", landoTheme);

  
});

function App() {
  const [currentWord, setCurrentWord] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("")

  const handleClick = () => {
    var code = currentWord.replace(/\r/g, "");

    const response = validateSintaxis(code);

    console.log(response)

    if(response === undefined){
      alert("Compilacion exitosa")
    } else if (response.error) {
      alert(`Error en la linea ${response.line}, ${response.message}`)
    } 
    
    
  };

  const onChangeCurrentWord = (value) => {
    setCurrentWord(value);

    var code = value.replace(/\r/g, "");

    const response = validateSintaxis(code);

    console.log(response)

    if(response === undefined){
      setType("success")
      setMessage("Compilacion exitosa")
    } else if (response.error) {
      setType("error")
      setMessage(`Error en la linea ${response.line}, ${response.message}`)
    } 
  }

  return (
    <div>
      <h1>Lando Language</h1>
      <p id={`${type}-text`}>{message}</p>
      <Editor
        height="70vh"
        theme="vs-dark"
        language="lando"
        // onChange={(value) => setCurrentWord(value)}
        onChange={(value) => onChangeCurrentWord(value)}
        options={{
          fontSize: 20,
          minimap: {
            enabled: false,
          },
          scrollbar: {
            vertical: "hidden"
          }
        }}
      />
      <div className="right">
      {/* <button onClick={() => handleClick()}>Verificar sintaxis</button> */}
      </div>
    </div>
  );
}

export default App;
