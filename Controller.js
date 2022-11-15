const express = require('express')
const cors = require('cors')
const mysql2 = require('mysql2')
const app = express()
const port = 8000
const jwt = require('jsonwebtoken')
let sha256 = require('crypto-js/sha256')
const VerifyToken = require('./middleware/auth.js')
const mailer = require('./src/modules/mailer.js')
const bodyEmail = require('./src/modules/mail/forgotpassword.js')
const { host, porta, database, user, password } = require('./host.json')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "default-src '*'")
  next()
})

app.post('/usersession', async (req, res) => {
  try {
    sql.query(
      `SELECT * FROM Pessoas where id = ?`,
      [req.body.userId],
      (err, result, fields) => {
        if (result != undefined) {
          if (result.length > 0) {
            res.send(JSON.stringify(result))
          }
        }
        if (err != null) {
          res.send(JSON.stringify(err.sqlMessage))
        }
      }
    )
  } catch (error) {
    res.status(500).send({ err: error })
  }
})

const gerarToken = (id, login, expires) => {
  try {
    return jwt.sign(
      {
        id: id,
        login: login
      },
      'Token',
      { expiresIn: expires }
    )
  } catch (error) {
    res.status(500).send({ err: error })
  }
}

app.post('/forgotPassword', async (req, res) => {
  try {
    const { email } = req.body
    sql.query(
      `SELECT p.id,p.nome,p.cpf,p.genero,p.dtNascimento,p.celular,p.email,u.login 
      FROM Pessoas p INNER JOIN Usuarios u ON u.idPessoa = p.id 
      WHERE email = ?`,
      [email],
      (err, result, fields) => {
        if (result) {
          if (result.length > 0) {
            mailer.sendMail(
              {
                to: email,
                from: 'jacksonrodriguesdepaula@gmail.com',
                subject: 'Teste',
                html: bodyEmail(
                  email,
                  gerarToken(result[0].id, result[0].login, '2h')
                )
              },
              erro => {
                if (erro) {
                  res
                    .status(400)
                    .send({ Erro: 'Erro ao enviar e-mail de recuperação.' })
                }
              }
            )
            res.status(200).send({
              auth: true,
              res: 'E-mail encaminhado, verifique a caixa de entrada.',
              id: result[0].id
            })
          } else {
            res.status(200).send({
              auth: false,
              res: 'E-mail inválido.',
              id: ''
            })
          }
        }
        if (err) {
          res.status(401).send({
            auth: false,
            res: 'Ocorreu um erro.',
            id: ''
          })
        }
      }
    )
  } catch (error) {
    res.status(401).send({
      auth: false,
      res: 'Ocorreu um erro.',
      id: ''
    })
  }
})

app.post('/replacePassword', VerifyToken, (req, res) => {
  try {
    const { password, token } = req.body
    const passwordHash = sha256(password).toString()

    jwt.verify(token, 'Token', (err, decoded) => {
      if (err) {
        res
          .status(401)
          .send({ auth: false, Error: 'Código de acesso expirado.' })
      }
      if (decoded) {
        sql.query(
          'UPDATE Usuarios SET senha = ? WHERE idPessoa = ?',
          [passwordHash, decoded.id],
          (err, result, fields) => {
            if (err) {
              res.status(401).send({ auth: false, res: 'Ocorreu um erro.' })
            }
            if (result) {
              res.status(200).send({
                auth: true,
                res: 'Senha alterada com sucesso.'
              })
            }
          }
        )
      }
    })
  } catch (error) {
    res.status(500).send({ err: error })
  }
})

