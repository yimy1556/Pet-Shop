const url = 'https://apipetshop.herokuapp.com/api/articulos'
const productsMed = 'Medicamento'
const ProductsJuguetes = 'Juguete'

var app = new Vue({
    el: '#app',
    data: {
        pagina:'',
        filtroStock:'',
        filterPrecio:'',
        listaDeMedicamento:[],
        listaDeJuguetes:[],
        show:false
    },
    computed: {
        articulosFinales(){
            if(this.filterPrecio == this.filtroStock) return this[`listaDe${this.pagina}s`]
            let articulos = (this.filtroStock == '')? this[`listaDe${this.pagina}s`].filter(art => art.stock <= 5):this[`listaDe${this.pagina}s`]    
            (this.filterPrecio != '') && articulos.sort((a,b) => a.precio - b.precio)
            return (filterPrecio == 'ME')? articulos.reverse():articulos
        },
        descri(){
            return (!this.show)? 'Mostrar Descripcion': 'Ocultar Descripcion'
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