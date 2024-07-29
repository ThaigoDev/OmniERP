const ProductModel = require("../models/ProductModel");
const Category = require("../models/CategoryModel");
const Unity = require("../models/UnityModel");
const StorageModel = require("../models/StorageModel");
const SupplierRules = require("../models/SupplierModel");

abstract class InventoryController {
  public static async index(req: any, res: any): Promise<any> {
    try {
      const productModel = new ProductModel(req.body);
      const storageRules = new StorageModel(req.body);
      const supplierRules = new SupplierRules(req.body);
      const suppliers = await supplierRules.get();
      const products = await productModel.get();
      const CategoryModel = new Category(req.body);
      const categories = await CategoryModel.get();
      const UnityModel = new Unity(req.body);
      const unities = await UnityModel.get();
      const storages = await storageRules.get();

      res.render("Inventory", {
        products,
        categories,
        unities,
        storages,
        suppliers,
      });
    } catch (e: any) {
      res.status(500).json({
        title: "Internal Server Error 500 !",
        status: "failed",
        error: e,
      });
    }
  }
  public static async create(req: any, res: any): Promise<any> {
    try {
      const storageRules = new StorageModel(req.body);
      const supplierRules = new SupplierRules(req.body);
      const supplierFinded = await supplierRules.getByName(
        req.body.supplierName
      );
      const storage = await storageRules.findByName(req.body.storage);
      req.body.storageId = storage.id;
      req.body.supplierID = supplierFinded.id;
      let body: object = {};

      if (!req.file) {
        body = { ...req.body };
      } else {
        body = { ...req.body, productImage: req.file.filename };
      }
      const productModel = new ProductModel(body);
      await productModel.create();
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
      const productModel = new ProductModel(req.body);
      await productModel.delete(req.params.id);
      res.redirect("back");
    } catch (e: any) {
      res.status(500).json({
        title: "Internal Server Error 500 !",
        status: "failed",
        error: e,
      });
    }
  }
  public static async edit(req: any, res: any): Promise<any> {
    try {
      if (req.body.supplierName) {
        const supplierRules = new SupplierRules(req.body);
        const supplierFinded = await supplierRules.getByName(
          req.body.supplierName
        );
        req.body.supplierID = supplierFinded.id;
      }
      if (req.body.storage) {
        const storageRules = new StorageModel(req.body);
        const storage = await storageRules.findByName(req.body.storage);
        req.body.storageId = storage.id;
      }

      let body: object = {};
      if (!req.file) {
        body = { ...req.body };
      } else {
        body = { ...req.body, productImage: req.file.filename };
      }
      const productModel = new ProductModel(body);
      await productModel.edit(req.params.id);
      res.redirect("back");
    } catch (e: any) {
      res.status(500).json({
        title: "Internal Server Error 500 !",
        status: "failed",
        error: e,
      });
    }
  }
}
module.exports = InventoryController;
