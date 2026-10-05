let canciones = [
  "Bohemian Rhapsody - Queen",
  "Despacito - Luis Fonsi",
  "Malamente - Rosalía",
  "Shape of You - Ed Sheeran",
  "La flaca - Jarabe de Palo",
  "Billie Jean - Michael Jackson"
];

// comprobar si tenemos las canciones en locaStorage
if(localStorage.getItem("canciones")){
  canciones =  JSON.parse(localStorage.getItem("canciones"))
}




const contador = document.getElementById("contador");
const casillaNueva = document.getElementById("nueva");
const botonAnadir = document.getElementById("anadir");
const casillaBuscar = document.getElementById("buscar");
const mensaje = document.getElementById("mensaje");
const lista = document.getElementById("lista");
const botonOrdenar = document.getElementById("ordenar")



// 3. Muestra todas las canciones y cuántas hay
function pintarLista() {
  lista.innerHTML = "";
  for (let i = 0; i < canciones.length; i++) {
    const elemento = document.createElement("li");
    elemento.classList.add("itemLista")
    elemento.textContent = canciones[i] + " ";
    const boton = document.createElement("button");
    boton.textContent = "Eliminar";
    boton.addEventListener("click", function () {
      eliminar(i);
    });
    elemento.append(boton);
    lista.append(elemento);
  }
  contador.textContent = canciones.length + " canciones";
}

pintarLista()



// 4. Añade la canción escrita en la casilla
function anadir() {
  const titulo = casillaNueva.value.trim();
  if (titulo === "") {
    mensaje.textContent = "Escribe el título de la canción.";
    return;
  }

  if(existe(titulo)){
    mensaje.textContent = "la cancion ya esta en la lista"
    return
  }
  canciones.push(titulo);

  // guardar en , locaStoraje
  localStorage.setItem("canciones", JSON.stringify(canciones))
  // limpiar el texto del input
  casillaNueva.value = "";
  mensaje.textContent = "Añadida: " + titulo;
  pintarLista();

  
}

botonAnadir.addEventListener("click", anadir);


// 5. Quita la canción que está en esa posición
function eliminar(posicion) {
  const quitada = canciones[posicion];
  canciones.splice(posicion, 1);
  // actualiza locaStoraje
  localStorage.setItem("canciones", JSON.stringify(canciones))

  mensaje.textContent = "Eliminada: " + quitada;
  pintarLista();
}

function ordenar(){
  canciones.sort((a,b)=>{
    return a.localeCompare(b, "es")
  })
  mensaje.textContent = "lista ordenada de la A a la Z"

  pintarLista()
}

function existe(titulo){
  for(const canción of canciones){
    if(canción.toLocaleLowerCase() === titulo.toLocaleLowerCase()){
      return true
    }
  }
}

pintarLista()

botonAnadir.addEventListener("click", anadir)
casillaBuscar.addEventListener("input", pintarLista)
botonOrdenar.addEventListener("click", ordenar)



