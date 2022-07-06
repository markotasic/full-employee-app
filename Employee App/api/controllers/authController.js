const authService = require('../services/authServices');

class AuthController {
    async logIn(req, res) {
        try{
            const result = await authService.logIn(req.body);
            res.send(result);
        } catch(error) {
            // next(error)
            res.status(400).send(error.message)
        }
    }
}

module.exports = new AuthController;