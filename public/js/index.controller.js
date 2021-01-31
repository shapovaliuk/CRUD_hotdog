Vue.use(VueMaterial.default);

new Vue({
    el: '#app',
    components: {
        paginate: VuejsPaginate
    },

    data: () => ({
        allHotDogs: [],
        id: null,
        name: null,
        price: null,

        headers: ['Name', 'Price', 'Action'],
        canEdit: false,
        hotDogImage: '../img/hot-dog.png',

        search: '',

        showSnackbar: false,
        position: 'center',
        duration: 4000,
        isInfinity: false,

        page: null,
        totalPages: null
    }),

    created: function() {
        this.getHotDogs();
    },

    computed: {
        isEmpty: function() {
            return this.allHotDogs.length === 0;
        },

        filterHotDogs: function() {
            return this.allHotDogs.filter(item => {
                return ~item.name.indexOf(this.search);
            });
        },

        saveText: function() {
            return this.canEdit ? 'save' : 'create';
        },

        saveMethod: function() {
            return this.canEdit ? 'put' : 'post';
        },

        saveURL: function() {
            return this.canEdit ? `/api/hot-dogs/${this.id}` : 'api/hot-dogs';
        }
    },

    methods: {
        getHotDogs: async function(page = 1) {
            axios({
                method: 'get', url: '/api/hot-dogs',
                params: {
                    page
                }
            }).then(res => {
                if (res.data) {
                    this.allHotDogs = res.data.items;
                    this.page = res.data.page;
                    this.totalPages = res.data.totalPages;
                }
            }).catch(err => {
                if (err.response) {
                    console.log(err.response.message);
                }
            });
        },

        changePage: async function(page) {
            await this.getHotDogs(page);
        },

        editHotDog: function(hotdog) {
            this.canEdit = true;
            this.id = hotdog._id;
            this.name = hotdog.name;
            this.price = hotdog.price;
        },

        saveHotDog: async function() {
            await axios({
                method: this.saveMethod,
                url: this.saveURL,
                data: {
                    name: this.name,
                    price: this.price
                }
            }).then(res => {
                if (res.data) {
                    this.canEdit = false;
                    this.reset();
                    const updateIndex = this.allHotDogs.findIndex(it => it._id === this.id);

                    if (updateIndex !== -1) {
                        return this.allHotDogs.splice(updateIndex, 1, res.data);
                    }

                    this.allHotDogs.unshift(res.data);
                }
            }).catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    console.log(error.response.data.message);
                }
            });
        },

        deleteHotDog: async function(hotdog) {
            console.log(this.allHotDogs);
            await axios({
                method: 'delete',
                url: `/api/hot-dogs/${hotdog._id}`
            }).then(res => {
                if (res.status === 204) {
                    const removeIndex = this.allHotDogs.findIndex(it => it._id === hotdog._id);
                    this.allHotDogs.splice(removeIndex, 1);
                }
            });
        },

        reset: function() {
            this.name = '';
            this.price = '';
        }
    }
});