// TELA LOGIN
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const passwordHash = sha256(password).toString()
    sql.query(
      `SELECT p.id,p.nome,p.cpf,p.genero,p.dtNascimento,p.celular,p.email,u.login, sum(coalesce(f.valor, 0.00)) valor
      FROM Pessoas p INNER JOIN Usuarios u ON u.idPessoa = p.id
      left join Financeiro f on f.idPessoa = p.id
      WHERE u.login = '${username}' and u.senha = '${passwordHash}'
      group by  p.id,p.nome,p.cpf,p.genero,p.dtNascimento,p.celular,p.email,u.login`,
      (err, result, fields) => {
        if (result.length > 0) {
          res.status(200).send({
            auth: true,
            token: gerarToken(result[0].id, result[0].login, '1m'),
            dadosUser: result[0]
          })
        } else {
          res.status(401).send({
            auth: false,
            token: ''
          })
        }
        if (err != null) {
          res.status(401).send({
            auth: false,
            token: ''
          })
        }
      }
    )
  } catch (error) {
    res.status(500).send({ err: error })
  }
})

// API PARA TESTE VIA APP -POSTMAN OU INSOMNIA-
app.get('/api', VerifyToken, (req, res) => {
  try {
    sql.query(
      `SELECT * FROM Pessoas p INNER JOIN Usuarios u ON u.idPessoa = p.id `,
      (err, result, fields) => {
        if (result.length > 0) {
          res.send(result)
        } else {
          res.send(
            JSON.stringify({ res: 'Login ou senha incorretos.', bol: false })
          )
        }
        if (err != null) {
          res.send(
            JSON.stringify({ res: 'Login ou senha incorretos.', bol: false })
          )
        }
      }
    )
  } catch (error) {
    res.status(500).send({ err: error })
  }
})

// PARA USO NO APP GLOBAL
app.get('/dadosUser', VerifyToken, (req, res) => {
  try {
    const { id, login } = req.body
    sql.query(
      `SELECT p.id,p.nome,p.cpf,p.genero,p.dtNascimento,p.celular,p.email,u.login FROM Pessoas p INNER JOIN Usuarios u ON u.idPessoa = p.id where p.id = ? and u.login = ? `,
      [id, login],
      (err, result, fields) => {
        if (result.length > 0) {
          res.status(200).send(result[0])
        } else {
          res.status(404).send({ auth: false, msg: 'Not Found' })
        }
        if (err != null) {
          res.status(404).send({ auth: false, msg: 'Not Found' })
        }
      }
    )
  } catch (error) {
    res.status(500).send({ err: error })
  }
})

// TELA CADASTRO
app.post('/cadastro', (req, res) => {
  try {
    const { name, cpf, genero, birth, phone, email, username, password } =
      req.body

    sql.query(
      `SELECT p.id,p.nome,p.cpf,p.genero,p.dtNascimento,p.celular,p.email,u.login FROM Pessoas p INNER JOIN Usuarios u ON u.idPessoa = p.id 
    where (p.cpf = ? or u.login = ? or p.email = ?) `,
      [cpf, username, email],
      (err, result, fields) => {
        if (result.length > 0) {
          res.status(400).send({
            auth: false,
            resp: 'O usuário já possui cadastro no Sistema!'
          })
        } else if (err) {
          res.status(401).send({
            auth: false,
            resp: err.message
          })
        } else {
          const passwordHash = sha256(password).toString()
          sql.query(
            'insert into Pessoas(nome,cpf,genero,dtnascimento,celular,email) values (?,?,?,?,?,?)',
            [
              name,
              cpf,
              genero,
              formatDataUSA(birth),
              removeFormatPhone(phone),
              email
            ],
            (err, result, fields) => {
              if (err) {
                if (err.errno == 1062) {
                  res.send({
                    auth: false,
                    resp: 'O CPF já possui cadastro no Sistema!'
                  })
                }
              }
              if (result) {
                sql.query(
                  'insert into Usuarios(login,senha,idPessoa) values (?,?,?)',
                  [username, passwordHash, result.insertId],
                  (err, result, fields) => {
                    if (result) {
                      if (result.affectedRows == 1) {
                        res.send({ auth: true, resp: 'Usuário cadastrado!' })
                      }
                    }
                    if (err) {
                      if (err.errno == 1062) {
                        res.send({
                          auth: false,
                          resp: 'O usuário já possui cadastro no Sistema!'
                        })
                      } else {
                        res.send({ err })
                      }
                    }
                  }
                )
              }
            }
          )
        }
      }
    )
  } catch (error) {
    res.status(500).send({ err: error })
  }
})
//Grava no extrato as Rodadas
app.post('/rodadas', (req, res) => {
  try {
    const { id, vlrAposta, vlrGanho } = req.body

    sql.query(
      'INSERT INTO Rodadas (idPessoa,idJogo,dtHr,vlrAposta,vlrGanho) VALUES (?,1,NOW(),?,?)',
      [id, vlrAposta, vlrGanho],
      (err, result, fields) => {
        if (result) {
          res.status(200).send({
            resp: 'Valor inserido'
          })
        }
        if (err) {
          res.status(500).send({
            resp: err.message
          })
        }
      }
    )
  } catch (error) {
    res.status(500).send({ err: error })
  }
})

