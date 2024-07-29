import LoginAndSigUpIn from "../interfaces/LoginAndSignUp.interface";
const mongoose = require("mongoose");
const validator = require("validator");
const LoginAndSigUpSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmedPassword: { type: String, required: true },
  userPhoto: { type: String, required: false },
  office: { type: String, required: true },
  status: { type: String, required: true },
});
const LoginAndSignUpModel = mongoose.model("Accounts", LoginAndSigUpSchema);

class LoginAndSignUp implements LoginAndSigUpIn {
  public body: any;
  public erros: Array<string>;
  public user: any;
  constructor(body: any) {
    this.body = body;
    this.erros = [];
    this.user = null;
  }

  public async register(): Promise<any> {
    try {
      this.validations();
      const user = await this.findUserBy();
      if (user) {
        this.erros.push("Já possui uma conta com esse E-mail!");
      }
      if (this.body.password !== this.body.confirmedPassword) {
        this.erros.push("Confirme sua senha !");
        return;
      }
      if (this.erros.length === 0) {
        this.user = await LoginAndSignUpModel.create(this.body);
        return;
      }
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async login(): Promise<any> {
    try {
      this.user = await this.findUserBy();
      if (!this.user) {
        this.erros.push("Usuário não existe !");
        return;
      }
      if (this.user.password !== this.body.password) {
        this.erros.push("Senha incorreta !");
        return;
      }
    } catch (e: any) {
      throw new Error(e);
    }
  }
  public async validations() {
    if (!validator.isEmail(this.body.email)) {
      this.erros.push("E-mail Inválido !");
      return;
    }
    if (this.body.password.length < 3) {
      this.erros.push("Senha incorreta !");
    }
  }
  public async findUserBy(): Promise<any> {
    try {
      const user = await LoginAndSignUpModel.findOne({
        email: this.body.email,
      });
      return user;
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
module.exports = LoginAndSignUp;
