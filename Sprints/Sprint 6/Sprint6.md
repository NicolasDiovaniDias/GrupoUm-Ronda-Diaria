# 📄 Status Report – Sprint 6

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

- **Número da Sprint:** 6
- **Período:** 26/06 – 09/07
- **Objetivo da Sprint:** Desenvolver o layout HTML final, integrar os agentes de Inteligência Artificial para análise das notícias e preparar a apresentação final do projeto.

> **Objetivos no planejamento:**
>
> - Finalizar o visual das páginas (Front-end).
> - Integrar IA.
> - Configurar as automações de rotina do web scraper (S6T2).
> - Preparar o pitch e os slides para a apresentação do dia 02/07.

---

## 📌 1. Resumo Executivo

A Sprint 6 apresentou avanços críticos na camada de inteligência do projeto. A IA foi implementada com sucesso no código e isolada em uma branch dedicada (dev final IA). Para otimização de custos operacionais, optou-se pela utilização da API do DeepSeek, configurada para processar e resumir apenas as 10 primeiras notícias de cada busca. NUm segundo momento também forma implementadas as APIs do Gemini e Llama, havendo uma variação no uso das IAs e desse modo evitar o excesso de requisições. O gerenciamento de segurança também foi aprimorado, mantendo as chaves de API restritas ao arquivo local .env (fora do repositório GitHub). Paralelamente, a equipe segue refinando o prompt de comando da IA e realizando os últimos reparos no ambiente de produção (Render) para garantir o funcionamento fluido da aplicação.

- **A sprint foi:**

  - [ ] Concluída com sucesso
  - [x] Parcialmente concluída
  - [ ] Não concluída

- **Principais entregas (em andamento):**

  1. Criação dos Scripts para tratamento dos dados com IA.
  2. Versionamento e Segurança: Criação da branch dev final IA para testes da equipe e proteção de credenciais via isolamento do arquivo .env.
  3. Ajustes de Produção: Correção da ausência de tabelas no servidor Render para destravar testes e validações finais do frontend.

- **Principais dificuldades:**

1.  Encontrar um modelo de IA que satisfaça as necessidades do projeto sem custos financeiros adcionais.
2.  Acompanhamento das métricas de custo da API do DeepSeek, que demoram a atualizar no painel de controle (embora os testes iniciais tenham se mostrado extremamente econômicos).
3.  O layout HTML final precisou ser acoplado à nova branch de IA antes do dia 02/07.

---

## ✅ 2. Itens Planejados vs Entregues

**Status possíveis:**

- 🟢 Concluído
- 🟡 Em andamento
- 🔴 Não iniciado
- ⚫ Bloqueado

| User Story / Tarefa                               | Responsável | Story Points | Status | Observações |
| ------------------------------------------------- | ----------- | ------------ | ------ | ----------- |
| S6T1 - Pesquisa e soluções de implementação da IA | artur       |              | 🟢     |             |
| S6T2 - Front-end: Adaptação layout HTML           | nicolas     |              | 🟢     |             |
| S6T3 - Organizar e criar tarefas da S3            | felipe      |              | 🟢     |             |
| S6T4 - Organizar Trello                           | felipe      |              | 🟢     |             |
| S6T5 - Padronização e Limpeza do Repositório      | nicolas     |              | 🟢     |             |
| S6T6 - Automação do Scrape                        | natalia     |              | 🔴     |             |
| S7T7 - Módulo de Relatórios                       | Geraldo     |              | 🟢     |             |
| S7T8 - Refinamento do Deploy (Render)             | Geraldo     |              | 🟢     |             |

---

## 🚀 3. Entregas da Sprint

### Funcionalidades implementadas

