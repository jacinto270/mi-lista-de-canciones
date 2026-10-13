let canciones = [
  "Bohemian Rhapsody - Queen",
  "Despacito - Luis Fonsi",
  "Malamente - Rosalía",
  "Shape of You - Ed Sheeran",
  "La flaca - Jarabe de Palo",
  "Billie Jean - Michael Jackson"
];

if (localStorage.getItem("canciones")) {
  canciones = JSON.parse(localStorage.getItem("canciones"));
}

const contador = document.getElementById("contador");
const casillaNueva = document.getElementById("nueva");
const botonAnadir = document.getElementById("anadir");
const casillaBuscar = document.getElementById("buscar");
const mensaje = document.getElementById("mensaje");
const lista = document.getElementById("lista");
const botonOrdenar = document.getElementById("ordenar");

function getCancionesFiltradas() {
  const textoBusqueda = casillaBuscar.value.trim().toLowerCase();

  if (!textoBusqueda) {
    return canciones;
  }

  return canciones.filter((cancion) =>
    cancion.toLowerCase().includes(textoBusqueda)
  );
}

function pintarLista() {
  const cancionesFiltradas = getCancionesFiltradas();
  lista.innerHTML = "";

  if (cancionesFiltradas.length === 0) {
    const vacio = document.createElement("li");
    vacio.classList.add("vacia");
    vacio.textContent = "No hay canciones que coincidan con tu búsqueda.";
    lista.appendChild(vacio);
    contador.textContent = "0 canciones";
    return;
  }

  for (let i = 0; i < canciones.length; i++) {
    const cancion = canciones[i];
    if (!cancion.toLowerCase().includes(casillaBuscar.value.trim().toLowerCase())) {
      continue;
    }

    const elemento = document.createElement("li");
    elemento.classList.add("itemLista");

    const info = document.createElement("div");
    info.classList.add("itemInfo");

    const nombre = document.createElement("span");
    nombre.textContent = cancion;
    info.appendChild(nombre);

    const boton = document.createElement("button");
    boton.textContent = "Eliminar";
    boton.classList.add("eliminar");
    boton.addEventListener("click", function () {
      eliminar(i);
    });

    elemento.append(info, boton);
    lista.appendChild(elemento);
  }

  const totalMostrado = cancionesFiltradas.length;
  const texto = totalMostrado === 1 ? "1 canción" : `${totalMostrado} canciones`;
  contador.textContent = texto;
}

function persistirCanciones() {
  localStorage.setItem("canciones", JSON.stringify(canciones));
}

function anadir() {
  const titulo = casillaNueva.value.trim();

  if (titulo === "") {
    mensaje.textContent = "Escribe el título de la canción.";
    return;
  }

  if (existe(titulo)) {
    mensaje.textContent = "La canción ya está en la lista.";
    return;
  }

  canciones.push(titulo);
  persistirCanciones();
  casillaNueva.value = "";
  mensaje.textContent = "Añadida: " + titulo;
  pintarLista();
}

function eliminar(posicion) {
  const quitada = canciones[posicion];
  canciones.splice(posicion, 1);
  persistirCanciones();
  mensaje.textContent = "Eliminada: " + quitada;
  pintarLista();
}

function ordenar() {
  canciones.sort((a, b) => a.localeCompare(b, "es"));
  mensaje.textContent = "Lista ordenada de la A a la Z.";
  pintarLista();
}

function existe(titulo) {
  return canciones.some(
    (cancion) => cancion.toLowerCase() === titulo.toLowerCase()
  );
}

botonAnadir.addEventListener("click", anadir);
casillaNueva.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    anadir();
  }
});
casillaBuscar.addEventListener("input", pintarLista);
botonOrdenar.addEventListener("click", ordenar);

pintarLista();

