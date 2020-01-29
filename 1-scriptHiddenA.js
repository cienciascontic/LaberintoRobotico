//Aqui: Funciones para cualquier ejercicio robot y funciones de ESTE ejercicio.

// MODO
let modoBoton = false;

// ESCENARIO
const P ="partida";
const F = "final";
const escenario =[[1,P,1,1,1,1,1,1,1,1,1,1],[1,0,1,1,1,1,1,0,1,1,1,1],[1,0,0,0,1,1,1,0,0,0,1,1],[1,1,1,0,1,1,1,1,1,0,1,1],[1,1,1,0,1,1,1,1,1,0,0,1],[1,1,1,0,1,1,1,1,1,0,1,1],[1,1,0,0,0,0,0,0,0,0,1,1],[1,1,1,0,1,0,1,1,0,1,1,1],[1,0,0,0,1,1,1,1,0,1,1,1],[1,1,1,0,0,0,0,1,0,1,1,1],[1,1,1,1,1,1,0,1,0,0,1,1],[1,1,1,1,1,1,F,1,1,1,1,1]]

const casilleros = escenario.length;
const unidadAncho = 30;
const anchoLaberinto = unidadAncho*casilleros;

const elemEscen = document.createElement("DIV");

elemEscen.id="elemento-escenario";
elemEscen.style.width=anchoLaberinto+"px";
elemEscen.style.height=anchoLaberinto+"px";

for(let f =0; f<escenario.length;f++){
  for (let c=0; c<escenario[f].length;c++){
    sq = document.createElement("DIV");
    if(!escenario[f][c] || escenario[f][c] == "partida" || escenario[f][c]=="final"){
      sq.classList.add("path");
    } else{
      sq.classList.add("wall");
    }
    sq.style.width=unidadAncho+"px";
    sq.style.height=unidadAncho+"px";
    elemEscen.appendChild(sq);
  }
}
const robotElem = document.createElement("DIV");
robotElem.id = "robot1";
robotElem.style.width = unidadAncho+"px";
robotElem.style.height = unidadAncho+"px";
robotElem.style.top="0";
robotElem.style.left=unidadAncho + "px"
robotElem.style.borderRadius = "5px";
robotElem.classList.add("tooltip");

const textito = document.createElement("DIV");
textito.id="recua";
textito.classList.add("tooltiptext");
textito.innerText = "...";
robotElem.appendChild(textito);

const imagRob = document.createElement("IMG");
imagRob.src = "img/robot1.png";
imagRob.style.width = "100%";
imagRob.style.height = "100%";
imagRob.style.boxSizing= "border-box";
imagRob.style.padding="2px";

robotElem.appendChild(imagRob);

elemEscen.appendChild(robotElem);
document.getElementById("panelJuego").appendChild(elemEscen)

/* FUNCIONES PARA CUALQUIER EJERCICIO ROBOT*/

// Lista De Personajes Según Nombre;

const cheatChart = [];

// Clase Personaje
class Personaje {
  constructor(nombreId, stylePropInit) {
    this.nameId = nombreId;
    cheatChart.push(this.nameId);

    this.elementAtDOM = document.getElementById(this.nameId);
    for (let styleProp in stylePropInit) {
      this.elementAtDOM.style[styleProp] = stylePropInit.styleProp;
    }

    this.elementAtDOM.style.transition = "all 0.5s";
    this.stylePropChanges = [stylePropInit];
  }
}

/* --- Creación de Personajes --- */

const personajes = [];
personajes.push(new Personaje("robot1",{top:"0px", left:"30px", backgroundColor:"#1d3f75"}));


/* --- Actualizacion (a ejecutar por intervalos) --- */

