import VCard from "vcard-creator"
import * as fs from "fs"
let data: string = ""

interface Card {
  Title: string
  Position: string
  Email: string
  WorkPhone: string
  AdditionPhone: string
  Department: Department
  RegionCode: string
}

interface Department {
  Title: string
}
//let rawdata = JSON.stringify(fs.readFileSync("./files/input/5218_empls_info_(09.03.2023_11-16).json").toString('utf16le'))
let rawdata = fs.readFileSync("./files/input/vvgu.json").toString('utf8')
let items: Card[] = JSON.parse(rawdata)
console.log(items[0])
const getSimplePhones = (rawPhonesString: string, regionCode: string) =>
  rawPhonesString?.split(";").map((phohe: string) => regionCode+phohe.trim())


const getHandledPhones = (rawPhonesString: string, regionCode: string) =>
  getSimplePhones(rawPhonesString, regionCode)?.map((phone: string) =>
    (phone.length < 6 && !regionCode)? "(243) " + phone: phone
  )
const handleItems = (element: Card) => {
  if (!element.Email) return
  const myVCard = new VCard()
  myVCard
    .addName(element.Title)
    .addCompany(element.Department.Title)
    .addRole(element.Position)
    .addEmail(element.Email)
  getSimplePhones(element.AdditionPhone, element.RegionCode)?.forEach((phohe) =>
    myVCard.addPhoneNumber(phohe, "WORK")
  )
  getHandledPhones(element.AdditionPhone, element.RegionCode)?.forEach((phohe) =>
    myVCard.addPhoneNumber(phohe, "PREF;WORK")
  )
  data += myVCard.toString()
  console.log(myVCard.toString())
}

items.forEach((element) => handleItems(element))
fs.writeFileSync("./files/output/contacts.vcf", data)

