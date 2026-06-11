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
- **Objetivo da Sprint:** Desenvolvimento do frontend, integração dos filtros com o backend e finalização do ambiente conteinerizado.

---

## 📌 1. Resumo Executivo

A Sprint 3 foi **concluída com sucesso absoluto**, com a equipe entregando 100% dos cards planejados. Embora o grupo tenha enfrentado desafios iniciais complexos no backend (estruturação do `JOIN`) e na infraestrutura (configuração do Docker), a realização de forças-tarefas permitiu destravar o desenvolvimento em efeito cascata. Como resultado, os filtros de busca (nome, ramo e termo) foram totalmente integrados, a tabela do frontend está funcional, as validações de duplicidade e segurança foram implementadas e o ambiente Docker está consolidado.

- **A sprint foi:**
  - [x] Concluída com sucesso
  - [ ] Parcialmente concluída
  - [ ] Não concluída

- **Principais entregas:**
  1. Ambiente totalmente conteinerizado com Docker.
  2. Endpoints de listagem, detalhes e filtros por query (`JOIN`) operando com sucesso.
  3. Interface completa (listagem, detalhes, formulários, feedbacks visuais e layout de demonstração).
  4. Validações de segurança e anti-duplicidade no front e back.

- **Principais dificuldades (superadas):**
  1. Bloqueio temporário no início da sprint para reorganização do ambiente com Docker.
  2. Complexidade na lógica do banco de dados (`JOIN`), resolvida em conjunto para liberar as tarefas de filtros.
  3. Controle do limite de requisições da API no frontend.

---

## ✅ 2. Itens Planejados vs Entregues

| User Story / Tarefa                          | Responsável | Story Points | Status | Observações |
| -------------------------------------------- | ----------- | ------------ | ------ | ----------- |
| S3T1 - Criar endpoint GET / empresas         | nicolas     |              | 🟢      |             |
| S3T2 - Retornar empresas com dados básicos   | geraldo     |              | 🟢      |             |
| S3T3 - Criar página de listagem.html         | nicolas     |              | 🟢      |             |
| S3T4 - Consumir API com fetch()              | geraldo     |              | 🟢      |             |
| S3T5 - Exibir empresas em tabela             | nicolas     |              | 🟢      |             |
| S3T6 - Criar endpoint GET / empresas/:id     | geraldo     |              | 🟢      |             |
| S3T7 - Buscar dados relacionados (JOIN)      | geraldo     |              | 🟢      |             |
| S3T8 - Criar tela de detalhes                | nicolas     |              | 🟢      |             |
| S3T9 - Exibir dados                          | nicolas     |              | 🟢      |             |
| S3T10 - Filtro por nome                      | artur       |              | 🟢      |             |
| S3T11 - Filtro por ramo                      | artur       |              | 🟢      |             |
| S3T12 - Filtro por termo                     | artur       |              | 🟢      |             |
| S3T13 - Input de busca no frontend           | nicolas     |              | 🟢      |             |
| S3T14 - Melhorar layout do formulário        | nicolas     |              | 🟢      |             |
| S3T15 - Criar layout da listagem             | nicolas     |              | 🟢      |             |
| S3T16 - Padronizar inputs e botões           | nicolas     |              | 🟢      |             |
| S3T17 - Feedback visual (msgs, loading)      | nicolas     |              | 🟢      |             |
| S3T18 - Validação no frontend                | geraldo     |              | 🟢      |             |
| S3T19 - Validação no backend                 | nicolas     |              | 🟢      |             |
| S3T20 - Evitar duplicidade de concorrentes   | geraldo     |              | 🟢      |             |
| S3T21 - Melhorar mensagens de erro           | nicolas     |              | 🟢      |             |
| S3T22 - Desenvolvimento do ambiente (Docker) | natalia     |              | 🟢      |             |
| S3T23 - Criação de layout p/ demonstração    | nicolas     |              | 🟢      |             |

---

## 🚀 3. Entregas da Sprint

### Funcionalidades implementadas

