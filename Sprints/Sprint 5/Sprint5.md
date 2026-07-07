# 📄 Status Report – Sprint 5

## 👥 Equipe

- **Nome do projeto:** Ronda Diária
- **Integrantes:** Artur, Nicolas, Natalia, Geraldo e Felipe
- **Scrum Master da Sprint:** Felipe
- **Product Owner:** Nicolas
- **DevOps:** Natália
- **Ful Stack:** Geraldo
- **Apoio:** Artur

---

## 📅 Informações da Sprint

- **Número da Sprint:** 5
- **Período:** 12/06 – 25/06
- **Objetivo da Sprint:** Finalizar o módulo de empresas no backend, migrar a estrutura de banco de dados, implementar uma nova API de buscas e realizar o deploy do projeto em nuvem.

> **Objetivos no planejamento:**
>
> - Concluir as operações de listagem, edição e exclusão de empresas.
> - Substituir a busca RSS por uma API mais estável (Serper.dev).
> - Alterar o banco de dados de MySQL para PostgreSQL.
> - Realizar o deploy da aplicação utilizando o Render.

---

## 📌 1. Resumo Executivo

A Sprint 5 foi focada em estabilizar a infraestrutura e finalizar a lógica de backend. A equipe alterou o banco de dados de MySQL para PostgreSQL e adaptou o contêiner Docker para essa nova estrutura, garantindo melhor performance. A busca de notícias foi aprimorada com a integração da API Serper.dev, resolvendo instabilidades anteriores. O deploy da aplicação foi realizado na plataforma Render, porém ajustes adicionais no ambiente de produção foram necessários para garantir a correta criação de tabelas e permitir o cadastro de empresas no ambiente em nuvem.

- **A sprint foi:**

  - [ ] Concluída com sucesso
  - [x] Parcialmente concluída
  - [ ] Não concluída

- **Principais entregas:**

  1. Migração do banco de dados para PostgreSQL e configuração atualizada do Docker.
  2. Integração da API Serper.dev para extração de notícias de forma confiável.
  3. Módulo de empresas finalizado, incluindo endpoints e telas básicas de listagem e detalhes (S4T4, S4T14, S4T15).
  4. Deploy da aplicação em nuvem através da plataforma Render.

- **Principais dificuldades:**

1.  Conflitos locais de porta (5432) durante a configuração do PostgreSQL via Docker.
2.  O Vercel mostrou-se incompatível com o banco de dados utilizado, forçando a equipe a pesquisar e migrar para a plataforma Render.
3.  Falhas pontuais na criação de tabelas no Render, que impediram temporariamente o cadastro de empresas e a realização de testes no ambiente de produção.

---

## ✅ 2. Itens Planejados vs Entregues

**Status possíveis:**

- 🟢 Concluído
- 🟡 Em andamento
- 🔴 Não iniciado
- ⚫ Bloqueado

| User Story / Tarefa                          | Responsável | Story Points | Status | Observações |
| -------------------------------------------- | ----------- | ------------ | ------ | ----------- |
| S5T1 - Criar página lista.html para Empresas | geraldo     |              | 🟢     |             |
| S5T2 - Implementar edição de empresas        | geraldo     |              | 🟢     |             |
| S5T3 - Implementar exclusão de empresas      | geraldo     |              | 🟢     |             |
| S5T4 - Criar página lista.html para Empresas | geraldo     |              | 🟢     |             |
| S5T5 - Ver vercel e ci/cd                    | natalia     |              | 🟢     |             |
| S5T6 - Configurar banco PostgreSQL           | natalia     |              | 🟢     |             |
| S5T7 - Integrar API Serper.dev               | nicolas     |              | 🟢     |             |
| S5T8 - Documentação Sprint                   | felipe      |              | 🟢     |             |

---

## 🚀 3. Entregas da Sprint

### Funcionalidades implementadas

- **Migração de Banco de Dados:** Substituição do MySQL pelo PostgreSQL para viabilizar o deploy gratuito na nuvem, com o respectivo ajuste no ambiente Docker..
- **Deploy em Nuvem:** O projeto saiu do ambiente local e foi hospedado online utilizando a plataforma Render (após tentativa frustrada com o Vercel devido à incompatibilidade com o banco).
- **Nova API de Busca:** Substituição da busca via RSS pela integração com a API Serper.dev, melhorando a confiabilidade e trazendo mais dados (como imagens) para as notícias.
- **Finalização de Endpoints:** Conclusão do backend do módulo de empresas, consolidando o fluxo de listagem e detalhes do CRUD.

