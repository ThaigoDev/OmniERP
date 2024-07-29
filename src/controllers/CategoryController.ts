const Category = require("../models/CategoryModel");
abstract class CategoryController {
  public static async create(req: any, res: any): Promise<any> {
    try {
      const CategoryModel = new Category(req.body);
      await CategoryModel.create();
      res.redirect("back");
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
      const CategoryModel = new Category(req.body);
      await CategoryModel.delete(req.params.id);
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
      const CategoryModel = new Category(req.body);
      const categories = await CategoryModel.get();
    } catch (e: any) {
      res.status(500).json({
        title: "Internal Server Error 500 !",
        status: "failed",
        error: e,
      });
    }
  }
}
module.exports = CategoryController;
