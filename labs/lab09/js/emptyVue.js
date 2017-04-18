var app = new Vue({
    el: '#rewardApp',
    data: {
        ind: 0,
        mode: 'register',
        isToggle: false,
        formError: false,
        allUser: [],
        rewards: [],
        allRewards: [],
        getRewards: [],
        formUser: {
            firstname: '',
            tel: ''
        },
        formGetReward: {
            firstname: '',
            tel: ''
        },
    },
    mounted: function() {
        this.loadConfig()
    },
    methods: {
        loadConfig: function() {
            axios.get('config/reward.config.json')
                .then(function(response) {
                    console.log(response);
                    app.addAllRewards(response.data);
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
        addAllRewards: function(data) {
            this.allRewards.length = 0;
            for (i = 0; i < data.length; i++) {
                this.allRewards.push({
                    name: data[i].name,
                    amountDefault: data[i].amount,
                    amount: data[i].amount
                })
            }
        },
        createReward: function() {
            this.rewards.length = 0;
            for (var j = 0; j < this.allRewards.length; j++) {
                this.allRewards[j].amount = this.allRewards[j].amountDefault;
            }
            var num = Math.floor(Math.random() * 7);
            var i = 0;
            while (i < this.allUser.length) {
                if (this.allRewards[num].amount <= 0) {
                    num = Math.floor(Math.random() * 7);
                    continue;
                } else {
                    var reName = this.allRewards[num].name;
                    this.allRewards[num].amount = this.allRewards[num].amount - 1;
                    this.rewards.push({
                        imgSrc: "img/signPic.png",
                        rewardID: num,
                    })
                }
                i++;
                num = Math.floor(Math.random() * 7);
            }
        },
        addUser: function() {
            if (!this.validateVal(this.formUser.firstname) || !this.validateVal(this.formUser.tel)) {
                this.formError = true;
            } else {
                this.allUser.push({
                    firstname: this.formUser.firstname,
                    tel: this.formUser.tel
                });
                this.createReward();
                this.clearForm();
                this.formError = false;
            }
            // alert("Out " + this.allUser.length + " " +
            // this.allUser[this.allUser.length - 1]['firstname'] + " " +
            // this.allUser[this.allUser.length - 1]['tel']);
        },
        clickImg: function(temp) {
            console.log(temp.currentTarget.querySelector('p').innerHTML);
            var rewardID = parseInt(temp.currentTarget.querySelector('p').innerHTML);
            var path = temp.currentTarget.querySelector('img').src.split("/").pop();
            if (path == 'signPic.png') {
                temp.currentTarget.querySelector('img').src = 'img/' + this.allRewards[rewardID].name + '.png';
                this.getRewards.push({
                    firstname: this.formGetReward.firstname,
                    tel: this.formGetReward.tel,
                    reward: "img/" + this.allRewards[rewardID].name + ".png"
                })
                this.ind = this.ind + 1;
                if (this.ind >= this.allUser.length) {
                    this.isToggle = !this.isToggle;
                } else {
                    this.setUser();
                }
            } else {
                alert("This card is already open.");
            }
            // alert(rewardID + " : " + this.allRewards[rewardID].name + " " + this.allRewards[rewardID].amount);
        },
        validateVal: function(val) {
            if (val == "" || val == " ") {
                return false;
            } else {
                return true;
            }
        },
        setUser: function() {
            this.formGetReward.firstname = this.allUser[this.ind].firstname;
            this.formGetReward.tel = this.allUser[this.ind].tel;
        },
        clearForm: function() {
            this.formUser.firstname = '';
            this.formUser.tel = '';
        }
    }
})