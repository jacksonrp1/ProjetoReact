import * as SQLite from 'expo-sqlite'
// CRIA BANCO
const db = SQLite.openDatabase('db.ReactNative')

//CRIA TABBELAS
db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS Pessoas (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, cpf TEXT NOT NULL UNIQUE, genero TEXT, dtNascimento TEXT, celular TEXT, email TEXT);'
  )
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS Usuarios (login TEXT PRIMARY KEY not null, senha TEXT, idPessoa INT,FOREIGN KEY(idPessoa)REFERENCES Pessoas (id));'
  )
})

//SELECT USER PARA LOGIN
const selUser = obj => {
  const { username, passw } = obj
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Usuarios where login = '${username}' and senha = '${passw}'`,
        [],
        (_, { rows }) => {
          if (rows._array.length > 0) {
            resolve(true)
          } else {
            resolve(false)
          }
        },
        (_, error) => {
          reject(`Ocorreu um erro. ${error.message}`)
        }
      )
    })
  })
}
// SELECT LISTA DE USERS
const selListUsers = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Pessoas p inner join Usuarios u on p.id = u.idPessoa`,
        [],
        (_, { rows }) => {
          resolve(rows._array)
        },
        (_, error) => {
          reject(`Ocorreu um erro. ${error.message}`)
        }
      )
    })
  })
}

// CRIAR USER
const addUser = obj => {
  const { name, cpf, genero, birth, phone, email, username, password } = obj
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'insert into Pessoas (nome,cpf,genero,dtNascimento,celular,email) values (?,?,?,?,?,?)',
        [name, cpf, genero, birth, phone, email],
        (txObj, resultSet) => {
          if (!resultSet) {
            if (resultSet.rowsAffected == 1) {
              tx.executeSql(
                'insert into Usuarios (login,senha,idPessoa) values (?,?,?)',
                [username, password, resultSet.insertId],
                (txObjUser, resultSetUser) => {
                  resolve(resultSetUser)
                }
              )
            }
          }
        },
        (txObj, error) => console.log(error.message)
      )
    })
  })
}

//CASO USUARIO NÃO TENHA DADOS CADASTRADOS NO MYSQL REALIZA O CADASTRO
const addUserMySQL = obj => {
  const { name, cpf, genero, birth, phone, email, username, password } = obj
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Usuarios where login = ?`,
        [username],
        (_, { rows }) => {
          if (rows._array.length > 0) {
            resolve(true)
          } else {
            tx.executeSql(
              'insert into Pessoas (nome,cpf,genero,dtNascimento,celular,email) values (?,?,?,?,?,?)',
              [name, cpf, genero, birth, phone, email],
              (txObj, resultSet) => {
                if (!resultSet) {
                  if (resultSet.rowsAffected == 1) {
                    tx.executeSql(
                      'insert into Usuarios (login,senha,idPessoa) values (?,?,?)',
                      [username, password, resultSet.insertId],
                      (txObjUser, resultSetUser) => {
                        resolve(resultSetUser)
                      }
                    )
                  }
                }
              },
              (txObj, error) => console.log(error.message)
            )
          }
        },
        (_, error) => {
          reject(`Ocorreu um erro. ${error.message}`)
        }
      )
    })
  })
}

// APAGAR USER
const delUser = obj => {
  const { nome } = obj
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM cadastro WHERE nome = (?);',
        [nome],
        (_, { rowsAffected }) => {
          resolve(rowsAffected)
        },
        (_, error) => reject(error)
      )
    })
  })
}

export default { addUser, addUserMySQL, delUser, selUser, selListUsers }
