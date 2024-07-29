const ProductModel = require("../models/ProductModel");
const PurchaseOrdersRules = require("../models/PurchaseOrdersModel");
const SupplierRules = require("../models/SupplierModel");

abstract class PurchaseOrdersController {
  public static async index(req: any, res: any) {
    const productModel = new ProductModel(req.body);
    const supplierRules = new SupplierRules(req.body);
    const allProducts = await productModel.get();
    const suppliersAndProducts = await supplierRules.getSuppliersAndProducts();
    console.log(suppliersAndProducts);
    res.render("PurchaseOrders", { allProducts, suppliersAndProducts });
  }
  public static async create(req: any, res: any) {
    let itens = [];
    itens.push({ productID: req.body.productID, quantity: req.body.quantity });
    try {
      let body: object = {};
      body = {
        supplierID: req.body.supplierID,
        paymentMethod: req.body.paymentMethod,
        itens: itens,
      };
      console.log(body);
      res.send(body);
      /*
      const purchaseRules = new PurchaseOrdersRules(req.body);
      await purchaseRules.create();
      res.redirect("back"); */
    } catch (e: any) {
      res.status(500).json({
        title: "Internal Server Error 500 !",
        status: "failed",
        error: e,
      });
    }
  }
}

module.exports = PurchaseOrdersController;
