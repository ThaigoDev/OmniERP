const Category = require("../models/CategoryModel");
const StorageModel = require("../models/StorageModel");
const ProductModel = require("../models/ProductModel");
const Unity = require("../models/UnityModel");

abstract class StorageController {
  public static async index(req: any, res: any): Promise<any> {
    try {
      const productModel = new ProductModel(req.body);
      const UnityModel = new Unity(req.body);
      const category = new Category(req.body);
      const categories = await category.get();
      const storageRules = new StorageModel(req.body);
      const allStorages = await storageRules.get();
      const StoragesAndProducts =
      await storageRules.getAllStoragesAndProducts();
      const allProducts = await productModel.get();
      const unities = await UnityModel.get(); 
      
      res.render("StorageLocalsPage", {
        categories,
        allStorages,
        allProducts,
        unities,
        StoragesAndProducts,
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
      let body = {};
      if (req.file) {
        body = { ...req.body, layout: req.file.filename };
      } else {
        body = { ...req.body };
      }
      const storageRules = new StorageModel(body);
      await storageRules.create();
      if (storageRules.erros.length > 0) {
        req.flash("erros", storageRules.erros);
        res.redirect("back");
      }
      res.redirect("back");
    } catch (e: any) {
      res.status(500).json({
        title: "Internal Server Error 500 !",
        status: "failed",
        error: e,
      });
    }
  }
  public static async get(req: any, res: any): Promise<any> {
    try {
      const storageRules = new StorageModel(req.body);
      const allStorages = await storageRules.get();
      return allStorages;
    } catch (e: any) {
      res.status(500).json({
        title: "Internal Server Error 500 !",
        status: "failed",
        error: e,
      });
    }
  }
  public static async delete(req: any, res: any): Promise<any> {
    try {
      const storageRules = new StorageModel(req.body);
      await storageRules.delete(req.params.id);
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
      let body = {};
      if (req.file) {
        body = { ...req.body, layout: req.file.filename };
      } else {
        body = { ...req.body };
      }
      const storageRules = new StorageModel(body);
      await storageRules.edit(req.params.id);
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

module.exports = StorageController;
