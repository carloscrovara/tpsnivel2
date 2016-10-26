function Artista(id, nombre, imagen) {

    this.id = id;
    this.nombre = nombre;
    this.imagen = imagen;

}

var Spotify = (function () {

    // Atributos privados
    var artistas = [];

	var claveLocalStorage = 'artistas';

    /*
        Permite precargar los artistas por localstorage
    */
    var precargarArtistas = function () {
		
        var datos = localStorage.getItem(claveLocalStorage);

        if (datos !== null && datos !== '') {

            noticias = JSON.parse(datos);
			
			for (i = 0; i < artistas.length; i++) {
				
				dibujarArtista(artistas[i]);
				
			}

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

        var imagen = datos.artists.items[i].images[0].url;
      
        var artista = new Artista(id, nombre, imagen);

        agregarArtista(artista);

      }  

    }).fail(function (jqXHR, textStatus) {

      // Se ejecutara esta seccion si hubo algun problema
      console.error("ocurrio un error inesperado...");

    });

  }

	/*
		Guarda el array de artistas en localstorage
	*/
	var guardarArtistas = function () {

		var datos = JSON.stringify(artistas);

		localStorage.setItem(claveLocalStorage, datos);

	}

	/*
		Dibuja en el DOM el artista pasada como parametro
	 */	
    var dibujarArtista = function (artista) {

    	var contenedor = $("#resultadoArtistas")

    	$('<li/>')
      		.attr('id', artista.id)
      		.addClass('list-group-item')
      		.appendTo(contenedor);

      	$('<img/>').attr('src', artista.imagen).css("max-width", "400px").appendTo('#' + artista.id);
      	$('<h3/>').html(artista.nombre).appendTo('#' + artista.id);
      	$('<span/>').addClass('glyphicon glyphicon-star-empty').appendTo('#' + artista.id);
      		
    }	

    var agregarArtista = function (artista) {

		artistas.push(artista);

		guardarArtistas();

		dibujarArtista(artista);
		
    }

    // Vincular boton de buscar con funcion buscarArtistas

    var vincularBotonBuscar = function () {

    	$('#buscarArtistas').on('click', buscarArtistas);

    }

    // Vincular icono favoritos con funcion que guarda el artista elegido

    
	var iniciar = function () {
		
		precargarArtistas();
		vincularBotonBuscar();

	}
        return {

		iniciar: iniciar

    };

})()

$(document).ready(function () {

		Spotify.iniciar();

	}
);    
