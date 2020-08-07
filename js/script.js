const url = 'https://apipetshop.herokuapp.com/api/articulos'
const productsMed = 'Medicamento'
const ProductsJuguetes = 'Juguete'

var app = new Vue({
    el: '#app',
    data: {
        pagina:'',
        filterPrecio:'',
        listaDeMedicamento:[],
        listaDeJuguetes:[],
        show:false
    },
    computed: {
        articulosFinales(){
            if(this.filterPrecio == '') return this[`listaDe${this.pagina}s`]
            let articulos = [...(this[`listaDe${this.pagina}s`])]   
            console.log(articulos); 
            articulos.sort((a,b) => a.precio - b.precio)
            return (this.filterPrecio != 'ME')? articulos.reverse():articulos
        },
        descri(){
            return (!this.show)? 'Mostrar Descripcion': 'Ocultar Descripcion'
        }
    },
    methods:{
        mostrarArticulo: function(articulo){
            Swal.fire({
                title: articulo.nombre,
                text: articulo.descripcion,
                imageUrl: articulo.imagen,
                imageWidth: 200,
                imageHeight: 200,            
            })
        },
        envioDeFormulario:function(){
            Swal.fire({
                title: 'Gracias',
                imageUrl: 'assets/envioDeFormulario.png',
                imageWidth: 200,
                imageHeight: 200,
                timer:20000
            })
        }

    }
})

const loadProduc = (products) => app[`listaDe${app.pagina}s`] = products.filter( product => product.tipo == app.pagina)



$(document).ready(
    $.ajax({
        url: url,
        success: function (articulos){
            app.pagina = (document.querySelector('#medicamentos'))? productsMed:ProductsJuguetes
            loadProduc(articulos.response)
            console.log(articulos.response)
        }
    })
)

console.log(app.value);
