<div style="display: inline">
  <a href="https://www.jacksondev.com.br/" target="_blank">
    <img src="https://img.shields.io/static/v1?label=Website&message=JacksonDev&color=red&style=for-the-badge&logo=webflow"/>
  </a>
  <a href="https://nodejs.org/en/" target="_blank">
    <img src="https://img.shields.io/static/v1?label=&message=Node.js&color=f1f1f1&style=flat-square&logo=nodedotjs"/>
  </a>
  <a href="https://reactnative.dev/" target="_blank">
    <img src="https://img.shields.io/static/v1?label=&message=React Native&color=202124&style=flat-square&logo=react"/>
  </a>
</div>

# <h1 align="center"> CASSINO REACT NATIVE </h1>

## SOBRE O PROJETO:
### O projeto tem como fundamento a utilização da linguagem __React Native__ para desenvolvimento Mobile, para isso, desenvolvemos um aplicativo de "apostas" onde o usuário pode realizar apostas com dinheiro real em jogos como roleta, dados e cartas obtendo lucro caso ganhe sua aposta. Este projeto foi realizado como metodológia de aprendizado para a matéria de "Programação para dispositivos móveis em Android" no 2° semestre do ano de 2022.
OBS: Ressaltamos que tinhamos 0 conhecimento de ReactNative antes de iniciar o projeto.
## Pré-Requisitos:

```javascript
git clone https://github.com/jacksonrp1/ProjetoReact.git
```
Após a clonagem do repositório execute:
```
npm install ou yarn install.
```

Comandos a serem executados no terminal:
```javascript
npm install -g nodemon
npm install expo-cli -g
```


## Encontre a linha arquivo Roulette.js - '\node_modules\react-native-casino-roulette'
```javascript
let animation = Animated.timing(this.state._animatedValue, { toValue: nextItem, easing, duration })
```
e substitua por:
```javascript
let animation = Animated.timing(this.state._animatedValue, { toValue: nextItem, easing, duration,useNativeDriver:true })
```


## Crie um arquivo na pasta inicial com nome host.json
```javascript
{
  "host": "ip onde esta seu banco de dados",
  "porta": número da porta,
  "database": "nome do banco de dados",
  "user": "login do banco de dados",
  "password": "senha do banco de dados"
}
```
## Arquivo para configurar o banco de dados (utilizamos no projeto o MySql)
<a href="https://github.com/jacksonrp1/ProjetoReact/blob/main/SQL%20Cassino.sql">SQL Cassino.sql</h4></a>


Execute em uma janela do terminal:
```javascript
npx expo start
```
Em outra janela do terminal execute:
```javascript
npx nodemon Controller.js
```
Depois é só rodar o expo com seu emulador ou aponte seu celular para ler o QR code.

## IDEALIZADORES:
### Jackson Rodrigues, Marcos Vinicius, Ademivaldo Junior, Juliano Pereira, Fellipe Pereira e Lucas Rosa.

## Linguagens Utilizadas 👨‍💻:
1. ReactNative, 
2. NodeJS,
3. MySql,
4. Sqlite3.

## Tecnologias Utilizadas 👨‍💻:
1. Git,
2. GitHub,
3. PostMan(Teste da API),
4. Insomnia(Teste da API),
5. Nodemailer.

## Aprendizado adquirido durante desenvolvimento:
- ✔️ Trabalho em grupo e versionamento de códigos.
- ✔️ Configuração de ambiente de trabalho para desenvolvimento em ReactNative utilizando Expo-Cli.
- ✔️ Estruturação básica para desenvolvimento do código.
- ✔️ Desenvolvimento básico para dispositivos móveis em Android e IOS.
- ✔️ Utilização do emulador do AndroidStudio.
- ✔️ Back-end em NodeJs.
- ✔️ Utilização da Api Nodemailer.



