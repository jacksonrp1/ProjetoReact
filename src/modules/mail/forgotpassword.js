const body = (email, token) => {
  return `<body
  style="
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: 0;
  align-items: center;
"
>
  <div style="width: 600px">
    <h1
      style="
        background-color: #d65a31;
        color: #ffffff;
        border-radius: 5px;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      Esqueceu sua senha ?
    </h1>
    <p>
      Olá, Recebemos uma solicitação para redefinir a senha da conta associada
      a <b>${email}</b>. Nenhuma alteração foi feita em sua conta
      ainda. Você pode redefinir sua senha usando o token abaixo:
    </p>
    <p style="
    width: 600px;
    margin-right: auto;
    overflow-wrap: anywhere;
    ">
    <b>${token}</b>
    </p>
    <p>
      Só para você saber: Você tem 2 horas para escolher sua senha. Depois
      disso, você terá que pedir um novo token. Não pediu uma nova senha? Você pode
      ignorar este e-mail.
    </p>
  </div>
</body>`
}

module.exports = body
