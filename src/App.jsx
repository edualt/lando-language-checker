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

  function splitText(text) {
    const codeBlock = text.split("\n");
    const currentLine = codeBlock[codeBlock.length + 1];
    console.log(currentLine);
    console.log(codeBlock);
    setCurrentWord(currentLine);
  }

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

  return (
    <div>
      <h1>Lando Language</h1>
      <Editor
        height="70vh"
        theme="vs-dark"
        language="lando"
        onChange={(value) => setCurrentWord(value)}
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
      <button onClick={() => handleClick()}>Verificar sintaxis</button>
      </div>
    </div>
  );
}

export default App;
