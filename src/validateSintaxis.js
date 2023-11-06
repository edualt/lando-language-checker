export const validateSintaxis = (content) => {
  const variableRegex =
  /^\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*:=\s*(".*"|-?\d+(\.\d+)?|true|false)\s*;$/;
const functionRegex = /func\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)\s*{$/;
const conditionalStatementRegex =
  /if\s*\(\s*\w+\s*(>|<|==|!=|>=|<=)?\s*\w*(\s*(\|\||&&)\s*\w+\s*(>|<|==|!=|>=|<=)?\s*\w*)*\s*\)\s*do\s*\{$/;
const loopRegex =
  /while\s*\((\s*(\w+|true|false)\s*(==|!=|<|>|<=|>=)\s*(\w+|true|false)|\s*(\w+|true|false)\s*)\s*(\s*(&&|\|\|)\s*(\s*(\w+|true|false)\s*(==|!=|<|>|<=|>=)\s*(\w+|true|false)|\s*(\w+|true|false)\s*))*\)\s*do\s*\{/;
const printRegex = /print\(\s*(\".*\"|\d+|\d*\.\d+|true|false)\s*\);/;
const modifyIntegerRegex = /\w+\s*(\+\+|--);/;
const callFunctionRegex = /\w+\s*\((\s*\w+\s*(,\s*\w+\s*)*)?\);/;
const returnRegex =
  /^\s*return\s+((\w+|true|false|\d+(\.\d+)?)(\s*[-+/*]\s*(\w+|true|false|\d+(\.\d+)?))*)\s*;\s*$/;
const mainFunctionRegex = /^func\s*main\s*\(\s*args\s*\)\s*\{\s*$/;

const variableNamesSet = new Set();
const functionNamesSet = new Set();
const conditionalsBracketsHistory = new Set();

const wrongSyntaxisMsg = "Sintaxis incorrecta";
const goodSyntaxisMsg = "Sintaxis correcta";

let bracketCounter = 0;

const bracketsBalance = (char) => {
  if (char === "{") {
    bracketCounter++;
  } else if (char === "}") {
    bracketCounter--;
  }
};

const createSyntaxResult = (error, message, line) => {
  return { error, message, line };
};

const checkSyntaxis = (line, numberLine) => {
  const isVariable = variableRegex.test(line);
  if (isVariable) {
    variableNamesSet.add(line.match(variableRegex)[1]);
    return createSyntaxResult(false, goodSyntaxisMsg, numberLine);
  }

  const isFunction = functionRegex.test(line);
  if (isFunction && line.match(functionRegex)[1] !== "main") {
    const functionName = line.match(functionRegex)[1];

    if (functionNamesSet.has(functionName)) {
      return createSyntaxResult(
        true,
        "El nombre de la funcion ya existe",
        numberLine
      );
    }

    functionNamesSet.add(functionName);
    bracketsBalance("{");

    return createSyntaxResult(false, goodSyntaxisMsg, numberLine);
  }

  const isMainFunction = mainFunctionRegex.test(line);
  if (isMainFunction) {
    bracketsBalance("{");

    return createSyntaxResult(false, goodSyntaxisMsg, numberLine);
  }

  const isConditionalStatement = conditionalStatementRegex.test(line);
  if (isConditionalStatement) {
    bracketsBalance("{");
    conditionalsBracketsHistory.add(bracketCounter);

    return createSyntaxResult(false, goodSyntaxisMsg, numberLine);
  }

  const isLoop = loopRegex.test(line);
  if (isLoop) {
    bracketsBalance("{");

    return createSyntaxResult(false, goodSyntaxisMsg, numberLine);
  }

  const isPrint = printRegex.test(line);
  if (isPrint) {
    return createSyntaxResult(false, goodSyntaxisMsg, numberLine);
  }

  const isModifyInteger = modifyIntegerRegex.test(line);
  if (isModifyInteger) {
    const variableNameWithSignal = line
      .match(modifyIntegerRegex)[0]
      .split(" ")[0];
    const variableName = variableNameWithSignal
      .replace("++", "")
      .replace("--", "")
      .replace(";", "");
    if (!variableNamesSet.has(variableName)) {
      return createSyntaxResult(true, "La variable no existe", numberLine);
    }

    return createSyntaxResult(false, goodSyntaxisMsg, numberLine);
  }

  const isCallFunction = callFunctionRegex.test(line);
  if (isCallFunction) {
    const functionName = line.match(callFunctionRegex)[0].split("(")[0];
    if (!functionNamesSet.has(functionName)) {
      return createSyntaxResult(true, "La funcion no existe", numberLine);
    }

    return createSyntaxResult(false, goodSyntaxisMsg, numberLine);
  }

  const isReturn = returnRegex.test(line);
  if (isReturn) {
    if (bracketCounter === 0) {
      return createSyntaxResult(
        true,
        "El return no esta dentro de una funcion",
        numberLine
      );
    }

    return createSyntaxResult(false, goodSyntaxisMsg, numberLine);
  }

  const isClosingBracket = line.trim() === "};";

  if (isClosingBracket) {
    bracketsBalance("}");
    if (bracketCounter < 0) {
      return createSyntaxResult(
        true,
        "Los corchetes no estan balanceados",
        numberLine
      );
    }

    return createSyntaxResult(false, goodSyntaxisMsg, numberLine);
  }

  const isEmptyLine = line.trim() === "";
  if (isEmptyLine) {
    return createSyntaxResult(false, goodSyntaxisMsg, numberLine);
  }

  return createSyntaxResult(true, wrongSyntaxisMsg, numberLine);
};

// iterate line by line
const lines = content.split("\n");
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const numberLine = i + 1;
  console.log(numberLine, line);

  const result = checkSyntaxis(line, numberLine);

  if (result.error) {
    return result
  }
}

// checar si los corchetes estan balanceados
if (bracketCounter !== 0) {
  console.log({
    error: true,
    message: "Los corchetes no estan balanceados",
    line: lines.length,
  });
}


}