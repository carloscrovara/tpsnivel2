var diaActual = prompt("Ingresar día"); 
var dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado",
"Domingo"];

for(i in dias) {
   if (dias[0] === diaActual || dias[1] === diaActual || dias[2] === diaActual || dias[3] === diaActual || dias[4] === diaActual) {
      alert("El día es hábil");
      break;
    }
    else {
      alert("El día es fin de semana");
      break;
    }  
}