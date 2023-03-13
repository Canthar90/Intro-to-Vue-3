
const app = Vue.createApp({
    data(){
        return{
            cart: 0,
            product: 'Socks',
            image: "assets/images/socks_blue.jpg",
            url: "https://github.com/",
            inventory: 30,
            onSale: false,
            inStock: false,
            details: ['50% cotton', "30% wool", "20% polyester"],
            variants: [
                {id: 2234, color: "green", image: "assets/images/socks_green.jpg"},
                {id: 2235, color: "blue", image: "assets/images/socks_blue.jpg"},
            ],
            sizes: ['S', "M", "L", "XL"]
        }
    },
    methods:{
        addToCart(){
            this.cart ++
        },
        updateImage(variantImage){
            this.image = variantImage
        },
        remFromCart(){
            this.cart --
        }
    }
});
