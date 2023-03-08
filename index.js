const VCard = require('vcard-creator').default
const fs = require('fs')
let data =''
let rawdata = fs.readFileSync('ui.json')
let items = JSON.parse(rawdata)
const getSimplePhones = (rawPhonesString) => rawPhonesString?.split(";").map(phohe => phohe.trim())
const getDialedPhones  = (rawPhonesString) => getSimplePhones(rawPhonesString)?.map(phone => {
  if (phone.startsWith('(831) 431-9'))
    return phone.replace('(831) 431-9', '243-1')
  if (phone.startsWith('(831) 249') || '(831) 438')
    return phone.replace(/.{9}/, '243')
  return phone
})
const handleItems = (element) => {
  const myVCard = new VCard()
  myVCard
  .addName(element.Title)
  .addCompany(element.Department.Title)
  .addRole(element.Position)
  .addEmail(element.Email)
  getDialedPhones(element.WorkPhone)?.forEach(phohe => myVCard.addPhoneNumber(phohe, 'PREF;WORK'))
  getSimplePhones(element.AdditionPhone).forEach(phohe => myVCard.addPhoneNumber(phohe, 'WORK'))
  data+=myVCard.toString()
  console.log(myVCard.toString())
}

items.forEach(element => handleItems(element))
fs.writeFileSync("contacts.vcf", data)