function recorrerEstilos(whom=personajes[0], estiloActual=0) {
    setTimeout(function () {
        if (estiloActual<whom.stylePropChanges.length){
          for (prop in whom.stylePropChanges[estiloActual]) {

            let a = whom.stylePropChanges[estiloActual][prop];
            let b = a.toString();
            let z = prop.toString();
            whom.elementAtDOM.style[z] = b;
          }
          estiloActual+=1;
          recorrerEstilos(whom, estiloActual);
        } else {
          modoBoton = true;
        }
    }, 600);
}


//
function aplicarEstilos(){

}
/* Actualizar el Documento con nuevos estilos */
// Función NO PROPIA

function motorizar (){
  recorrerEstilos();
}

// CHEQUEO STEPS

function checkStep (fila, col){
  let cell;
  try {
    cell = escenario[fila][col];
  } catch(error) {
    console.log(error);
    decir("¡Imposible!");
    return false;
  }
  if (cell == 0){
    return true;
  } else if (cell == F || cell == "final"){
    setTimeout(()=>{show("¡¡ GANASTE !!","win")},200)
    return true;
  } else if (cell==P || cell== "partida"){
    return true;
  }else {
    decir("¡Imposible!");
    personajes[0].elementAtDOM.style.backgroundColor="#e02e22";
    return false;
  }
}

/*  --- FUNCIONES PUNTUALES DE ESTE EJERCICIO ---   */

function moverDerecha(whom="robot1"){
  if(modoBoton){
    show("¡EVENTO! - botonDerecha fue clicekado.","event");
  }
  let pos = cheatChart.indexOf(whom);
  let prevTop = parseInt(personajes[pos].stylePropChanges[personajes[pos].stylePropChanges.length-1].top);
  let prevLeft = parseInt(personajes[pos].stylePropChanges[personajes[pos].stylePropChanges.length-1].left);
  let props = {
    top: prevTop+"px",
    left: (prevLeft+unidadAncho)+"px",
    backgroundColor: "#ffff75"
  };
  let archTop = props.top.replace("px","") / unidadAncho;
  let archLeft = props.left.replace("px","") / unidadAncho;
  let valid = checkStep(archTop,archLeft);
  if (valid){
    personajes[pos].stylePropChanges.push(props);
    if(modoBoton){
      show("EJECUTANDO: moverDerecha();", "success");
      for (prop in props){
        let a = props[prop];
        let b = a.toString();
        let z = prop.toString()
        personajes[pos].elementAtDOM.style[z] = a;
      }
    }
  } else {
    show("ERROR: moverDerecha() no se pudo ejecutar.","error")
  }
  show("-","hr")
}

function moverIzquierda(whom="robot1"){
  if(modoBoton){
    show("¡EVENTO! - botonIzquierda fue clicekado.","event");
  }
  let pos = cheatChart.indexOf(whom);
  let prevTop = parseInt(personajes[pos].stylePropChanges[personajes[pos].stylePropChanges.length-1].top);
  let prevLeft = parseInt(personajes[pos].stylePropChanges[personajes[pos].stylePropChanges.length-1].left);
  let props = {
    top: prevTop+"px",
    left: (prevLeft-unidadAncho)+"px",
    backgroundColor: "#8cffec"
  };
  let archTop = props.top.replace("px","") / unidadAncho;
  let archLeft = props.left.replace("px","") / unidadAncho;
  let valid = checkStep(archTop,archLeft);
  if (valid){
    personajes[pos].stylePropChanges.push(props);
    if(modoBoton){
      show("EJECUTANDO: moverIzquierda();", "success");
      for (prop in props){
        let a = props[prop];
        let b = a.toString();
        let z = prop.toString()
        personajes[pos].elementAtDOM.style[z] = a;
      }
    }
  } else {
    show("ERROR: moverIzquierda() no se pudo ejecutar.","error");
  }
  show("-","hr")
}

