// var indice = 0;
// const gramatica = {
//   // Define las expresiones regulares según la gramática
//   'L': /[A-Za-z]+/,
//   'D': /\d+(\.\d+)?/,
//   'R': /[a-z][a-zA-Z0-9]*\d*/,
//   'B': /(true|false)/,
//   'PW': /;/,
//   'A': /:=/,
//   'BO': /{/,
//   'BC': /}/,
//   'BCPW': /};/,
//   'PO': /\(/,
//   'PC': /\)/,
//   'VA': /([a-zA-Z][a-zA-Z0-9]*|"[a-zA-Z0-9]*"|\d+(\.\d+)?|true|false)/,
//   'DO': /do/,
//   'OP': /(==|!=|<|>|<=|>=)/,
//   'FU': /func/,
//   'MN': /main/,
//   'MA': /args/,
//   'IF': /if/,
//   'WH': /while/,
//   'RE': /return/,
//   'PRINT': /print/,
//   'IN': /(\+\+|--)/,
//   'PARAMS': /((([a-zA-Z][a-zA-Z0-9]*|"[a-zA-Z0-9]*"|\d+(\.\d+)?|true|false)\s*(,\s*)?)*)/,
//   'BODY': /([a-zA-Z][a-zA-Z0-9]*|"[a-zA-Z0-9]*"|\d+(\.\d+)?|true|false|([a-zA-Z][a-zA-Z0-9]*\s*(\+\+|--)\s*))/,
//   'COND': /([a-zA-Z][a-zA-Z0-9]*|"[a-zA-Z0-9]*"|\d+(\.\d+)?|true|false)\s*(==|!=|<|>|<=|>=)\s*([a-zA-Z][a-zA-Z0-9]*|"[a-zA-Z0-9]*"|\d+(\.\d+)?|true|false)/,
//   // cf : call function like func();, sum(1,2,3);
//   'CF': /([a-zA-Z][a-zA-Z0-9]*\s*\(\s*(\s*[a-zA-Z][a-zA-Z0-9]*|"[a-zA-Z0-9]*"|\d+(\.\d+)?|true|false)(\s*,\s*[a-zA-Z][a-zA-Z0-9]*|"[a-zA-Z0-9]*"|\d+(\.\d+)?|true|false)*\s*\))?/,
// }
// function consumirEspacios() {
//   while (indice < bloqueCodigo.length && bloqueCodigo[indice].match(/\s/)) {
//     indice++;
//   }
// }

// function variable() {
//   while (indice < bloqueCodigo.length) {
//     consumirEspacios();
//     if (bloqueCodigo.slice(indice).match(gramatica['L'])) {
//       // Coincide con un identificador
//       console.log('identificador');
//       indice += bloqueCodigo.slice(indice).match(gramatica['L'])[0].length;
//       consumirEspacios();

//       if (bloqueCodigo.slice(indice).match(gramatica['A'])) {
//         // Coincide con ":="
//         indice += bloqueCodigo.slice(indice).match(gramatica['A'])[0].length;
//         consumirEspacios();

//         console.log('valor')
//         if (bloqueCodigo.slice(indice).match(gramatica['VA'])) {
//           // Coincide con un valor válido
//           const valor = bloqueCodigo.slice(indice).match(gramatica['VA'])[0];
//           indice += valor.length;
//           consumirEspacios();

//           console.log('punto y coma')
//           if (bloqueCodigo.slice(indice).match(gramatica['PW'])) {
//             // Coincide con ";"
//             indice++;
//             console.log('fin de línea');
//           } else {
//             console.log('Error: se esperaba ";"');
//             return false;
//           }
//         } else {
//           console.log('Error: se esperaba un valor');
//           return false;
//         }
//       } else {
//         console.log('Error: se esperaba ":="');
//         return false;
//       }
//     } else {
//       console.log('Error: se esperaba un identificador');
//       return false;
//     }
//   }
//   return true; // El código se analizó con éxito
// }

// function funcion() {
//   while (indice < bloqueCodigo.length) {
//     consumirEspacios();
//     if (bloqueCodigo.slice(indice).match(gramatica['FU'])) {
//       // Coincide con "func"
//       indice += bloqueCodigo.slice(indice).match(gramatica['FU'])[0].length;
//       consumirEspacios();

//       console.log('identificador');
//       if (bloqueCodigo.slice(indice).match(gramatica['L'])) {
//         // Coincide con un identificador
//         indice += bloqueCodigo.slice(indice).match(gramatica['L'])[0].length;
//         consumirEspacios();

//         console.log('paréntesis abierto');
//         if (bloqueCodigo.slice(indice).match(gramatica['PO'])) {
//           // Coincide con "("
//           indice++;
//           consumirEspacios();

