<template>
    <div class="container">
        <div>
            <div class="row">
                <div class="col-md-8">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item" v-bind:class="[{disabled: !pagination.prevPageUrl}]">
                                <a class="page-link" href="#"
                                   @click.prevent="fetchProducts(pagination.prevPageUrl)">Previous</a>
                            </li>
                            <li class="page-item disabled"><a class="page-link" href="#">{{ pagination.currentPage
                                }}</a>
                            </li>
                            <li class="page-item" v-bind:class="[{disabled: !pagination.nextPageUrl}]">
                                <a class="page-link" href="#"
                                   @click.prevent="fetchProducts(pagination.nextPageUrl)">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="col-md-4">
                    <autocomplete
                    :search="search"
                    placeholder="Type for Search"
                    aria-label="search"
                    :get-result-value="getResultValue"
                    >
                    </autocomplete>
                </div>
            </div>
            <table class="table" v-if="!isLoading">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Brand Name</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Active</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="product in products" v-bind:key="product.id">
                    <th>{{ product.id }}</th>
                    <th>{{ product.title }}</th>
                    <th>{{ product.price }}</th>
                    <th>{{ product.brand.title }}</th>
                    <th>{{ product.type.single }}</th>
                    <th>{{ product.description }}</th>
                    <th><input type="checkbox" v-model="product.isActive"></th>
                    <th>
                        <button class="btn btn-danger" @click="deleteProduct(product.id)">Delete Product</button>
                    </th>
                </tr>
                </tbody>
            </table>
        </div>
        <loader size="massive" v-show="isLoading"></loader>
    </div>
</template>

<script src="./products.js"></script>

<style scoped>

</style>