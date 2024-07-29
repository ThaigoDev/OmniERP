const mongoose = require("mongoose");

const UnitySchema = mongoose.Schema({
  name: { type: String, required: true },
});

const UnityModel = mongoose.model("Unities", UnitySchema);

class Unity {
  public body: any;
  public erros: Array<string>;
  public unity: any;
  constructor(body: any) {
    this.body = body;
    this.erros = [];
    this.unity = null;
  }
  public async get(): Promise<any> {
    try {
      const categories = await UnityModel.find();
      return categories;
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async create(): Promise<any> {
    try {
      this.unity = await UnityModel.create(this.body);
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async delete(id: string) {
    try {
      this.unity = await UnityModel.findByIdAndDelete({ _id: id });
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

module.exports = Unity;