//           console.log('parámetros');
//           if (bloqueCodigo.slice(indice).match(gramatica['PARAMS'])) {
//             // Coincide con una lista de parámetros
//             const params = bloqueCodigo.slice(indice).match(gramatica['PARAMS'])[0];
//             indice += params.length;
//             consumirEspacios();

//             console.log('paréntesis cerrado');
//             if (bloqueCodigo.slice(indice).match(gramatica['PC'])) {
//               // Coincide con ")"
//               indice++;
//               consumirEspacios();

//               console.log('llave abierta');
//               if (bloqueCodigo.slice(indice).match(gramatica['BO'])) {
//                 // Coincide con "{"
//                 indice++;
//                 consumirEspacios();

//                 console.log('cuerpo');
//                 if (bloqueCodigo.slice(indice).match(gramatica['BODY'])) {
//                   // Coincide con un cuerpo de función
//                   const body = bloqueCodigo.slice(indice).match(gramatica['BODY'])[0];
//                   indice += body.length;
//                   consumirEspacios();

//                   console.log('llave cerrada');
//                   if (bloqueCodigo.slice(indice).match(gramatica['BC'])) {
//                     // Coincide con "}"
//                     indice++;
//                     consumirEspacios();

//                     console.log('fin de línea');
//                     if (bloqueCodigo.slice(indice).match(gramatica['PW'])) {
//                       // Coincide con ";"
//                       indice++;
//                       console.log('fin de línea');
//                       return true;
//                     } else {
//                       console.log('Error: se esperaba ";"');
//                       return false;
//                     }
//                   } else {
//                     console.log('Error: se esperaba "}"');
//                     return false;
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
//   return true; // El código se analizó con éxito
// }

// function main() {
//   while (indice < bloqueCodigo.length) {
//     consumirEspacios();
//     if (bloqueCodigo.slice(indice).match(gramatica['FU'])) {
//       // Coincide con "func"
//       indice += bloqueCodigo.slice(indice).match(gramatica['FU'])[0].length;
//       consumirEspacios();

//       console.log('identificador');
//       if (bloqueCodigo.slice(indice).match(gramatica['MN'])) {
//         // Coincide con un identificador
//         indice += bloqueCodigo.slice(indice).match(gramatica['MN'])[0].length;
//         consumirEspacios();

//         console.log('paréntesis abierto');
//         if (bloqueCodigo.slice(indice).match(gramatica['PO'])) {
//           // Coincide con "("
//           indice++;
//           consumirEspacios();

//           console.log('parámetros');
//           if (bloqueCodigo.slice(indice).match(gramatica['MA'])) {
//             // Coincide con una lista de parámetros
//             const params = bloqueCodigo.slice(indice).match(gramatica['MA'])[0];
//             indice += params.length;
//             consumirEspacios();

//             console.log('paréntesis cerrado');
//             if (bloqueCodigo.slice(indice).match(gramatica['PC'])) {
//               // Coincide con ")"
//               indice++;
//               consumirEspacios();

//               console.log('llave abierta');
//               if (bloqueCodigo.slice(indice).match(gramatica['BO'])) {
//                 // Coincide con "{"
//                 indice++;
//                 consumirEspacios();

//                 console.log('cuerpo');
//                 if (bloqueCodigo.slice(indice).match(gramatica['BODY'])) {
//                   // Coincide con un cuerpo de función
//                   const body = bloqueCodigo.slice(indice).match(gramatica['BODY'])[0];
//                   indice += body.length;
//                   consumirEspacios();

//                   console.log('llave cerrada');
//                   if (bloqueCodigo.slice(indice).match(gramatica['BC'])) {
//                     // Coincide con "}"
//                     indice++;
//                     consumirEspacios();

//                     console.log('fin de línea');
//                     if (bloqueCodigo.slice(indice).match(gramatica['PW'])) {
//                       // Coincide con ";"
//                       indice++;
//                       console.log('fin de línea');
//                       return true;
//                     } else {
//                       console.log('Error: se esperaba ";"');
//                       return false;
//                     }
//                   } else {
//                     console.log('Error: se esperaba "}"');
//                     return false;
//                   }
//                 } else {
//                   console.log('Error: se esperaba un cuerpo de función');
//                   return false;
//                 }
//               } else {
//                 console.log('Error: se esperaba "{"');
//                 return false;
//               }
//             } else {
//               console.log('Error: se esperaba ")"');
//               return false;
//             }
//           } else {
//             console.log('Error: se esperaba una lista de parámetros');
//             return false;
//           }
//         } else {
//           console.log('Error: se esperaba "("');
//           return false;
//         }
//       } else {
//         console.log('Error: se esperaba un identificador');
//         return false;
//       }
//     } else {
//       console.log('Error: se esperaba "func"');
//       return false;
//     }
//   }
//   return true; // El código se analizó con éxito
// }

