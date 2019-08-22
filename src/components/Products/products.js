import {makePagination} from '../../helpers.js'
import {transportSend} from "../../helpers";

export default {
    name: "Products",
    data() {
        return {
            products: [],
            product: {
                title: '',
                price: '',
                description: '',
                brand: {
                    id: '',
                    title: ''
                },
                type: {
                    id: '',
                    title: '',
                    single: '',
                    multiple: ''
                },
                isActive: ''
            },
            pagination: {
                currentPage: '',
                lastPage: '',
                prevPageUrl: '',
                nextPageUrl: '',
            },
            isLoading: false,
            searchProducts: []
        }
    },
    created() {
        this.fetchProducts();
    },
    methods: {
        /**
         * @param pageLink
         */
        fetchProducts(pageLink) {
            this.isLoading = true;
            pageLink = pageLink || 'products';
            transportSend(pageLink)
                .then(res => {
                    this.products = res.data;
                    this.pagination = makePagination(res.meta, res.links);
                    this.isLoading = false;
                })
                .catch(err => {
                    console.log(err);
                    this.isLoading = false;
                    this.$notify({
                        group: 'foo',
                        type: 'error',
                        text: err
                    });
                })
        },

        deleteProduct(productId) {
            this.isLoading = true;
            transportSend('product/delete', {id: productId})
                .then(res => {
                    this.fetchProducts();
                    this.$notify({
                        group: 'foo',
                        type: 'success',
                        text: 'deleting successful',
                        speed: 1000
                    });
                })
                .catch(err => {
                    this.fetchProducts();
                    this.$notify({
                        group: 'foo',
                        type: 'error',
                        text: err
                    });
                })
        },

        autocompleteProduct(input) {
            if (input.length < 1) { return [] }
            let products = [];
            // return new Promise(resolve => {
            //     if (input.length < 3) {
            //         return resolve;
            //     }
            // });
            transportSend('product/autocomplete', {token: input})
                .then(res => {
                    this.searchProduct = res.data;
                    products = this.searchProduct.map(product => product.title);
                    console.log(products);
                    return products;
                });
            // return countries.filter(country => {
            //     return country.toLowerCase()
            //         .startsWith(input.toLowerCase())
            // })
        },
        search(input) {
            const url = process.env.ROOT_API + 'product/autocomplete';

            return new Promise(resolve => {
                if (input.length < 3) {
                    return resolve([])
                }

                fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({token: input}),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        resolve(data.data);
                        console.log(data.data);
                    })
            })
        },

        // Wikipedia returns a format like this:
        //
        // {
        //   pageid: 12345,
        //   title: 'Article title',
        //   ...
        // }
        //
        // We want to display the title
        getResultValue(result) {
            return result.title
        },
    }
}