# 📄 Status Report – Sprint 4

## 👥 Equipe

- **Nome do projeto:** Ronda Diária
- **Integrantes:** Artur, Nicolas, Natalia, Geraldo e Felipe
- **Scrum Master da Sprint:** Geraldo
- **Product Owner:** Nicolas

---

## 📅 Informações da Sprint

- **Número da Sprint:** 4
- **Período:** 05/05 – 11/06
- **Objetivo da Sprint:** Atualizar as pendências que haviam ficado e começar a desenvolver o que deve ser o resultado final do frontend.

> **Objetivos no planejamento:**
>
> - Resolver impedimento do banco de dados (JOIN).
> - Criar endpoints de edição (PUT) e exclusão (DELETE).
> - Implementar páginas de listagem e detalhes de empresas.
> - Adicionar modais e navegação no frontend.
> - Pesquisar implementação de IA e busca de notícias.

---

## 📌 1. Resumo Executivo

A Sprint 4 trouxe uma grande vitória técnica para a equipe, consolidando a estrutura que servirá de base para a entrega da disciplina de Projetos 1 da UniSenac. O impedimento crítico relacionado ao banco de dados (JOIN) foi resolvido com sucesso, o que permitiu à equipe destravar e implementar de ponta a ponta as operações completas de CRUD (criação, edição e exclusão) e busca de empresas. Além disso, avançamos significativamente no frontend com a criação das telas finais e modais de interação. A resolução do gargalo no banco de dados abre caminho para a integração do sistema que funcionará como um web scraper de notícias voltado ao marketing.

- **A sprint foi:**

  - [ ] Concluída com sucesso
  - [x] Parcialmente concluída
  - [ ] Não concluída

- **Principais entregas:**

  1. Resolução do JOIN no banco de dados, liberando as integrações pendentes.
  2. Implementação das operações completas de exclusão (DELETE) e edição (PUT) de empresas na API e no frontend.
  3. Desenvolvimento avançado da UI final (página de listagem, navegação para detalhes e modais de mensagens).

- **Principais dificuldades:**

1.  Desorganização do quadro Kanban, com geração de múltiplos cards contendo códigos ID duplicados (ex: dois cards S4T7, dois S4T8).
2.  Tarefas focadas em documentação, CI/CD e pesquisas de inteligência artificial acabaram ficando paralisadas no Backlog devido ao foco no destravamento técnico do código.

---

## ✅ 2. Itens Planejados vs Entregues

**Status possíveis:**

- 🟢 Concluído
- 🟡 Em andamento
- 🔴 Não iniciado
- ⚫ Bloqueado

| User Story / Tarefa                                | Responsável | Story Points | Status | Observações |
| -------------------------------------------------- | ----------- | ------------ | ------ | ----------- |
| S4T1 - Buscar nova solução de busca de notícias    |             |              | 🔴     |             |
| S4T2 - Fazer os documentos da sprint 3             | felipe      |              | 🔴     |             |
| S4T3 - Criar endpoint GET /empresas                | geraldo     |              | 🟢     |             |
| S4T4 - Criar página lista.html para Empresas       |             |              | 🟢     |             |
| S4T5 - Front-end: Criar layout HTML                | artur       |              | 🔴     |             |
| S4T6 - Criar endpoint GET /empresas/:id            | geraldo     |              | 🟢     |             |
| S4T7 - Buscar dados relacionados da empresa        | geraldo     |              | 🔴     |             |
| S4T8 - Criar página detalhes.html                  | geraldo     |              | 🟢     |             |
| S4T9 - Ver vercel e ci/cd                          | natalia     |              | 🔴     |             |
| S4T10 - Adicionar navegação p/ detalhes da empresa |             |              | 🟢     |             |
| S4T11 - Implementar busca de empresas              |             |              | 🟢     |             |
| S4T12 - Criar endpoint PUT /empresas/:id           |             |              | 🟢     |             |
| S4T13 - Criar endpoint DELETE /empresas/:id        | geraldo     |              | 🟢     |             |
| S4T14 - Implementar edição de empresas             |             |              | 🟢     |             |
| S4T15 - Implementar exclusão de empresas           |             |              | 🟢     |             |
| S4T16 - Pesquisa e soluções de implementação da IA | felipe      |              | 🟡     |             |
| S4T17 - Organizar e criar tarefas da S3            |             |              | 🔴     |             |
| S4T18 - Organizar Trello                           | natalia     |              | 🔴     |             |

---

## 🚀 3. Entregas da Sprint

### Funcionalidades implementadas

- **Consultas Complexas Destravadas:** Resolução do banco de dados que impedia a busca de dados relacionados das empresas (S4T7).
- **Endpoints de Gerenciamento:** Criação de rotas para edição (`PUT`) e deleção (`DELETE`) concluídas (S4T12, S4T13).
- **Avanços na Interface:** Criação das páginas finais de listagem e detalhes (S4T4, S4T8).
- **Interatividade no Front:** Inclusão de modal de feedback para o usuário, melhorando a experiência da aplicação (S4T16), além de buscas, navegação e exclusões ativas na tela (S4T11, S4T14, S4T15).

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

  - Nenhum bug grave relatado nesta iteração.

- **Bugs corrigidos:**
  - O erro estrutural do backend da Sprint 3 (falha na construção do JOIN) que impossibilitava o cruzamento de informações foi totalmente solucionado.

---

## 🔧 5. Processo e Ferramentas

- **Controle de versão utilizado:** Git
- **Estratégia de branch:** Feature Branch / GitHub Flow
- **Uso de CI/CD:** Não aplicado nesta sprint
- **Ferramentas utilizadas:** Trello (gestão e Kanban), Docker (conteinerização), GitHub (repositório), HTML/JS (Frontend/Fetch)

---

## ⚠️ 6. Impedimentos

| Impedimento                                    | Impacto                           | Solução adotada                             |
| ---------------------------------------------- | --------------------------------- | ------------------------------------------- |
| Configuração de deploy pendente (CI/CD Vercel) | Retarda a visualização do projeto | Planejado para repasse e priorização máxima |
|                                                | rodando em um link público para   | na próxima sprint.                          |
|                                                | a banca ou testes externos.       |

---

## 🔄 7. Retrospectiva da Sprint

### 👍 O que funcionou bem

- Grande capacidade da equipe de "desenrolar" um alto volume de tarefas (`12 concluídas`) assim que o bloqueio principal do banco de dados foi removido.
- Implementação funcional fluida do fluxo de CRUD no frontend.

### 👎 O que pode melhorar

- Manutenção do quadro Kanban. Foram abertos vários cards com números IDs repetidos, o que confunde as métricas e a clareza do escopo de quem está desenvolvendo.
- Falta contínua de estimativa de esforço (Story Points em branco).
- As documentações de controle e pesquisa para a integração da IA ficaram paralisadas.

### 🔁 Ações para próxima sprint

- Fazer uma "faxina" no Trello, padronizando os IDs e eliminando tarefas S3 antigas que poluem a tela.
- Focar energia em resolver o ambiente de deploy (Vercel) para que exista um entregável palpável online.

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

- **Principais objetivos:** Finalizar os estudos de implementação de IA, fechar as pendências de documentação e realizar o deploy do projeto em ambiente online (Vercel / CI-CD).
- **Itens já priorizados:** S4T1 (Busca de notícias scraper), S4T16 (Pesquisas IA), S4T9 (Vercel).
- **Riscos identificados:** A postergação contínua da configuração do servidor de hospedagem pode causar quebras imprevistas no código quando ele sair do ambiente local do Docker para a nuvem.
