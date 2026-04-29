# Ronda Diária – Backend (Resumo Didático)

## 🎯 O que foi feito

Criamos um sistema que permite:

- Cadastrar uma empresa
- Adicionar nomes associados
- Adicionar termos associados
- Relacionar uma empresa concorrente

Tudo isso integrado com um banco de dados MySQL.

---

## 🧠 Como funciona (fluxo simples)

1. Usuário preenche o formulário (index.html)
2. JavaScript envia os dados para a API (fetch)
3. Backend (Node + Express) recebe os dados
4. Dados são salvos no banco
5. API retorna sucesso

---

## ⚙️ Tecnologias usadas

- Node.js → roda JavaScript no servidor
- Express → cria a API
- MySQL → banco de dados
- mysql2 → conecta Node com MySQL

---

## 📁 Estrutura

```
backend/
  server.js
  db.js
  routes/empresa.js

database/
  schema.sql

index.html
style.css
```

---

## 🔌 Como rodar o projeto

Instalar dependências:

```
npm install
```

Rodar o servidor:

```
node backend/server.js
```

Abrir no navegador:

```
index.html
```

---

## 🗄️ Banco de dados

Tabelas principais:

- empresa
- nome_associado
- termo_associado
- empresa_concorrente

---

## 🔁 Lógica de concorrentes

Quando informamos uma concorrente:

- Se já existe → usa o ID existente
- Se não existe → cadastra
- Depois cria o vínculo entre empresas

---

## ✅ Resultado

Agora o sistema:

✔ salva empresa  
✔ salva nomes  
✔ salva termos  
✔ relaciona concorrentes corretamente  

---

## 🚀 Próximos passos

- múltiplos concorrentes?
- evitar duplicidade de relacionamento  
- tela de listagem  
- validações
