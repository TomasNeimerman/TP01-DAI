import DecryptToken from "./encriptartoken.js";

export default function authorization(req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).send('forbidden');
    } else {
        const token = req.headers.authorization.split(' ')[1];
        DecryptToken(token)
            .then(payload => {
                if (payload != null) {
                    req.user = payload; 
                    next();
                } else {
                    res.status(401).send("Error con el Token");
                }
            })
            .catch(error => {
                console.error("error:", error);
                res.status(401).send("token error");
            });
    }
}