### Evidências (obrigatório)

- **Link do repositório:** https://github.com/NicolasDiovaniDias/GrupoUm-Ronda-Diaria
- **Link do quadro Kanban:** https://trello.com/invite/b/69e17154565179f483164030/ATTId7780585daefbc36908cfde6fbe9da265AEE9253/ronda-diaria
- **Prints ou GIFs:**
- **Link do deploy (se houver):**

---

## 🧪 4. Qualidade e Testes

- **Tipos de testes realizados:**

  - [x] Manual
  - [ ] Automatizado
  - [ ] Unitário
  - [ ] Integração

- **Cobertura (se aplicável):** N/A

- **Bugs encontrados:**

  - Conflito de porta (5432) ao subir o Docker do PostgreSQL, causado por uma instância local do banco rodando no notebook de um dos desenvolvedores.
    Incompatibilidade da Vercel em suportar o banco de dados da aplicação em seu plano gratuito.

- **Bugs corrigidos:**
  - O serviço local do Postgres foi interrompido, liberando a porta e destravando a subida do contêiner Docker.
    Incompatibilidade da Vercel em suportar o banco de dados da aplicação em seu plano gratuito.
  - O ambiente de produção foi integralmente migrado da Vercel para o Render.

---

## 🔧 5. Processo e Ferramentas

- **Controle de versão utilizado:** Git
- **Estratégia de branch:** Feature Branch / GitHub Flow
- **Uso de CI/CD:** Deploy contínuo configurado via Render.
- **Ferramentas utilizadas:** Trello (gestão), Docker (conteinerização do Postgres), Render (Cloud Hosting), Serper.dev (API de buscas).

---

## ⚠️ 6. Impedimentos

| Impedimento                   | Impacto                                                                            | Solução adotada                                                                                          |
| ----------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Hospedagem inviável na Vercel | Bloqueava a visualização online do projeto e a criação do banco de dados gratuito. | Migração da infraestrutura em nuvem para a plataforma Render, exigindo a troca do MySQL pelo PostgreSQL. |
|                               |                                                                                    |                                                                                                          |
| Layout HTML estagnado (S4T5)  | Atrasa a unificação final do visual com o backend.                                 | Tarefa realocada como prioridade máxima para desbloqueio na Sprint 6.                                    |

---

## 🔄 7. Retrospectiva da Sprint

### 👍 O que funcionou bem

- A equipe tomou decisões rápidas de infraestrutura (migrar de MySQL para PostgreSQL e de Vercel para Render) sem deixar o projeto paralisar.
- O ambiente Docker provou seu valor, garantindo que a base de dados subisse corretamente na máquina dos desenvolvedores após a migração.

### 👎 O que pode melhorar

- Gargalos de dependência: O desenvolvimento do Frontend/Layout atrasou e acabou bloqueando os testes visuais de outras tarefas.
- Encontros síncronos foram difíceis de agendar devido à rotina final de semestre dos integrantes.

### 🔁 Ações para próxima sprint

- Implementar a Inteligência Artificial e unificar o projeto.
- Definir roteiro e papéis para a apresentação final do dia 02/07.

---

## 📊 8. Métricas da Sprint

- **Story Points planejados:** 0 (Não preenchidos)
- **Story Points concluídos:** 0
- **Velocidade da equipe:** 12 _(Baseado puramente no número de cards entregues)_
- **% Entrega:** 63,1% _(12 cards finalizados de 19 planejados)_
- **Nº de tarefas concluídas:** 12
- **Nº de tarefas não concluídas:** 7 _(Todas na categoria Não Iniciado/A Fazer)_
- **Nº de commits:** _(A verificar no GitHub)_
- **Nº de PRs:** _(A verificar no GitHub)_

---

## 🎯 9. Planejamento Inicial da Próxima Sprint

- **Principais objetivos:** Testar inteligências artificiais (DeepSeek), proteger as chaves no arquivo .env, resolver a tela final (HTML/CSS) e preparar o Pitch para apresentação final.
- **Itens já priorizados:** S4T16 (Integração de IA), S4T5 (Frontend).
- **Riscos identificados:** Possibilidade de não entrega da todalidade das funcionalidades previstas.
