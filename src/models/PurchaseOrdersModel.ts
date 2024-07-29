const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PurchaseOrdersSchema = mongoose.Schema({
  supplierID: { type: Schema.Types.ObjectId, ref: "Suppliers" },
  date: { type: Date, dafault: Date.now },
  paymentMethod: { type: String, required: true },
  itens: [
    {
      productID: { type: Schema.Types.ObjectId, ref: "Products" },
      quantity: { type: Number, required: false },
    },
  ],
});
const PurchaseOrdersModel = mongoose.model(
  "PurchaseOders",
  PurchaseOrdersSchema
);
class PurchaseOrdersRules {
  public body: any;
  public errors: Array<string>;
  public Orders: any;
  constructor(body: any) {
    this.body = body;
    this.errors = [];
    this.Orders = null;
  }
  public async create() {
    try {
      this.Orders = await PurchaseOrdersModel.create(this.body);
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
module.exports = PurchaseOrdersRules;
