db.company.update({"_id" : "Ed6EgFMahn5qFA9Mz"},
{$set :
  {"product":
    [
      {"alias": "Butijão 13 kg", "stock": 100, "basePrice": 65.00, "customerPrice": 62.00,
        "deliveryOrder": [
          {
            "neighborhood" : "São Francisco",
            "address" : "40",
            "number": "10",
            "amount": 1,
            "price": 65.00,
            "deliveryMan": "aPQEXWwYSD8pdM6wF"},

            {"neighborhood" : "São Gonçalo",
            "address" : "30",
            "number": "07",
            "amount": 2,
            "price": 65.00,
            "deliveryMan": "aPQEXWwYSD8pdM6wF"}
        ]
      },

      {"alias": "Butijão 45 kg", "stock": 1000,
        "prices": [
            {"basePrice": 65.00},
            {"customerPrice": 62.00}
          ]
      }
    ]
  }
}
)

/* Query para achar um elemento dentro de company*/

db.company.find( {"product.alias": "Butijão 13 kg"}, {"name" :1, "product.$": 1 }).pretty()
