const ciudad = document.querySelector('#ciudad');
const provincesEndPoint = 'https://apis.datos.gob.ar/georef/api/provincias?nombre=Buenos%Aires'

fetch(provincesEndPoint)
    .then(response => response.json())
    .then(info => {
        ciudad.innerText = info.provincias[0].nombre;
    })
    .catch(e => console.log(e))