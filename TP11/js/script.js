function Pelicula(id, titulo, descripcion, imagen, categoria, anio) {

  this.id = id;
  this.titulo = titulo;
  this.descripcion = descripcion;
  this.imagen = imagen;
  this.anio = anio;

}

var IMDB = (function () {

  // Atributos privados
  var peliculas = [];
  var claveLocalStorage = 'peliculas';

  /*
  Permite precargar las peliculas por localstorage
  */
  var precargarPeliculas = function () {

    var datos = localStorage.getItem(claveLocalStorage);

    if (datos !== null) {

      peliculas = JSON.parse(datos);

      for (i = 0; i < peliculas.length; i++) {

        dibujarPelicula(peliculas[i]);

      }

    }

  }

  // Aca iria la llamada AJAX para consumir la API de OMBD
  // Habria que obtener el valor del input y con eso construir una url que sera el parametro
  // para la llamada ajax.
  // Se pueden hacer algunas pruebas en el navegador para entender la estructura del JSON y
  // eso nos ayudara a saber como manipular los datos que recibamos desde el servidor.
  // Podemos probar la API con la siguiente URL y darnos una idea de como estan
  // construidos los datos.
  // URL: http://www.omdbapi.com/?s=Batman

  var buscarPeliculas = function () {
    
    var nombrePelicula = $('#buscadorPeliculas').val();

    $.ajax({
  
      url:"http://www.omdbapi.com/?s=" + nombrePelicula,
      crossDomain: true,
      dataType: "json"

    }).done(function (datos) { // el parametro datos es lo que se recibe desde el servidor

      // Se ejecutara esta seccion si todo salio bien
      // Iterar sobre array datos.Search
      for (i = 0; i < datos.Search.length; i++) {

        var id = datos.Search[i].imdbID;

        var titulo = datos.Search[i].Title;

        var descripcion = '';

        var imagen = datos.Search[i].Poster;

        var categoria = datos.Search[i].Type;

        var anio = datos.Search[i].Year;
      
        var pelicula = new Pelicula(id, titulo, descripcion, imagen, categoria, anio);

        agregarPelicula(pelicula);
      }  

    }).fail(function (jqXHR, textStatus) {

      // Se ejecutara esta seccion si hubo algun problema
      console.error("ocurrio un error inesperado...");

    });

  }

  /*
  Guarda el array de peliculas en localstorage
  */
  var guardarPeliculas = function () {

    var datos = JSON.stringify(peliculas);
    localStorage.setItem(claveLocalStorage, datos);

  }

  /*
  Dibuja en el DOM la pelicula pasada como parametro
  */
  var dibujarPelicula = function (pelicula) {


    $('<li/>')
      .attr('id', pelicula.id)
      .addClass('list-group-item')
      .appendTo('#peliculas');

    var botonEliminar = $('<button/>')
      .addClass('btn btn-default btn-xs boton-borrar')
      .on('click', function () { eliminarPelicula(pelicula.id); });


    $('<span/>')
      .addClass('glyphicon glyphicon-remove')
      .html('Borrar')
      .appendTo(botonEliminar);

    
    botonEliminar.appendTo('#' + pelicula.id);

    var divBorrar = $('<div/>').addClass("checkbox").appendTo('#' + pelicula.id);
    var label = $('<label/>').html("Marcar para borrar").appendTo(divBorrar)
    
    $('<input/>').attr('type', 'checkbox').prependTo(label);


    $('<h3/>').html(pelicula.titulo).appendTo('#' + pelicula.id);
    $('<h5/>').html(pelicula.anio).appendTo('#' + pelicula.id);
    $('<h4/>').html(pelicula.categoria).appendTo('#' + pelicula.id);

    $('<p/>').html(pelicula.descripcion).appendTo('#' + pelicula.id);

    $('<img/>').attr('src', pelicula.imagen).appendTo('#' + pelicula.id);

  }

  /*
  Borra del DOM la pelicula pasada como parametro
  */
  var borrarPeliculaDOM = function (id) {

    $("#" + id).remove();

  }

  // Si la pelicula existe en el array de peliculas devuelve la posicion donde se encuentra (0, 1, 2, etc.)
  // En caso contrario devuelve -1;
  var obtenerPosicionPelicula = function (id) {

    var posicion = -1;

    // La condicion del for lee: 'Mientras haya elementos en el array de peliculas por recorrer y la posicion sea -1
    for(i = 0; i < peliculas.length && posicion === -1; i++) {

      if (peliculas[i].id === id) {

        // Si los ids coinciden me guardo el contenido de la variable i en la variable posicion
        posicion = i;

      }

    }

    return posicion;

  }

  var agregarPelicula = function (pelicula) {

    peliculas.push(pelicula);

    guardarPeliculas();

    dibujarPelicula(pelicula);

  }

  var eliminarPelicula = function (id) {

    var posicion = obtenerPosicionPelicula(id);

    // Borra 1 elemento desde la posicion
    peliculas.splice(posicion, 1);

    guardarPeliculas();

    borrarPeliculaDOM(id);

  }

  var limpiarPeliculasDOM = function () {

    $('#peliculas').empty();

  }

  var limpiarIMDB = function () {

    peliculas = []
    localStorage.removeItem(claveLocalStorage);

    limpiarPeliculasDOM();

  }

  var construirComparador = function (atributo, ordenamientoAscendente) {

    return function (elementoA, elementoB) {

      var resultado;

      if (elementoA[atributo] > elementoB[atributo]) {

        resultado = 1;

      }

      if (elementoA[atributo] === elementoB[atributo]) {

        resultado = 0;

      }

      if (elementoA[atributo] < elementoB[atributo]) {

        resultado = -1;

      }

      if (ordenamientoAscendente === false) {

        resultado = -resultado;

      }

      return resultado;

    }

  }

  var ordenarPeliculas = function (atributo, ordenamientoAscendente) {

    var comparador = construirComparador(atributo, ordenamientoAscendente);

    peliculas.sort(comparador);

    guardarPeliculas();
    limpiarPeliculasDOM();
    precargarPeliculas();

  }

  var borrarSeleccionados = function() {

    $('#peliculas li .checkbox input[type="checkbox"]:checked')
      .closest('li')
      .find('.boton-borrar')
      .trigger('click');

  }

  var vincularEventos = function () {

    $('#mostrarOcultarListado').on('click', mostrarOcultarListado);
    $('#botonBuscar').on('click', buscarPeliculas);
    $('#borrarSeleccionados').on('click', borrarSeleccionados);
    vincularOrdenamientos();
  }

  var vincularOrdenamientos = function () {

    var ordenarPorId = $('#id');
    var ordenarPorAZ = $('#az');
    var ordenarPorZA = $('#za');
    var ordenarPorCategoria = $('#ordenamientoCategoria');

    ordenarPorId.on("click", function () {

      var atributo = 'id';
      var ordenamientoAscendente = true;

      ordenarPeliculas(atributo, ordenamientoAscendente);

    })

    ordenarPorAZ.on("click", function () {

      var atributo = 'titulo';
      var ordenamientoAscendente = true;

      ordenarPeliculas(atributo, ordenamientoAscendente);

    });

    ordenarPorZA.on("click", function () {

      var atributo = 'titulo';
      var ordenamientoAscendente = false;

      ordenarPeliculas(atributo, ordenamientoAscendente);

    });

    ordenarPorCategoria.on("click", function () {

      var atributo = 'categoria';
      var ordenamientoAscendente = false;

      ordenarPeliculas(atributo, ordenamientoAscendente);

    });


  }

  var iniciar = function () {

    vincularEventos();    
    precargarPeliculas();
    
  }

  // El 'agregarPelicula' de la izquierda es el nombre del atributo de nuestro objeto literal.
  // El 'agregarPelicula' de la derecha es el valor que tendra el atributo. Es la funcion que tenemos declarada

  // El 'eliminarPelicula' de la izquierda es el nombre del atributo de nuestro objeto literal.
  // El 'eliminarPelicula' de la derecha es el valor que tendra el atributo. Es la funcion que tenemos declarada
  return {

    /* Esto se hace ahora a traves de los eventos del formulario.
    agregarPelicula: agregarPelicula,
    eliminarPelicula: eliminarPelicula,*/
    limpiarIMDB: limpiarIMDB,
    iniciar: iniciar

  };

})()

// Para limpiar el diario pueden hacer lo siguiente:
// Esto borra el array de peliculas, limpia localstorage y quita todas las peliculas del DOM.
// Diario.limpiarDiario()

$(document).ready(function () {

  IMDB.iniciar();

});
