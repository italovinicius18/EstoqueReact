const { Router } = require("express");
const jwt = require("jsonwebtoken");

const {sequelize, Product, Supply, ProductSupply} = require("../models/models");

const routes = new Router();

routes.get("/status", (req, res) => {
  res.send({ message: "Server is running" });
});

routes.get("/db", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.send({ message: "Connection has been established successfully." });
  } catch (error) {
    res.send({ message: "Unable to connect to the database:", error });
  }
});

routes.post("/login", (req, res) => {
  const privateKey = "@frexco-token";

  const { name, password } = req.body;
  if (name === "admin" && password === "admin") {
    const userData = {
      name: "admin",
      password: "admin",
    };

    jwt.sign(userData, privateKey, (err, token) => {
      if (err) {
        res.status(500).json({ mensagem: "Erro ao gerar o JWT" });

        return;
      }

      res.status(200).send({"token": token});
      res.end();
    });
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
});

// Products CRUD

routes.get('/products', async (req, res) => {
  const products = await Product.findAll();

  res.send(products);
});

routes.post('/products', async (req, res) => {
  const { name, category, price, create_date, create_user, modify_date, modify_user } = req.body;

  try {

    const product = await Product.create({
      name: name,
      category: category,
      price: price
    });
    console.log(product)
    res.send(product);
  }
  catch (error) {
    res.status(500).send({ message: "Erro ao criar o produto", error });
  }
  
});

routes.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category, price } = req.body;

  try {
    const product = await Product.findByPk(id);
    
    if (!product) {
      res.status(404).send({ message: "Produto não encontrado" });
      return;
    }

    await product.update({
      name: name,
      category: category,
      price: price
    });

    res.send(product);
  }
  catch (error) {
    res.status(500).send({ message: "Erro ao atualizar o produto", error });
  }
});

routes.delete('/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (!product) {
      res.status(404).send({ message: "Produto não encontrado" });
      return;
    }

    await product.destroy();

    res.send(product);

  }
  catch (error) {
    res.status(500).send({ message: "Erro ao deletar o produto", error });
  }
});

// Supplies CRUD

routes.get('/supplies', async (req, res) => {
  const supplies = await Supply.findAll();

  res.send(supplies);
});

routes.post('/supplies', async (req, res) => {
  const { name, city, estate } = req.body;

  try {

    const supply = await Supply.create({
      name: name,
      city: city,
      estate: estate,
    });
    console.log(supply)
    res.send(supply);
  }
  catch (error) {
    res.status(500).send({ message: "Erro ao criar o estoque", error });
  }
  
});

routes.put('/supplies/:id', async (req, res) => {
  const { id } = req.params;
  const { name, city, estate } = req.body;

  try {
    const supply = await Supply.findByPk(id);
    
    if (!supply) {
      res.status(404).send({ message: "Estoque não encontrado" });
      return;
    }

    await supply.update({
      name: name,
      city: city,
      estate: estate
    });

    res.send(supply);
  }
  catch (error) {
    res.status(500).send({ message: "Erro ao atualizar o estoque", error });
  }
});

routes.delete('/supplies/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const supply = await Supply.findByPk(id);

    if (!supply) {
      res.status(404).send({ message: "Estoque não encontrado" });
      return;
    }

    await supply.destroy();

    res.send(supply);

  }
  catch (error) {
    res.status(500).send({ message: "Erro ao deletar o estoque", error });
  }
});

module.exports = routes;