- **Camada de Inteligência Artificial (S4T16):** Integração da API do DeepSeek para tratamento, resumo e análise de sentimentos das notícias raspadas pelo sistema.
- **Isolamento de Segurança:** Configuração do arquivo .env para ocultar e proteger as chaves de API da aplicação fora do repositório público do GitHub.
- **Otimização de Custos:** A lógica do backend foi ajustada para processar através da IA apenas as 10 primeiras notícias retornadas, evitando custos excedentes na API do DeepSeek.
- **Correções em Nuvem:** Resolução do bug de criação de tabelas que estava afetando a versão hospedada no Render.
- **Versionamento Seguro:** Criação da branch dev final IA para testes isolados dos agentes de marketing sem comprometer a branch principal.

### Evidências (obrigatório)

- **Link do repositório:** https://github.com/NicolasDiovaniDias/GrupoUm-Ronda-Diaria
- **Link do quadro Kanban:** https://trello.com/invite/b/69e17154565179f483164030/ATTId7780585daefbc36908cfde6fbe9da265AEE9253/ronda-diaria
- **Prints ou GIFs:**
- **Link do deploy:** https://ronda-diaria-cffr.onrender.com/login.html

---

## 🧪 4. Qualidade e Testes

- **Tipos de testes realizados:**

  - [x] Manual
  - [ ] Automatizado
  - [ ] Unitário
  - [ ] Integração

- **Cobertura (se aplicável):** N/A

- **Bugs encontrados:**

  - O banco de dados de produção no Render não estava criando as tabelas corretamente, impedindo testes online.
  - Incerteza sobre os custos e delays na atualização de métricas financeiras no painel da API da IA.

- **Bugs corrigidos:**
  - Ajuste na rotina de inicialização do Render para forçar a sincronização e criação correta das tabelas no PostgreSQL da nuvem.

---

## 🔧 5. Processo e Ferramentas

- **Controle de versão utilizado:** Git
- **Estratégia de branch:** Criação de branch específica (dev final IA) para homologação.
- **Uso de CI/CD:** Atualizações automáticas refletidas no Render.
- **Ferramentas utilizadas:** Trello (gestão), Whatsapp GoogleMeet (comunicação), Docker (conteinerização do Postgres), Render (Cloud Hosting), Serper.dev (API de buscas), DeepSeek API (LLM), Node.js/.env.

---

## ⚠️ 6. Impedimentos

| Impedimento                   | Impacto                                                               | Solução adotada                                                                   |
| ----------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Ausência do Layout Final HTML | Sistema funcional no backend, porém sem interface final apresentável. | Equipe cobrando integração urgente do Front-end (S4T5) na branch de IA.           |
|                               |                                                                       |                                                                                   |
| Ajuste do "Prompt" perfeito   | O resumo gerado pela IA pode sair fora do padrão desejado.            | Equipe realizando testes manuais com diferentes comandos diretos para o DeepSeek. |

---

## 🔄 7. Retrospectiva da Sprint

### 👍 O que funcionou bem

- A escolha do DeepSeek como motor de IA provou-se altamente eficiente e econômica.
- Boas práticas de segurança aplicadas imediatamente (uso rigoroso do .env).

### 👎 O que pode melhorar

- A desorganização de algumas tarefas no Trello exigiu tempo extra para reestruturar o Kanban e entender o que estava pendente.
- O gargalo histórico de design (Frontend) ameaçou o cronograma até a última semana.

### 🔁 Ações para o Encerramento

- Aplicar o design visual ao script funcional e realizar ensaios do Pitch e demonstração (MVP) para o dia 02/07.
- Testes de qualidade final e resolução de últimos bugs imprevistos que possam vir a aparecer.

---

## 📊 8. Métricas da Sprint

- **Story Points planejados:** 0 (Não preenchidos)
- **Story Points concluídos:** 0

---

## 🎯 9. Planejamento Inicial da Próxima Sprint

- **Principais objetivos:** Não há próxima sprint. O projeto entra em fase de congelamento de código (Code Freeze) e apresentação final para a banca avaliadora da UniSenac.
