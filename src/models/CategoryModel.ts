const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  name: { type: String, required: true },
});

const CategoryModel = mongoose.model("Categories", CategorySchema);

class Category {
  public body: any;
  public erros: Array<string>;
  public category: any;
  constructor(body: any) {
    this.body = body;
    this.erros = [];
    this.category = null;
  }
  public async get(): Promise<any> {
    try {
      const categories = await CategoryModel.find();
      return categories;
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async create(): Promise<any> {
    try {
      this.category = await CategoryModel.create(this.body);
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async delete(id: string) {
    try {
      this.category = await CategoryModel.findByIdAndDelete({ _id: id });
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

module.exports = Category;
