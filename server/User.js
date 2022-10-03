class User {
    constructor(users) {
        this.user = {};
        this.users = users;
        this.role = '';
    }

    addRole(res, data) {
        if(!this.users) {
            this.users = [];
        }
      let {name, role} = data;
      let user = this.users.find(el => el.name == name);
      if(!user) {
          user = {
              'name': name
          }
      }else if(user.role) {
          res.status(500).json('role already exist')
          return;
      }
      user.role = role;
      res.status(200).json('add role succeed')
     // return;

    }
 
    createUser(res, user) {
      if(!this.users) {
          this.users = [];
      }
      for(let ele of this.users) {
          if(ele.name == user.name) {
              res.status(200).json('user already exist');
              return;
          }
      }
      this.user = user
      this.users.push(user)
      res.status(200).json('create success')
    }

    getUser(res, req) {
        if(!this.users) {
            this.users = []
        }
       res.status(200).json(this.users);
    }

    deleteUser(res, user) {
        this.users = this.users.filter(el => el.name !== user.name)
        res.status(200).json('delete success')
    }
 
    getRole() {
      return this.role ? this.role : '';
    }
 }
 
 module.exports = {User};