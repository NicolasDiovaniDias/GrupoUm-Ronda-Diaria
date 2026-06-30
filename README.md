# Ronda Diária – Backend (Resumo Didático)

## 🎯 O que foi feito

Criamos um sistema que permite:

- Cadastrar uma empresa
- Adicionar nomes associados
- Adicionar termos associados
- Relacionar uma empresa concorrente

Tudo isso integrado com um banco de dados PostgreSQL.

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
- PostgreSQL → banco de dados
- pg → conecta Node com PostgreSQL

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
npm start
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


para criar na primeira vez >>> docker compose up --build
para parar >>> docker compose down 
para rodar depois de já criado >>> docker compose up

caso queira remover o volume e apagar o db >>> docker compose down -v

API >>> http://localhost:3000
http://localhost:3000/html/index.html
http://localhost:3000/html/pesquisa.html
http://localhost:3000/html/teste.html

>>> host agora é 'postgres' no Docker e pode ser configurado via DATABASE_URL fora do container

Observação: o ambiente Docker usa PostgreSQL 17 para evitar problemas de inicialização com o volume local.

## ✅ Sugestões de evolução

- adicionar testes automáticos para as rotas principais
- criar validação de campos no frontend e no backend
- remover páginas antigas ou unificar a experiência em uma única interface
- adicionar índice/constraint de unicidade para evitar duplicidades no cadastro
