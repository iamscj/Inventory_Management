const db = require('./db');
const helper = require('../helper');
const { query } = require('express');

async function testDB(email) {
    const data = await db.query(
        `SELECT * FROM user where email='${email}'`
    );
    return data[0]
}

async function getuser(email) {
    const data = await db.query(
        `SELECT * FROM customer where customer_email='${email}'`
    );
    return data[0]
}

async function getrequestemployeedetails(email) {
    const data = await db.query(
        `SELECT * from requestforemployee`
    );
    return data
}

async function getAllEmployees(email) {
    const data = await db.query(
        `SELECT * from user WHERE privilege='employee'`
    );
    return data
}

async function getAllUsers() {
    const data = await db.query(
        `SELECT * from customer`
    );
    return data
}

async function getUserID(req) {
    let data = await db.query(`SELECT user_id FROM user where email='${req.query.email}'`);
    return data[0];
}

async function addEmployee(userId) {
    console.log(userId)
    let check = await db.query(
        `SELECT * from user WHERE user_id='${userId}'`
    );
    if (check.length === 0) return 'User does not exist';
    if (check[0].privilege === 'employee') return 'User already an employee';
    const data = await db.query(
        `UPDATE user SET privilege='employee' WHERE user_id='${userId}'`
    );
    check = await db.query(
        `Delete from requestforemployee WHERE customer_id='${userId}'`
    );
    check = await db.query(
        `SELECT * from user WHERE user_id='${userId}'`
    );
    if (check[0].privilege === 'employee') return 'Employee added successfully';
    return 'Operation Unsuccessful';
}

async function removeEmployee(userId) {
    const data = await db.query(
        `UPDATE user SET privilege='customer' WHERE user_id='${userId}'`
    );

    return 'Operation Successful';
}

async function removeRequestEmployee(userId) {
    let check = await db.query(
        `Delete from requestforemployee WHERE customer_id='${userId}'`
    );
    check = await db.query(
        `SELECT * from requestforemployee WHERE customer_id='${userId}'`
    );
    if (check.length === 0) return 'Request removed successfully';
    return 'Operation Unsuccessful';
}

async function register(req) {
    console.log(req.body);
    let check = await db.query(
        `SELECT * from user WHERE user_id='${req.body.userid}'`
    );
    if (check.length != 0) return 'UserID already taken';
    check = await db.query(
        `SELECT * from user WHERE email='${req.body.email}'`
    );
    if (check.length != 0) return 'Email already registered';
    let query = `INSERT INTO user VALUES('${req.body.userid}','${req.body.email}','${req.body.password}','customer')`;
    await db.query(
        query
    );
    check = await db.query(
        `SELECT * from user WHERE user_id='${req.body.userid}'`
    );
    if (check.length === 0) return 'Registration unsuccessful';
    query = `INSERT INTO customer VALUES(
        '${req.body.userid}','${req.body.fname}','${req.body.lname}',
        '${req.body.phoneno}','${req.body.email}','${req.body.address}'
    )`;
    await db.query(query);
    await db.query(`INSERT into cart_contents (customer_id) VALUES ('${req.body.userid}')`);
    return 'Registration successful';
}

async function login(req) {
    let check = await db.query(
        `SELECT * from user WHERE email='${req.query.email}'`
    );
    if (check.length === 0) return 'Email not registered';
    return ({
        password: `${check[0].password}`,
        privilege: `${check[0].privilege}`
    });
}

async function updateuser(req) {
    let check = await db.query(
        `SELECT * from user WHERE user_id='${req.body.userid}'`
    );
    if (check.length === 0) return 'User not Found';
    let query = `UPDATE user SET email='${req.body.email}', password='${req.body.password}'
                WHERE user_id='${req.body.userid}'`
    await db.query(
        query
    );
    query = `UPDATE customer SET customer_fname='${req.body.fname}', customer_lname='${req.body.lname}',
                customer_contact=${req.body.phoneno},customer_email='${req.body.email}',customer_address='${req.body.address}'
                WHERE customer_id='${req.body.userid}'`
    await db.query(
        query
    );
    return 'Updated User Successfully';
}

async function requestforemployee(req) {
    console.log(req.body.userid);
    let check = await db.query(
        `SELECT * from requestforemployee WHERE customer_id='${req.body.userid}'`
    );
    if (check.length !== 0) return "Already raised a request"
    check = await db.query(
        `INSERT into requestforemployee VALUES('${req.body.userid}')`
    );
    return "Successfully Raised the Request";
}

async function getPanelDefinition(req) {
    let query = `SELECT * FROM panel_definition WHERE panel_type=${req.body.panelNumber}`;
    let data = await db.query(query);
    return data[0];
}