// function incremento() {
//   while (indice < bloqueCodigo.length) {
//     consumirEspacios();
//     if (bloqueCodigo.slice(indice).match(gramatica['L'])) {
//       // Coincide con un identificador
//       indice += bloqueCodigo.slice(indice).match(gramatica['L'])[0].length;
//       consumirEspacios();

//       console.log('incremento');
//       if (bloqueCodigo.slice(indice).match(gramatica['IN'])) {
//         // Coincide con "++" o "--"
//         indice += bloqueCodigo.slice(indice).match(gramatica['IN'])[0].length;
//         consumirEspacios();

//         console.log('punto y coma');
//         if (bloqueCodigo.slice(indice).match(gramatica['PW'])) {
//           // Coincide con ";"
//           indice++;
//           console.log('fin de línea');
//         } else {
//           console.log('Error: se esperaba ";"');
//           return false;
//         }
//       } else {
//         console.log('Error: se esperaba "++" o "--"');
//         return false;
//       }
//     } else {
//       console.log('Error: se esperaba un identificador');
//       return false;
//     }
//   }
//   return true; // El código se analizó con éxito
// }

// function print() {
//   while (indice < bloqueCodigo.length) {
//     consumirEspacios();
//     if (bloqueCodigo.slice(indice).match(gramatica['PRINT'])) {
//       // Coincide con "print"
//       indice += bloqueCodigo.slice(indice).match(gramatica['PRINT'])[0].length;
//       consumirEspacios();

//       console.log('paréntesis abierto');
//       if (bloqueCodigo.slice(indice).match(gramatica['PO'])) {
//         // Coincide con "("
//         indice++;
//         consumirEspacios();

//         console.log('condición');
//         // se puede imprimir "asi", variable, 1, true, false
//         if (bloqueCodigo.slice(indice).match(gramatica['VA'])) {
//           // Coincide con una condición
//           const cond = bloqueCodigo.slice(indice).match(gramatica['VA'])[0];
//           indice += cond.length;
//           consumirEspacios();

//           console.log('paréntesis cerrado');
//           if (bloqueCodigo.slice(indice).match(gramatica['PC'])) {
//             // Coincide con ")"
//             indice++;
//             consumirEspacios();

//             console.log('punto y coma');
//             if (bloqueCodigo.slice(indice).match(gramatica['PW'])) {
//               // Coincide con ";"
//               indice++;
//               console.log('fin de línea');
//               return true;
//             } else {
//               console.log('Error: se esperaba ";"');
//               return false;
//             }
//           } else {
//             console.log('Error: se esperaba ")"');
//             return false;
//           }
//         } else {
//           console.log('Error: se esperaba una condición');
//           return false;
//         }
//       } else {
//         console.log('Error: se esperaba "("');
//         return false;
//       }
//     } else {
//       console.log('Error: se esperaba "print"');
//       return false;
//     }
//   }
// }


// function callFunction() {
//   while (indice < bloqueCodigo.length) {
//     consumirEspacios();
//     if (bloqueCodigo.slice(indice).match(gramatica['CF'])) {
//       // Coincide con un identificador
//       indice += bloqueCodigo.slice(indice).match(gramatica['CF'])[0].length;
//       consumirEspacios();

//       console.log('punto y coma');
//       if (bloqueCodigo.slice(indice).match(gramatica['PW'])) {
//         // Coincide con ";"
//         indice++;
//         console.log('fin de línea');
//         return true;
//       } else {
//         console.log('Error: se esperaba ";"');
//         return false;
//       }
//     } else {
//       console.log('Error: se esperaba un identificador');
//       return false;
//     }
//   }
//   return true; // El código se analizó con éxito
// }

// function callIf() {
//   while (indice < bloqueCodigo.length) {
//     consumirEspacios();
//     if (bloqueCodigo.slice(indice).match(gramatica['IF'])) {
//       // Coincide con un identificador
//       indice += bloqueCodigo.slice(indice).match(gramatica['IF'])[0].length;
//       consumirEspacios();

//       console.log('punto y coma');
//       if (bloqueCodigo.slice(indice).match(gramatica['PO'])) {
//         // Coincide con "("
//         indice++;
//         consumirEspacios();

//         console.log('condición');
//         if (bloqueCodigo.slice(indice).match(gramatica['COND'])) {
//           // Coincide con una condición
//           const cond = bloqueCodigo.slice(indice).match(gramatica['COND'])[0];
//           indice += cond.length;
//           consumirEspacios();

//           console.log('punto y coma');
//           if (bloqueCodigo.slice(indice).match(gramatica['PC'])) {
//             // Coincide con ")"
//             indice++;
//             consumirEspacios();

