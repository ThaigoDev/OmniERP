const mongoose = require("mongoose");

const SupplierSchema = mongoose.Schema({
  supplierPhoto: { type: String, required: false },
  name: { type: String, required: true },
  tel: { type: String, required: true },
  email: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String, required: false },
  paymentMethod: { type: String, required: true },
});

const SupplierModel = mongoose.model("Suppliers", SupplierSchema);

class SupplierRules {
  public body: any;
  public errors: Array<string>;
  public supplier: any;
  constructor(body: any) {
    this.body = body;
    this.errors = [];
    this.supplier = null;
  }
  public async create(): Promise<any> {
    try {
      this.supplier = await SupplierModel.create(this.body);
      return;
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async get(): Promise<any> {
    try {
      const suppliers = await SupplierModel.find();
      return suppliers;
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async delete(id: string): Promise<any> {
    try {
      this.supplier = await SupplierModel.findByIdAndDelete({ _id: id });
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async edit(id: string): Promise<any> {
    try {
      this.supplier = await SupplierModel.findByIdAndUpdate(id, this.body);
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async getByName(name: string): Promise<any> {
    try {
      const suppliderFinded = await SupplierModel.findOne({ name: name });
      return suppliderFinded;
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async getSuppliersAndProducts(): Promise<any> {
    const suppliersAndProducts = SupplierModel.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "supplierID",
          as: "products",
        },
      },
    ]);
    return suppliersAndProducts;
  }
}

module.exports = SupplierRules;
