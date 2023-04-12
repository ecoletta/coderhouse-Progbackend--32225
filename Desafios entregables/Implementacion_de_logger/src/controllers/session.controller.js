import sessionValidator from '../validators/session.validator.js';

class sessionController {
    redirectProfile(req, res) {
        req.session.user = req.user;
        res.redirect('/profile')
    }

    logoutSession(req, res) {
        req.session.destroy();
        res.redirect('/login')
    }

    async jwtCheck(req, res) {
        try {
            const user = req.user;
            res.json({ user });
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    async createUser(req, res) {
        await sessionValidator.createUser(req, res)
    }

    async loginUser(req, res) {
        await sessionValidator.loginUser(req, res)
    }
}

export default new sessionController();