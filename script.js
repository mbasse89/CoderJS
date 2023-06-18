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

let mensaje = "Bienvenido " + nombre + " a 'Hoteles Ushuahia'. Te pido que elijas una de estas opciones \n1 - Lista de hoteles\n2 - Filtrar por categoria\n3 -  Buscar por nombre\n4 - Listar ordenados por precio\n5 - Agregar hotel al carrito \n 6 - Listar y calcular por noche\n0 - SALIR"


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


          let nombreHoteles = hoteles.map((hotel) => hotel.nombre) // crea array con los nombres 
          let listaHoteles = nombreHoteles.join(",\n") // une todos los nombre de los hoteles en una variable

          alert("Nombres de los hoteles disponibles:\n" + listaHoteles)


  } else if (opciones === 2) {
    //            FILTRAR POR CANTIDAD DE ESTRELLAS
          let categoria = Number(prompt(nombre + " por favor indicá el número de estrellas de hotel estás buscando \n 1 estrella \n 2 estrellas \n 3 estrellas \n 4 estrellas \n 5 estrellas "))



          let hotelesFiltrados = hoteles.filter((hotel) => hotel.estrellas === categoria) // filtra y compara estrellas con variable categoria
          let hotelesInfo = hotelesFiltrados.map((hotel) => `${hotel.nombre} - ${hotel.estrellas} estrellas`) // se crea variable para guardar el map 

          let mensaje = "Hoteles filtrados por categoría de estrellas:"
          
          if (hotelesInfo.length > 0) { // si el tamaño del array es mayor a 0 retornará todos los hoteles de una misma categoria
            mensaje += "\n" + hotelesInfo.join("\n")
          } else {
            mensaje += "\nNo se encontraron hoteles en esa categoría."
          }

          alert(mensaje);

  } else if (opciones === 3) {
    //              BUSCA POR NOMBRE DE HOTEL
          let nombreIngresado = prompt("Ingresá el nombre del hotel que estás buscando") 
          nombreIngresado = nombreIngresado.toLowerCase(); 
          let nombreBuscado = hoteles.find ( hotel => hotel.nombre.toLowerCase() === nombreIngresado) // busca y compara  hotel ingresado con uno que ya existe
          if (nombreBuscado) { // si la condicion es tru, devolverá una concatenación de propiedad especificaas
            alert(`Nombre: ${nombreBuscado.nombre}\nCategoría: ${nombreBuscado.estrellas} estrellas\nPrecio: ${nombreBuscado.precio}`)
          } else {
            alert("Hotel no encontrado");
          }

  
  } else if (opciones ===4){
    let orden = prompt("Ingrese '+' si quiere que se ordene de mayor a menor precio, O ingrese '-' si quiere que se ordene de menor a mayor precio" )
    //                      ORDENAR POR PRECIO
        if (orden === '-'){
          let hotelesPorPrecio = hoteles.sort((a, b) => a.precio - b.precio) // se ordena de manera ascendente
          let nombresHoteles = hotelesPorPrecio.map(hotel => hotel.nombre) // se utiliza map para asociar precio y nombre de cada htl
      
          let mensaje = listarPrecio(hotelesPorPrecio)
      
           alert(mensaje)
        } else if ( orden === "+"){
          let hotelesPorPrecio = hoteles.sort((a, b) => b.precio - a.precio)
          let nombresHoteles = hotelesPorPrecio.map(hotel => hotel.nombre)
      
          let mensaje = listarPrecio(hotelesPorPrecio)
      
          alert(mensaje)
        } else{
          alert("Error en dato ingresado")
        }

        function listarPrecio(arrayAListar) { // funcion creada para listar 
          let listado = "Nombnre - Precio\n"
          arrayAListar.forEach(element => {
            listado = listado + element.nombre + " -  $" + element.precio + "\n"
          })
          return listado
    }
  } else if (opciones ===5){
//                                  AGREGAR HOTEL A CARRITO
          let listaHoteles = "Lista de Hoteles:\n"
          hoteles.forEach((hotel) => { // recorre array hoteles y se crea variable con propiedades especificas para mostrar a usuario
            listaHoteles += `    ID: ${hotel.id}\nNombre: ${hotel.nombre}\nPrecio:  $${hotel.precio} por noche \n `
          })
          let agregar = prompt (listaHoteles)


          let hotelSeleccionado = hoteles.find((hotel) => hotel.id === Number(agregar)) // se usa find para buscar ID con lo q ingresa usuario

          if (hotelSeleccionado) { // si la condicion es true va a agregar a carrito lo q selecciono usuario
            // Agregar el hotel seleccionado al array carrito
            carrito.push(hotelSeleccionado) 
            alert("Hotel agregado al carrito.")
          } else {
            alert("Por favor ingrese una opción correcta.")
          }

  } else if (opciones === 6) {
          
    let lista =""
 
        if (carrito.length > 0){ // si se cumple condicion, se recorrera el array carrito para q se mueste nombre y precio de c/hotel
          carrito.forEach((hotel) => {
            lista += `${hotel.nombre} $ ${hotel.precio} por noche\n`
          })
        } else{
          alert("Ha ocurrido un error.")
        }
        alert ("Tu opción elegida es\n " + lista)

        let cantNoches = Number(prompt("Ahora indicanos cuantas noches vas a hospedarte."))

        if (cantNoches > 0) { // si cantNoches es mayor a 0 se hara calculo 
        carrito.forEach((hotel) =>{
          let total = hotel.precio * cantNoches
        alert("EL total a abonar es de: $ " + total)
       })
      
      } else {
        alert("Por favor ingrese una opción correcta.")
      }


   } else if (opciones === 0){
      alert("Gracias por visitar 'Hoteles Ushuahia' ")
         break // si usuario elige esta opción, finalizará el códigop
   }

} while(opciones !== 0)