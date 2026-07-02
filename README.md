# Ronda Diária

Plataforma de monitoramento de notícias corporativas para acompanhar empresas, concorrentes, percepção de mídia e indicadores de sentimento. A aplicação permite cadastrar empresas, buscar notícias relacionadas, salvar conteúdos relevantes, enriquecer resumos com IA e visualizar um dashboard executivo com gráficos e relatório analítico.

## Visão geral

O Ronda Diária foi desenvolvido para apoiar rotinas de inteligência de mercado, reputação e acompanhamento de empresas. O fluxo principal é:

1. Cadastrar empresas monitoradas, incluindo ticker/bolsa, país, ramo, nomes associados, termos de busca e concorrentes.
2. Pesquisar notícias relacionadas às empresas e seus termos de monitoramento.
3. Salvar notícias relevantes no banco de dados.
4. Processar notícias com IA para gerar resumo, sentimento, sensacionalismo, confiabilidade e análise factual.
5. Consultar os dados em telas operacionais e em um dashboard com indicadores e relatório executivo.

## Funcionalidades

- Cadastro, edição, listagem e remoção de empresas.
- Associação de nomes alternativos e termos de busca por empresa.
- Relacionamento com concorrentes cadastrados ou concorrentes informados manualmente.
- Busca e salvamento de notícias relacionadas às empresas.
- Listagem de notícias salvas.
- Enriquecimento de notícias em background com Gemini, usando BullMQ e Redis.
- Resumo de notícias com Gemini ou DeepSeek, quando configurados.
- Dashboard de sentimentos com Chart.js.
- Geração de relatório executivo com IA a partir das notícias salvas.
- Simulação de histórico de ações correlacionado ao sentimento das notícias.
- Execução local via Node.js ou ambiente completo via Docker Compose.

## Tecnologias

- **Frontend:** HTML, CSS e JavaScript puro.
- **Backend:** Node.js e Express.
- **Banco de dados:** PostgreSQL.
- **Fila/background jobs:** BullMQ com Redis.
- **IA:** Gemini e, como alternativa para resumo, DeepSeek.
- **Visualização de dados:** Chart.js.
- **Containerização:** Docker e Docker Compose.

## Estrutura do projeto

```text
.
├── cadastro.html              # Tela de cadastro e gerenciamento de empresas/clientes
├── dashboard.html             # Dashboard de sentimentos, gráficos e relatório
├── empresas.html              # Tela de listagem/edição de empresas
├── index.html                 # Tela principal de busca de notícias
├── noticias.html              # Tela de notícias salvas
├── database/
│   └── schema.sql             # Estrutura inicial do banco PostgreSQL
├── src/
│   ├── server.js              # Inicialização do servidor Express
│   ├── config/
│   │   └── db.js              # Configuração de conexão com PostgreSQL
│   ├── queues/
│   │   ├── noticiaQueue.js    # Configuração da fila BullMQ
│   │   └── noticiaWorker.js   # Worker de análise de notícias em background
│   └── routes/
│       ├── empresa.js         # Rotas de empresas e simulação de ações
│       ├── noticia.js         # Rotas de notícias salvas
│       ├── relatorio.js       # Rota de relatório executivo com IA
│       └── resumo.js          # Rota de extração/resumo/análise de notícias
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

## Pré-requisitos

Para rodar localmente sem Docker:

- Node.js 18 ou superior.
- PostgreSQL.
- Redis, caso queira usar o processamento em background.

Para rodar com Docker:

- Docker.
- Docker Compose.

## Variáveis de ambiente

A aplicação lê configurações pelo ambiente. As principais são:

```env
PORT=3000

PGHOST=localhost
PGPORT=5432
PGUSER=postgres
PGPASSWORD=postgres
PGDATABASE=ronda_diaria

REDIS_HOST=127.0.0.1
REDIS_PORT=6379

GEMINI_API_KEY=sua_chave_gemini
DEEPSEEK_API_KEY=sua_chave_deepseek
SERPER_API_KEY=sua_chave_serper
```

Também é possível usar `DATABASE_URL`. Quando essa variável existe, ela tem prioridade sobre as variáveis `PGHOST`, `PGUSER`, `PGPASSWORD`, `PGDATABASE` e `PGPORT`.

> Observação: o enriquecimento completo de notícias e a geração de relatório executivo dependem de `GEMINI_API_KEY`. Sem essa chave, a aplicação ainda pode salvar e listar dados, mas não terá a análise avançada por IA.

## Como rodar com Docker

Esta é a forma mais simples para subir aplicação, PostgreSQL e Redis juntos.

```bash
docker compose up --build
```

Depois do primeiro build, use:

```bash
docker compose up
```

Para parar os containers:

```bash
docker compose down
```

Para parar e apagar também o volume do banco:

```bash
docker compose down -v
```

Com Docker Compose, a API fica disponível em:

```text
http://localhost:3000
```

O serviço do PostgreSQL usa a imagem `postgres:17`, e o schema inicial é carregado a partir de `database/schema.sql`.

## Como rodar localmente

Instale as dependências:

```bash
npm install
```

Crie o banco PostgreSQL e execute o schema:

```bash
psql -U postgres -d ronda_diaria -f database/schema.sql
```

Garanta que o Redis esteja rodando se for usar a fila de processamento:

```bash
redis-server
```

Inicie a aplicação:

```bash
npm start
```

Acesse:

```text
http://localhost:3000
```

## Páginas principais

- `index.html`: busca de notícias e seleção de empresas monitoradas.
- `cadastro.html`: cadastro e manutenção de empresas/clientes.
- `empresas.html`: listagem, edição e exclusão de empresas.
- `noticias.html`: consulta de notícias salvas.
- `dashboard.html`: indicadores, gráficos, relatório executivo e simulação de ações.

O servidor Express publica os arquivos estáticos da raiz do projeto, então essas páginas podem ser acessadas diretamente pelo navegador a partir de `http://localhost:3000`.

