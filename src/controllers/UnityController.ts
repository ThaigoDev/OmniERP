const Unity =  require("../models/UnityModel"); 
abstract class UnityController {
    public static async create(req:any, res:any) {
        const UnityModel = new Unity(req.body); 
        await  UnityModel.create(); 
       res.redirect("back")
    }     
    public static async delete(req:any,res:any) {
        const UnityModel = new Unity(req.body); 
        await  UnityModel.delete(req.params.id); 
        res.redirect("back");  
    } 
    public static async get(req:any,res:any) {
        const UnityModel = new Unity(req.body);  
        const unities = await  UnityModel.get(); 

    }
} 
module.exports = UnityController; 
