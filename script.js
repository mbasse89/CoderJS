 

 function viajar(){
    alert('Bienvenido/a a nuestra agencia de viajes')

    // utilizo IF para saber en q temporada quiere viajar el pasajero
    let mes = prompt('Por favor indicanos en que número de mes querés viajar')
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
         
    let pasajeros = prompt ('Ingrese cantidad de pasajeros')

    for (let i = 1; i<=pasajeros ; i++) {
        nombre = prompt('Ingrese el nombre de cada pasajero')
    }
    return nombre
 }

viajar ()