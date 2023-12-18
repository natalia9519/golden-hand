const itemsPorPagina = 5; // Ajusta este valor según tus necesidades
let paginaActual = 1; // Inicialmente, muestra la primera página

// Espera a que el DOM esté completamente cargado para ejecutar el código
document.addEventListener('DOMContentLoaded', () => {
    // Script para cargar productos y manipular el DOM
    fetch('../js/data.json')
      .then(response => response.json())
      .then(data => {
        // Seleccionar las secciones donde se mostrarán los productos
        const section1 = document.querySelector('#gluten');
        const section2 = document.querySelector('#lacteo');
        const section3 = document.querySelector('#frutos');
        const btnCeliaco = document.querySelector("#btnCeliaco")
        const btnLacteos = document.querySelector("#btnLacteos")
        const btnFrutos = document.querySelector("#btnFrutos")
        const verTodo = document.querySelector("#verTodo")
        const tituloCeliaco = document.querySelector("#tituloCeliaco")
        const tituloLacteos = document.querySelector("#tituloLacteo")
        const tituloFrutos = document.querySelector("#tituloFrutos")

        verTodo.addEventListener('click', () =>{
            if (section1.style.display === 'none') {
                tituloCeliaco.style.display ='none'
                tituloLacteos.style.display ='none'
                tituloFrutos.style.display ='none'
                section1.style.display = 'flex';
                section2.style.display = 'flex';
                section3.style.display = 'flex';
            } else {
                tituloCeliaco.style.display ='none'
                tituloLacteos.style.display ='none'
                tituloFrutos.style.display ='none'
                section1.style.display = 'flex';
                section2.style.display = 'flex';
                section3.style.display = 'flex';
            }
            const productosPorPagina = 3;
            let paginaActual = 1;
            
            function mostrarProductos() {
              const inicio = (paginaActual - 1) * productosPorPagina;
              const fin = inicio + productosPorPagina;
              const productosPagina = productos.slice(inicio, fin);
            
              // Mostrar los productos en la página
              const productosContainer = document.querySelector('.productos');
              productosContainer.innerHTML = '';
              productosPagina.forEach(producto => {
                // Aquí debes mostrar cada producto en la página
              });
            }
            
            function irPaginaAnterior() {
              if (paginaActual > 1) {
                paginaActual--;
                mostrarProductos();
              }
            }
            function irPaginaSiguiente() {
                if (paginaActual < Math.ceil(productos.length / productosPorPagina)) {
                  paginaActual++;
                  mostrarProductos();
                }
              }
              
              // Agregar event listeners a los botones de paginación
              document.querySelector('.pagina-anterior').addEventListener('click', irPaginaAnterior);
              document.querySelector('.pagina-siguiente').addEventListener('click', irPaginaSiguiente);
              
              // Mostrar los productos en la página al cargar
              mostrarProductos();
        });
        
        btnCeliaco.addEventListener('click', () => {
            if (section1.style.display === 'none') {
                tituloCeliaco.style.display ='flex'
                tituloLacteos.style.display ='none'
                tituloFrutos.style.display ='none'
                section1.style.display = 'flex';
                section2.style.display = 'none';
                section3.style.display = 'none';
            } else {
                tituloCeliaco.style.display ='flex'
                tituloLacteos.style.display ='none'
                tituloFrutos.style.display ='none'
                section1.style.display = 'flex';
                section2.style.display = 'none';
                section3.style.display = 'none';
            }
        });

        btnLacteos.addEventListener('click', () => {
            if (section2.style.display === 'none') {
                tituloCeliaco.style.display ='none'
                tituloLacteos.style.display ='flex'
                tituloFrutos.style.display ='none'
                section1.style.display = 'none';
                section2.style.display = 'flex';
                section3.style.display = 'none';
            } else {
                tituloCeliaco.style.display ='none'
                tituloLacteos.style.display ='flex'
                tituloFrutos.style.display ='none'
                section1.style.display = 'none';
                section2.style.display = 'flex';
                section3.style.display = 'none';
            }
        });

        btnFrutos.addEventListener('click', () => {
            if (section3.style.display === 'none') {
                tituloCeliaco.style.display ='none'
                tituloLacteos.style.display ='none'
                tituloFrutos.style.display ='flex'
                section1.style.display = 'none';
                section2.style.display = 'none';
                section3.style.display = 'flex';
            } else {
                tituloCeliaco.style.display ='none'
                tituloLacteos.style.display ='none'
                tituloFrutos.style.display ='flex'
                section1.style.display = 'none';
                section2.style.display = 'none';
                section3.style.display = 'flex';
            }
        });
  
        // Iterar sobre cada producto en los datos
        data.forEach(producto => {
        // Crear un nuevo elemento div para representar el producto
        const nuevoProducto = document.createElement('div');
        /*const paginaActual = 1 // Página actual
        const tarjetaPorPagina = 3 // Tarjetas por página
        const totalTarjetas = data.length
        const totalPaginas = Math.ceil(totalTarjetas / tarjetaPorPagina)
        const inicio = (paginaActual - 1) * tarjetaPorPagina
        const final = inicio + tarjetaPorPagina
        const paginadoTarjeta = data.slice(inicio, final)*/
          nuevoProducto.classList.add('product');
          nuevoProducto.innerHTML = `
            <img href="#openModal" src="${producto.img}" alt="Imagen de ${producto.name}">
            <div class="product-txt">
              <h3>${producto.name}</h3>
              <p class="precio">${producto.price}€</p>
              <div class="cantidad-controles">
                <button class="restar-cantidad" data-id="${producto.id}">-</button>
                <span class="cantidad">0</span>
                <button class="sumar-cantidad" data-id="${producto.id}">+</button>
              </div>
              <a href="#" class="agregar-carrito btn-2" data-id="${producto.id}">Agregar</a>
            </div>
          `;
  
          // Asignar el producto a la sección correspondiente según su categoría
          if (producto.category === "celiaco" ) {
            section1.appendChild(nuevoProducto);
            section1.style.display = 'flex'
          } else if (producto.category === "lacteos" )  {
            section2.appendChild(nuevoProducto);
            section2.style.display = 'flex'
          } else {
            section3.appendChild(nuevoProducto);
            section3.style.display = 'flex'
          }
  
          // Obtener referencias a elementos relevantes dentro del nuevo producto
          const cantidadSpan = nuevoProducto.querySelector('.cantidad');
          const restarBtn = nuevoProducto.querySelector('.restar-cantidad');
          const sumarBtn = nuevoProducto.querySelector('.sumar-cantidad');
          const agregarBtn = nuevoProducto.querySelector('.agregar-carrito');
  
          // Variable para rastrear la cantidad de productos seleccionada
          let cantidad = 0;
  
          // Event listener para reducir la cantidad al hacer clic en el botón de restar
          restarBtn.addEventListener('click', () => {
            if (cantidad > 0) {
              cantidad -= 1;
              cantidadSpan.textContent = cantidad;
            }
          });
  
          // Event listener para aumentar la cantidad al hacer clic en el botón de sumar
          sumarBtn.addEventListener('click', () => {
            cantidad += 1;
            cantidadSpan.textContent = cantidad;
          });
  
          // Event listener para agregar el producto al carrito al hacer clic en el botón de agregar
          agregarBtn.addEventListener('click', (event) => {
            event.preventDefault();
  
            // Verificar que la cantidad seleccionada sea mayor que 0
            if (cantidad > 0) {
              // Buscar el producto en la lista de productos
              const productoEncontrado = data.find(item => item.id === producto.id);
  
              // Agregar el producto al carrito
              if (productoEncontrado) {
                carrito.agregarItem(productoEncontrado, cantidad);
              }
            }
          });
        });


        
       // PRINCIPIO CONTADOR DE CESTA EL NUMERO
          // Seleccionar todos los botones de "agregar al carrito"
          const btnContador = document.querySelectorAll('.agregar-carrito');
          const contadorProductos = document.querySelector('#contador-productos');
          
          // Inicializar el contador
          let cantidadProductos = 0;
          contadorProductos.textContent = cantidadProductos;
          
          // Agregar un event listener a cada botón para escuchar los clics
          btnContador.forEach(boton => {
            boton.addEventListener('click', () => {
            
              // Incrementar la cantidad de productos
              cantidadProductos++;
              // Actualizar el contador con la nueva cantidad
              contadorProductos.textContent = cantidadProductos;
            });
          });

        // FIN CONTADOR DE CESTA EL NUMERO 





      })
      .catch(error => {
        // Manejar errores en caso de que la carga de productos falle
        console.error('Se ha producido un error al obtener los datos del archivo JSON', error);
      });
  
    // ... (código posterior)

  });

