var app = new Vue({
    el: "#app",
    data: {
        URL : "http://localhost:3000/post",
        items: [],
        input: '',
        isTrue: true,
        isPost: false,
        user: '',
        form: false,
        inputtext: '',
        content: '',
        id: 0,
        save: false,
        send: true,
    },
    methods: {
        login() {
            if (this.input !== ""){
                localStorage.setItem("username", this.input)
                this.input = "";
                this.isPost = true;
                this.isTrue = false;
                this.user = localStorage.getItem("username");
        
            }else {
                alert("You must input your name!")
            }
            

        },
        addItem() {
            this.form = true;
            this.isPost = false;
        },
        submit() {
            const current = new Date();
            const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

            this.form = false;
            this.isPost = true;
            let author = {
                Authorname: this.user,
                contence: this.content,
                date: date
            }
            console.log(author);
            if (this.user !== null && this.contence !== null){
                axios.post(this.URL , author);
            }
            this.content = "";
        },

        logout() {
            this.isPost = false;
            this.isTrue = true;
            localStorage.clear();
        },
        remove(author) {
            axios.delete(this.URL + "/" + author.id);
        },
        update(author) {
            this.form = true;
            this.isPost = false;
            this.save = true;
            this.send = false;
            this.items = author;
            this.content = author.contence
            console.log(this.content);
            this.id = author.id;
        },
        saveChange(){
            let newAuthor = {
                contence: this.content
            }
            console.log(newAuthor);
            axios.put(this.URL +  "/" + this.id , newAuthor); 
            this.isPost = true;
            this.form = false;
            this.save = false;
            this.send = true;
            this.reload();
        },
        reload(){
            this.user = localStorage.getItem("username");
            if (this.user !== null){
                axios.get(this.URL).then(res => {
                   this.items = res.data;
                })
                this.isPost = true;
                this.isTrue = false;
            }
            setInterval(this.reload, 500);
        }
    },

    mounted() {
       this.reload();
    }
})