// Busca extrato Rodadas
app.get('/carteira/:id', (req, res) => {
  try {
    const { id } = req.params
    sql.query(
      `SELECT id,idJogo,
      case when idJogo = 1 then 'Roleta Vegas' ELSE 'Jogo em teste' END jogo,
      case when vlrAposta < vlrGanho then 1 ELSE 0 END tipo
      ,DATE_FORMAT(dtHr, "%d/%m/%Y às %Hh%i")dtHr,vlrAposta,vlrGanho 
      FROM Rodadas where idPessoa = ? ORDER BY id desc`,
      [id],
      (errRodadas, resultRodadas) => {
        if (errRodadas) {
          res.status(200).send({
            auth: false,
            token: '',
            ext: errRodadas.message
          })
        } else {
          res.status(200).send({
            auth: true,
            ext: resultRodadas ? resultRodadas : []
          })
        }
      }
    )
  } catch (error) {
    res.status(500).send({ err: error.message })
  }
})

//Grava saldo
app.post('/financeiro', (req, res) => {
  try {
    const { id, vlrGanho, vlrSaldo, ValorCart } = req.body
    const Carteira = vlrSaldo
    // const Carteira = vlrGanho <= 0 ? -vlrSaldo : vlrSaldo

    sql.query(
      'INSERT INTO Financeiro (idPessoa,idMoeda,valor,dtHr) VALUES (?,4,?,NOW())',
      [id, Carteira],
      (err, result, fields) => {
        if (result) {
          res.status(200).send({
            resp: Carteira > 0 ? 'Valor inserido' : 'Valor retirado'
          })
        }
        if (err) {
          res.status(500).send({
            resp: err.message
          })
        }
      }
    )
  } catch (error) {
    res.status(500).send({ err: error })
  }
})

app.get('/financeiroAtualiza/:id', (req, res) => {
  try {
    const { id } = req.params

    sql.query(
      `SELECT p.id,p.nome,p.cpf,p.genero,p.dtNascimento,p.celular,p.email,u.login, sum(coalesce(f.valor, 0.00)) valor
      FROM Pessoas p INNER JOIN Usuarios u ON u.idPessoa = p.id
      left join Financeiro f on f.idPessoa = p.id
      WHERE u.idPessoa = ?
      group by  p.id,p.nome,p.cpf,p.genero,p.dtNascimento,p.celular,p.email,u.login`,
      [id],
      (err, result, fields) => {
        if (result) {
          res.status(200).send({ resp: result[0] })
        }
        if (err) {
          res.status(401).send({ err: err.message })
        }
      }
    )
  } catch (error) {
    res.status(401).send({ err: error.message })
  }
})

function formatDataUSA(txt) {
  let day = txt.substring(0, 2)
  let month = txt.substring(3, 5)
  let year = txt.substring(6)
  return year + '/' + month + '/' + day
}
function removeFormatPhone(txt) {
  return txt.replace('(', '').replace(')', '').replace('-', '').replace(' ', '')
}

const sql = mysql2.createPool({
  connectionLimit: 10,
  host: host,
  port: porta,
  database: database,
  user: user,
  password: password
})

app.listen(port, (req, res) => {
  console.log(`Servidor Online`)
})
