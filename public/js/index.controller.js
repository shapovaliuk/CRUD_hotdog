Vue.use(VueMaterial.default);

new Vue({
    el: '#app',

    data:{
        allHotDogs: [],

        id: '',
        name: '',
        price: '',

        headers: ['Name', 'Price', 'Action'],
        updateSubmit: false,
        hotDogImage: '../img/hot-dog.png'
    },

    mounted: function () {
        this.getHotDogs();
    },

    methods: {
        getHotDogs: async function () {
            const self = this;
            self.allHotDogs = [];
            axios.get('/api/hot-dogs').then(response => {
                console.log(response);
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
                console.log(response);
                self.reset();
                self.getHotDogs();
                console.log(response.data);
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
                console.log(self.allHotDogs);
            }).catch(err => console.log(err));
        },

        deleteHotDog: async function(hotdog){
            const self = this;
            const id = hotdog._id;
            console.log("[D] - DELETED ID");

            axios.delete('/api/hot-dogs/' + id).then(res => {
                let index = self.allHotDogs.indexOf(self.name);
                self.allHotDogs.splice(index, 1);
                console.log(self.allHotDogs);
                self.getHotDogs();
            }).catch(err => console.log(err));
        },

        reset: function () {
            this.name = '';
            this.price = '';
            this.allHotDogs = [];
        }
    },
});
