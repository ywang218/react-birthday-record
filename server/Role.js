class Role {
    constructor(roles) {
      this.roles = roles;
      this.role = ''
    }
 
    createRole(res, role) {
        this.roles = this.roles ? this.roles : [];
        if(!role || !role.role || role.role == {}) {
            res.status(500).json('invalid input')
        }
        this.role = role.role;
        if(!this.roles.includes(role.role)) {
            this.roles.push(role.role);
        }
        res.status(200).json('create success')
    }

    getAllRoles(res) {
        this.roles = this.roles ? this.roles : [];
        if(!Array.isArray(this.roles)) {
            res.status(500).json("roles not valid")
        }
        res.status(200).json(this.roles);
    }

 }
 
 module.exports = {Role};