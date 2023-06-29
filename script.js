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
  { id: 16, nombre: "Los Cauquenes Spa & Resort", estrellas: 5, precio: 22500, rutaImagen: "img/cauquenes.jpg"}

]


let carrito = [] // array carrito que comienza vacio

 // al iniciar la pagina verificara si el carrito esta vacio o no
if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"))
}


function mostrarContenidoCarrito() {
  let contenidoCarritoElement = document.getElementById("contenidoCarrito")
  contenidoCarritoElement.innerHTML = "" // Limpia el contenido anterior del carrito

  if (carrito.length === 0) {
    contenidoCarritoElement.innerText = "El carrito está vacío"

  } else {
    contenidoCarritoElement.innerHTML = "" // Limpia el contenido anterior del carrito

    carrito.forEach((producto, index) => {
      let productoElement = document.createElement("p")
      productoElement.innerText = `Producto ${index + 1}: ${producto.nombre} \n Precio: $${producto.precio}`
      contenidoCarritoElement.appendChild(productoElement)
    });
  }
}

let btnCarrito = document.getElementById("btnCarrito")
btnCarrito.addEventListener("click", () => {
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
    imagen.classList.add("imgHotel")
    divHotel.appendChild(imagen)

    let nombre = document.createElement("h4")
    nombre.innerText = hotel.nombre
    divHotel.appendChild(nombre)

    let estrellas = document.createElement("p")
    estrellas.innerText = "Estrellas: " + hotel.estrellas
    divHotel.appendChild(estrellas)

    let precio = document.createElement("p")
    precio.innerText = "Precio: $" + hotel.precio
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
  carrito.push(hotel)
  localStorage.setItem("carrito", JSON.stringify(carrito))
   alert(`Se ha agregado una noche en el hotel "${hotel.nombre}" al carrito de compras.`)
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
checkBox1.addEventListener("change", () => {  // evento 
  checkBox1.checked ? filtrarPorCategoria(5) : mostrarHoteles(hoteles)// se utiliza metodo ternario del IF
})

let checkBox2 = document.getElementById("checkbox2")
checkBox2.addEventListener("change", () => {
  checkBox2.checked ? filtrarPorCategoria(4) : mostrarHoteles(hoteles) // se utiliza metodo ternario del IF

})

let checkBox3 = document.getElementById("checkbox3")
checkBox3.addEventListener("change", () => {
    checkBox3.checked ? filtrarPorCategoria(3) : mostrarHoteles(hoteles)// se utiliza metodo ternario del IF
})

let checkBox4 = document.getElementById("checkbox4");
checkBox4.addEventListener("change", () => {
  checkBox4.checked ? filtrarPorCategoria(2) : mostrarHoteles(hoteles)// se utiliza metodo ternario del IF

})

let checkBox5 = document.getElementById("checkbox5");
checkBox5.addEventListener("change", () => {
  checkBox5.checked ? filtrarPorCategoria(1) : mostrarHoteles(hoteles)// se utiliza metodo ternario del IF

})

function filtrarPorCategoria(categoria) {
  let resultados = hoteles.filter(hotel => hotel.estrellas === categoria)
  mostrarHoteles(resultados)
}









// let opciones

// let nombre = prompt('Ingresa tu nombre')

// let mensaje = "Bienvenido " + nombre + " a 'Hoteles Ushuahia'. Te pido que elijas una de estas opciones \n1 - Lista de hoteles\n2 - Filtrar por categoria\n3 -  Buscar por nombre\n4 - Listar ordenados por precio\n5 - Agregar hotel al carrito \n 6 - Listar y calcular por noche\n0 - SALIR"


// //  funcion que sirve para listar
// function listar(arrayAListar) {
//   let listado = "ID - Nombre\n"
//   arrayAListar.forEach(element => {
//     listado = listado + element.id + " - " + element.nombre + "\n"
//   })
//   return listado
// }


// // comienza la estructura
// do {
//   let opciones = Number(prompt(mensaje))

//   //                    LISTAR HOTELES
//   if (opciones === 1) {


//           let nombreHoteles = hoteles.map((hotel) => hotel.nombre) // crea array con los nombres 
//           let listaHoteles = nombreHoteles.join(",\n") // une todos los nombre de los hoteles en una variable

//           alert("Nombres de los hoteles disponibles:\n" + listaHoteles)


//   } else if (opciones === 2) {
//     //            FILTRAR POR CANTIDAD DE ESTRELLAS
//           let categoria = Number(prompt(nombre + " por favor indicá el número de estrellas de hotel estás buscando \n 1 estrella \n 2 estrellas \n 3 estrellas \n 4 estrellas \n 5 estrellas "))



//           let hotelesFiltrados = hoteles.filter((hotel) => hotel.estrellas === categoria) // filtra y compara estrellas con variable categoria
//           let hotelesInfo = hotelesFiltrados.map((hotel) => `${hotel.nombre} - ${hotel.estrellas} estrellas`) // se crea variable para guardar el map 

//           let mensaje = "Hoteles filtrados por categoría de estrellas:"
          
//           if (hotelesInfo.length > 0) { // si el tamaño del array es mayor a 0 retornará todos los hoteles de una misma categoria
//             mensaje += "\n" + hotelesInfo.join("\n")
//           } else {
//             mensaje += "\nNo se encontraron hoteles en esa categoría."
//           }

//           alert(mensaje);

//   } else if (opciones === 3) {
//     //              BUSCA POR NOMBRE DE HOTEL
//           let nombreIngresado = prompt("Ingresá el nombre del hotel que estás buscando") 
//           nombreIngresado = nombreIngresado.toLowerCase(); 
//           let nombreBuscado = hoteles.find ( hotel => hotel.nombre.toLowerCase() === nombreIngresado) // busca y compara  hotel ingresado con uno que ya existe
//           if (nombreBuscado) { // si la condicion es tru, devolverá una concatenación de propiedad especificaas
//             alert(`Nombre: ${nombreBuscado.nombre}\nCategoría: ${nombreBuscado.estrellas} estrellas\nPrecio: ${nombreBuscado.precio}`)
//           } else {
//             alert("Hotel no encontrado");
//           }

  
//   } else if (opciones ===4){
//     let orden = prompt("Ingrese '+' si quiere que se ordene de mayor a menor precio, O ingrese '-' si quiere que se ordene de menor a mayor precio" )
//     //                      ORDENAR POR PRECIO
//         if (orden === '-'){
//           let hotelesPorPrecio = hoteles.sort((a, b) => a.precio - b.precio) // se ordena de manera ascendente
//           let nombresHoteles = hotelesPorPrecio.map(hotel => hotel.nombre) // se utiliza map para asociar precio y nombre de cada htl
      
//           let mensaje = listarPrecio(hotelesPorPrecio)
      
//            alert(mensaje)
//         } else if ( orden === "+"){
//           let hotelesPorPrecio = hoteles.sort((a, b) => b.precio - a.precio)
//           let nombresHoteles = hotelesPorPrecio.map(hotel => hotel.nombre)
      
//           let mensaje = listarPrecio(hotelesPorPrecio)
      
//           alert(mensaje)
//         } else{
//           alert("Error en dato ingresado")
//         }

//         function listarPrecio(arrayAListar) { // funcion creada para listar 
//           let listado = "Nombnre - Precio\n"
//           arrayAListar.forEach(element => {
//             listado = listado + element.nombre + " -  $" + element.precio + "\n"
//           })
//           return listado
//     }
//   } else if (opciones ===5){
// //                                  AGREGAR HOTEL A CARRITO
//           let listaHoteles = "Lista de Hoteles:\n"
//           hoteles.forEach((hotel) => { // recorre array hoteles y se crea variable con propiedades especificas para mostrar a usuario
//             listaHoteles += `    ID: ${hotel.id}\nNombre: ${hotel.nombre}\nPrecio:  $${hotel.precio} por noche \n `
//           })
//           let agregar = prompt (listaHoteles)


//           let hotelSeleccionado = hoteles.find((hotel) => hotel.id === Number(agregar)) // se usa find para buscar ID con lo q ingresa usuario

//           if (hotelSeleccionado) { // si la condicion es true va a agregar a carrito lo q selecciono usuario
//             // Agregar el hotel seleccionado al array carrito
//             carrito.push(hotelSeleccionado) 
//             alert("Hotel agregado al carrito.")
//           } else {
//             alert("Por favor ingrese una opción correcta.")
//           }

//   } else if (opciones === 6) {
          
//     let lista =""
 
//         if (carrito.length > 0){ // si se cumple condicion, se recorrera el array carrito para q se mueste nombre y precio de c/hotel
//           carrito.forEach((hotel) => {
//             lista += `${hotel.nombre} $ ${hotel.precio} por noche\n`
//           })
//         } else{
//           alert("Ha ocurrido un error.")
//         }
//         alert ("Tu opción elegida es\n " + lista)

//         let cantNoches = Number(prompt("Ahora indicanos cuantas noches vas a hospedarte."))

//         if (cantNoches > 0) { // si cantNoches es mayor a 0 se hara calculo 
//         carrito.forEach((hotel) =>{
//           let total = hotel.precio * cantNoches
//         alert("EL total a abonar es de: $ " + total)
//        })
      
//       } else {
//         alert("Por favor ingrese una opción correcta.")
//       }


//    } else if (opciones === 0){
//       alert("Gracias por visitar 'Hoteles Ushuahia' ")
//          break // si usuario elige esta opción, finalizará el códigop
//    }

// } while(opciones !== 0)

// let nombrePelicula = prompt ('Ingrese un nombre de una pelicula')



 



/////////////////////////////////////////////////////////////////////
 
