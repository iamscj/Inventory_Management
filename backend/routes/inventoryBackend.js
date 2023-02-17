const express = require('express');
const router = express.Router();
const inventoryBackend = require('../services/inventoryBackend');
const multer = require('multer');
var fs = require('fs');
const upload = multer({ dest: 'reports_for_warranty_claim/' });

router.get('/test', async function (req, res, next) {
    console.log('Received GET @ /test');
    try {
        res.json(await inventoryBackend.testDB(req.query.email));
    } catch (err) {
        res.status(400).json(`${err}`);
    }
});

router.get('/getuser', async function (req, res, next) {
    console.log('Received GET @ /getuser');
    try {
        res.json(await inventoryBackend.getuser(req.query.email));
    } catch (err) {
        console.error(`Error while getting messages : `, err.message);removeEmployee
        next(err);
    }
});

router.get('/getrequestemployeedetails', async function (req, res, next) {
    console.log('Received GET @ /getrequestemployeedetails');
    try {
        res.json(await inventoryBackend.getrequestemployeedetails(req.query.email));
    } catch (err) {
        console.error(`Error while getting messages : `, err.message);
        next(err);
    }
});

router.get('/getAllEmployees', async function (req, res, next) {
    console.log('Received GET @ /getAllEmployees');
    try {
        res.json(await inventoryBackend.getAllEmployees(req.query.email));
    } catch (err) {
        console.error(`Error while getting messages : `, err.message);
        next(err);
    }
});

router.get('/getAllUsers', async function (req, res, next) {
    console.log('Received GET @ /getAllUsers');
    try {
        res.json(await inventoryBackend.getAllUsers());
    } catch (err) {
        console.error(`Error while getting messages : `, err.message);
        next(err);
    }
});

router.post('/addEmployee', async function (req, res, next) {
    console.log('Received POST @ /addEmployee');
    try {
        res.json(await inventoryBackend.addEmployee(req.body.userid));
    } catch (err) {
        console.error(`Error while adding employee : `, err.message);
        next(err);
    }
});

router.post('/removeEmployee', async function (req, res, next) {
    console.log('Received POST @ /removeEmployee');
    try {
        res.json(await inventoryBackend.removeEmployee(req.body.userid));
    } catch (err) {
        console.error(`Error while adding employee : `, err.message);
        next(err);
    }
});

router.post('/removerequestemployee', async function (req, res, next) {
    console.log('Received POST @ /removerequestemployee');
    try {
        res.json(await inventoryBackend.removeRequestEmployee(req.body.userid));
    } catch (err) {
        console.error(`Error while adding employee : `, err.message);
        next(err);
    }
});

router.post('/register', async function (req, res, next) {
    console.log('Received POST @ /register');
    try {
        res.json(await inventoryBackend.register(req));
    } catch (err) {
        res.status(400).json(`${err}`);
    }
});

router.get('/login', async function (req, res, next) {
    console.log('Received GET @ /login');
    try {
        res.json(await inventoryBackend.login(req));
    } catch (err) {
        res.status(400).json(`${err}`);
    }
});

router.get('/panel-definition', async function (req, res, next) {
    console.log('Received GET @ /panel-definition');
    try {
        res.json(await inventoryBackend.getPanelDefinition(req));
    } catch (err) {
        res.status(400).json(`${err}`);
    }
});

router.get('/order-history', async function (req, res, next) {
    console.log('Received GET @ /order-history');
    try {
        res.json(await inventoryBackend.getOrderHistory(req));
    } catch (err) {
        res.status(400).json(`${err}`);
    }
});

router.get('/panels-in-order', async function (req, res, next) {
    console.log('Received GET @ /panels-in-order');
    try {
        res.json(await inventoryBackend.getPanelsInOrder(req));
    } catch (err) {
        res.status(400).json(`${err}`);
    }
});

router.get('/modules-in-panel', async function (req, res, next) {
    console.log('Received GET @ /modules-in-panel');
    try {
        res.json(await inventoryBackend.getModulesInPanel(req));
    } catch (err) {
        res.status(400).json(`${err}`);
    }
});

router.post('/panel-definition', async function (req, res, next) {
    console.log('Received POST @ /panel-definition');
    try {
        res.json(await inventoryBackend.setPanelDefinition(req));
    } catch (err) {
        res.status(400).json(`${err}`);
    }
});

router.post('/update-cart', async function (req, res, next) {
    console.log('Received POST @ /update-cart');
    try {
        res.json(await inventoryBackend.updateCart(req));
    } catch (err) {
        res.status(400).json(`${err}`);
    }
});

