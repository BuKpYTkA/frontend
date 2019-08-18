import {makePagination} from '../../helpers.js'

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
            pageLink = pageLink || 'http://my-project.loc/api/products';
            fetch(pageLink, {
                method: 'post',
            })
                .then(res => res.json())
                .then(res => {
                    this.products = res.data;
                    this.pagination = makePagination(res.meta, res.links);
                    this.isLoading = false;
                })
                .catch(err => {
                    console.log(err);
                    this.isLoading = false;
                });
        },

        /**
         * @param meta
         * @param links
         */
        makePagination(meta, links) {
            this.pagination.currentPage = meta.current_page;
            this.pagination.lastPage = meta.last_page;
            this.pagination.nextPageUrl = links.next;
            this.pagination.prevPageUrl = links.prev
        },
    }
}