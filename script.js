programaPrincipal()


function programaPrincipal() { }

fetch('db.json')
  .then(response => response.json())
  .then(data => {

    let hoteles = data.hoteles
    let excursiones = data.excursiones


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
        contenidoCarritoElement.innerText = "No elegiste ningún producto"
      } else {
        contenidoCarritoElement.innerHTML = "" // Limpia el contenido anterior del carrito

        carrito.forEach((producto, index) => {
          
          let productoElement = document.createElement("div")
          productoElement.classList.add("contenidoCarrito")

          let nombre = document.createElement("p")
          nombre.innerText = `\n Producto ${index + 1}: ${producto.nombre}`
          productoElement.appendChild(nombre)

          let imagen = document.createElement("img");
          imagen.src = producto.rutaImagen;
          imagen.classList.add("imagenes");
          productoElement.appendChild(imagen)

          let precio = document.createElement("p")
          precio.innerText = `Precio: $${producto.precio}`
          productoElement.appendChild(precio)


          // botones para agregar y restar pasajeros
          let pasajeros = document.createElement("label")
          pasajeros.innerText = `Cantidad de pasajeros: ${producto.pasajeros}`
          productoElement.appendChild(pasajeros)

          // sumar pasajeros
          let agregarPasajerosBtn = document.createElement("button")
          agregarPasajerosBtn.innerText = "+"
          agregarPasajerosBtn.classList.add("botonSumar")

          productoElement.appendChild(agregarPasajerosBtn)
          agregarPasajerosBtn.addEventListener("click", () => {
            producto.pasajeros += 1
            pasajeros.innerText = `Cantidad de pasajeros: ${producto.pasajeros}`
            mostrarContenidoCarrito()
            
          })
            
          // restar pasajeros
          let sacarPasajerosBtn = document.createElement("button")
          sacarPasajerosBtn.innerText = "-"
          sacarPasajerosBtn.classList.add("botonSumar")

          productoElement.appendChild(sacarPasajerosBtn)
          sacarPasajerosBtn.addEventListener("click", () => {
            if (producto.pasajeros > 1) {
              producto.pasajeros -= 1
              pasajeros.innerText = `Cantidad de pasajeros: ${producto.pasajeros}`
              mostrarContenidoCarrito()
            }
          })


          // Botón para aumentar la cantidad de noches del producto
          let agregarNoches = document.createElement("label")
          agregarNoches.innerText = "\n agregar noches"
          productoElement.appendChild(agregarNoches)

          let agregarNocheBtn = document.createElement("button")
          agregarNocheBtn.innerText = "+"
          agregarNocheBtn.classList.add("botonSumar")
          productoElement.appendChild(agregarNocheBtn)

          // Evento para aumentar la cantidad de noches del producto
          agregarNocheBtn.addEventListener("click", () => {
            if (producto.noches > 1) {
              producto.noches += 1
              mostrarContenidoCarrito()
            } mostrarContenidoCarrito()
          })

          let sacarNocheBtn = document.createElement("button")
          sacarNocheBtn.innerText = "-"
          sacarNocheBtn.classList.add("botonSumar")

          productoElement.appendChild(sacarNocheBtn)

          // Evento para reducir la cantidad de noches del producto
          sacarNocheBtn.addEventListener("click", () => {
            if (producto.noches > 1) {
              producto.noches -= 1
              mostrarContenidoCarrito()
            }
          })

          let aplicarBtn = document.createElement("button")
          aplicarBtn.innerText = "Aplicar"
          productoElement.appendChild(aplicarBtn)

          let eliminarBtn = document.createElement("button")
          eliminarBtn.innerText = "Eliminar"
          eliminarBtn.classList.add("btn", "btn-outline-danger", "m-3")
          productoElement.appendChild(eliminarBtn)


          agregarNocheBtn.addEventListener("click", () => {
            producto.noches += 1
            mostrarContenidoCarrito()
          })

          // Evento para eliminar el producto del carrito
          eliminarBtn.addEventListener("click", () => {
            eliminarProductoCarrito(index);


          })

          // Evento para aplicar la cantidad de pasajeros al producto
          aplicarBtn.addEventListener("click", () => {
            producto.pasajeros = parseInt(pasajerosInput.value)
            mostrarContenidoCarrito()



          })


          contenidoCarritoElement.appendChild(productoElement)

          totalNoches += producto.noches
          let valorTotalProducto = producto.noches * producto.precio * producto.pasajeros
          valorTotal += valorTotalProducto
        })

        let totalNochesElement = document.createElement("p")
        totalNochesElement.innerText = `Total de noches: ${totalNoches}` // Muestra el total de noches
        totalNochesElement.classList.add("text-center")
        contenidoCarritoElement.appendChild(totalNochesElement)

        let valorTotalElement = document.createElement("p")
        valorTotalElement.innerText = `Valor total: $${valorTotal}` // Muestra el valor total
        valorTotalElement.classList.add("text-center")
        contenidoCarritoElement.appendChild(valorTotalElement)

        let btnFinalizarCompra = document.createElement("button")
        btnFinalizarCompra.innerText = "Finalizar compra"
        btnFinalizarCompra.classList.add("btnFinalizar" )
        contenidoCarritoElement.appendChild(btnFinalizarCompra)
        // llamamos a la funcion finalizar compra 
        btnFinalizarCompra.addEventListener("click", finalizarCompra)


      }
    }

    // sirve para eliminar un producto del carrito
    function eliminarProductoCarrito(index) {
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarContenidoCarrito();
    }
    // evento que muestra el contenido del coarrito
    let btnCarrito = document.getElementById("btnCarrito")
    btnCarrito.addEventListener("click", () => {
      mostrarContenidoCarrito()
    })

