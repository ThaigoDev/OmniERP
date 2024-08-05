const SupplierRules = require("../models/SupplierModel");
abstract class SupplierController {

  public static async index(req: any, res: any): Promise<any> {
    const supplierRules = new SupplierRules(req.body);
    const suppliers = await supplierRules.get();
    const suppliersAndProducts = await supplierRules.getSuppliersAndProducts();
    console.log(suppliersAndProducts);
    res.render("SupplierPage", { suppliers, suppliersAndProducts });
  }
  public static async create(req: any, res: any): Promise<any> {
    try {
      let body: any = {};
      if (req.file) {
        body = { ...req.body, supplierPhoto: req.file.filename };
      } else {
        body = { ...req.body };
      }
      const supplierRules = new SupplierRules(body);
      await supplierRules.create();
      res.redirect("back");
    } catch (e: any) {
      res.status(500).json({
        title: "Internal Server Error 500 !",
        status: "failed",
        error: e.message,
      });
    }
  }
  public static async delete(req: any, res: any): Promise<any> {
    try {
      console.log(req.body);
      const supplierRules = new SupplierRules(req.body);
      await supplierRules.delete(req.params.id);
      res.redirect("back");
    } catch (e: any) {
      res.status(500).json({
        title: "Internal Server Error 500 !",
        status: "failed",
        error: e.message,
      });
    }
  }
  public static async edit(req: any, res: any): Promise<any> {
    try {
      let body: any = {};
      if (req.file) {
        body = { ...req.body, supplierPhoto: req.file.filename };
      } else {
        body = { ...req.body };
      }
      const supplierRules = new SupplierRules(body);
      await supplierRules.edit(req.params.id);
      res.redirect("back");
    } catch (e: any) {
      res.status(500).json({
        title: "Internal Server Error 500 !",
        status: "failed",
        error: e.message,
      });
    }
  }
  
}

module.exports = SupplierController;
