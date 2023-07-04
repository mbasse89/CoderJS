let hoteles = [
  { id: 1, nombre: "Hotel Los Altos Ushuahia", estrellas: 4, precio: 15000, rutaImagen: "img/altosUshuaia.jpg"},
  { id: 2, nombre: "Hotel Monaco", estrellas: 3, precio: 12000, rutaImagen: "img/monaco.jpg"},
  { id: 3, nombre: "Hotel Fueguino", estrellas: 3, precio: 11000, rutaImagen: "img/fueguino.jpg" },
  { id: 4, nombre: "Hotel Vitalia", estrellas: 4, precio: 18000, rutaImagen: "img/vitalia.jpg"},
  { id: 5, nombre: "Hotel Alto Andino", estrellas: 5, precio: 21000, rutaImagen: "img/altoAndino.jpg"  },
  { id: 6, nombre: "Hostel Las Marias", estrellas: 2, precio: 8000,  rutaImagen: "img/lasMarias.jpg"},
  { id: 7, nombre: "Hotel Las Hayas Resort", estrellas: 5, precio: 22000, rutaImagen:"img/lasHayas.jpg" },
  { id: 8, nombre: "Hotel Los Naranjos", estrellas: 3, precio: 13000, rutaImagen: "img/losnaranjos.jpg" },
  { id: 9, nombre: "Hotel Las Lengas", estrellas: 4, precio: 19000, rutaImagen: "img/lasLengas.jpg" },
  { id: 10, nombre: "Hotel Canal de Beagle", estrellas: 4, precio: 18500, rutaImagen: "img/canalBeagle.jpg" },
  { id: 11, nombre: "Hotel Mil810", estrellas: 3, precio: 14500, rutaImagen: "img/mil810.jpg"},
  { id: 12, nombre: "Campanilla", estrellas: 3, precio: 16000, rutaImagen: "img/campanilla.jpg"},
  { id: 13, nombre: "Costa Ushuaia", estrellas: 4, precio: 18500, rutaImagen: "img/costaUshuaia.jpg"},
  { id: 14, nombre: "Tolkeyen", estrellas: 3, precio: 13500, rutaImagen: "img/tolkeyen.jpg"},
  { id: 15, nombre: "Hostal Malvina", estrellas: 2, precio: 7000, rutaImagen: "img/malvinas.webp"},
  { id: 16, nombre: "Los Cauquenes Spa & Resort", estrellas: 5, precio: 22500, rutaImagen: "img/cauquenes.jpg"},
  { id: 17, nombre: "Anum Hostel", estrellas: 1, precio: 6000, rutaImagen: "img/anum.webp"}
 ]

 let excursiones = [
  {id: 1 , nombre: "Parque con Trekking y Canoas", precio: 35190, rutaImagen : "img/excursiones/trekingCanoas.jpg"  }
 ]


let carrito = [] // array carrito que comienza vacio


 // al iniciar la pagina verificara si el carrito esta vacio o no
if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"))
}
///

function mostrarContenidoCarrito() {
  let contenidoCarritoElement = document.getElementById("divCarrito")
  let totalNoches = 0
  let valorTotal = 0
  contenidoCarritoElement.innerHTML = "" // Limpia el contenido anterior del carrito



  if (carrito.length === 0) {
    contenidoCarritoElement.innerText = "El carrito está vacío"

  } else {
    contenidoCarritoElement.innerHTML = "" // Limpia el contenido anterior del carrito

    carrito.forEach((producto, index) => {
      let productoElement = document.createElement("p")
      productoElement.innerText = `Producto ${index + 1}: ${producto.nombre} \n Precio: $${producto.precio}`
      contenidoCarritoElement.appendChild(productoElement)
      totalNoches += producto.noches
      valorTotal += producto.noches * producto.precio
    })

    let totalNochesElement = document.createElement("p")
    totalNochesElement.innerText = `Total de noches: ${totalNoches}`// Muestra el total de noches
    contenidoCarritoElement.appendChild(totalNochesElement)

    let valorTotalElement = document.createElement("p");
    valorTotalElement.innerText = `Valor total: $${valorTotal}`; // Muestra el valor total
    contenidoCarritoElement.appendChild(valorTotalElement);

  }
}






// evento que muestra el contenido del coarrito
let btnCarrito = document.getElementById("btnCarrito")
btnCarrito.addEventListener("click", () => {
  mostrarContenidoCarrito()
})


// evento que vacia el interior del carrito
let btnVaciar = document.getElementById ("btnVaciar")

btnVaciar.addEventListener("click", ()=>{
  carrito = []
  localStorage.removeItem("carrito")
  mostrarContenidoCarrito()
})    


//  se toma por ID el div buscador
let buscador = document.getElementById("buscador")
let divBuscar = document.getElementById ("divBuscador")
divBuscar.classList.add("styleBuscador") // se agrega clase al buscador

 
let contenedorHoteles = document.getElementById("contenedorHoteles") // se toma por id el div 

// Agregar evento input al campo de búsqueda
buscador.addEventListener("input", buscarHoteles)
// Mostrar todos los hoteles al cargar la página
mostrarHoteles(hoteles)



