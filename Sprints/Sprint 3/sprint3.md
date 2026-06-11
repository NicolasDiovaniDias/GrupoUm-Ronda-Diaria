# 📄 Status Report – Sprint 3

## 👥 Equipe

- **Nome do projeto:** Ronda Diária
- **Integrantes:** Artur, Nicolas, Natalia, Geraldo e Felipe
- **Scrum Master da Sprint:** Geraldo
- **Product Owner:** Nicolas

---

## 📅 Informações da Sprint

- **Número da Sprint:** 3
- **Período:** 30/04 – 21/05
- **Objetivo da Sprint:** Desenvolvimento do frontend e finalização do ambiente

> (Descrever o objetivo definido no planejamento)
> Desenvolvimento do ambiente docker
> Retornar empresas com dados básicos
> Criar página de listagem.html
> Consumir API com fetch()
> Exibir empresas em tabela
> Criar endpoint GET / empresas/:id
> Buscar dados relacionados (JOIN)
> Criar tela de detalhes
> Exibir dados
> Input de busca no frontend
> Melhorar layout do formulário
> Criar layout de listagem
> Padronizar inputs e botões
> Feedback visual (mensagem, loading)

---

## 📌 1. Resumo Executivo

A Sprint 3 trouxe avanços essenciais para o escopo do nosso trabalho, consolidando a infraestrutura com Docker e a integração inicial da API com o frontend. A equipe concluiu com sucesso a listagem básica das empresas, as telas de detalhes e o refinamento visual dos formulários, enquanto a renderização completa da tabela segue em progresso. O gargalo crítico da iteração ocorreu no backend, onde impedimentos na estruturação das consultas de banco (JOIN) bloquearam inteiramente o desenvolvimento dos filtros de busca. A resolução prioritária desse obstáculo técnico será indispensável para destravar a navegação e as validações pendentes.

- **A sprint foi:**

  - [ ] Concluída com sucesso
  - [x] Parcialmente concluída
  - [ ] Não concluída

- **Principais entregas:**

  1. Criação do ambiente.
  2. Busca retornando resultados com sucesso.
  3. Estruturação de interface (telas de listagem, detalhes e demonstração).

- **Principais dificuldades:**
  1. Bloqueio de atividade da equipe enquanto era reorganizado o ambiente e adicionado o Docker.
  2. Travamento na lógica do banco de dados (JOIN), gerando efeito cascata que bloqueou a construção de todos os filtros de pesquisa do sistema.
  3. Limite de requisições da API excedidos, causando incoerência nos resultados.

---

## ✅ 2. Itens Planejados vs Entregues

**Status possíveis:**

- 🟢 Concluído
- 🟡 Em andamento
- 🔴 Não iniciado
- ⚫ Bloqueado

| User Story / Tarefa                          | Responsável | Story Points | Status | Observações |
| -------------------------------------------- | ----------- | ------------ | ------ | ----------- |
| S3T1 - Criar endpoint GET / empresas         | nicolas     |              | 🟢     |             |
| S3T2 - Retornar empresas com dados básicos   | geraldo     |              | 🟢     |             |
| S3T3 - Criar página de listagem.html         | nicolas     |              | 🟢     |             |
| S3T4 - Consumir API com fetch()              | geraldo     |              | 🟢     |             |
| S3T5 - Exibir empresas em tabela             | nicolas     |              | 🟡     |             |
| S3T6 - Criar endpoint GET / empresas/:id     | nicolas     |              | 🔴     |             |
| S3T7 - Buscar dados relacionados (JOIN)      | geraldo     |              | ⚫     |             |
| S3T8 - Criar tela de detalhes                | nicolas     |              | 🟢     |             |
| S3T9 - Exibir dados                          | nicolas     |              | 🔴     |             |
| S3T10 - Filtro por nome                      | artur       |              | ⚫     |             |
| S3T11 - Filtro por ramo                      | artur       |              | ⚫     |             |
| S3T12 - Filtro por termo                     | artur       |              | ⚫     |             |
| S3T13 - Input de busca no frontend           | nicolas     |              | 🔴     |             |
| S3T14 - Melhorar layout do formulário        | nicolas     |              | 🟢     |             |
| S3T15 - Criar layout da listagem             | nicolas     |              | 🟡     |             |
| S3T16 - Padronizar inputs e botões           | nicolas     |              | 🔴     |             |
| S3T17 - Feedback visual (msgs, loading)      | nicolas     |              | 🔴     |             |
| S3T18 - Validação no frontend                | geraldo     |              | 🔴     |             |
| S3T19 - Validação no backend                 | nicolas     |              | 🔴     |             |
| S3T20 - Evitar duplicidade de concorrentes   | geraldo     |              | 🔴     |             |
| S3T21 - Melhorar mensagens de erro           | nicolas     |              | 🔴     |             |
| S3T22 - Desenvolvimento do ambiente (Docker) | natalia     |              | 🟢     |             |
| S3T23 - Criação de layout p/ demonstração    | nicolas     |              | 🟢     |             |

