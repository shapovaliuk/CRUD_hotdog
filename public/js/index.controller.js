Vue.use(VueMaterial.default);

new Vue({
    el: '#app',

    data(){
        return {
            allHotDogs: [],
            id: '',
            name: '',
            price: '',

            headers: ['Name', 'Price', 'Action'],
            updateSubmit: false,
            hotDogImage: '../img/hot-dog.png',

            search: ''
        }
    },

    mounted: function () {
        this.getHotDogs();
    },

    computed: {
        isEmpty: function () {
            return this.allHotDogs.length === 0;
        },

        filterHotDogs() {
            return this.allHotDogs.filter(item => {
                return ~item.name.indexOf(this.search) ;
            });
        },
    },

    methods: {
        getHotDogs: async function () {
            const self = this;
            self.allHotDogs = [];
            axios.get('/api/hot-dogs').then(response => {
                response.data.forEach(it => self.allHotDogs.push(it))
            }).catch(err => {
                console.log(err);
            });
        },

        createHotDog: async function () {
            const self = this;
            axios.post('/api/hot-dogs',{
                    name: self.name,
                    price: self.price
            }).then(function (response) {
                self.reset();
                self.getHotDogs();
            }).catch(function (error) {
                console.log(error);
            });
        },

        editHotDog: function(hotdog) {
            this.updateSubmit = true;
            this.id = hotdog._id;
            this.name = hotdog.name;
            this.price = hotdog.price;
        },

        updateHotDog: async function(){
            const self = this;
            axios.put('/api/hot-dogs/' + self.id, {
                name: self.name,
                price: self.price
            }).then(res => {
                self.updateSubmit = false;
                self.reset();
                self.getHotDogs();
            }).catch(err => console.log(err));
        },

        deleteHotDog: async function(hotdog){
            const self = this;
            const id = hotdog._id;
            axios.delete('/api/hot-dogs/' + id).then(res => {
                let index = self.allHotDogs.indexOf(self.name);
                self.allHotDogs.splice(index, 1);
                self.getHotDogs();
            }).catch(err => console.log(err));
        },

        reset: function () {
            this.name = '';
            this.price = '';
            this.allHotDogs = [];
        }
    }
});
