

let listaCarpas = [];

let carrito = [];

let numeroCarrito = 0;
let tabla = document.getElementById('cuerpoTabla');
let iconoCarrito = document.getElementById('nCarrito');

cargaInicial();
cargaInicialCarrito();


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

function cargaInicialCarrito(){
  let carrito = JSON.parse(localStorage.getItem('listaCarrito')) || [];
  console.log(carrito.length)
  iconoCarrito.innerHTML = `${carrito.length}`;
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
  carrito = JSON.parse(localStorage.getItem('listaCarrito')) || [];
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
  numeroCarrito += 1;
  
  iconoCarrito.innerHTML = `${numeroCarrito}`;

  console.log(numeroCarrito);
}

function cargarCarrito(){
  let total = 0;
  listaCarrito= JSON.parse(localStorage.getItem('listaCarrito')) || [];
  console.log('Precionaste el boton carrito');
  console.log(listaCarrito);
  borrarTabla();
  listaCarrito.forEach(itemCarpa => {
    mostarProcuctoCarrito(itemCarpa);
    total += parseInt(itemCarpa.precio);

});
 tabla.innerHTML += `<h3> Total: $ ${total}`
  console.log(total);
}

function mostarProcuctoCarrito(objCarpa){
  
  tabla.innerHTML += ` <tr>    
    <td>${objCarpa.nombre}</td>
    <td>${objCarpa.precio}</td>  
    </tr>
    `
}

function borrarTabla(){
  tabla.innerHTML = '';
}

function vaciarCarrito() {
  carrito = [];
  borrarTabla();
  localStorage.setItem('listaCarrito', JSON.stringify(carrito));
  numeroCarrito = 0;
  iconoCarrito.innerHTML = 0;
}