// funcion con librreria sweetalert que finaliza la compra y luego vacia el carrito
function finalizarCompra() {
  if (carrito.length === 0) {
    let contenidoCarritoElement = document.getElementById("divCarrito")
    contenidoCarritoElement.innerHTML = "No elegiste ningún producto"
    contenidoCarritoElement.classList.add("contenidoCarrito")
  } else {
    let totalNoches = 0
    let valorTotal = 0

    let datosCompra = "Productos en el carrito:\n"

    carrito.forEach((producto, index) => {
      datosCompra += `\n Producto ${index + 1}: ${producto.nombre}\n`
      datosCompra += `Precio por noche: $${producto.precio}\n`
      datosCompra += `Cantidad de noches: ${producto.noches}\n`
      datosCompra += `Cantidad de pasajeros: ${producto.pasajeros}\n`

      totalNoches += producto.noches
      let valorTotalProducto = producto.noches * producto.precio * producto.pasajeros
      valorTotal += valorTotalProducto
    })

    datosCompra += `Total de noches: ${totalNoches}\n`
    datosCompra += `Valor total de la compra: $${valorTotal}`

    Swal.fire({
      title: "Resumen de la compra",
      text: datosCompra,
      icon: "info",
      confirmButtonText: "Continuar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "¿Estás seguro?",
          text: "¿Deseas finalizar la compra?",
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Sí, finalizar",
          cancelButtonText: "Cancelar",
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "¡Compra finalizada!",
              text: "Gracias por tu compra",
              icon: "success",
            });

            carrito = [];
            localStorage.removeItem("carrito")

            mostrarContenidoCarrito()
          }
        })
      }
    })
  }
}

    // evento que vacia el interior del carrito
    let btnVaciar = document.getElementById("btnVaciar")

    btnVaciar.addEventListener("click", () => {
      carrito = []
      localStorage.removeItem("carrito")
      mostrarContenidoCarrito()
    })




    //  se toma por ID el div buscador
    let buscador = document.getElementById("buscador")
    let divBuscar = document.getElementById("divBuscador")
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
        botonAgregarNoche.innerText = "Elegir +"
        botonAgregarNoche.classList.add("btn", "btn-outline-danger", "m-3")

        divHotel.appendChild(botonAgregarNoche)

        // let botonCalendario = document.createElement("button")
        // botonCalendario.innerText = "Ver fechas"
        // divHotel.appendChild(botonCalendario)



        // evento para agregar noche con el boton
        botonAgregarNoche.addEventListener("click", () =>

          agregarNocheHotel(hotel))
      })
    }

    // agrega noche al carrito 
    function agregarNocheHotel(hotel) {
      let hotelExistente = carrito.find(item => item.id === hotel.id)


      if (hotelExistente) {
        hotelExistente.noches += 1
      } else {
        hotel.noches = 1
        hotel.pasajeros = 1
        hotel.valorTotal = hotel.precio * hotel.pasajeros
        carrito.push(hotel)
      }
      localStorage.setItem("carrito", JSON.stringify(carrito))


      lanzarTostada()

      mostrarContenidoCarrito()
    }



    // Función para buscar hoteles
    function buscarHoteles() {
      let busqueda = buscador.value.toLowerCase()
      let resultados = hoteles.filter(hotel =>
        hotel.nombre.toLowerCase().includes(busqueda))

      mostrarHoteles(resultados)
    }


    // evento que filtra por botones las cateogrias
    function eventoCategoria(id, categoria) {
      let boton = document.getElementById(id)
      boton.addEventListener("click", () => {
        filtrarPorCategoria(categoria)
      })
    }

    eventoCategoria("cincoEstrellas", 5)
    eventoCategoria("cuatroEstrellas", 4)
    eventoCategoria("tresEstrellas", 3)
    eventoCategoria("dosEstrellas", 2)
    eventoCategoria("unaEstrella", 1)

    let todos = document.getElementById("todos")
    todos.addEventListener("click", () => {
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
    btnHoteles.addEventListener("click", () => {
      mostrarHoteles(hoteles)
    })

    // se toma btn de autos para luego ingresarle productos
    let btnAutos = document.getElementById("btnAutos")

    // se toma btn de asistencia para luego ingresarle productos
    let btnAsistencias = document.getElementById("btnAsistencias")



    // se toma btn excursiones
    let btnExcursiones = document.getElementById("btnExcursiones")
    btnExcursiones.addEventListener("click", () => {
      mostrarExcursiones(excursiones)
    })
    // funcion para mostrar excursiones
    
// función para mostrar excursiones
function mostrarExcursiones(excursiones) {
  let contenedorExcursiones = document.getElementById("contenedorHoteles")
  contenedorExcursiones.innerHTML = ""

  excursiones.forEach((excursion) => {
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

    contenedorExcursiones.appendChild(divExcursion)

    let botonAgregarExcursion = document.createElement("button")
    botonAgregarExcursion.innerText = "Agregar Excursión"
    divExcursion.appendChild(botonAgregarExcursion)

    // evento para agregar excursión al carrito con el botón
    botonAgregarExcursion.addEventListener("click", () =>
      agregarNocheExcursion(excursion)
    )
  })
}

function agregarNocheExcursion(excursion) {
  let excursionExistente = carrito.find((item) => item.id === excursion.id && item.tipo === "excursion")

  if (excursionExistente) {
    excursionExistente.noches += 1
  } else {
    // Agregamos la propiedad "tipo" para identificar que es una excursión
    excursion.tipo = "excursion"
    excursion.noches = 1
    excursion.pasajeros = 1
    excursion.valorTotal = excursion.precio * excursion.pasajeros
    carrito.push(excursion)
  }

  localStorage.setItem("carrito", JSON.stringify(carrito))

  // Llama a la función para mostrar el contenido actualizado del carrito
  mostrarContenidoCarrito()
}






    // funcion para el toasty
    function lanzarTostada() {
      Toastify({
        text: "Producto agregado  ",
        className: " ",
        duration: 1500,
        close: true,
        gravity: "top",
        position: "right"

      }).showToast()
    }




    let inputMinimo = document.getElementById("minimo")
    let inputMaximo = document.getElementById("maximo")


// evento y funcion que permite filtrar hoteles por precio
    filtrarBtn.addEventListener("click", filtrarPorPrecio)

    function filtrarPorPrecio() {
      let minimo = parseFloat(inputMinimo.value)
      let maximo = parseFloat(inputMaximo.value)

      let resultados

      if (!isNaN(minimo) && !isNaN(maximo)) {
        resultados = hoteles.filter(hotel => hotel.precio >= minimo && hotel.precio <= maximo)
      } else if (!isNaN(minimo)) {
        resultados = hoteles.filter(hotel => hotel.precio >= minimo)
      } else if (!isNaN(maximo)) {
        resultados = hoteles.filter(hotel => hotel.precio <= maximo)
      } else {
        resultados = hoteles
      }

      mostrarHoteles(resultados)
    }

 
  })
  .catch(error => {
    console.log('Error al obtener los datos del archivo JSON:', error)
  })