function moverArriba(whom="robot1"){
  if(modoBoton){
    show("¡EVENTO! - botonArriba fue clicekado.","event");
  }
  let pos = cheatChart.indexOf(whom);
  let prevTop = parseInt(personajes[pos].stylePropChanges[personajes[pos].stylePropChanges.length-1].top);
  let prevLeft = parseInt(personajes[pos].stylePropChanges[personajes[pos].stylePropChanges.length-1].left);
  let props = {
    top: (prevTop-unidadAncho)+"px",
    left: prevLeft+"px",
    backgroundColor: "blue"
  };
  let archTop = props.top.replace("px","") / unidadAncho;
  let archLeft = props.left.replace("px","") / unidadAncho;
  let valid = checkStep(archTop,archLeft);
  if(valid){
    personajes[pos].stylePropChanges.push(props);
    if(modoBoton){
      show("EJECUTANDO: moverArriba();", "success");
      for (prop in props){
        let a = props[prop];
        let b = a.toString();
        let z = prop.toString()
        personajes[pos].elementAtDOM.style[z] = a;
      }
    }
  } else {
    show("ERROR: moverArriba() no se pudo ejecutar.","error");
  }
  show("-","hr");
}

function moverAbajo(whom="robot1"){
  if(modoBoton){
    show("¡EVENTO! - botonAbajo fue clicekado.","event");
  }
  let pos = cheatChart.indexOf(whom);
  let prevTop = parseInt(personajes[pos].stylePropChanges[personajes[pos].stylePropChanges.length-1].top);
  let prevLeft = parseInt(personajes[pos].stylePropChanges[personajes[pos].stylePropChanges.length-1].left);
  let props = {
    top: (prevTop+unidadAncho)+"px",
    left: prevLeft+"px",
    backgroundColor: "#42f566"
  };
  let archTop = props.top.replace("px","") / unidadAncho;
  let archLeft = props.left.replace("px","") / unidadAncho;
  let valid = checkStep(archTop,archLeft);
  if(valid){
    personajes[pos].stylePropChanges.push(props);
    if(modoBoton){
      show("EJECUTANDO: moverAbajo();", "success");
      for (prop in props){
        let a = props[prop];
        let b = a.toString();
        let z = prop.toString()
        personajes[pos].elementAtDOM.style[z] = a;
      }
    }
  } else {
    show("ERROR: moverAbajo() no se pudo ejecutar.","error");
  }
  show("-","hr");
}

let line = 0;
function show(text,mode="normal"){
  let output;
  if(mode!="hr"){
    line++;
    let pLine = line;
    if(line<10){
      pLine = "0"+line.toString()
    }
    const par = document.createElement("P");
    par.classList.add("log");
    switch(mode){
      case "normal":
        break
      case "error":
        par.style.color="red";
        break
      case "event":
        par.style.color="blue";
        break
      case "success":
        par.style.color="green";
        break
      case "win":
        par.style.color="green";
        par.style.fontWeight="bolder";
        par.style.fontSize = "20px";
        par.style.backgroundColor = "yellow";
        par.style.padding="8px";
    }
    par.innerHTML = pLine + " - " + text;
    output=par
  } else {
    output=document.createElement("HR");
  }
  let pan = document.getElementById("panelMensajes");
  pan.appendChild(output);
  pan.scrollTop = pan.scrollHeight;
}
let sourceState = 1;
function cambiarDisfraz(whom=personajes[0]){
  let source;
  console.log(source);
  show("¡EVENTO! - botonConfiguracion fue clickeado.","event")
  show("EJECUTANDO cambiarDisfraz();","success")
  if (sourceState == 1){
    sourceState = 2;
    source = "img/robot2.png";
  }else{
    sourceState =1;
    source = "img/robot1.png";
  }
  whom.elementAtDOM.getElementsByTagName("img")[0].src = source;
  show("-","hr")
}


function decir(texto, segundos=3, whom=personajes[0]){
  document.getElementById("recua").innerText=texto;
  let elem = whom.elementAtDOM;
  elem.classList.add("tooltipVisible");
  setTimeout(()=>{
    elem.classList.remove("tooltipVisible");
  }, 1200);
}

// {{currentJS}}
// Codigo del alumno
