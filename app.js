"use strict";
exports.__esModule = true;
var vcard_creator_1 = require("vcard-creator");
var fs = require("fs");
var data = '';
var rawdata = fs.readFileSync('./files/input/ui.json').toString("utf-8");
var items = JSON.parse(rawdata);
var getSimplePhones = function (rawPhonesString) { return rawPhonesString === null || rawPhonesString === void 0 ? void 0 : rawPhonesString.split(";").map(function (phohe) { return phohe.trim(); }); };
var getDialedPhones = function (rawPhonesString) {
    var _a;
    return (_a = getSimplePhones(rawPhonesString)) === null || _a === void 0 ? void 0 : _a.map(function (phone) {
        if (phone.startsWith('(831) 431-9'))
            return phone.replace('(831) 431-9', '243-1');
        if (phone.startsWith('(831) 249') || '(831) 438')
            return phone.replace(/.{9}/, '243');
        return phone;
    });
};
var handleItems = function (element) {
    var _a;
    var myVCard = new vcard_creator_1["default"]();
    myVCard
        .addName(element.Title)
        .addCompany(element.Department.Title)
        .addRole(element.Position)
        .addEmail(element.Email);
    (_a = getDialedPhones(element.WorkPhone)) === null || _a === void 0 ? void 0 : _a.forEach(function (phohe) { return myVCard.addPhoneNumber(phohe, 'PREF;WORK'); });
    getSimplePhones(element.AdditionPhone).forEach(function (phohe) { return myVCard.addPhoneNumber(phohe, 'WORK'); });
    data += myVCard.toString();
    console.log(myVCard.toString());
};
items.forEach(function (element) { return handleItems(element); });
fs.writeFileSync("./files/output/contacts.vcf", data);
