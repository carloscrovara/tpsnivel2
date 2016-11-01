function Artista(id, nombre, imagen) {

    this.id = id;
    this.nombre = nombre;
    this.imagen = imagen;

}

var Spotify = (function () {

  // Atributos privados
  var artistas = [];   
  var claveLocalStorage = 'artistas';

  // Permite precargar los artistas favoritos por localstorage
  var precargarFavoritos = function () {
		
        var datos = localStorage.getItem(claveLocalStorage);

        if (datos !== null && datos !== '') {

            artistas = JSON.parse(datos);

        }

  }

  // Buscar artistas en api Spotify	
  var buscarArtistas = function () {
    
    var nombreArtista = $('#buscadorArtistas').val();

    $.ajax({
  
      url:'https://api.spotify.com/v1/search?type=artist&q=' + nombreArtista,
      crossDomain: true,
      dataType: "json"

    }).done(function (datos) { // el parametro datos es lo que se recibe desde el servidor

      // Se ejecutara esta seccion si todo salio bien
      // Iterar sobre array
      for (i = 0; i < datos.artists.items.length; i++) {

        var id = datos.artists.items[i].id;

        var nombre = datos.artists.items[i].name;

        var imagen = ''; 

        if (datos.artists.items[i].images.length > 0) {

          imagen = datos.artists.items[i].images[0].url;

        }
      
        var artista = new Artista(id, nombre, imagen);

        dibujarArtista(artista);

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

    	var contenedor = $('#resultadoArtistas');

    	$('<li/>')
      		.attr('id', artista.id)
      		.addClass('list-group-item')
      		.appendTo(contenedor);

      	$('<img/>').attr('src', artista.imagen).css('max-width', '400px').appendTo('#' + artista.id);
      	$('<h3/>').html(artista.nombre).appendTo('#' + artista.id);

        var botonAgregarFavoritos = $('<button/>')
                                      .addClass('btn btn-default btn-xs')
                                      .appendTo('#' + artista.id)

        $('<span/>')
            .addClass('glyphicon glyphicon-star-empty')
            .css('font-size', '15px')
            .html('Agregar')
            .on('click', function(){

              $(this).removeClass('glyphicon-star-empty').addClass('glyphicon glyphicon-star');

              agregarFavoritos(artista);

            })
            .appendTo(botonAgregarFavoritos);

  }

  // Dibuja en el DOM los favoritos 
  var dibujarFavoritos = function (artista) {

      var contenedor = $('#resultadoFavoritos');

      $('<li/>')
            .attr('id', artista.id)
            .addClass('list-group-item')
            .appendTo(contenedor);

        $('<img/>').attr('src', artista.imagen).css('max-width', '400px').appendTo('#' + artista.id);
        $('<h3/>').html(artista.nombre).appendTo('#' + artista.id);

        var botonEliminarArtistaFav = $('<button/>')
                                      .addClass('btn btn-default btn-xs')
                                      .appendTo('#' + artista.id)

        $('<span/>')
            .addClass('glyphicon glyphicon-remove')
            .html('Eliminar')
            .on('click', function(){

              eliminarArtistaFavorito(artista.id);

            })
            .appendTo(botonEliminarArtistaFav);
        
        var botonVerAlbumes = $('<button/>')
                                      .addClass('btn btn-default btn-xs')
                                      .appendTo('#' + artista.id)  

        $('<a/>')
            .attr('id', artista.id)
            .html('Ver álbumes')            
            .on('click', function(){

              buscarAlbumes(artista);       

            })

            .appendTo(botonVerAlbumes);     

  }

  var agregarFavoritos = function (artista) {

      artistas.push(artista);

      guardarArtistas();

  } 	

  // Buscar albumes de artista seleccionado en api Spotify 
  var buscarAlbumes = function (artista) {
               
    $.ajax({
  
      url: 'https://api.spotify.com/v1/artists/' + artista.id + '/albums?album_type=album&market=AR',
      crossDomain: true,
      dataType: "json"

    }).done(function (datos) { // el parametro datos es lo que se recibe desde el servidor

      // Se ejecutara esta seccion si todo salio bien
      // Iterar sobre array
      for (i = 0; i < datos.items.length; i++) {

        var album = {id: datos.items[i].id, nombre: datos.items[i].name}

        dibujarAlbum(artista, album);

      }  

    }).fail(function (jqXHR, textStatus) {

      // Se ejecutara esta seccion si hubo algun problema
      console.error("ocurrio un error inesperado...");

    });

  }

  // Dibuja en el DOM albumes de artistas 
  var dibujarAlbum = function (artista, album) {

      var itemListado = $('<li/>').addClass('list-group-item').appendTo('#' + artista.id);

      $('<a/>')
          .attr('href', '#dialogDetalleAlbum')
          .attr('id', album.id)
          .html(' ' + album.nombre)
          .on('click', function(){

            buscarCanciones(album);

            $('.modal-body').empty();       
          
          })

          .prependTo(itemListado);

      $('<span/>')
          .addClass('glyphicon glyphicon-hand-right')
          .prependTo('#' + album.id)          

  }

  // Buscar canciones del album seleccionado del artista en api Spotify 
  var buscarCanciones = function (album) {
               
    $.ajax({
  
      url: 'https://api.spotify.com/v1/albums/' + album.id,
      crossDomain: true,
      dataType: "json"

    }).done(function (datos) { // el parametro datos es lo que se recibe desde el servidor

      // Se ejecutara esta seccion si todo salio bien
      // Iterar sobre array

        var imagen = ''; 

        if (datos.images.length > 0) {

          imagen = datos.images[0].url;

        }        

        var albumDetalle = { imagen: imagen, nombre: datos.name, lanzamiento: datos.release_date }

        dibujarAlbumDetalle(albumDetalle);


      for (i = 0; i < datos.tracks.items.length; i++) {

        var cancion = { tracknumero: datos.tracks.items[i].track_number, 
                        nombre: datos.tracks.items[i].name, 
                        duracion: datos.tracks.items[i].duration_ms, 
                        link: datos.tracks.items[i].preview_url}

        dibujarCanciones(cancion);

      }

      $('#dialogDetalleAlbum').modal('show');  

    }).fail(function (jqXHR, textStatus) {

      // Se ejecutara esta seccion si hubo algun problema
      console.error("ocurrio un error inesperado...");

    });

  }

  // Dibuja en el DOM album con nombre, imagen y lanzamiento 
  var dibujarAlbumDetalle = function (albumDetalle) {

    var albumFechaFormateada = moment(albumDetalle.lanzamiento).format('DD/MM/YYYY');    

    $('.modal-title').html(albumDetalle.nombre + ' - ' + albumFechaFormateada).appendTo('.modal-header');

    $('<img/>').attr('src', albumDetalle.imagen).css('max-width', '310px').appendTo('.modal-body');

  }

  // Dibuja en el DOM lista de canciones de album
  var dibujarCanciones = function (cancion) {

      var cancionDuracionFormateada = moment(cancion.duracion).format('mm:ss');

      var listaCanciones = $('<li/>').addClass('list-group-item').appendTo('.modal-body');

      var linkCanciones = $('<a/>')
                            .html(' ' + cancion.tracknumero + ' - ' + cancion.nombre + ' - ' + cancionDuracionFormateada)
                            .attr('href', '#iframe')
                            .on('click', function(){
                                
                                $('#iframe').remove();

                                $('<iframe/>')
                                    .attr('id', 'iframe')
                                    .attr('src', cancion.link)
                                    .css('max-height', '100px')
                                    .appendTo('.modal-body');

                            })        
                            .prependTo(listaCanciones);

      $('<span/>')
        .addClass('glyphicon glyphicon-headphones')
        .prependTo(linkCanciones)

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

  // Activar pestania favoritos
  var cambiarPestaniaFavoritos = function () {

    $('#tab-buscador').removeClass('active');

    $('#tab-favoritos').addClass('active');    

  }

  // Activar pestania buscador 
  var cambiarPestaniaBuscador = function () {

    $('#tab-favoritos').removeClass('active');  

    $('#tab-buscador').addClass('active');

  } 

  // Vincular pestanias con eventos on click
  var vincularPestanias = function () {

    $('#linkBuscador')
      .attr('href', '#pestaniaBuscador')
      .on('click', function(){

            cambiarPestaniaBuscador();

            $('#pestaniaBuscador').removeClass('hidden');

            $('#pestaniaFavoritos').addClass('hidden');
      })

    
    $('#linkFavoritos')
        .attr('href', '#pestaniaFavoritos')
        .on('click', function(){

            cambiarPestaniaFavoritos();

            $('#pestaniaFavoritos').removeClass('hidden');

            $('#pestaniaBuscador').addClass('hidden');

            $('#resultadoFavoritos, #resultadoArtistas').empty();

            for (i = 0; i < artistas.length; i++) {

              dibujarFavoritos(artistas[i]);

            }

        })  

  }

  var iniciar = function () {

    precargarFavoritos();   
    vincularBotonBuscar();
    vincularPestanias();
	
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