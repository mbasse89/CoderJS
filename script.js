 

 function viajar(){
    alert('Bienvenido/a a nuestra agencia de viajes')

    // utilizo IF para saber en q temporada quiere viajar el pasajero
    let mes = prompt('Por favor indicanos en que número de mes que querés viajar')
        
    
        if (mes <= 2) {
            alert ('Buena elección. Estás elijiendo la temporada de verano')
        } else if ( (mes >= 3) && (mes < 6)) {
            alert ('Buena elección. estás elijiendo la temporada de otoño')
        } else if((mes >= 6) && (mes < 9)){
            alert ('Buena elección. Estás elijiendo la temporada de invierno')
        } else if((mes >= 9 ) && (mes <= 11)){
            alert ('Buena elección. Estás elijiendo la temporada de primavera')
        } else if ((mes >= 12)){
            alert ('Buena elección. Estás elijiendo la temporada de verano')
        }
    

    let cantPasajeros = prompt ('Ingrese cantidad de pasajeros')
     
    // ciclo para el ingreso de cada pasajero. Esta info no se guarda en ningun lugar por el momento
    for (let i = 1; i<=cantPasajeros ; i++) {
        let nombre = prompt('Ingrese el nombre de cada pasajero')
        
    }
    
    alert ('Perfecto. La cantidad de pasajeros a viajar es de ' + cantPasajeros)

    // info requerida para devolver en el return
    destino = (prompt('Por favor indicanos a que destino del país te gustaria viajar'))

    mail = prompt ('Ahora te pedimos que nos dejes tu mail.')

    return ('Perfecto. En breve recibiras asesoramiento para viajar el mes ' + mes + ' para ' + cantPasajeros + ' pasajeros. Te enviaremos toda esta info a ' + mail)
   

 }

alert(viajar ())