// Función para mostrar los hoteles
function mostrarHoteles(hoteles) {
  contenedorHoteles.innerHTML = ""

  hoteles.forEach(hotel => {
    let divHotel = document.createElement("div")
 
    let imagen = document.createElement("img")
    imagen.src = hotel.rutaImagen 
    imagen.classList.add("imagenes")
    divHotel.appendChild(imagen)

    let nombre = document.createElement("h4")
    nombre.innerText = hotel.nombre
    divHotel.appendChild(nombre)

    let estrellas = document.createElement("p")
    estrellas.innerText = `Estrellas:  ${hotel.estrellas}`
    divHotel.appendChild(estrellas)

    let precio = document.createElement("p")
    precio.innerText = `Precio: $${hotel.precio}`
    divHotel.appendChild(precio)

    contenedorHoteles.appendChild(divHotel)

    let botonAgregarNoche = document.createElement("button")
    botonAgregarNoche.innerText = "Agregar noche +"
    divHotel.appendChild(botonAgregarNoche)

    // evento para agregar noche con el boton
    botonAgregarNoche.addEventListener("click", () => agregarNocheHotel(hotel))

    
          })
}

// agrega noche al carrito 
function agregarNocheHotel(hotel) {
  let hotelExistente = carrito.find(item => item.id === hotel.id)
    
  if (hotelExistente) {
    hotelExistente.noches += 1 
  } else {
    hotel.noches = 1
  carrito.push(hotel)
  }
  localStorage.setItem("carrito", JSON.stringify(carrito))
   //alert(`Se ha agregado una noche en el hotel "${hotel.nombre}" al carrito de compras.`)
   mostrarContenidoCarrito()
}



// Función para buscar hoteles
function buscarHoteles() {
  let busqueda = buscador.value.toLowerCase()
  let resultados = hoteles.filter(hotel => 
    hotel.nombre.toLowerCase().includes(busqueda))

  mostrarHoteles(resultados)
}


// evento para checkbox por categoria 
let checkBox1 = document.getElementById("checkbox1") 
checkBox1.addEventListener("click", () => {  // evento que se modifica si una 
  // checkBox1.checked ? filtrarPorCategoria(5) : mostrarHoteles(hoteles)// se utiliza metodo ternario del IF
  filtrarPorCategoria(5)
})

let checkBox2 = document.getElementById("checkbox2")
checkBox2.addEventListener("click", () => {
  // checkBox2.checked ? filtrarPorCategoria(4) : mostrarHoteles(hoteles) // se utiliza metodo ternario del IF
  filtrarPorCategoria(4)

})

let checkBox3 = document.getElementById("checkbox3")
checkBox3.addEventListener("click", () => {
filtrarPorCategoria(3)
})

let checkBox4 = document.getElementById("checkbox4");
checkBox4.addEventListener("click", () => {
filtrarPorCategoria(2)
})

let checkBox5 = document.getElementById("checkbox5");
checkBox5.addEventListener("click", () => {
filtrarPorCategoria(1)
})

let todos = document.getElementById("todos")
todos.addEventListener("click", () =>{
  mostrarHoteles(hoteles)
})

// funcion para filtrar por categoria
function filtrarPorCategoria(categoria) {
  let resultados = hoteles.filter(hotel => hotel.estrellas === categoria)
  
  mostrarHoteles(resultados)
}

// evento que desplaza la vista hacia el contenido del carrito
btnCarrito.addEventListener("click", () => {
  divCarrito.scrollIntoView({ behavior: "smooth" })
})






let btnHoteles = document.getElementById("btnHoteles")
btnHoteles.addEventListener("click" , () =>{
  mostrarHoteles(hoteles)
})

// se toma btn de autos para luego ingresarle productos
let btnAutos = document.getElementById ("btnAutos")

// se toma btn de asistencia para luego ingresarle productos
let btnAsistencias = document.getElementById("btnAsistencias")



// se toma btn excursiones
let btnExcursiones = document.getElementById("btnExcursiones")
btnExcursiones.addEventListener("click", () =>{
  mostrarExcursiones(excursiones)
})
// funcion para mostrar excursiones
function mostrarExcursiones(excursiones) {
  contenedorHoteles.innerHTML = ""

  excursiones.forEach(excursion => {
    let divExcursion = document.createElement("div")
 
    let imagen = document.createElement("img")
    imagen.src = excursion.rutaImagen 
    imagen.classList.add("imagenes")
    divExcursion.appendChild(imagen)

    let nombre = document.createElement("h4")
    nombre.innerText = excursion.nombre
    divExcursion.appendChild(nombre)

  

    let precio = document.createElement("p")
    precio.innerText = `Precio: $${excursion.precio}`
    divExcursion.appendChild(precio)

    contenedorHoteles.appendChild(divExcursion)

    let botonAgregarNoche = document.createElement("button")
    botonAgregarNoche.innerText = "Agregar noche +"
    divExcursion.appendChild(botonAgregarNoche)

    // evento para agregar noche con el boton
    botonAgregarNoche.addEventListener("click", () => agregarNocheHotel(hotel))

    
          })
}
// se toma btn de excursiones para luego agregarle prodcutos
