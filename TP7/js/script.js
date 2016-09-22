
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

	// Dibujar en DOM la pelicula pasada como parametro
	var dibujarPelicula = function (pelicula) {

		var ul = document.getElementById('peliculas');

		var li = document.createElement('li');
		var h2 = document.createElement('h2')
		var p = document.createElement('p');
		var img = document.createElement('img');

		li.setAttribute('id', pelicula.id);
		li.setAttribute('class', 'list-group-item');

		h2 = agregarTexto(h2, pelicula.titulo);
		p = agregarTexto(p, pelicula.descripcion);

		img.setAttribute('src', pelicula.imagen);

		li.appendChild(h2);
		li.appendChild(p);
		li.appendChild(img);

		ul.appendChild(li);
	}

	var borrarPeliculaDOM = function (pelicula) {

		var ul = document.getElementById('peliculas');

		var li = document.getElementById(pelicula.id);

		ul.removeChild(li);
	}

	var existePelicula = function (pelicula) {

		var posicion = -1;

        for(i = 0; i < peliculas.length && posicion === -1; i++) { 

            if (peliculas[i].id === peliculas.id) { 
                
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

		var peliculas = document.getElementById('peliculas');

		while (peliculas.firstChild) {

			peliculas.removeChild(peliculas.firstChild);
		}
	}

	precargarPeliculas();

	return {
		agregarPelicula: agregarPelicula,
		eliminarPelicula: eliminarPelicula,
		limpiarVideoteca: limpiarVideoteca
	};

})()

/* Ejemplos de agregar peliculas 

var titanic = new Pelicula(1, 'titanic', 'pelicula dramatica', 'http://placehold.it/250x150');
var sospechosos = new Pelicula(2,'los sospechosos de siempre', 'pelicula de accion', 'http://placehold.it/250x150');

Imdb.agregarPelicula(titanic)
Imdb.agregarPelicula(sospechosos)

*/

/* Ejemplos de eliminar peliculas 
Imdb.eliminarPelicula(titanic)
Imdb.eliminarPelicula(sospechosos)
*/

/* Borrar array de peliculas, limpiar localStorage y quitar todas las peliculas
Imdb.limpiarVideoteca()
*/

