function Pelicula(id,titulo) {
	this.id = id;
	this.titulo = titulo;

	this.evaluarPelicula = function() {
		var posicion = this.titulo.indexOf([i]);
		if (posicion === -1) {
			console.log('Este titulo no está ingresado previamente');
		}
		else {
			console.log('Este título ya está ingresado');
		}
	}

	this.agregarIdYTitulo = function() {
         var continuar = 1; 
         var nuevoId; 
         var nuevoTitulo;
    			do {
       				nuevoId = prompt('Ingrese id de nueva pelicula');
       				this.id.push(nuevoId);
       				nuevaPelicula = prompt('Ingrese titulo de nueva pelicula');
       				this.titulo.push(nuevoTitulo);                               
       				continuar = parseInt(prompt('Ingrese 1 para agregar otro titulo o 0 para salir'));
    			} while(continuar);         
    }

    this.eliminarPeliculaId = function() {
    	removed = this.id.splice(index, [i]);
    }
	
}

	pelicula.sort(function (a, b){
    	return (a.id - b.id)
	})

	pelicula.sort(function (a, b){
		return (a.titulo - b.titulo)
	})	