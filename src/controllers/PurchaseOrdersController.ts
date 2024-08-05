const ProductModel = require("../models/ProductModel");
const PurchaseOrdersRules = require("../models/PurchaseOrdersModel");
const SupplierRules = require("../models/SupplierModel");

abstract class PurchaseOrdersController {
  public static async index(req: any, res: any) {
    const productModel = new ProductModel(req.body); 
    const OrdersRules = new  PurchaseOrdersRules(req.body); 
    const supplierRules = new SupplierRules(req.body);
    const allProducts = await productModel.get();
    const suppliersAndProducts = await supplierRules.getSuppliersAndProducts(); 
    const allOrders = await OrdersRules.getCompleteOrders(); 
    console.log(allOrders);
    res.render("PurchaseOrders", { allProducts, suppliersAndProducts,allOrders });
  }
  public static async create(req: any, res: any) {    
    try {
      let body: object = {};
      body = {
        supplierID: req.body.supplierID, 
        responsible: req.session.user.name, 
        paymentMethod: req.body.paymentMethod,
        productsID: req.body.productsID,
        quantities: req.body.quantities, 
        date: Date.now(), 
      };
      console.log(body);
      const purchaseRules = new PurchaseOrdersRules(body);
      await purchaseRules.create();
      res.redirect("back");
    } catch (e: any) {
      res.status(500).json({
        title: "Internal Server Error 500 !",
        status: "failed",
        error: e,
      });
    }
  } 
  public static async delete(req:any,res:any) : Promise<any> {
    try {
      const purchaseRules = new PurchaseOrdersRules(req.body); 
      await  purchaseRules.delete(req.params.id); 
      res.redirect("back"); 
    }catch(e:any) {
      res.status(500).json({
        title: "Internal Server Error 500 !",
        status: "failed",
        error: e,
      });
    }
  }
}

module.exports = PurchaseOrdersController;
