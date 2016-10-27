function Artista(id, nombre, imagen) {

    this.id = id;
    this.nombre = nombre;
    this.imagen = imagen;

}

var Spotify = (function () {

  // Atributos privados
  var artistas = [];

	var claveLocalStorage = 'artistas';

  // Permite precargar los artistas por localstorage
  var precargarArtistas = function () {
		
        var datos = localStorage.getItem(claveLocalStorage);

        if (datos !== null && datos !== '') {

            artistas = JSON.parse(datos);	

		}

	}

  // Buscar artistas en api Spotify	
  var buscarArtistas = function () {
    
    var nombreArtista = $('#buscadorArtistas').val();

    $.ajax({
  
      url:"https://api.spotify.com/v1/search?type=artist&q=" + nombreArtista,
      crossDomain: true,
      dataType: "json"

    }).done(function (datos) { // el parametro datos es lo que se recibe desde el servidor

      // Se ejecutara esta seccion si todo salio bien
      // Iterar sobre array
      for (i = 0; i < datos.artists.items.length; i++) {

        var id = datos.artists.items[i].id;

        var nombre = datos.artists.items[i].name;

        var imagen = ""; 

        if (datos.artists.items[i].images.length > 0) {

          imagen = datos.artists.items[i].images[0].url;

        }
      
        var artista = new Artista(id, nombre, imagen);

        agregarArtista(artista);

      }  

    }).fail(function (jqXHR, textStatus) {

      // Se ejecutara esta seccion si hubo algun problema
      console.error("ocurrio un error inesperado...");

    });

  }

	// Guarda el array de artistas en localstorage
	var guardarArtistas = function () {

		var datos = JSON.stringify(artistas);

		localStorage.setItem(claveLocalStorage, datos);

	}

	// Dibuja en el DOM resultados de buscar artistas	
  var dibujarArtista = function (artista) {

    	var contenedor = $("#resultadoArtistas")

    	$('<li/>')
      		.attr('id', artista.id)
      		.addClass('list-group-item')
      		.appendTo(contenedor);

      	$('<img/>').attr('src', artista.imagen).css("max-width", "400px").appendTo('#' + artista.id);
      	$('<h3/>').html(artista.nombre).appendTo('#' + artista.id);
      	$('<span/>').addClass('glyphicon glyphicon-star-empty')
            .on('click', function(){

              $(this).removeClass('glyphicon-star-empty').addClass('glyphicon glyphicon-star');

              agregarFavoritos(artista);

            })
            .appendTo('#' + artista.id);
      		
  }

  // Dibuja en el DOM los favoritos 
  var dibujarFavoritos = function (artista) {

      var contenedor = $("#resultadoFavoritos")

      $('<li/>')
          .attr('id', artista.id)
          .addClass('list-group-item')
          .appendTo(contenedor);

        $('<img/>').attr('src', artista.imagen).css("max-width", "400px").appendTo('#' + artista.id);
        $('<h3/>').html(artista.nombre).appendTo('#' + artista.id);
        $('<span/>').addClass('glyphicon glyphicon-remove')
            .on('click', function(){

              eliminarArtistaFavorito(artista.id);

            })
            .appendTo('#' + artista.id);
        
        $('<a/>').attr('src', 'https://api.spotify.com/v1/artists/' + artista.id + '/albums?album_type=album&').html('Ver álbumes');          
  }

  var agregarFavoritos = function (artista) {  

      //Guardar en local storage

  } 	

  var agregarArtista = function (artista) {

		artistas.push(artista);

		guardarArtistas();

		dibujarArtista(artista);
		
  }

  var obtenerPosicionArtista = function (id) {

        var posicion = -1; 
        
        // La condicion del for lee: 'Mientras haya elementos en el array de artistas por recorrer y la posicion sea -1
        for(i = 0; i < artistas.length && posicion === -1; i++) { 

            if (artistas[i].id === id) { 
                
                // Si los ids coinciden me guardo el contenido de la variable i en la variable posicion
                posicion = i; 

            }

        }

        return posicion;

  }

  var borrarArtistaDOM = function (id) {
        
        $('#' + id).remove();

  }    

  var eliminarArtistaFavorito = function (id) {

    var posicion = obtenerPosicionArtista(id);

    artistas.splice(posicion, 1);

    guardarArtistas();

    borrarArtistaDOM(id);

  }

  var limpiarArtistasDOM = function () {

    $('#resultadoArtistas').empty();

  }

  var limpiarSpotify = function () {

    artistas = [];

    localStorage.removeItem(claveLocalStorage);

    limpiarArtistasDOM;

  }

  // Vincular boton de buscar con funcion buscarArtistas
  var vincularBotonBuscar = function () {

    	$('#buscarArtistas').on('click', buscarArtistas);

  }

  var vincularPestaniaFavoritos = function () {

    $('#pestaniaFavoritos').on('click', dibujarFavoritos);
  
  }
    
	var iniciar = function () {
		
		precargarArtistas();
		vincularBotonBuscar();
	}
  
  return {

  		limpiarSpotify: limpiarSpotify,
		iniciar: iniciar

  };

})()

$(document).ready(function () {

		Spotify.iniciar();

	}
);    