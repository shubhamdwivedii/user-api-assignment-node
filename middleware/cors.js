
function cors(req, res, next) {
    //console.log(res);
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, PATCH');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-auth-token');
    next();
}

module.exports = cors;