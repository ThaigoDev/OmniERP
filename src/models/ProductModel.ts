const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  un: { type: String, required: true },
  minInStock: { type: Number, required: true },
  maxInStock: { type: Number, required: true },
  costPrice: { type: String, required: true },
  salePrice: { type: String, required: true },
  supplierID: { type: Schema.Types.ObjectID, ref: "Suppliers" },
  supplierName: { type: String, required: true },
  productLacation: { type: String, required: true },
  storage: { type: String, required: true },
  productNumberInSlot: { type: String, required: true },
  productValidity: { type: String, required: true },
  productImage: { type: String, required: false },
  productLength: { type: String, required: false },
  productWeight: { type: String, required: false },
  productLengthWidth: { type: String, required: false },
  productLengthHeight: { type: String, required: false },
  productRegisterDate: { type: String, required: true },
  productUpdateDate: { type: String, required: true },
  status: { type: String, required: true },
  storageId: { type: Schema.Types.ObjectId, ref: "Storages" },
});

const ProductModel = mongoose.model("Products", ProductSchema);

class Product {
  public body: any;
  public erros: Array<string>;
  public product: any;
  constructor(body: any) {
    this.erros = [];
    this.body = body;
    this.product = null;
  }

  public async create(): Promise<any> {
    try {
      this.product = await ProductModel.create(this.body);
      return;
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async get(): Promise<any> {
    try {
      const products = await ProductModel.find();
      return products;
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async delete(id: string): Promise<any> {
    try {
      this.product = await ProductModel.findByIdAndDelete({ _id: id });
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async edit(id: string): Promise<any> {
    try {
      this.product = await ProductModel.findByIdAndUpdate(id, this.body);
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
module.exports = Product;
