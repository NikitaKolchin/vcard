"use strict";
exports.__esModule = true;
var vcard_creator_1 = require("vcard-creator");
var fs = require("fs");
var data = "";
//let rawdata = JSON.stringify(fs.readFileSync("./files/input/5218_empls_info_(09.03.2023_11-16).json").toString('utf16le'))
var rawdata = fs.readFileSync("./files/input/vvgu.json").toString('utf8');
var items = JSON.parse(rawdata);
console.log(items[0]);
var getSimplePhones = function (rawPhonesString, regionCode) {
    return rawPhonesString === null || rawPhonesString === void 0 ? void 0 : rawPhonesString.split(";").map(function (phohe) { return regionCode + phohe.trim(); });
};
var getHandledPhones = function (rawPhonesString, regionCode) {
    var _a;
    return (_a = getSimplePhones(rawPhonesString, regionCode)) === null || _a === void 0 ? void 0 : _a.map(function (phone) {
        return (phone.length < 6 && !regionCode) ? "(243) " + phone : phone;
    });
};
var handleItems = function (element) {
    var _a, _b;
    if (!element.Email)
        return;
    var myVCard = new vcard_creator_1["default"]();
    myVCard
        .addName(element.Title)
        .addCompany(element.Department.Title)
        .addRole(element.Position)
        .addEmail(element.Email);
    (_a = getSimplePhones(element.AdditionPhone, element.RegionCode)) === null || _a === void 0 ? void 0 : _a.forEach(function (phohe) {
        return myVCard.addPhoneNumber(phohe, "WORK");
    });
    (_b = getHandledPhones(element.AdditionPhone, element.RegionCode)) === null || _b === void 0 ? void 0 : _b.forEach(function (phohe) {
        return myVCard.addPhoneNumber(phohe, "PREF;WORK");
    });
    data += myVCard.toString();
    console.log(myVCard.toString());
};
items.forEach(function (element) { return handleItems(element); });
fs.writeFileSync("./files/output/contacts.vcf", data);
// const VCard = require('vcard-creator').default
// const fs = require('fs')
// let data =''
// let rawdata = fs.readFileSync('./files/input/ui.json')
// let items = JSON.parse(rawdata)
// const getSimplePhones = (rawPhonesString) => rawPhonesString?.split(";").map(phohe => phohe.trim())
// const getDialedPhones  = (rawPhonesString, replaceable) => getSimplePhones(rawPhonesString)?.map(phone => {
//   if (phone.startsWith('(831) 431-9'))
//     return phone.replace('(831) 431-9', replaceable+' 1')
//   if (phone.startsWith('(831) 249') || '(831) 438')
//     return phone.replace(/.{9}/, replaceable)
//   return phone
// })
// const handleItems = (element) => {
//   const myVCard = new VCard()
//   myVCard
//   .addName(element.Title)
//   .addCompany(element.Department.Title)
//   .addRole(element.Position)
//   .addEmail(element.Email)
//   getDialedPhones(element.WorkPhone, '243')?.forEach(phohe => myVCard.addPhoneNumber(phohe, 'PREF;WORK'))
//   getSimplePhones(element.AdditionPhone).forEach(phohe => myVCard.addPhoneNumber(phohe, 'WORK'))
//   data+=myVCard.toString()
//   console.log(myVCard.toString())
// }
// items.forEach(element => handleItems(element))
// fs.writeFileSync("./files/output/contacts.vcf", data)
