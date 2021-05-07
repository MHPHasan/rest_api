const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {

    try {
        console.log('first');
        
        let token = req.headers.authorization.split(' ')[1]
        console.log('Second');
        let decode = jwt.verify(token, 'Adhara');
        console.log('Third');

        req.user = decode;
        next();

    } catch(err) {
        res.json({
            Message: 'Authentication Failed!'
        })
    }

}

module.exports = authenticate;