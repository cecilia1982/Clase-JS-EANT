    class Pelicula {
        //1) constructor - define el procesos por el cual debe crearse el proceso. Solo puede haber 1 por clase. No se coloca function, porque esta implicito.
        constructor(i, t, d, e, p, v) {
            this.ID = i;
            this.Titulo = t;
            this.Descripcion = d;
            this.Estreno = e;
            this.Poster = (p != null) ? p : "https://www.hongshen.cl/wp-content/uploads/2016/07/no-disponible.png";
            this.Trailer = v;
        }

        //2) metodos de instancia - La posibilidad de colocarle que es y que hace. Los unicos capaces y autorizados de mostrar son los objetos. 
        Mostrar() {

            document.write(`
                <img src="${this.Poster}" width="150"></img>
                <h1>${this.Titulo} (${this.Estreno})</h1>
                <P>${this.Descripcion}</P>
                <a href="${this.Trailer}" target="_blank">Reproducir Trailer</a>
                <hr>
                `)
        }
        Imprimir(area) {

            let ficha = document.querySelector(".pelicula").cloneNode(true)
            ficha.querySelector("h4").innerText = this.Titulo
            ficha.querySelector("p").innerText = this.Estreno
            ficha.querySelector("img").src = this.Poster

            ficha.querySelector("a").onclick = () => {

                // window.alert(`Usted quiere ver: ${this.Trailer}`)
                document.querySelector("#playMovie iframe").src = `https://youtube.com/embed/${this.Trailer}`

            }

            ficha.classList.remove("hide")

            console.log(ficha)

            document.querySelector(area).appendChild(ficha)


        }

        render(DOM){
            let vDOM = document.createElement("div") //< -- aca se va a guardar el <div></div>
            vDOM.classList.add("col-md-3", "col-sm-4", "pelicula")
            vDOM.id = `movie-${this.ID}`
            vDOM.innerHTML = `<div class="thumbnail">
                                <img src="${this.Poster}" alt="">
                                 <div class="caption">
                                    <h4>${this.Titulo}</h4>
                                    <p>${this.Estreno}</p>
                                    <p><a href="#playMovie" class="btn btn-primary">Ver ahora</a></p>
                                </div>
                             </div>`
            vDOM.querySelector("a").onclick = (event) => {
                event.preventDefault()
                Reproductor.play(this)
            }

            document.querySelector(DOM).appendChild(vDOM)
        }

        //3) metodos de clase o metodo estatico- En la programacion orientada a objetos son equivalente a las funciones clasicas, 
        static parse(json) {
            let data = JSON.parse(json)

            if (data instanceof Array) {

                return data.map(pelicula => new Pelicula(pelicula.idPelicula, pelicula.Titulo, pelicula.Descripcion, pelicula.Estreno, pelicula.Poster, pelicula.Trailer))

            } else if (data instanceof Object) {

                return new Pelicula(data.idPelicula, data.Titulo, data.Descripcion, data.Estreno, data.Poster, data.Trailer)

            } else {
                throw "Error: El formato no puede usarse para crear objetos Pelicula"
            }

        }
    }
    //estas 3 areas estan presentes en todos los lenguajes de programacion. Las instancias son independientes entre si

    //ORM y LAMP leer de que se trata

    class Reproductor extends Pelicula {

        static play(pelicula){
            let vDOM = document.querySelector("#playMovie")
                vDOM.querySelector("#titulo").innerText = `${pelicula.Titulo} (${pelicula.Estreno})`
                vDOM.querySelector("iframe").src = pelicula.Trailer
                vDOM.querySelector("#descripcion").innerText = pelicula.Descripcion
                vDOM.querySelector("#imagen").src = pelicula.Poster

                window.scroll({
                    top : vDOM.offsetTop,
                    behavior : "smooth"
                })
        }
    }