const protectedRoute = (req, res, next) =>
{
    res.status(200).json({success:true, data:["this is protected route data"], message:`This is a jwt protected route`})
}
module.exports = protectedRoute