async function setPanelDefinition(req) {
    let newDetails = JSON.stringify(req.body.module_details);
    let query = `UPDATE panel_definition SET module_details='${newDetails}' WHERE panel_type=${req.body.panelNumber}`;
    let data = await db.query(query);
    query = `SELECT module_details FROM panel_definition WHERE panel_type=${req.body.panelNumber}`;
    data = await db.query(query);
    if (data[0].module_details === newDetails) return 'Panel Definition Updated Successfully';
    throw 'Update Unsuccessful';
}

async function updateCart(req) {
    let customerID = req.body.customerID;
    let panelX = `panel${req.body.panelNumber}`;
    let newVal = req.body.quantity;
    if (newVal < 0) throw "Count cannot be negative";
    let query = `UPDATE cart_contents SET ${panelX}=${newVal} WHERE customer_id='${customerID}'`;
    await db.query(query);
    let data = await db.query(`SELECT ${panelX} from cart_contents WHERE customer_id='${customerID}'`);
    if (data[0][panelX] !== newVal) throw 'Update Unsuccessful';
    return 'Cart Updated';
}

async function getWarranty(req) {
    let query = `SELECT warranty_period FROM module_definition WHERE module_type='${req.body.moduleType}'`;
    let data = await db.query(query);
    return data[0].warranty_period;
}

async function setWarranty(req) {
    let newWarranty = req.body.newWarranty;
    let type = req.body.moduleType;
    let query = `UPDATE module_definition SET warranty_period=${newWarranty} WHERE module_type='${type}'`;
    let data = await db.query(query);
    query = `SELECT warranty_period FROM module_definition WHERE module_type='${req.body.moduleType}'`;
    data = await db.query(query);
    if (data[0].warranty_period == newWarranty) return 'Warranty Period Updated Successfully';
    throw 'Update unsuccessful';
}

async function addModule(req) {
    let query = `SELECT module_count from counts where id=1`;
    let data = await db.query(query);
    let module_id = data[0].module_count + 1;
    query = `INSERT into ordered_module_details (module_id,module_type,panel_id) values (${module_id},'${req.body.moduleType}','${req.body.panelID}')`;
    await db.query(query);
    data = await db.query(`SELECT module_type from ordered_module_details WHERE module_id=${module_id}`);
    if (req.body.module_type != data[0].moduleType) throw 'Operation unsuccessful';
    await db.query(`UPDATE counts SET module_count=${module_id} WHERE id=1`);
    data = await db.query(`SELECT stock from module_stock WHERE module_type='${req.body.moduleType}'`);
    await db.query(`UPDATE module_stock set stock=${data[0].stock + 1} WHERE module_type='${req.body.moduleType}'`);
    return 'Module Added Successfully';
}

async function newOrder(req) {
    let panelsInOrder = 0;
    let cust_id = req.body.customerID;
    let query = `SELECT * FROM cart_contents WHERE customer_id='${cust_id}'`;
    let cart = (await db.query(query))[0];
    query = `SELECT * from panel_stock`;
    let stock = (await db.query(query))[0];
    for (let i = 1; i <= 5; i++) {
        panelsInOrder += cart[`panel${i}`];
        if (stock[`panel${i}`] < cart[`panel${i}`]) {
            throw `Insufficient stock for panel ${i}. Requested : ${cart[`panel${i}`]}, available stock : ${stock[`panel${i}`]}`;
        }
        stock[`panel${i}`] -= cart[`panel${i}`];
    }
    if (panelsInOrder === 0) throw 'No Panels In Order!';
    let date = helper.getDate();
    query = `SELECT order_count from counts where id=1`;
    let data = await db.query(query);
    let order_id = data[0].order_count + 1;
    await db.query(`UPDATE counts SET order_count=${order_id} WHERE id=1`);
    query = `INSERT INTO orders_placed values(${order_id},'${cust_id}',${date},'Processing')`;
    await db.query(query);

    for (let i = 1; i <= 5; i++) {
        query = `SELECT panel_id FROM panel_details WHERE panel_type=${i} AND order_id is NULL LIMIT ${cart[`panel${i}`]}`;
        let panel_ids = (await db.query(query));
        for (let panel of panel_ids) {
            query = `UPDATE panel_details SET order_id=${order_id}, date_of_issue=${date} WHERE panel_id=${panel.panel_id}`;
            await db.query(query);
            query = `UPDATE module_details SET date_of_issue=${date} WHERE panel_id=${panel.panel_id}`;
            await db.query(query);
        }
        query = `UPDATE panel_stock SET panel${i}=${stock[`panel${i}`]}`;
        await db.query(query);
    }
    await db.query(`UPDATE orders_placed SET order_status='Placed' WHERE order_id=${order_id}`);
    await db.query(`UPDATE cart_contents SET panel1=0, panel2=0, panel3=0, panel4=0, panel5=0 WHERE customer_id='${cust_id}'`);
    return ({ status: "Success", orderID: order_id });
}

