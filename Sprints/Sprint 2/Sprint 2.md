# 📄 Status Report – Sprint 2

## 👥 Equipe

* **Nome do projeto: Ronda Diária**
* **Integrantes: Artur, Nicolas, Natalia, Geraldo e Felipe**
* **Scrum Master da Sprint: Geraldo**
* **Product Owner: Nicolas**

---

## 📅 Informações da Sprint

* **Número da Sprint: 2**
* **Período: 23/04 - 30/04**
* **Objetivo da Sprint: criar o cadastro de empresas e testar os limites da ferramenta externa de buscas**

> (Descrever o objetivo definido no planejamento)
> criar o cadastro de empresas com banco de dados e node para registro dos dados, testar os limites da ferramenta de busca, fazendo requisições complexas, para ver até onde podemos exigir e fazer nossa apresentação para o conecta
---

## 📌 1. Resumo Executivo

> (Resumo curto – 5 a 8 linhas)

* **A sprint foi:**

  * (X) Concluída com sucesso
  * ( ) Parcialmente concluída
  * ( ) Não concluída

* **Principais entregas:**
1 - pagina de cadastro de empresa
2 - arquivo feito por ia testando a ferramenta
3 - arquivo de apresentação para o conecta
* **Principais dificuldades:**
1 - ambientação com tecnologias ainda não utilizadas, como o node js
2 - limites de busca da ferramenta
---

## ✅ 2. Itens Planejados vs Entregues

**Status possíveis (utilizar apenas estes):**

* 🟢 Concluído
* 🟡 Em andamento
* 🔴 Não iniciado
* ⚫ Bloqueado

| User Story / Tarefa              | Responsável          | Story Points | Status| Observações |
| -------------------              | -----------          | ------------ | ------ | ----------- |
| S2T1 - teste de ambiente docker  | natalia              |       8      |   🔴  |             |
| S2T2 - HTML basico para cadastro | nicolas              |       5      |   🟢  |             |
| S2T3 - Tela de cadastro Back-End | geraldo              |       8      |   🟢  |             |
| S2T4 - apresentação conecta      | geraldo e natalia    |       8      |   🟢  |             |
| S2T5 - teste da ferramenta       | nicolas              |       8      |   🟢  |             |


## 🚀 3. Entregas da Sprint

### Funcionalidades implementadas
* cadastro de empresas
*
*

### Evidências (obrigatório)

* **Link do repositório:https://github.com/NicolasDiovaniDias/GrupoUm-Ronda-Diaria.git**
* **Link do quadro Kanban:https://trello.com/invite/b/69e17154565179f483164030/ATTIcb81d36a6de0297229003c0048c36ff2AFA4C292/ronda-diaria**
* **Prints ou GIFs: NA**
* **Link do deploy (se houver): NA**

---

## 🧪 4. Qualidade e Testes

* **Tipos de testes realizados:**

  * (X) Manual
  * ( ) Automatizado
  * ( ) Unitário
  * ( ) Integração

* **Cobertura (se aplicável):**
  a ferramenta de busca que sera utilizada foi testada com multiplas pesquisas
* **Bugs encontrados:**
  o limite de noticias por retorno é 100
  mais de 4 termos ao mesmo tempo pode gerar resultado incompleto
* **Bugs corrigidos:**
  os problemas são resolvidos dividindo a consulta em varias partes, para não pesar a ferramenta com uma requisição pesada
---

## 🔧 5. Processo e Ferramentas

* **Controle de versão utilizado: S1T1 = sprint 1 task 1**
* **Estratégia de branch: branches por função**
* **Uso de CI/CD: branches por função junto ao validamento por pull request**
* **Ferramentas utilizadas: GitHub e trello**

---

## ⚠️ 6. Impedimentos

## 🔄 7. Retrospectiva da Sprint

### 👍 O que funcionou bem

* cadastro de empresas salvou os dados no banco!

### 👎 O que pode melhorar

*  evitar duplicidade de termos, como registrar duas empresas iguais no campo de concorrentes

### 🔁 Ações para próxima sprint

* comunicação e filtros para a duplicidade

---

## 📊 8. Métricas da Sprint

* **Story Points planejados: 37**

* **Story Points concluídos: 29**

* **Velocidade da equipe: 78%**

> (Soma dos Story Points das User Stories com status 🟢 Concluído)
> Exemplo: 18 story points concluídos de 22 planejados (82% de entrega)

* **% Entrega:**

> (SP concluídos / SP planejados) × 100

* **Nº de tarefas concluídas: 4**
* **Nº de tarefas não concluídas: 1**
* **Nº de commits: 7**
* **Nº de PRs: 7**

---

## 🎯 9. Planejamento Inicial da Próxima Sprint

* **Principais objetivos: implementar ferramenta ao design feito por nós**
* **Itens já priorizados: listagem e edição de empresas**
* **Riscos identificados: tempo do time**

---
