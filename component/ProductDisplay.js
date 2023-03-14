app.component("product-display",{
  
  props:{
    premium: {
        type: Boolean,
        required: true
    }
  },
  
    template:  
  /*html*/
  `

        <div class="product-display">
          <div class="product-container">
            <div class="product-image">
              <img :class="{'out-of-stock-img': !inStock }" v-bind:src="image">
            </div>
            <div class="product-info">
              <h1>{{ title }}</h1>
              <h2>{{ sale }}</h2>
              <p v-if="variants[selectedVariant].quantity > 10">In Stock</p>
              <p v-else-if="variants[selectedVariant].quantity <= 10 && inventory >0">Almost sold out</p>
              <p v-else>Out of Stock</p>

              <p>Spipping: {{ shipping }}</p>

              <p v-show="onSale">On Sale!!!!</p>
              <ul>
                <li v-for="detail in details">{{ detail }}</li>
              </ul>
              <ul>
                <li v-for="size in sizes">{{ size }}</li> 
              </ul>
              <div v-for="(variant, index) in variants"
               :key="variant.id" 
               @mouseover="updateVariant(index)"
               class="color-circle"
               :style="{ backgroundColor: variant.color }">
              </div>

              <button class="button"
              :class="{ disabledButton: !inStock }"
              :disabled="!inStock" 
              v-on:click="addToCart">Add to Cart</button>
              
              <button class="button" v-on:click="remFromCart">Remove</button>
          </div>
        </div>
        <review-list v-if="reviews.length" :reviews="reviews"></review-list>
        <review-form @review-submited="addReview"></review-form>
        </div>`,
        data(){
            return{
                product: 'Socks',
                brand: 'Vue Mastery',
                selectedVariant: 0,
                url: "https://github.com/",
                onSale: false,
                details: ['50% cotton', "30% wool", "20% polyester"],
                variants: [
                    {id: 2234, color: "green", 
                    image: "assets/images/socks_green.jpg", 
                    quantity: 50,
                    onSale: true},
                    {id: 2235, color: "blue",
                    image: "assets/images/socks_blue.jpg", 
                    quantity: 0,
                    onSale: false},
                ],
                sizes: ['S', "M", "L", "XL"],
                reviews: []
            }
        },
        methods:{
            addToCart(){
                this.$emit('add-to-cart', this.variants[this.selectedVariant].id)
            },
            updateVariant(index){
                this.selectedVariant = index
                
            },
            remFromCart(){
                
                this.$emit('rem-fr-cart', this.variants[this.selectedVariant].id)
                   
            },
            addReview(review){
                this.reviews.push(review)
            }
            
        },
        computed: {
            title() {  
                 
                return this.brand + ' ' + this.product
            },
            image(){
                return this.variants[this.selectedVariant].image
            },
            inStock(){
                return this.variants[this.selectedVariant].quantity
            },
            sale(){
                if (this.variants[this.selectedVariant].onSale){
                    return this.brand + ' ' + this.product + " IS ON SALEEE"
                }
            return ''
            },
            shipping() {
                if (this.premium){
                    return "Free"
                }
                return 2.99
            }

        }
})