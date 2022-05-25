const { Router } = require("express");
const jwt = require("jsonwebtoken");

const routes = new Router();

routes.get("/status", (req, res) => {
  res.send({ message: "Server is running" });
});

routes.post("/login", (req, res) => {
  const privateKey = "@frexco-token";

  console.log(req.body);

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

module.exports = routes;