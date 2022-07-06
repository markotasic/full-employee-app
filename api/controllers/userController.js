const userService = require('../services/userServices');
class UserController {
    async getUser(req, res) {
        try{
            console.log(req.params.id)
            const result = await userService.getUser(req.params.id);
            res.send(result);
        } catch(error) {
            res.status(404).send(error.message)
        }
    }

    async postUser(req, res) {
        try{
            console.log(req.body, req.files)
            const result = await userService.postUser(req.body, req.files);
            res.send(result);
        } catch(error) {
            res.status(400).send(error.message)
        }
    }

    async patchUser(req, res) {
        try{
            const result = await userService.patchUser(req.params.id, req.body, req.files);
            res.send(result);
        } catch(error) {
            res.status(400).send(error.message)
        }
    }

    async deleteUser(req, res) {
        try{
            const result = await userService.deleteUser(req.params.id);
            res.send(result);
        } catch(error) {
            res.status(404).send(error.message)
        }
    }

    async getUsers(req, res) {
        try{
            // console.log('I got In')
            const result = await userService.getUsers();
            res.send(result);
        } catch(error) {
            res.status(404).send(error.message)
        }
    }
}

module.exports = new UserController();