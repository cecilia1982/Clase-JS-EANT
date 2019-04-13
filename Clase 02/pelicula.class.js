    
    class Pelicula {
	//1) constructor - define el procesos por el cual debe crearse el proceso. Solo puede haber 1 por clase. No se coloca function, porque esta implicito.
	    constructor(t, d, e, p, v){
		    this.Titulo = t;
		    this.Descripcion = d;
		    this.Estreno = e;
		    this.Poster = (p != null) ? p : "https://www.hongshen.cl/wp-content/uploads/2016/07/no-disponible.png";
		    this.Trailer = v;
	}

   //2) metodos de instancia - La posibilidad de colocarle que es y que hace. Los unicos capaces y autorizados de mostrar son los objetos. 
        Mostrar(){
        	
            document.write(`
        		<img src="${this.Poster}" width="150"></img>
        		<h1>${this.Titulo} (${this.Estreno})</h1>
        		<P>${this.Descripcion}</P>
        		<a href="${this.Trailer}" target="_blank">Reproducir Trailer</a>
        		<hr>
        		`)
        }
        Imprimir(area){

            let ficha = document.querySelector(".pelicula").cloneNode(true)
            ficha.querySelector("h4").innerText = this.Titulo
            ficha.querySelector("p").innerText = this.Estreno
            ficha.querySelector("img").src = this.Poster
            
            ficha.querySelector("a").onclick = () => {
               
               // window.alert(`Usted quiere ver: ${this.Trailer}`)
               document.querySelector("#playMovie iframe").src =`https://youtube.com/embed/${this.Trailer}`

            }

            ficha.classList.remove("hide")


            console.log(ficha)

            document.querySelector(area).appendChild(ficha)


        }





  //3) metodos de clase o metodo estatico- En la programacion orientada a objetos son equivalente a las funciones clasicas, 
        static parse(obj){

        	return new Pelicula(obj.Titulo, obj.Descripcion, obj.Estreno, obj.Poster, obj.Trailer)

        }

 //estas 3 areas estan presentes en todos los lenguajes de programacion. Las instancias son independientes entre si

 //ORM y LAMP leer de que se trata
}