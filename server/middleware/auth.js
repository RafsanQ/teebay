import jwt from 'jsonwebtoken';

const isAuthorised = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if(!authHeader){
        req.isAuth = false;
        return next();
    }

    const token = authHeader.split(' ')[1]
    if(!token || token === ' ') {
        req.isAuth = false;
        return next();
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'veryHardToGuessString')
    } catch (error) {
        console.error(error);
        req.isAuth = false;
        return next();
    }
    if(!decodedToken){
        req.isAuth = false;
        return next();
    }
    req.isAuth = true;
    req.userId = decodedToken.userId;
    next();
}

export default isAuthorised;