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
            isLoading: false
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
            transportSend(pageLink, {action: 'products'})
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
        }
    }
}