---

## 🚀 3. Entregas da Sprint

### Funcionalidades implementadas

- **Criação da rota de listagem:** Foi criado o endpoint `GET /empresas` (S3T1).
- **Retorno de dados:** A API já consegue retornar as empresas com seus dados básicos (S3T2).
- **Integração:** O frontend já está configurado para consumir essa API utilizando a função `fetch()` (S3T4).
- **Páginas e Telas:** Foram criadas a página de listagem (`listagem.html`) (S3T3) e a tela de detalhes (S3T8).
- **Melhorias visuais:** O layout do formulário foi melhorado (S3T14) e foi criado um layout específico para demonstração (S3T2).
- **Ambiente conteinerizado:** O desenvolvimento do ambiente utilizando Docker foi concluído (S3T22), o que facilita a padronização e execução do projeto.

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

  - Incoerência de resultados, limite de requisições da API excedidos.

- **Bugs corrigidos:**
  - Ajustes iniciais no consumo da API via `fetch()` para contornar problemas de chamadas duplicadas/limites, porém a estabilização completa dependerá da resolução do backend.

---

## 🔧 5. Processo e Ferramentas

- **Controle de versão utilizado:** Git
- **Estratégia de branch:** Feature Branch / GitHub Flow
- **Uso de CI/CD:** Não aplicado nesta sprint
- **Ferramentas utilizadas:** Trello (gestão e Kanban), Docker (conteinerização), GitHub (repositório), HTML/JS (Frontend/Fetch)

---

## ⚠️ 6. Impedimentos

| Impedimento                                        | Impacto                                    | Solução adotada                                     |
| -------------------------------------------------- | ------------------------------------------ | --------------------------------------------------- |
| Consulta SQL com junção de tabelas (JOIN) (S3T7)   | Bloqueou a extração de dados completos,    | Paralisação temporária das tarefas dependentes.     |
|                                                    | impedindo a criação dos filtros (termo,    | Foco redirecionado para concluir a infraestrutura   |
|                                                    | nome, ramo) do Artur e travando as         | (Docker) e layouts visuais. Necessário pair         |
|                                                    | tarefas de input no frontend do Nicolas.   | programming na próxima sprint.                      |
| -------------------------------------------------- | ------------------------------------------ | --------------------------------------------------- |
| Limite de requisições da API atingido              | Incoerência nos retornos exibidos no       | Ajustes na frequência das chamadas e tratamento     |
|                                                    | frontend.                                  | inicial de erros de rate limit.                     |

---

## 🔄 7. Retrospectiva da Sprint

### 👍 O que funcionou bem

- Entrosamento e dedicação do grupo.
- Entrega eficiente de toda a base de UI (telas) e consolidação do ambiente unificado via Docker para que toda a equipe pudesse trabalhar nas mesmas condições.

### 👎 O que pode melhorar

- Falta de estimativa de esforço (Story Points não preenchidos no Trello), dificultando a previsibilidade de entrega.
- Dependência forte entre backend e frontend (gargalo no JOIN), deixando desenvolvedores bloqueados sem poder avançar em suas próprias tarefas de filtro.
- Divisão de tasks de formas mais igualitárias de modo a não sobrecarregar nenhum dos integrantes.

### 🔁 Ações para próxima sprint

- Preencher corretamente os Story Points e Observações de cada card no planejamento.
- Realizar uma força-tarefa inicial (_pair programming_) entre quem está no back e quem fará as pesquisas no front para resolver a query do JOIN e destravar a sprint imediatamente.

---

## 📊 8. Métricas da Sprint

- **Story Points planejados:** 23
- **Story Points concluídos:** 8
- **Velocidade da equipe:** 8 _(Soma dos Story Points das User Stories com status 🟢 Concluído)_
- **% Entrega:** 34,7% _(Baseado em cards finalizados vs cards totais)_
- **Nº de tarefas concluídas:** 8
- **Nº de tarefas não concluídas:** 15 _(Em andamento, Bloqueadas e Não Iniciadas)_
- **Nº de commits:** 2
- **Nº de PRs:**

---

## 🎯 9. Planejamento Inicial da Próxima Sprint

- **Principais objetivos:** Destravar o backend (JOIN), finalizar o sistema de filtros, integrar a listagem com a visualização completa e aplicar validações no formulário (front e back) para prevenir duplicidades. Continuidade de desnvolvimento dos layout fronted. Pesquisa de modelos de IA e como integrar.
- **Itens já priorizados:** S3T7 (JOIN), S3T10/S3T11/S3T12 (Filtros), S3T13 (Input de busca), S3T18/S3T19 (Validações).
- **Riscos identificados:** O tempo estendido para correção do bloqueio no banco de dados pode empurrar o desenvolvimento e teste das funções de filtro e validação para perto da data limite de entrega da disciplina, comprometendo a estabilidade final do projeto na apresentação.
