import VCard from 'vcard-creator';
import * as fs from 'fs';
let data: string ='';

interface Card {
    Title : string,
    Position : string,
    Email: string,
    WorkPhone: string,
    AdditionPhone: string,
    Department: Department
}

interface Department {
    Title:string
}
let rawdata = fs.readFileSync('./files/input/ui.json').toString("utf-8")
let items: Card[] = JSON.parse(rawdata)
const getSimplePhones = (rawPhonesString: string):string[] => rawPhonesString?.split(";").map((phohe: string) => phohe.trim())
const getDialedPhones  = (rawPhonesString: string):string[] => getSimplePhones(rawPhonesString)?.map((phone: string) => {
  if (phone.startsWith('(831) 431-9'))
    return phone.replace('(831) 431-9', '243-1')
  if (phone.startsWith('(831) 249') || '(831) 438')
    return phone.replace(/.{9}/, '243')
  return phone
})
const handleItems = (element: Card) => {
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
fs.writeFileSync("./files/output/contacts.vcf", data)


