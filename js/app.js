

let listaCarpas = [];

let carrito = [];

let numeroCarrito = 0;
let tabla = document.getElementById('cuerpoTabla');

cargaInicial();

function cargaInicial(){
    listaCarpas = JSON.parse(localStorage.getItem('listaCarpas')) || [];
    if(listaCarpas.length == 0){
      console.log('El array esta vacio');
      let grilla = document.getElementById('grilla');
      grilla.innerHTML += ` <h1> La pagina esta en mantenimiento </h1>
      <h2>Se esta trabajando en la carga de los productos, regresar en un instante</h2> `
    }
    console.log(listaCarpas.length);
    listaCarpas.forEach(itemCarpa => {
        crearCards(itemCarpa);
        console.log(itemCarpa.nombre);
    });
}

function crearCards(itemCarpa){
    let grilla = document.getElementById('grilla');
    grilla.innerHTML += ` <div class="col-sm-12 col-md-4 col-lg-4 my-4">
    <div class="card">
      <h2> $ ${itemCarpa.precio} </h2>
      <img src="${itemCarpa.url}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class=""card-title"">${itemCarpa.nombre}"</h5>
        <p class="card-text">
         ${itemCarpa.descripcion}
        </p>
        <div>
        
        <button class="btn btn-secondary" onclick="agregarAlCarrito('${itemCarpa.codigo}')">Agregar al carrito
        </button>
        </div>
      </div>
    </div>

  </div>`
}

function agregarAlCarrito(codigoCarpa){
  listaCarpas.find((itemCarpa)=>{
    if(codigoCarpa == itemCarpa.codigo){
      console.log(itemCarpa);
      carrito.push(itemCarpa);
      localStorage.setItem('listaCarrito', JSON.stringify(carrito));
      console.log(carrito);
    }
  })
  Swal.fire(
    'Agregado',
    'Su producto fue agregado correctamente!',
    'success'
  );
}

function cargarCarrito(){
  listaCarrito= JSON.parse(localStorage.getItem('listaCarrito')) || [];
  console.log('Precionaste el boton carrito');
  console.log(listaCarrito);
  borrarTabla();
  listaCarrito.forEach(itemCarpa => {
    mostarProcuctoCarrito(itemCarpa);
});

}

function mostarProcuctoCarrito(objCarpa){
  
  tabla.innerHTML += ` <tr>    
    <td>${objCarpa.nombre}</td>
    <td>${objCarpa.precio}</td>  
    </tr>`
}

function borrarTabla(){
  tabla.innerHTML = '';
}





