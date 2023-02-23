const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()
const fs = require('fs')
const article = []
const JsonApplicationPath = "myjsondata.json"
var obj = {
    Street: "",
    City_Town: "",
    State_Province_Region: "",
    Zip_Postal_Code: "",
    Phone_Number: "",
    Country: "",
    Latitude: "",
    Longitude: "",
    Full_Name: "",
    Gender: "",
    Birthday: "",
    Social_Security_Number: "",
    Credit_card_brand: "",
    Credit_card_number: "",
    Expire: "",
    CVV: "",
}
app.get('/', (req, res) => {
    getaxios((response) => {
        let jsonx = JSON.stringify(response, null, 4);
        fs.readFile(JsonApplicationPath, function (err, data) {
            var json = JSON.parse(data)
            json[json.length] = response
            res.header("Content-Type", 'application/json');
            res.send(JSON.stringify(response, null, 4)); 
            for (let index = 0; index < json.length; index++) {
                const element = json[index]; 
                if (json.length == 1) {
                    fs.writeFile(JsonApplicationPath, JSON.stringify(json, null, 4), 'utf8', function (c) { });
                }else{
                    if (response.Credit_card_number != element.Credit_card_number) {
                        fs.writeFile(JsonApplicationPath, JSON.stringify(json, null, 4), 'utf8', function (c) { });
                    }
                }
            }
        })
    })
})
app.get('/getall', (req, res) => {
    getaxios((response) => {
        fs.readFile(JsonApplicationPath, function (err, data) {
            res.header("Content-Type", 'application/json');
            res.send(JSON.stringify(JSON.parse(data), null, 4));
        })
    })
})


function getaxios(res) {
    axios.get("https://www.fakexy.com/bd-fake-address-generator-ddhaakaa-bibhaag")
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            $('tbody > tr').each((index, element) => {
                var tr0 = $(element).find("td")[0]
                var tr1 = $(element).find("td")[1]
                if (index == 0) {
                    obj.Street = $(tr1).text()
                } else if (index == 1) {
                    obj.City_Town = $(tr1).text()
                } else if (index == 2) {
                    obj.State_Province_Region = $(tr1).text()
                } else if (index == 3) {
                    obj.Zip_Postal_Code = $(tr1).text()
                } else if (index == 4) {
                    obj.Phone_Number = $(tr1).text()
                } else if (index == 5) {
                    obj.Country = $(tr1).text()
                } else if (index == 6) {
                    obj.Latitude = $(tr1).text()
                } else if (index == 7) {
                    obj.Longitude = $(tr1).text()
                } else if (index == 8) {
                    obj.Full_Name = $(tr1).text()
                } else if (index == 9) {
                    obj.Gender = $(tr1).text()
                } else if (index == 10) {
                    obj.Birthday = $(tr1).text()
                } else if (index == 11) {
                    obj.Social_Security_Number = $(tr1).text()
                } else if (index == 12) {
                    obj.Credit_card_brand = $(tr1).text()
                } else if (index == 13) {
                    obj.Credit_card_number = $(tr1).text()
                } else if (index == 14) {
                    obj.Expire = $(tr1).text()
                } else if (index == 15) {
                    obj.CVV = $(tr1).text()
                }
                article.push(
                    obj
                )

            })
            return res && res(article[0]);
        })
}

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))


