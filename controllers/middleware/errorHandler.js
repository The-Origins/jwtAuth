const errorHandler = (err, req, res, next) =>
{
    if(err)
    {
        res.send(`Error: ${err}`)
    }
    next()
}
module.exports = errorHandler