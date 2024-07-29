export default interface LoginAndSigUpIn {
  body: any;
  erros: Array<string>;
  user: any;
  register(): Promise<any>;
  login(): Promise<any>;
  findUserBy(): Promise<any>;
  validations(): any;
}