## Banco de dados

As tabelas principais são:

- `empresa`: dados básicos das empresas monitoradas.
- `nome_associado`: variações de nomes vinculadas a uma empresa.
- `termo_associado`: termos adicionais usados para busca.
- `empresa_concorrente`: vínculo entre empresas cadastradas como concorrentes.
- `concorrente_associado`: concorrentes informados manualmente.
- `noticia_salva`: notícias salvas, sentimento, resumo, imagem, data e métricas de análise.

Os relacionamentos usam `ON DELETE CASCADE`, portanto a remoção de uma empresa também remove associações e notícias relacionadas.

## API

### Empresas

`GET /empresas`

Lista até 50 empresas cadastradas, incluindo nomes, termos e concorrentes agregados.

`POST /empresas`

Cadastra uma nova empresa.

Exemplo de corpo:

```json
{
  "nome": "Empresa Exemplo",
  "bolsa": "EXMP3",
  "pais": "Brasil",
  "ramo": "Tecnologia",
  "concorrente": "Concorrente Exemplo",
  "nomes": ["Empresa Exemplo S.A.", "Exemplo"],
  "termos": ["resultado trimestral", "governança"]
}
```

`PUT /empresas/:id`

Atualiza dados básicos, nomes associados, termos associados e concorrente da empresa.

`DELETE /empresas/:id`

Remove uma empresa.

`GET /empresas/:id/acoes`

Gera uma série simulada de 14 dias de preço/variação, correlacionada aos sentimentos das notícias salvas.

### Notícias

`GET /noticias`

Lista notícias salvas, incluindo resumo, sentimento, sensacionalismo, confiabilidade e análise factual.

`POST /noticias`

Salva uma notícia. Quando `GEMINI_API_KEY` está configurada, a notícia é enviada para a fila `noticiasQueue` para análise em background.

Exemplo de corpo:

```json
{
  "empresaId": 1,
  "empresaNome": "Empresa Exemplo",
  "titulo": "Empresa Exemplo anuncia novo investimento",
  "link": "https://exemplo.com/noticia",
  "resumo": "Resumo inicial da notícia.",
  "data": "2026-07-02",
  "imagem": "https://exemplo.com/imagem.jpg",
  "sentimento": "neutro"
}
```

### Resumo

`POST /resumo`

Recebe uma lista de notícias, extrai o texto das páginas e tenta resumir/analisar as primeiras 10 notícias. Usa Gemini quando disponível; se não houver Gemini, tenta DeepSeek para resumo simples.

### Relatório

`POST /relatorio`

Gera um relatório executivo em HTML com base nas últimas notícias salvas. Pode filtrar por empresa ou considerar todas as empresas.

Exemplo de corpo:

```json
{
  "empresaId": "all"
}
```

## Processamento em background

Quando uma notícia é salva em `POST /noticias`, o backend grava a notícia imediatamente no PostgreSQL. Se `GEMINI_API_KEY` estiver configurada, um job é adicionado à fila BullMQ.

O worker:

1. Acessa o link da notícia.
2. Extrai o texto principal com Cheerio.
3. Envia o conteúdo para o Gemini.
4. Atualiza a notícia salva com:
   - resumo final;
   - sentimento;
   - nota de sensacionalismo;
   - nota de confiabilidade;
   - justificativa factual.

Esse desenho evita que a interface dependa do tempo de resposta da IA para concluir o salvamento inicial.

## Testes e validação

O projeto possui um script de validação sintática dos arquivos principais do backend:

```bash
npm test
```

Esse comando executa `node --check` nos principais arquivos do servidor e das rotas. Ele não substitui testes automatizados de integração, mas ajuda a identificar erros de sintaxe rapidamente.

## Observações importantes

- O frontend atual usa páginas HTML independentes na raiz do projeto.
- Algumas telas consomem rotas relativas, como `/empresas`, `/noticias` e `/relatorio`; por isso, o ideal é acessar pelo servidor Express em `http://localhost:3000`.
- O Docker Compose configura `PGHOST=postgres` e `REDIS_HOST=redis`, que são os nomes dos serviços dentro da rede Docker.
- A análise com IA depende de acesso externo às APIs configuradas nas variáveis de ambiente.

## Possíveis evoluções

- Centralizar a busca de notícias no backend para evitar exposição de chaves no frontend.
- Adicionar autenticação e controle de usuários.
- Criar migrations versionadas para o banco.
- Ampliar a suíte de testes com testes de integração para rotas e banco.
- Unificar estilos compartilhados das páginas em arquivos CSS reutilizáveis.
- Adicionar paginação e filtros avançados para empresas e notícias.
