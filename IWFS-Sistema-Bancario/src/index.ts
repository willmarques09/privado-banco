import express, { Express } from "express";
import cors from "cors"
import { AddressInfo } from "net"
import { Account, accounts } from "./data"

const app: Express = express();
app.use(express.json())
app.use(cors())

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo
    console.log(`Server is running in http://localhost: ${address.port}`)
  } else {
    console.error(`Failure upon starting server.`)
  }
})

const date = new Date()

app.post("/accounts", (req,res ) => {
  let errorCode = 400

  try {

  let newUser: Account = {
    id: accounts.length + 1,
    name: req.body.name,
    CPF: req.body.cpf,
    birthDate: req.body.birthDate,
    total: 0,
    extract: [],
  }

  let userDate = new Date(req.body.birthDate)

    if ((Number(date) - Number(userDate)) / 1000 / 60 / 60 / 24 / 365 <= 17)
      throw new Error("O titular da conta deve ter mais de 18 anos")
    else if (req.body.name && req.body.cpf && req.body.birthDate) {
      accounts.push(newUser)
      res.send("Conta criada com sucesso")
    } else throw new Error("Todos os dados são obrigatórios")
  } catch (error:any) {
    res.status(errorCode).send(error.message)
  }
})

app.get("/accounts", (req,res) => {
  try {
    res.send(accounts)
  } catch (error: any) {
    res.send(error.message)
  }
})