router.get('/get-cart', async function (req, res, next) {
    console.log('Received GET @ /get-cart');
    try {
        res.json(await inventoryBackend.getCustomerCart(req));
    } catch (err) {
        res.status(400).json(`${err}`);
    }
});

router.get('/user-id', async function (req, res, next) {
    console.log('Received GET @ /user-id');
    try {
        res.json(await inventoryBackend.getUserID(req));
    } catch (err) {
        res.status(400).json(`${err}`);
    }
});

router.get('/warranty', async function (req, res, next) {
    console.log('Received GET @ /warranty');
    try {
        res.json(await inventoryBackend.getWarranty(req));
    } catch (err) {
        res.status(400).json(`${err}`);
    }
});

router.get('/request-history', async function (req, res, next) {
    console.log('Received GET @ /request-history');
    try {
        res.json(await inventoryBackend.getRequestHistory(req));
    } catch (err) {
        res.status(400).json(`${err}`);
    }
});

router.post('/updateprofile', async function (req, res, next) {
    console.log('Received POST @ /updateprofile');
    try {
        res.json(await inventoryBackend.updateuser(req));
    } catch (err) {
        console.error(`Error while registering customer : `, err.message);
        next(err);
    }
});

router.post('/request-for-employee', async function (req, res, next) {
    console.log('Received POST @ /removeEmployee');
    try {
        res.json(await inventoryBackend.requestforemployee(req));
    } catch (err) {
        console.error(`Error while registering customer : `, err.message);
        next(err);
    }
});

router.post('/warranty', async function (req, res, next) {
    console.log('Received POST @ /warranty');
    try {
        res.json(await inventoryBackend.setWarranty(req));
    } catch (err) {
        res.status(400).json(`${err}`);
    }
});

router.post('/add-module', async function (req, res, next) {
    console.log('Received POST @ /add-module');
    try {
        res.json(await inventoryBackend.addModule(req));
    } catch (err) {
        res.status(400).json(`${err}`);
    }
});

router.post('/new-order', async function (req, res, next) {
    console.log('Received POST @ /new-order');
    try {
        res.json(await inventoryBackend.newOrder(req));
    } catch (err) {
        res.status(400).json(`${err}`);
    }
});

router.post('/add-panel', async function (req, res, next) {
    console.log('Received POST @ /add-panel');
    try {
        res.json(await inventoryBackend.addPanel(req));
    } catch (err) {
        res.status(400).json(`${err}`);
    }
});

router.get('/module-stock', async function (req, res, next) {
    console.log('Received GET @ /module-stock');
    try {
        res.json(await inventoryBackend.currentModuleStock(req));
    } catch (err) {
        res.status(400).json(`${err}`);
    }
});

router.get('/validate-requests', async function (req, res, next) {
    console.log('Received GET @ /validate-requests');
    try {
        res.json(await inventoryBackend.getPendingRequests(req));
    } catch (err) {
        res.status(400).json(`${err}`);
    }
});

router.post('/validate-requests', async function (req, res, next) {
    console.log('Received POST @ /validate-requests');
    try {
        res.json(await inventoryBackend.updateRequestStatus(req));
    } catch (err) {
        res.status(400).json(`${err}`);
    }
});

router.get('/warranty-report', async function (req, res, next) {
    console.log('Received GET @ /warranty-report');
    try {
        let file = req.query.fileName;
        file = 'reports_for_warranty_claim/' + file;
        res.sendFile(file, { root: '.' });
    } catch (err) {
        res.status(400).json(`${err}`);
    }
});

router.get('/panel-stock', async function (req, res, next) {
    console.log('Received GET @ /panel-stock');
    try {
        res.json(await inventoryBackend.getPanelStock());
    } catch (err) {
        res.status(400).json(`${err}`);
    }
});

router.post('/upload-report', upload.single('file'), async (req, res) => {
    console.log('Received POST @ /upload-report');
    var currentdate = new Date();
    let dd = currentdate.getDate().toString();
    let mm = (currentdate.getMonth() + 1).toString();
    let yy = currentdate.getFullYear().toString();
    if (dd.length === 1) dd = '0' + dd;
    if (mm.length === 1) mm = '0' + mm;
    let date = yy + mm + dd;
    let generatedName = 'reports_for_warranty_claim/' + req.file.filename;
    var names = req.file.originalname.split('|');
    let moduleID = parseInt(names[0]);
    let customerID = names[1];
    try {
        let assignedName = await inventoryBackend.addRequest(moduleID, customerID, names[2], date);
        assignedName = 'reports_for_warranty_claim/' + assignedName;
        fs.renameSync(generatedName, assignedName);
        res.json(`Received report`);
    } catch (err) {
        fs.unlinkSync(generatedName);
        res.status(400).json(`${err}`);
    }
});


module.exports = router;