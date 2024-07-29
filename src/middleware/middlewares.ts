exports.middlewaresGlobal = (req:any,res:any,next:any) => {
    res.locals.erros = req.flash("erros"); 
    res.locals.success = req.flash("success");   
    res.locals.user = req.session.user;
    next(); 


}  