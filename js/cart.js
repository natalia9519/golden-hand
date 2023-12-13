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
  
        // Iterar sobre cada producto en los datos
        data.forEach(producto => {
          // Crear un nuevo elemento div para representar el producto
          const nuevoProducto = document.createElement('div');
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
          } else if (producto.category === "lacteos" )  {
            section2.appendChild(nuevoProducto);
          } else {
            section3.appendChild(nuevoProducto);
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
      })
      .catch(error => {
        // Manejar errores en caso de que la carga de productos falle
        console.error('Se ha producido un error al obtener los datos del archivo JSON', error);
      });
  
    // ... (código posterior)
  });


  // Añadir al carrito
  document.addEventListener('DOMContentLoaded', () => {
    // ...

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

                // Actualizar el carrito en localStorage
                localStorage.setItem('carrito', JSON.stringify(carrito.getItems()));
            }
        }
    });
});

  
  