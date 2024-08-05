const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PurchaseOrdersSchema = mongoose.Schema({
  supplierID: { type: Schema.Types.ObjectId, ref: "Suppliers" }, 
  responsible: {type:String, required:true}, 
  paymentMethod: { type: String, required: true },
  productsID:  [{ type: Schema.Types.ObjectId, ref: "Products" }],
  quantities: [{ type: Number, required: false }], 
  date: { type: Date, dafault: Date.now },
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
  public async  getCompleteOrders() {
    try{
      const AllOrders =   await PurchaseOrdersModel.aggregate(
        [ 
          {
         $lookup: {
           from: "suppliers",
           localField: "supplierID",
           foreignField: "_id",
           as: "supplier"
         }
       },
       {
         $lookup: {
           from: "products",
           localField: "productsID",
           foreignField: "_id",
           as: "products"
         }
       }
     ]
      ) 
    return AllOrders; 

    }catch(e:any) {
      throw new Error(e); 
    } 
  } 
  public async delete(id:string): Promise<any> {
    try{
    this.Orders = await PurchaseOrdersModel.findByIdAndDelete({_id:id}); 
    }catch(e:any)  {
      throw new Error(e); 
    }
  }
}
module.exports = PurchaseOrdersRules;
