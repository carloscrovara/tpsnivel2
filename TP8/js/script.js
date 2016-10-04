function Pelicula (id, titulo, descripcion, imagen) {
	
	this.id = id;
	this.titulo = titulo;
	this.descripcion = descripcion;
	this.imagen = imagen;
	
}

var Imdb = (function () {

	// Atributos privados 
	var peliculas = [];
	var claveLocalStorage = 'peliculas';

	// Precargar las peliculas por localstorage
	var precargarPeliculas = function () {

		var datos = localStorage.getItem(claveLocalStorage);

		if (datos !== null && datos !== '') {

			peliculas = JSON.parse(datos);

			for (i = 0; i < peliculas.length; i++) {

				dibujarPelicula(peliculas[i]);
			}
		}
	}

	// Guardar el array de peliculas en localstorage
	var guardarPeliculas = function () {

		var datos = JSON.stringify(peliculas);

		localStorage.setItem(claveLocalStorage, datos);
	}

	// Agregar texto al elemento usando nodoTexto. Retorna elemento con nodoTexto incorporado.
	var agregarTexto = function (elemento, texto) {

		var nodoTexto = document.createTextNode(texto);

		elemento.appendChild(nodoTexto);

		return elemento;
	}

	var cargarPelicula = function (pelicula) {

		var elemTitulo = document.getElementById("titulo");
        
		var elemDescripcion = document.getElementById("descripcion");
        
		var elemImagen = document.getElementById("imagen"); 

		elemTitulo.value = pelicula.titulo;

		elemDescripcion.value = pelicula.descripcion;

		elemImagen.value = pelicula.imagen;

		var botonAgregar = document.getElementById("boton");
		
		botonAgregar.innerHTML = "Modificar";
		
		botonAgregar.onclick = function() {

			//Modificar el array
			var resultado = existePelicula(pelicula);
			var peliParaModificar = peliculas[resultado];
			peliParaModificar.titulo = elemTitulo.value;
			peliParaModificar.descripcion = elemDescripcion.value;
			peliParaModificar.imagen = elemImagen.value;

			//Modificar la pagina
			//obtener los objetos del dom del h2, el p y la img (con el id)
			var peliculaTitulo = document.getElementById('h2-' + pelicula.id);
			var peliculaDescripcion = document.getElementById('p-'+ pelicula.id);
			var peliculaImagen = document.getElementById('img-' + pelicula.id);
			//cambiar el innerhtml / atributo src de cada objeto con el valor ingresado en el formulario
			peliculaTitulo.innerHTML = elemTitulo.value; 
			peliculaDescripcion.innerHTML = elemDescripcion.value;
			peliculaImagen.setAttribute("src", elemImagen.value);

			//Modificar local storage
			guardarPeliculas();

			vincularFormulario();
			botonAgregar.innerHTML = "Agregar";	
		}					

	}

	// Dibujar en DOM la pelicula pasada como parametro
	var dibujarPelicula = function (pelicula) {

		var ul = document.getElementById("peliculas");

		var li = document.createElement('li');
		var h2 = document.createElement('h2')
		var p = document.createElement('p');
		var img = document.createElement('img');
		var botonBorrar = document.createElement('button');
		var botonEditar = document.createElement('button');

		li.setAttribute('id', pelicula.id);
		li.setAttribute('class', 'list-group-item');

		h2 = agregarTexto(h2, pelicula.titulo);
		p = agregarTexto(p, pelicula.descripcion);
		botonBorrar = agregarTexto(botonBorrar, 'Borrar');
		botonEditar = agregarTexto(botonEditar, 'Editar');

		img.setAttribute('src', pelicula.imagen);

		h2.setAttribute('id', 'h2-' + pelicula.id);
		p.setAttribute('id', 'p-' + pelicula.id);
		img.setAttribute('id', 'img-' + pelicula.id)

		botonBorrar.setAttribute('id', "botonborrar-" + pelicula.id);
		botonBorrar.setAttribute('type', 'button');
		botonBorrar.setAttribute('class', 'btn btn-primary');
		
		botonBorrar.onclick = function () {

			eliminarPelicula(pelicula);

		};

		botonEditar.setAttribute('id', "botoneditar-" + pelicula.id);
		botonEditar.setAttribute('type', 'button');
		botonEditar.setAttribute('class', 'btn btn-primary');

		botonEditar.onclick = function () {

			cargarPelicula(pelicula);

		}

		li.appendChild(h2);
		li.appendChild(p);
		li.appendChild(img);
		li.appendChild(botonBorrar);
		li.appendChild(botonEditar);

		ul.appendChild(li);
	}

	var borrarPeliculaDOM = function (pelicula) {

		var ul = document.getElementById("peliculas");
		var li = document.getElementById(pelicula.id);

		ul.removeChild(li);
	}

	var existePelicula = function (pelicula) {

		var posicion = -1;

		for(i = 0; i < peliculas.length && posicion === -1; i++) { 

 			if (peliculas[i].id === pelicula.id) { 
                
				posicion = i; 
			}

		}

		return posicion;

	}

	var agregarPelicula = function (pelicula) {

		var posicion = existePelicula(pelicula); 

		if (posicion === -1) {

			peliculas.push(pelicula);

			guardarPeliculas();

			dibujarPelicula(pelicula);

		}  else {

			alert('La pelicula con id: ' + pelicula.id + ' ya existe');

		}

	}

	var eliminarPelicula = function (pelicula) {

		var posicion = existePelicula(pelicula); 

		if (posicion > -1) {

			peliculas.splice(posicion, 1);

			guardarPeliculas();

			borrarPeliculaDOM(pelicula);

		} else {

			alert('La pelicula con id: ' + pelicula.id + ' no existe');

		}
	}    

	var limpiarVideoteca = function () {

		peliculas = [];

		localStorage.removeItem(claveLocalStorage);

		var peliculasDOM = document.getElementById("peliculas");

		while (peliculasDOM.firstChild) {

			peliculasDOM.removeChild(peliculasDOM.firstChild);
		}
	}

	// Busca en el array de peliculas la pelicula con el id mas grande y devuelve ese id incrementado en una unidad.	
	var generarNuevoId = function () {

		var maxId = -1;
        
		for (i = 0; i < peliculas.length; i++) { 

			if (peliculas[i].id > maxId) { 
                
				maxId = peliculas[i].id; 
			}

		}

		return maxId + 1;

	}	

	var vincularFormulario = function () {

		var botonAgregar = document.getElementById("boton");
        
		botonAgregar.onclick = crearPelicula;

	}

	// Tomara los valores (objeto.value) de los objetos DOM con id titulo, descripcion, imagen
	// Con esos valores se creara una pelicula y se llamara a agregarPelicula(pelicula)
	var crearPelicula = function () {
        
		var elemTitulo = document.getElementById("titulo");
        
		var elemDescripcion = document.getElementById("descripcion");
        
		var elemImagen = document.getElementById("imagen"); 
        
		var pelicula = new Pelicula(generarNuevoId(), elemTitulo.value, elemDescripcion.value, elemImagen.value);

		agregarPelicula(pelicula);

	}	

	// Se genera la funcion para borrar peliculas del DOM que se usará en las funciones ordenar por ID, AZ y ZA
	var borrarPeliculasDOM = function () {

		var peliculasDOM = document.getElementById("peliculas");
	
		while (peliculasDOM.firstChild) {

			peliculasDOM.removeChild(peliculasDOM.firstChild);

		}

	}

	// Vincular elementos con funciones para ordenar
	var vincularOrdenamientos = function () {

		var ordenamientoId = document.getElementById("ordenamiento_id");

		var ordenamientoAz = document.getElementById("ordenamiento_az");

		var ordenamientoZa = document.getElementById("ordenamiento_za");

		ordenamientoId.onclick = ordenarPorId; 

		ordenamientoAz.onclick = ordenarAz;

		ordenamientoZa.onclick = ordenarZa;
		
	}

	var comparadorId = function (a, b) {

		if (a.id < b.id) {
            
			return -1;
		}
        
		if (a.id === b.id) {
            
			return 0;
		}

		if (a.id > b.id) {
            
			return 1;
		}

	}

    var ordenarPorId = function () {

		peliculas.sort(comparadorId);

		borrarPeliculasDOM(); 

		guardarPeliculas();

		precargarPeliculas();        

    }

    var comparadorAz = function (a, b) {

        if (a.titulo < b.titulo) {
            
            return -1;
        }
        
        if (a.titulo === b.titulo) {
            
            return 0;
        }

        if (a.titulo > b.titulo) {
            
            return 1;
        }

    }

    var ordenarAz = function () {

		peliculas.sort(comparadorAz);
		
		borrarPeliculasDOM();

		guardarPeliculas();
		
		precargarPeliculas();        

    }    

    var comparadorZa = function (a, b) {

        if (a.titulo < b.titulo) {

            return 1;
        }

        if (a.titulo === b.titulo) {

            return 0;
        }

        if (a.titulo > b.titulo) {

            return -1;
        }
    }

    var ordenarZa = function () {

		peliculas.sort(comparadorZa);
		
		borrarPeliculasDOM();
		
		guardarPeliculas();
		
		precargarPeliculas();        

    } 

	// Vincular boton de mostrar peliculas con funcion 
	var vincularBotonListado = function () {

		var boton = document.getElementById("mostrar_peliculas");
        
		var contenedorPeliculas = document.getElementById("peliculas");
        
		boton.onclick = function () {

			if (this.value === 'Mostrar Peliculas') {

				contenedorPeliculas.setAttribute('style', 'display : auto');
                
				this.value = 'Ocultar Peliculas';

			} else {

				contenedorPeliculas.setAttribute('style', 'display : none');
                
				this.value = 'Mostrar Peliculas';
			
			}

		};
		
	}
	
	var iniciar = function () {

		vincularFormulario();
		vincularOrdenamientos();
		vincularBotonListado();
		precargarPeliculas();

	}

	return {

		iniciar : iniciar
	
	};

})()

// Vincular el evento onload del objeto document al metodo Imdb.iniciar
window.onload = Imdb.iniciar;