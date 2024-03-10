class Users {
    #users = [];
    #userId= 0;

    create(data){
        const user = {
            id: this.#userId++,
            photo: data.photo,
            email: data.email,
            role: data.role
            };
        this.#users.push(user);
        }
    read(){
        return this.#users;
    }
}

const users = new Users();
users.create({ photo: 'https://google.com/photos/tablets.jpg', email: 'testinganemail@gmail.com', role: 'Administrator'});
users.create({ photo: 'https://google.com/photos/mouse.jpg', email: 'testinganotheremail@gmail.com', role: 'Power User'});

console.log(users.read());