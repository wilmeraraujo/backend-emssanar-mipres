const handleHttpError = (res,message = 'Error', code = 403) => {
    res.status(code);
    res.send({error: message});
}

module.exports = { handleHttpError };