* **Desenvolvimento do Backend e APIs:** Foram criados os endpoints principais do sistema, incluindo a listagem geral (`GET /empresas` - S3T1) com retorno de dados básicos (S3T2), e a busca específica (`GET /empresas/:id` - S3T6) que traz dados relacionados do banco de dados utilizando `JOIN` (S3T7). Além disso, o backend ganhou validações de segurança (S3T19) e uma regra para evitar a duplicidade de concorrentes (S3T20).
* **Integração e Frontend:** A comunicação entre os sistemas foi estabelecida com o consumo da API via `fetch()` (S3T4). Foram desenvolvidas a página de listagem (`listagem.html` - S3T3) com exibição de dados em formato de tabela (S3T5) e a tela de detalhes (S3T8) com exibição dinâmica dos dados (S3T9).
* **Mecanismo de Busca e Filtros:** Foi implementado um input de busca na interface (S3T13) integrado a filtros robustos no sistema, permitindo a filtragem de empresas por nome (S3T10), ramo (S3T11) e por termo geral (S3T12).
* **Experiência do Usuário (UI/UX):** A interface recebeu melhorias visuais no layout do formulário (S3T14), da listagem (S3T15) e na padronização de botões e inputs (S3T16). A usabilidade foi aprimorada com validações no frontend (S3T18), feedbacks visuais como mensagens e loading (S3T17) e o tratamento amigável de mensagens de erro (S3T21). Um layout exclusivo para a demonstração final também foi entregue (S3T23).
* **Infraestrutura e Ambiente:** O ambiente de desenvolvimento foi totalmente isolado e configurado utilizando Docker (S3T22), o que garante que o projeto rode perfeitamente e de forma padronizada na máquina de qualquer desenvolvedor.

### Evidências (obrigatório)

- **Link do repositório:** https://github.com/NicolasDiovaniDias/GrupoUm-Ronda-Diaria
- **Link do quadro Kanban:** https://trello.com/invite/b/69e17154565179f483164030/ATTId7780585daefbc36908cfde6fbe9da265AEE9253/ronda-diaria
- **Prints ou GIFs:** [Inserir Mídia Aqui]
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
  - Incoerência momentânea de resultados por limite de requisições da API excedido durante desenvolvimento.

- **Bugs corrigidos:**
  - Otimização das chamadas do `fetch()` no frontend para evitar requisições duplicadas em loops e tratamento de erros de *rate limit*, normalizando os retornos.

---

## 🔧 5. Processo e Ferramentas

- **Controle de versão utilizado:** Git
- **Estratégia de branch:** Feature Branch / GitHub Flow
- **Uso de CI/CD:** Não aplicado nesta sprint
- **Ferramentas utilizadas:** Trello (gestão e Kanban), Docker (conteinerização), GitHub (repositório), HTML/JS puro (Frontend/Fetch)

---

## ⚠️ 6. Impedimentos (Resolvidos)

| Impedimento | Impacto | Solução adotada |
| :--- | :--- | :--- |
| **Consulta SQL com JOIN (S3T7)** | Havias travado a extração de dados completos e os filtros (Artur/Nicolas). | **Resolvido:** Realizado *pair programming* focado para ajustar as queries, liberando todas as dependências do fluxo. |
| **Limite de requisições da API** | Gerou instabilidade e retornos incoerentes no frontend. | **Resolvido:** Implementada lógica de controle no `fetch()` para reduzir requisições desnecessárias. |

---

## 🔄 7. Retrospectiva da Sprint

### 👍 O que funcionou bem
- Excelente entrosamento do grupo ao realizar forças-tarefas para eliminar os gargalos técnicos.
- Entrega robusta de UI combinada com ambiente isolado via Docker.

### 👎 O que pode melhorar
- Falta de estimativa de esforço no início (Story Points não foram bem definidos nos cards antes da execução).
- Dependência muito acavalada no início entre as tarefas de backend e frontend.

### 🔁 Ações para próxima sprint
- Adotar o preenchimento obrigatório de Story Points durante o planejamento da Sprint 4.
- Planejar arquiteturas com mocks no frontend para evitar que atrasos no backend travem a equipe de UI.

---

## 📊 8. Métricas da Sprint

- **Story Points planejados:** 23
- **Story Points concluídos:** 23
- **Velocidade da equipe:** 23
- **% Entrega:** 100.0%
- **Nº de tarefas concluídas:** 23
- **Nº de tarefas não concluídas:** 0
- **Nº de commits:** 6
- **Nº de PRs:** [Inserir quantidade]

---

## 🎯 9. Planejamento Inicial da Próxima Sprint

- **Principais objetivos:** Realizar a pesquisa e planejamento de modelos de Inteligência Artificial adequados ao escopo do Ronda Diária, definir a estratégia de integração da IA com a nossa API atual e dar continuidade ao polimento e expansão do layout do frontend.
- **Itens já priorizados:** Pesquisa de APIs/modelos de IA, estruturação do backend para recepção da IA, e novas views de relatórios.
- **Riscos identificados:** A curva de aprendizado para a integração e consumo dos modelos de IA pode exigir mais tempo de desenvolvimento, demandando uma prototipagem rápida logo nos primeiros dias da sprint.
