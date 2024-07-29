const mongoose = require("mongoose");

const StorageSchema = mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String, required: true },
  capacity: { type: Number, required: true },
  un: { type: String, required: true },
  location: { type: String, required: true },
  layout: { type: String, required: false },
  date: { type: String, required: false },
  lastUpdate: { type: String, required: false },
});

const StorageModel = mongoose.model("Storages", StorageSchema);

class StorageRules {
  public body: any;
  public erros: Array<string>;
  public storage: any;
  constructor(body: any) {
    this.body = body;
    this.erros = [];
    this.storage = null;
  }
  public async create(): Promise<any> {
    try {
      this.storage = await StorageModel.create(this.body);
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async get(): Promise<any> {
    try {
      const allStorages = await StorageModel.find();
      return allStorages;
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async delete(id: string): Promise<any> {
    try {
      this.storage = await StorageModel.findByIdAndDelete(id);
      return;
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async edit(id: string): Promise<any> {
    try {
      this.storage = await StorageModel.findByIdAndUpdate(id, this.body);
      return;
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async findByName(name: string): Promise<any> {
    try {
      const storage = await StorageModel.findOne({ name: name });
      return storage;
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async statusListen(products: Array<any>): Promise<any> {
    try {
      const storagesUpdated = await StorageModel.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "storageId",
            as: "productsOnStorage",
          },
        },
        {
          $unwind: "$productsOnStorage",
        },
        {
          $group: {
            _id: "$productsOnStorage.storage",
            capacity: { $sum: "$capacity" },
            quantity: {
              $sum: "$productsOnStorage.quantity",
            },
            totalQuantity: {
              $sum: "$productsOnStorage.quantity",
            },
          },
        },
        {
          $project: {
            capacity: 1,
            quantity: 1,
            capacityUpdated: {
              $subtract: ["$capacity", "$quantity"],
            },
          },
        },
      ]);
      return storagesUpdated;
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async getAllStoragesAndProducts(): Promise<any> {
    try {
      const StoragesAndProducts = await StorageModel.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "storageId",
            as: "productsOnStorage",
          },
        },
      ]);
      return StoragesAndProducts;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

module.exports = StorageRules;
