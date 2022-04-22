const catchAsync = function(fun){
    const temp = function(req, res, next){
        fun(req, res, next).catch((err)=>{next(err)})
    }
    return temp
}
module.exports = catchAsync