//             console.log('do');
//             if (bloqueCodigo.slice(indice).match(gramatica['DO'])) {
//               // Coincide con "do"
//               indice += bloqueCodigo.slice(indice).match(gramatica['DO'])[0].length;
//               consumirEspacios();

//               console.log('llave abierta');
//               if (bloqueCodigo.slice(indice).match(gramatica['BO'])) {
//                 // Coincide con "{"
//                 indice++;
//                 consumirEspacios();

//                 console.log('cuerpo');
//                 if (bloqueCodigo.slice(indice).match(gramatica['RE'])) {
//                   // Coincide con un cuerpo de función
//                   const body = bloqueCodigo.slice(indice).match(gramatica['RE'])[0];
//                   indice += body.length;
//                   consumirEspacios();

//                   console.log('llave cerrada');
//                   if (bloqueCodigo.slice(indice).match(gramatica['BC'])) {
//                     // Coincide con "}"
//                     indice++;
//                     console.log('fin de línea');
//                   } else {
//                     console.log('Error: se esperaba "}"');
//                     return false;
//                   }
//                 } else {
//                   console.log('Error: se esperaba un return en la función');
//                   return false;
//                 }
//               } else {
//                 console.log('Error: se esperaba "{"');
//                 return false;
//               }
//             } else {
//               console.log('Error: se esperaba "do"');
//               return false;
//             }
//           } else {
//             console.log('Error: se esperaba ")"');
//             return false;
//           }
//         } else {
//           console.log('Error: se esperaba una condición');
//           return false;
//         }
//       } else {
//         console.log('Error: se esperaba "("');
//         return false;
//       }
//     } else {
//       console.log('Error: se esperaba un identificador');
//       return false;
//     }
//   }
//   return true; // El código se analizó con éxito
// }

// function callWhile() {
//   // while (a == b) do { return }; 
//   while (indice < bloqueCodigo.length) {
//     consumirEspacios();
//     console.log('while');
//     if (bloqueCodigo.slice(indice).match(gramatica['WH'])) {
//       // Coincide con un identificador
//       indice += bloqueCodigo.slice(indice).match(gramatica['WH'])[0].length;
//       consumirEspacios();

//       console.log('GAAAY');
//       if (bloqueCodigo.slice(indice).match(gramatica['PO'])) {
//         // Coincide con "("
//         indice++;
//         consumirEspacios();

//         console.log('condición');
//         if (bloqueCodigo.slice(indice).match(gramatica['COND'])) {
//           // Coincide con una condición
//           const cond = bloqueCodigo.slice(indice).match(gramatica['COND'])[0];
//           indice += cond.length;
//           consumirEspacios();

//           console.log('punto y coma');
//           if (bloqueCodigo.slice(indice).match(gramatica['PC'])) {
//             // Coincide con ")"
//             indice++;
//             consumirEspacios();

//             console.log('do');
//             if (bloqueCodigo.slice(indice).match(gramatica['DO'])) {
//               // Coincide con "do"
//               indice += bloqueCodigo.slice(indice).match(gramatica['DO'])[0].length;
//               consumirEspacios();

//               console.log('llave abierta');
//               if (bloqueCodigo.slice(indice).match(gramatica['BO'])) {
//                 // Coincide con "{"
//                 indice++;
//                 consumirEspacios();

//                 console.log('cuerpo');
//                 if (bloqueCodigo.slice(indice).match(gramatica['RE'])) {
//                   // Coincide con un cuerpo de función
//                   const body = bloqueCodigo.slice(indice).match(gramatica['RE'])[0];
//                   indice += body.length;
//                   consumirEspacios();

//                   console.log('llave cerrada');
//                   if (bloqueCodigo.slice(indice).match(gramatica['BC'])) {
//                     // Coincide con "}"
//                     indice++;
//                     console.log('fin de línea');

//                     if (bloqueCodigo.slice(indice).match(gramatica['PW'])) {
//                       // Coincide con ";"
//                       indice++;
//                       console.log('fin de línea');
//                     } else {
//                       console.log('Error: se esperaba ";"');
//                       return false;
//                     }
//                   } else {
//                     console.log('Error: se esperaba "}"');
//                     return false;
//                   }
//                 } else {
//                   console.log('Error: se esperaba un return en la función');
//                   return false;
//                 }
//               } else {
//                 console.log('Error: se esperaba "{"');
//                 return false;
//               }
//             } else {
//               console.log('Error: se esperaba "do"');
//               return false;
//             }
//           } else {
//             console.log('Error: se esperaba ")"');
//             return false;
//           }
//         } else {
//           console.log('Error: se esperaba una condición');
//           return false;
//         }
//       } else {
//         console.log('Error: se esperaba "("');
//         return false;
//       }
//     } else {
//       console.log('Error: se esperaba un identificador');
//       return false;
//     }
//   }
//   return true; // El código se analizó con éxito
// }