async function addPanel(req) {
    let query = `SELECT panel_count from counts where id=1`;
    let data = await db.query(query);
    let panel_id = data[0].panel_count + 1;
    await db.query(`UPDATE counts SET panel_count=${panel_id} WHERE id=1`);
    await db.query(`INSERT into panel_details (panel_id,panel_type) values (${panel_id},${req.body.panelType})`);
    query = `SELECT * FROM panel_definition WHERE panel_type=${req.body.panelType}`;
    data = await db.query(query);
    let requirements = JSON.parse(data[0].module_details);
    for (let moduleType in requirements) {
        while (requirements[moduleType] > 0) {
            requirements[moduleType] -= 1;
            query = `SELECT module_count from counts where id=1`;
            data = await db.query(query);
            let module_id = data[0].module_count + 1;
            await db.query(`UPDATE counts SET module_count=${module_id} WHERE id=1`);
            query = `INSERT into module_details (module_id,panel_id,module_type) values(${module_id},${panel_id},'${moduleType}')`;
            await db.query(query);
        }
    }
    query = `SELECT panel${req.body.panelType} from panel_stock`;
    data = await db.query(query);
    let newStock = data[0][`panel${req.body.panelType}`] + 1;
    await db.query(`UPDATE panel_stock SET panel${req.body.panelType}=${newStock}`);
    return `Added a panel of type ${req.body.panelType}`
}

async function currentModuleStock() {
    let data = await db.query('SELECT * from module_stock');
    return data;
}

async function getCustomerCart(req) {
    let query = `SELECT * FROM cart_contents WHERE customer_id='${req.query.customerID}'`;
    let data = await db.query(query);
    return data[0];
}

async function getOrderHistory(req) {
    let query = `SELECT order_id, concat(day(order_date),'/',month(order_date),'/',year(order_date)) as order_date, order_status FROM orders_placed WHERE customer_id='${req.query.customerID}'`;
    let data = await db.query(query);
    return data;
}

async function getPanelsInOrder(req) {
    let query = `SELECT panel_id, concat(day(date_of_issue),'/',month(date_of_issue),'/',year(date_of_issue)) as date, panel_type FROM panel_details WHERE order_id='${req.query.orderID}'`;
    let data = await db.query(query);
    return data;
}

async function getModulesInPanel(req) {
    let query = `SELECT module_id, concat(day(date_of_issue),'/',month(date_of_issue),'/',year(date_of_issue)) as date, module_type, request_id, replaced_date FROM module_details WHERE panel_id='${req.query.panelID}'`;
    let data = await db.query(query);
    return data;
}

async function reportUpload(req) {
    console.log('Trying to parse...')

}

async function addRequest(moduleID, customerID, fileName, date) {
    let data = await db.query(`SELECT * from request_details WHERE module_id=${moduleID}`);
    if (data.length > 0) throw 'Request already sent for this module!';
    let query = `SELECT request_count from counts where id=1`;
    data = await db.query(query);
    let request_id = data[0].request_count + 1;
    let file = request_id.toString() + '|' + fileName;
    await db.query(`UPDATE counts SET request_count=${request_id} WHERE id=1`);
    query = `INSERT into request_details (request_id, customer_id, module_id, request_date, report_file) 
            values (${request_id},'${customerID}',${moduleID},'${date}','${file}')`;
    await db.query(query);
    return file;
}

async function getRequestHistory(req) {
    let query = `SELECT request_id, module_id, concat(day(request_date),'/',month(request_date),'/',year(request_date)) as request_date, status FROM request_details WHERE customer_id='${req.query.customerID}'`;
    let data = await db.query(query);
    return data;
}

async function getPendingRequests(req) {
    let query = `SELECT request_id, module_id, concat(day(request_date),'/',month(request_date),'/',year(request_date)) as request_date, customer_id, report_file FROM request_details WHERE status='Pending'`;
    let data = await db.query(query);
    return data;
}

async function updateRequestStatus(req) {
    let query = `UPDATE request_details SET status='${req.body.status}' WHERE request_id=${req.body.requestID}`;
    await db.query(query);
    return `Request status set to : ${req.body.status}`;
}

async function getPanelStock() {
    let query = `SELECT * from panel_stock`;
    let data = await db.query(query);
    let stock = [data[0].panel1, data[0].panel2, data[0].panel3, data[0].panel4, data[0].panel5];
    return stock;
}

module.exports = {
    testDB,
    addEmployee,
    register,
    login,
    getPanelDefinition,
    setPanelDefinition,
    updateCart,
    getWarranty,
    setWarranty,
    addModule,
    newOrder,
    addPanel,
    currentModuleStock,
    getCustomerCart,
    getUserID,
    getOrderHistory,
    getPanelsInOrder,
    getModulesInPanel,
    reportUpload,
    addRequest,
    getRequestHistory,
    getPendingRequests,
    updateRequestStatus,
    getPanelStock,
    updateuser,
    getuser,
    requestforemployee,
    getrequestemployeedetails,
    removeRequestEmployee,
    getAllEmployees,
    removeEmployee,
    getAllUsers,
}