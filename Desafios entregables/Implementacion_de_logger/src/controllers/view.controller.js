class viewController {
    getIndex(req, res) {
        const isSession = req.session.user ? false : true;
        res.render('index', {
            title: 'Home',
            message: req.flash("success"),
            isSession
        });
    }

    getRegister(req, res) {
        res.render('register', { title: "Formulario de Registro - Nuevo usuario", error: req.flash('error') })
    }

    getLogin(req, res) {
        if (req.session.user) {
            return res.redirect('/profile');
        }
        res.render('login', { title: 'Ingreso a Ecommerce', message: req.flash('message') });
    }

    getProfile(req, res) {
        if (!req.session.user) {
            req.flash('message', "Requiere inicio de sesion para continuar");
            return res.redirect('/login');
        }
        res.render('profile', { title: 'Profile', user: req.session.user, message: req.flash('success') })
    }
}

export default new viewController();