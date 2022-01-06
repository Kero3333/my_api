const { publicDecrypt } = require("crypto");
const express = require("express");

const fs = require("fs"); // file system
const path = require("path");

const pathProductsJSON = path.join(__dirname, "./data/products.json");

let products = JSON.parse(fs.readFileSync(pathProductsJSON).toString()); // string json --> objet js

const app = express();

app.use(express.json());

app.get("", (req, res) => {
  // res==>response
  console.log("requête entrante sur la homepage");
  res.send("Homepage");
});

app.get("/api/products", (req, res) => {
  res.status(200).send(products);
});

app.post("/api/products", (req, res) => {
  const product = req.body;

  product.id = products[products.length - 1].id + 1;

  products.push(product);

  res.status(201).send(products);
});

app.delete("/api/products/:id", (req, res) => {
  const id = req.params.id;

  const newProducts = products.filter((product) => product.id !== parseInt(id));

  if (newProducts.length === products.length) {
    res.status(404).send("product not found");
  } else {
    products = [...newProducts];
    res.status(200).send(products);
  }
});

app.put("/api/products", (req, res) => {});

app.listen(process.env.PORT || 3000, () =>
  console.log("Listenning on port 3000...")
);
