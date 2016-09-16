var peliculas = [];

function Pelicula(id,titulo) {
	this.id = id;
	this.titulo = titulo;

    this.getId = function () {
        return this.id;
    }
    this.getTitulo = function () {
        return this.titulo;
    }

}

function agregarPelicula(peliculas) {
         	    var continuar = 1;
    		    var nuevaId;
                var nuevoTitulo;
                var nuevaPelicula;
    		    do {
       					nuevaId = prompt('Ingresar Id de nueva pelicula');
                    	nuevoTitulo = prompt('Ingresar titulo de nueva pelicula');                                
                    	nuevaPelicula = new Pelicula(nuevaId, nuevoTitulo);                            
						peliculas.push(nuevaPelicula);
       					continuar = parseInt(prompt('Ingrese 1 para agregar otra pelicula o 0 para salir'));
    		    } while(continuar);
}



