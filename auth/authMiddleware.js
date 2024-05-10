import DecryptToken from './jwt.js';
export function AuthMidleware(req, res, next){
    if(!req.headers.autorization){
        res.status(401).send('Forbiden')
    }else{
        const token = req.headers.autorization.split('')(1);
        const decryptedToken = DecryptToken(token);
        req.user = decryptedToken.payload;
    }
    next();
}