const LoginAndSignUpController = require("./src/controllers/LoginAndSignUpControllers");
const InventoryController = require("./src/controllers/InventoryController");
const CategoryController = require("./src/controllers/CategoryController");
const UnityController = require("./src/controllers/UnityController"); 
const StorageController = require("./src/controllers/StorageController"); 
const PurchaseOrdersController = require("./src/controllers/PurchaseOrdersController"); 
const SupplierController = require ("./src/controllers/SupplierController")
const express = require("express");
const multer = require("multer");
const multerConfig = require("./src/config/multerConfig");
const router = express.Router();
const uploads = multer(multerConfig);
//login routes
router.get("/", LoginAndSignUpController.index);
router.post("/auth", LoginAndSignUpController.auth);
router.get("/register", LoginAndSignUpController.indexRegister);
router.post("/createAccount", LoginAndSignUpController.createAccount);
router.get("/logout/",LoginAndSignUpController.logout)
//inventory routes
router.get("/inventory/index", InventoryController.index);
router.post("/inventory/create",uploads.single("productImage"), InventoryController.create);
router.get("/inventory/delete/:id", InventoryController.delete);
router.post("/inventory/edit/:id", uploads.single("productImageEdited"), InventoryController.edit);
//category routes
router.post("/category/create", CategoryController.create);
router.get("/category/delete/:id", CategoryController.delete);  
//unities router
router.post("/un/create/", UnityController.create);
router.get("/un/delete/:id", UnityController.delete); 
//storage routes
router.get("/storage/index/", StorageController.index);
router.post("/storage/create/",uploads.single("layout"),StorageController.create); 
router.get("/storage/delete/:id",StorageController.delete); 
router.post("/storage/edit/:id", uploads.single("layoutEdited"),StorageController.edit); 
//purchaseOrders routes 
router.get("/purchase/orders/index",PurchaseOrdersController.index);   
router.post("/purchase/orders/create",PurchaseOrdersController.create); 
router.get("/purchase/orders/delete/:id",PurchaseOrdersController.delete);   

//Supplier Routes 
router.get("/supplier/index",SupplierController.index) 
router.post("/supplier/create", uploads.single('supplierPhoto'),SupplierController.create)
router.get('/supplier/delete/:id',SupplierController.delete);  
router.post('/supplier/edit/:id',uploads.single('supplierPhotoEdited'),SupplierController.edit)
module.exports = router;
 