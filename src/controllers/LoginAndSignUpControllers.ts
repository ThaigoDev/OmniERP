const LoginAndSignUp = require("../models/LoginAndSignupModel");
abstract class LoginAndSignUpController {
  public static async index(req: any, res: any): Promise<any> {
    try {
      if (req.session.user) res.redirect("/inventory/index");
      res.render("Login");
    } catch (e: any) {
      res.status(500).json({
        title: "Internal Server Error 500 !",
        status: "failed",
        error: e,
      });
    }
  }
  public static async indexRegister(req: any, res: any) {
    try {
      res.render("Register");
    } catch (e: any) {
      res.status(500).json({
        title: "Internal Server Error 500 !",
        status: "failed",
        error: e,
      });
    }
  }
  public static async auth(req: any, res: any) {
    try {
      const loginAndSignUpModel = new LoginAndSignUp(req.body);
      await loginAndSignUpModel.login();
      if (loginAndSignUpModel.erros.length > 0) {
        req.flash("erros", loginAndSignUpModel.erros);
        res.redirect("back");
      } else {
        req.session.user = loginAndSignUpModel.user;
        res.redirect("/inventory/index");
      }
    } catch (e: any) {
      res.status(500).json({
        title: "Internal Server Error 500 !",
        status: "failed",
        error: e.message,
      });
    }
  }
  public static async createAccount(req: any, res: any) {
    try {
      req.body.office = "Colaborador";
      req.body.status = "Inautorizado";

      const loginAndSignUpModel = new LoginAndSignUp(req.body);
      await loginAndSignUpModel.register();
      if (loginAndSignUpModel.erros.length > 0) {
        req.flash("erros", loginAndSignUpModel.erros);
        res.redirect("back");
      } else {
        req.flash("success", "Conta criada com sucesso !");
        res.redirect("/");
      }
    } catch (e: any) {
      res.status(500).json({
        title: "Internal Server Error 500 !",
        status: "failed",
        error: e,
      });
    }
  }
  public static async logout(req: any, res: any): Promise<any> {
    try {
      req.session.destroy();
      res.redirect("/");
    } catch (e: any) {
      res.status(500).json({
        title: "Internal Server Error 500 !",
        status: "failed",
        error: e,
      });
    }
  }
}

module.exports = LoginAndSignUpController;
