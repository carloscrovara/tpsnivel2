var numeroA = parseInt (prompt("Ingresar número")); 
var numeroB = parseInt (prompt("Ingresar número")); 
var resultado;
var operaciones = ["Sumar", "Restar", "Multiplicar", "Dividir"];
var operacionActual = prompt ("¿Qué operación querés realizar? Sumar, Restar, Multiplicar o Dividir");

switch (operacionActual) { 
    case operaciones[0]: 
      suma();
      break; 
    case operaciones[1]:
      resta(); 
      break;
    case operaciones[2]:
      multiplica(); 
      break;
    case operaciones[3]:
      divide(); 
      break;
}

function suma() {
  resultado = numeroA + numeroB;
  console.log("El resultado es " + resultado);
}

function resta() {
  resultado = numeroA - numeroB;
  console.log("El resultado es " + resultado);
}

function multiplica() {
  resultado = numeroA * numeroB;
  console.log("El resultado es " + resultado);
}

function divide() {
  resultado = numeroA / numeroB;
  console.log("El resultado es " + resultado);
}