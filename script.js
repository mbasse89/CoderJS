let hoteles = [
  { id: 1, nombre: "Hotel los altos ushuahia", estrellas: 4, precio: 15000 },
  { id: 2, nombre: "Hotel andino", estrellas: 3, precio: 12000 },
  { id: 3, nombre: "Hotel fueguino", estrellas: 3, precio: 11000 },
  { id: 4, nombre: "Hotel patagonico", estrellas: 4, precio: 18000 },
  { id: 5, nombre: "Hotel alto ushuahia", estrellas: 5, precio: 21000 },
  { id: 6, nombre: "Hostel las marias", estrellas: 2, precio: 8000 },
  { id: 7, nombre: "Hotel las hayas resort", estrellas: 5, precio: 22000 },
  { id: 8, nombre: "Hotel los naranjos", estrellas: 3, precio: 13000 },
  { id: 9, nombre: "Hotel las lengas", estrellas: 4, precio: 19000 },
]


// declaracion de variables
let carrito = []
let opciones

let nombre = prompt('Ingresa tu nombre')

let mensaje = "Bienvenido " + nombre + " a 'Hoteles Ushuahia'. Te pido que elijas una de estas opciones \n1 - Lista de hoteles\n2 - Filtrar por categoria\n3 -  Buscar por nombre\n4 - Listar ordenados por precio\n5 - Agregar hotel al carrito \n 6 - Listar y calcular por noche\n7 - Ver total y finalizar compra\n0 - SALIR"


//  funcion que sirve para listar
function listar(arrayAListar) {
  let listado = "ID - Nombre\n"
  arrayAListar.forEach(element => {
    listado = listado + element.id + " - " + element.nombre + "\n"
  })
  return listado
}





// comienza la estructura
do {
  let opciones = Number(prompt(mensaje))

  //                    LISTAR HOTELES
  if (opciones === 1) {


          let nombreHoteles = hoteles.map((hotel) => hotel.nombre)
          let listaHoteles = nombreHoteles.join(",\n")

          alert("Nombres de los hoteles disponibles:\n" + listaHoteles)


  } else if (opciones === 2) {
    //            FILTRAR POR CANTIDAD DE ESTRELLAS
          let categoria = Number(prompt(nombre + " por favor indicá el número de estrellas de hotel estás buscando \n 1 estrella \n 2 estrellas \n 3 estrellas \n 4 estrellas \n 5 estrellas "))



          let hotelesFiltrados = hoteles.filter((hotel) => hotel.estrellas === categoria)
          let hotelesInfo = hotelesFiltrados.map((hotel) => `${hotel.nombre} - ${hotel.estrellas} estrellas`)

          let mensaje = "Hoteles filtrados por categoría de estrellas:"
          if (hotelesInfo.length > 0) {
            mensaje += "\n" + hotelesInfo.join("\n")
          } else {
            mensaje += "\nNo se encontraron hoteles en esa categoría."
          }

          alert(mensaje);

  } else if (opciones === 3) {
    //              BUSCA POR NOMBRE DE HOTEL
          let nombreIngresado = prompt("Ingresá el nombre del hotel que estás buscando") 
          nombreIngresado = nombreIngresado.toLowerCase();
          let nombreBuscado = hoteles.find ( hotel => hotel.nombre.toLowerCase() === nombreIngresado)
          if (nombreBuscado) {
            alert(`Nombre: ${nombreBuscado.nombre}\nCategoría: ${nombreBuscado.estrellas} estrellas\nPrecio: ${nombreBuscado.precio}`)
          } else {
            alert("Hotel no encontrado");
          }

  
  } else if (opciones ===4){
    let orden = prompt("Ingrese '+' si quiere que se ordene de mayor a menor precio, O ingrese '-' si quiere que se ordene de menor a mayor precio" )
    //                      ORDENAR POR PRECIO
        if (orden === '-'){
          let hotelesPorPrecio = hoteles.sort((a, b) => a.precio - b.precio)
          let nombresHoteles = hotelesPorPrecio.map(hotel => hotel.nombre)
      
          let mensaje = listarPrecio(hotelesPorPrecio)
      
           alert(mensaje)
        } else if ( orden === "+"){
          let hotelesPorPrecio = hoteles.sort((a, b) => a.precio + b.precio)
          let nombresHoteles = hotelesPorPrecio.map(hotel => hotel.nombre)
      
          let mensaje = listarPrecio(hotelesPorPrecio)
      
          alert(mensaje)
        } else{
          alert("Error en dato ingresado")
        }

        function listarPrecio(arrayAListar) {
          let listado = "Nombnre - Precio\n"
          arrayAListar.forEach(element => {
            listado = listado + element.nombre + " -  $" + element.precio + "\n"
          })
          return listado
    }
  } else if (opciones ===5){
//                                  AGREGAR HOTEL A CARRITO
          let listaHoteles = "Lista de Hoteles:\n"
          hoteles.forEach((hotel) => {
            listaHoteles += `    ID: ${hotel.id}\nNombre: ${hotel.nombre}\nPrecio:  $${hotel.precio} por noche \n `
          })
          let agregar = prompt (listaHoteles)

          let hotelSeleccionado = hoteles.find((hotel) => hotel.id === Number(agregar))

          if (hotelSeleccionado) {
            // Agregar el hotel seleccionado al array carrito
            carrito.push(hotelSeleccionado) 
            alert("Hotel agregado al carrito.")
          } else {
            alert("Por favor ingrese una opción correcta.")
          }

  } else if (opciones === 6) {
          
    let lista =""
 
        if (carrito.length > 0){
          carrito.forEach((hotel) => {
            lista += `${hotel.nombre} $ ${hotel.precio} por noche\n`
          })
        } else{
          alert("Ha ocurrido un error.")
        }
        alert ("Tu opción elegida es\n " + lista)

        let cantNoches = Number(prompt("Ahora indicanos cuantas noches vas a hospedarte."))

        carrito.forEach((hotel) =>{
          let total = hotel.precio * cantNoches
        alert(total)

        })

   } else if (opciones === 0){
         break
   }

} while(opciones !== 0)