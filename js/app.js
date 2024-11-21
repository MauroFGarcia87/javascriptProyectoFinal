let listaCarpas = [];

let carrito = [];

let numeroCarrito = 0;
let tabla = document.getElementById("cuerpoTabla");
let iconoCarrito = document.getElementById("nCarrito");

cargaInicial();
cargaInicialCarrito();

async function cargaInicial() {
  try {
    // Usamos fetch simulado para obtener los datos
    listaCarpas = await obtenerDatosLocalStorage("listaCarpas");

    if (listaCarpas.length == 0) {
      console.log("El array está vacío");
      let grilla = document.getElementById("grilla");
      grilla.innerHTML += `<h1> La página está en mantenimiento </h1>
        <h2>Se está trabajando en la carga de los productos, regrese en un instante</h2>`;
    }

    console.log(listaCarpas.length);
    listaCarpas.forEach((itemCarpa) => {
      crearCards(itemCarpa);
      console.log(itemCarpa.nombre);
    });
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
}

async function cargaInicialCarrito() {
  try {
    // Usamos fetch simulado para obtener los datos del carrito
    carrito = await obtenerDatosLocalStorage("listaCarrito");
    console.log(carrito.length);
    iconoCarrito.innerHTML = `${carrito.length}`;
  } catch (error) {
    console.error("Error al cargar el carrito:", error);
  }
}

// Simulamos fetch con un retraso para datos almacenados en localStorage
function obtenerDatosLocalStorage(key) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const datos = localStorage.getItem(key);
      if (datos) {
        resolve(JSON.parse(datos)); // Si hay datos, los devolvemos parseados
      } else {
        resolve([]); // Si no hay datos, devolvemos un array vacío
      }
    }, 1500); // Retraso de 1.5 segundos para simular la espera
  });
}


function crearCards(itemCarpa) {
  let grilla = document.getElementById("grilla");
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

  </div>`;
}

function agregarAlCarrito(codigoCarpa) {
  carrito = JSON.parse(localStorage.getItem("listaCarrito")) || [];
  listaCarpas.find((itemCarpa) => {
    if (codigoCarpa == itemCarpa.codigo) {
      console.log(itemCarpa);
      carrito.push(itemCarpa);
      localStorage.setItem("listaCarrito", JSON.stringify(carrito));
      console.log(carrito);
    }
  });
  Swal.fire("Agregado", "Su producto fue agregado correctamente!", "success");
  numeroCarrito += 1;

  iconoCarrito.innerHTML = `${numeroCarrito}`;

  console.log(numeroCarrito);
}

function cargarCarrito() {
  let total = 0;
  listaCarrito = JSON.parse(localStorage.getItem("listaCarrito")) || [];
  console.log("Precionaste el boton carrito");
  console.log(listaCarrito);
  borrarTabla();
  listaCarrito.forEach((itemCarpa) => {
    mostarProcuctoCarrito(itemCarpa);
    total += parseInt(itemCarpa.precio);
  });
  tabla.innerHTML += `<h3> Total: $ ${total}`;
  console.log(total);
}

function mostarProcuctoCarrito(objCarpa) {
  tabla.innerHTML += ` <tr>    
    <td>${objCarpa.nombre}</td>
    <td>${objCarpa.precio}</td>  
    </tr>
    `;
}

function borrarTabla() {
  tabla.innerHTML = "";
}

function vaciarCarrito() {
  Swal.fire({
    title: "Estas sergura que quieres vaciar el carrito?",
    text: "Se eliminar todos los productos cargados al carrito!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, Borrar todo!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Borrado!",
        text: "Tus productos fueron eliminado del carrito.",
        icon: "success",
      });
      carrito = [];
      borrarTabla();
      localStorage.setItem("listaCarrito", JSON.stringify(carrito));
      numeroCarrito = 0;
      iconoCarrito.innerHTML = 0;
    }
  });
}

function comprar() {
  Swal.fire("Comprar", "Gracias por realizar tu compra", "success");
  carrito = [];
  borrarTabla();
  localStorage.setItem("listaCarrito", JSON.stringify(carrito));
  numeroCarrito = 0;
  iconoCarrito.innerHTML = 0;
}
