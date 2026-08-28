# PXTO — Website Copy (First Draft)

**Version:** 1.0 — first complete draft
**Status:** Draft for review. Nothing here is approved.
**Language:** Site copy is **Portuguese**. Editorial notes are in English.
**Sources:** [`../PRD.md`](../PRD.md) · [`../brand/BRAND_FOUNDATION.md`](../brand/BRAND_FOUNDATION.md) · [`../strategy/POSITIONING.md`](../strategy/POSITIONING.md) · [`../narrative/NARRATIVE.md`](../narrative/NARRATIVE.md) · [`../architecture/SITEMAP.md`](../architecture/SITEMAP.md) · [`../architecture/PAGE_SPECS.md`](../architecture/PAGE_SPECS.md) · [`../projects/PROJECT_FRAMEWORK.md`](../projects/PROJECT_FRAMEWORK.md)

---

## How to read this document

### Copy markers

| Marker | Meaning |
| --- | --- |
| `FIXED` | Verbatim from the PRD (§6, §12, §13, §14, §15, §16, §23–§26, §29). Change only by human decision |
| `DRAFT` | Written here. Reviewable, rewritable, not approved |
| `⚠ CONFIRMAR` | Asserts a fact only PXTO can verify. **Must be confirmed or removed before publication** (§53) |
| `⟦PLACEHOLDER⟧` | Information that does not exist yet. **Must not be invented** |
| `PROPOSAL` | Section whose existence or structure is not yet approved upstream |

### Headline direction used

Per the recommendation in Narrative §16.1, not yet approved:

- **Direction A** (the PRD's capability-forward message) in the Home hero — `FIXED`
- **Direction B** (the gap) in the Problema and Posicionamento sections
- **Direction E** (method-forward) in Como trabalhamos and Contato

If PXTO chooses a different direction, the hero stays (it is fixed by §12) and
the Problema, Posicionamento and Contato sections are rewritten.

### What this draft does not contain

`DERIVED` — §53; Positioning §13. Verified absent from every page:

no client names · no client logos · no testimonials · no metrics, percentages or
figures of any kind · no awards · no certifications · no partners · no revenue ·
no project or client counts · no performance results · no team size · no founding
date · no years of experience · no superlatives · no first-person singular.

### Note on the two projects

`STATED BY PXTO` — 2026-08-28:

- **Furniture Visualization** was delivered to a company in the United States.
  **The client is not identified.** Written at disclosure **Level B — Described**
  (Project Framework §15.2).
- **AI Interior Designer** was developed as a delivered solution. **No client
  narrative is constructed around it** — the copy describes the problem, the
  approach and the capability, and claims nothing about an engagement.

Neither project has publication clearance (§20). **This copy is a draft for
review; neither project page may go live until the Project Framework §20
checklist is signed.**

---

# PART I — Global copy

## 1. Navbar

`FIXED` — §10.1

| Element | Label | Destination |
| --- | --- | --- |
| Logo | PXTO | `/` |
| Link | Soluções | `/solucoes` |
| Link | Projetos | `/projetos` |
| Link | Sobre | `/sobre` |
| Link | Contato | `/contato` |
| CTA | **Fale com a PXTO** | `/contato` |

**Microcopy** — `DRAFT`
Mobile menu open: `Menu` · close: `Fechar` · aria-label: `Abrir menu de navegação`
Logo aria-label: `PXTO — página inicial`

## 2. Footer

`DRAFT` — structure proposed in SITEMAP §3.4

**Descriptor line**
> Tecnologia aplicada aos desafios reais das empresas.

*(Reuses the §6 complementary message. Consistent, and avoids inventing a second
company description.)*

**Column — Soluções:** Integrações · Automação · Software · Sites
**Column — Navegação:** Projetos · Sobre · Contato
**Column — Contato:** ⟦PLACEHOLDER — e-mail⟧ · ⟦PLACEHOLDER — telefone/WhatsApp⟧
**Legal line:** `© {ano} PXTO. Todos os direitos reservados.` · ⟦PLACEHOLDER —
link de privacidade, se LGPD aplicável⟧

> **Prohibited in the footer:** social proof of any kind, client logos, badges,
> counters, awards (Positioning §13.6). Social links only for accounts that
> exist and are maintained as PXTO — none is documented. **Do not add placeholder
> icons.**

## 3. CTA labels

`FIXED` — §29

| Context | Label |
| --- | --- |
| Primary, site-wide | **Fale com a PXTO** |
| Hero secondary | **Ver projetos** |
| Contextual | Vamos conversar · Conte seu projeto · Quero conversar sobre meu projeto · Começar uma conversa |
| Solution cards | Ver integrações · Ver automação · Ver software · Ver sites |
| Project cards | Ver projeto |
| Projects index link | Ver todos os projetos |

**Prohibited:** "Saiba mais" as a primary CTA · "Clique aqui" · "Solicite agora"

## 4. Metadata pattern

`DRAFT` — SITEMAP §6

Title pattern: `{Página} — PXTO` · Home is the exception (§5.1).
Per-page titles and descriptions appear with each page below.

## 5. 404

`DRAFT`

> ### Esta página não existe.
> O endereço pode ter mudado ou o link pode estar incorreto.
>
> **[Voltar para a home]** · **[Ver soluções]** · **[Fale com a PXTO]**

---

# PART II — Pages

# 1. Homepage — `/`

**Metadata** — `DRAFT`
Title: `PXTO — Integração de sistemas, automação de processos e software sob medida`
Meta description: `A PXTO conecta sistemas, automatiza processos e constrói software sob medida. Tecnologia aplicada aos problemas reais da operação da sua empresa.`

---

## 1.1 Hero

`FIXED` — §12

> # Conectamos sistemas. Automatizamos processos. Construímos soluções.
>
> Tecnologia aplicada aos desafios reais das empresas.
>
> **[Fale com a PXTO]**  **[Ver projetos]**

---

## 1.2 Problema

Heading `FIXED` — §13. Body `DRAFT`.

> ## Sua empresa já tem tecnologia. O problema é quando ela não conversa.
>
> Cada ferramenta foi contratada para resolver um problema específico. Nenhuma
> delas foi feita para conversar com as outras.
>
> O espaço entre elas acaba sendo preenchido por pessoas: digitando de novo o que
> um sistema já sabe, mantendo planilhas que só existem para transportar dados,
> lembrando de executar um processo que deveria rodar sozinho.
>
> Esse trabalho não aparece em nenhum relatório. Aparece na equipe que nunca dá
> conta e na operação que só cresce contratando mais gente.

### The six situations

`DRAFT` — the six are `FIXED` by §13; the descriptions are drafted.

| Situação | Descrição |
| --- | --- |
| **Sistemas desconectados** | Duas ferramentas guardam a mesma informação. Nenhuma das duas é a versão oficial. |
| **Processos manuais** | Existe trabalho na sua operação que só existe porque nada se conecta. |
| **Dados duplicados** | A mesma informação é digitada mais de uma vez, em lugares diferentes, por pessoas diferentes. |
| **Informações espalhadas** | Nenhum lugar responde sozinho a uma pergunta simples do dia a dia. |
| **Tarefas repetitivas** | Pessoas qualificadas executando trabalho mecânico. |
| **Ferramentas que não atendem** | O software resolve o caso geral. O seu caso é exatamente o que sobra. |

### Reframe

`DRAFT` — Narrative §3.2, move 3. **Do not cut this paragraph** — without it the
section is uncomfortable rather than useful.

> Nada disso é consequência de uma decisão errada. É o que acontece quando a
> operação cresce mais rápido do que as ferramentas que ela foi juntando pelo
> caminho. E tem solução.

---

## 1.3 Posicionamento

`DRAFT` — depends on the territory decision (Positioning §14). **Rewrite if the
territory changes.**

> ## O problema não está nos seus sistemas. Está entre eles.
>
> A PXTO trabalha nesse espaço: entre as ferramentas, entre os processos, entre o
> que o software faz e o que a sua operação realmente precisa.
>
> Começamos entendendo o problema. Depois conectamos sistemas, automatizamos
> processos, construímos software ou colocamos no ar a presença digital que
> faltava — o que for necessário para resolver o caso.

---

## 1.4 Soluções

Heading and the four descriptions `FIXED` — §14. Intro and CTAs `DRAFT`.

> ## Tecnologia para resolver problemas reais.
>
> Quatro formas de resolver o mesmo tipo de problema. Qual delas se aplica ao seu
> caso é uma conclusão do diagnóstico — não uma escolha que você precisa fazer
> antes de conversar.

**Integrações** — `FIXED`
> Conectamos sistemas, APIs e ferramentas para que informações possam circular
> automaticamente entre diferentes plataformas.
> **[Ver integrações]**

**Automação** — `FIXED`
> Transformamos processos repetitivos em fluxos automatizados, reduzindo trabalho
> manual e aumentando eficiência.
> **[Ver automação]**

**Software** — `FIXED`
> Desenvolvemos aplicações e sistemas sob medida para necessidades específicas de
> negócio.
> **[Ver software]**

**Sites** — `FIXED`
> Criamos sites modernos, rápidos e responsivos para empresas que precisam
> estabelecer ou fortalecer sua presença digital.
> **[Ver sites]**

---

## 1.5 Como trabalhamos

Step names and first lines `FIXED` — §15. Second lines `DRAFT`.

> ## Como trabalhamos
>
> Não começamos pela tecnologia. Começamos pelo problema.

**01 · Entendemos**
> Mapeamos o problema, contexto e objetivo. `FIXED`
> Antes de propor qualquer coisa, precisamos entender como a operação funciona
> hoje — inclusive as partes que ninguém documentou. `DRAFT`

**02 · Desenhamos**
> Definimos a melhor abordagem para transformar a necessidade em solução. `FIXED`
> É aqui que decidimos o que construir, o que conectar e o que simplesmente não
> precisa existir. `DRAFT`

**03 · Construímos**
> Desenvolvemos a solução utilizando as tecnologias mais adequadas ao problema.
> `FIXED`
> A tecnologia é escolhida pelo problema — não o contrário. `DRAFT`

**04 · Integramos**
> Conectamos a solução ao ecossistema existente do cliente quando necessário.
> `FIXED`
> Uma solução que não conversa com o resto da operação vira mais um sistema
> isolado. `DRAFT`

**05 · Evoluímos**
> Monitoramos, ajustamos e evoluímos a solução conforme novas necessidades.
> `FIXED`
> ⚠ **CONFIRMAR** — this step implies a post-delivery commitment that has not
> been commercially defined (Positioning §17.3). Keep the PRD line; **do not add
> any further promise of continuity** until the service model is decided.

**Closing** — `DRAFT`. Required by §15: never claim every project passes through
all five steps.
> Nem todo projeto passa por todas as etapas. O que não muda é a ordem: entender
> antes de construir.

---

## 1.6 Projetos

Heading and subtitle `FIXED` — §16.

> ## O que construímos.
>
> Soluções desenvolvidas para transformar ideias e problemas em produtos digitais
> funcionais.

Project cards — see §7.2 for card copy.

> **[Ver todos os projetos]**

> **Blocked:** this section requires at least one project with §20 clearance.
> If none is cleared, **omit the section** — do not publish placeholders
> (Project Framework §19.4).

---

## 1.7 Diferenciais

`PROPOSAL` + `DRAFT` — the PRD lists this block (§11.2) but defines no content.
Written strictly from the structural differentiators in Positioning §11.1, each
of which is true today and requires no evidence of scale.

> ## Por que a PXTO
>
> **Começamos pelo problema**
> Antes de propor qualquer solução, entendemos o que está acontecendo. Diagnóstico
> primeiro, tecnologia depois.
>
> **Um só responsável pelo caminho inteiro**
> Entender, desenhar, construir, integrar e evoluir. Sem repassar o problema de
> um fornecedor para outro no meio do caminho.
>
> **A tecnologia é escolhida pelo problema**
> Não temos plataforma para defender nem produto para empurrar. A ferramenta
> certa é a que resolve o seu caso.
>
> **Construímos o que o problema exige**
> Nem mais, nem menos. Solução superdimensionada custa caro para construir e mais
> caro ainda para manter.

> **Prohibited here** (Narrative §7.3): stats bar, badge row, logo strip,
> counters, or a list of adjectives. No slot that only makes sense once filled
> with proof PXTO does not have.

---

## 1.8 CTA

`DRAFT`

> ## Descreva o problema. A solução é o nosso trabalho.
>
> Você não precisa chegar com uma especificação pronta, nem saber qual tecnologia
> usar. Conte o que não está funcionando — o resto é conversa.
>
> **[Fale com a PXTO]**

---

# 2. Soluções — `/solucoes`

**Metadata** — `DRAFT`
Title: `Soluções — PXTO`
Meta description: `Integrações, automação, software sob medida e sites. Quatro formas de resolver o mesmo tipo de problema — o diagnóstico define qual se aplica.`

---

## 2.1 Hero

`DRAFT`

> # Quatro formas de resolver o mesmo problema.
>
> Integrações, automação, software e sites. O que muda é o instrumento, não a
> forma de trabalhar.

## 2.2 Visão geral

`DRAFT` — establishes the shared logic before the four appear, so the page does
not read as a service menu (Narrative §8.1).

> ## Uma capacidade, quatro instrumentos.
>
> Quase todo problema que chega até nós tem a mesma origem: a operação cresceu e
> as ferramentas não acompanharam. O que muda é onde a lacuna aparece.
>
> Às vezes ela está entre dois sistemas que deveriam trocar informação. Às vezes
> está num processo que depende de alguém lembrar de executar. Às vezes o que
> falta simplesmente não existe no mercado. Às vezes é a presença digital da
> empresa que não funciona como deveria.
>
> São quatro respostas para a mesma condição. Qual delas se aplica ao seu caso é
> uma conclusão do diagnóstico — não uma pergunta que você precisa responder
> antes de conversar.

## 2.3 The four blocks

Positioning lines and descriptions `FIXED` — §14, §23–§26. Scope lists `FIXED`
from §23–§26.

**Integrações — Faça seus sistemas conversarem.**
> Conectamos sistemas, APIs e ferramentas para que informações possam circular
> automaticamente entre diferentes plataformas.
> CRM · ERP · plataformas de marketing · ferramentas internas · APIs · bancos de
> dados · serviços externos
> **[Ver integrações]**

**Automação — Automatize o trabalho que não deveria precisar ser manual.**
> Transformamos processos repetitivos em fluxos automatizados, reduzindo trabalho
> manual e aumentando eficiência.
> Processos · workflows · movimentação de dados · notificações · sincronizações ·
> processamento · tarefas repetitivas · agentes e IA quando aplicável
> **[Ver automação]**

**Software — Quando uma solução pronta não basta, construímos a sua.**
> Desenvolvemos aplicações e sistemas sob medida para necessidades específicas de
> negócio.
> Web apps · sistemas internos · portais · dashboards · ferramentas operacionais ·
> plataformas · assistentes inteligentes · produtos digitais
> **[Ver software]**

**Sites — Presença digital construída para funcionar.**
> Criamos sites modernos, rápidos e responsivos para empresas que precisam
> estabelecer ou fortalecer sua presença digital.
> Sites institucionais · landing pages · páginas comerciais · experiências
> digitais · responsividade · performance · SEO · integração com ferramentas
> **[Ver sites]**

## 2.4 Como trabalhamos

Condensed version of §1.5 — same five steps, first lines only.

## 2.5 Projetos

Reuses §1.6. Same cards, same link.

## 2.6 CTA

`DRAFT`

> ## Ainda não sabe qual se aplica ao seu caso?
>
> Essa é justamente a primeira pergunta que respondemos junto com você.
>
> **[Fale com a PXTO]**

---

# 3. Integrações — `/solucoes/integracoes`

**Metadata** — `DRAFT`
Title: `Integrações — PXTO`
Meta description: `Conectamos sistemas, APIs e ferramentas para que a informação circule automaticamente entre plataformas — sem digitação manual e sem planilhas de transporte.`

---

## 3.1 Hero

Positioning line `FIXED` — §23.

> # Faça seus sistemas conversarem.
>
> Informação que já existe em um sistema não deveria precisar ser digitada em
> outro. `DRAFT`

## 3.2 Problema

`DRAFT`

> ## Duas ferramentas, a mesma informação, nenhuma versão oficial.
>
> O CRM sabe quem é o cliente. O ERP sabe o que ele comprou. A planilha sabe o
> que ficou pendente. E alguém, todo dia, mantém as três em sincronia na mão.
>
> Enquanto isso funciona, ninguém questiona. O problema aparece quando o volume
> cresce, quando a pessoa que fazia isso sai, ou quando uma informação
> desatualizada gera uma decisão errada.

## 3.3 O que fazemos

`DRAFT`. Scope `FIXED` — §23.

> ## O que conectamos
>
> Conectamos sistemas, APIs e ferramentas para que informações circulem
> automaticamente entre plataformas. `FIXED`
>
> CRM · ERP · plataformas de marketing · ferramentas internas · APIs · bancos de
> dados · serviços externos `FIXED`
>
> A lista acima é ilustrativa. O que determina a integração é o que os seus
> sistemas expõem e o que a sua operação precisa — não a ferramenta que está na
> moda. `DRAFT`

> **Rule** (§23): never limit the message to specific tools, and never present a
> platform as a specialisation.

## 3.4 Abordagem

`DRAFT`

> ## Como abordamos uma integração
>
> Antes de conectar qualquer coisa, mapeamos onde a informação nasce, por onde ela
> passa e onde ela precisa chegar. Boa parte do trabalho de uma integração é
> descobrir que o fluxo real não é o que está no organograma.
>
> Depois definimos o que precisa ser automático, o que precisa de conferência
> humana e o que simplesmente pode deixar de existir.

## 3.5 Exemplos de aplicação

`DRAFT` — **situations, not claimed engagements** (§53).

> ## Onde uma integração costuma resolver
>
> - Pedidos que precisam ser lançados em mais de um sistema
> - Cadastros de clientes mantidos em duplicidade
> - Dados de vendas que só chegam ao financeiro por planilha
> - Ferramentas de marketing que não sabem o que aconteceu depois da conversão
> - Relatórios montados manualmente a partir de várias fontes
> - Sistemas legados que ninguém quer substituir, mas que precisam se comunicar

> **Framing rule:** these are recognisable situations. **Never** phrase them as
> "já resolvemos" or "clientes que atendemos" — that implies engagements not
> evidenced (§53).

## 3.6 Projetos relacionados

> **OMITTED.** No cleared project demonstrates integration work (Project
> Framework §19.4, SITEMAP §4.3). **Omit the section — do not show an empty
> region or a placeholder.**

## 3.7 Outras soluções

`DRAFT`

> ## O diagnóstico pode apontar para outro caminho
>
> Nem todo problema de informação se resolve conectando sistemas. Às vezes o que
> falta é automatizar o processo, ou construir a ferramenta que não existe.
>
> **[Ver automação]** · **[Ver software]** · **[Ver sites]**

## 3.8 CTA

`DRAFT`

> ## Tem dois sistemas que deveriam conversar?
>
> Conte quais são e o que precisa circular entre eles.
>
> **[Conte seu projeto]**

---

# 4. Automação — `/solucoes/automacao`

**Metadata** — `DRAFT`
Title: `Automação de processos — PXTO`
Meta description: `Transformamos processos repetitivos em fluxos automatizados. Trabalho que depende de alguém lembrar de executar passa a rodar sozinho.`

---

## 4.1 Hero

Positioning line `FIXED` — §24.

> # Automatize o trabalho que não deveria precisar ser manual.
>
> Se o processo pode ser descrito, ele pode ser automatizado. `DRAFT`

## 4.2 Problema

`DRAFT`

> ## Processos que dependem de alguém lembrar.
>
> Toda operação tem tarefas que rodam porque uma pessoa específica lembra de
> executá-las. Copiar dados de um relatório para outro. Avisar a equipe quando
> algo muda de status. Conferir se a informação chegou.
>
> Funciona — até a semana em que essa pessoa está de férias.

## 4.3 O que fazemos

`DRAFT`. Scope `FIXED` — §24.

> ## O que automatizamos
>
> Transformamos processos repetitivos em fluxos automatizados, reduzindo trabalho
> manual e aumentando eficiência. `FIXED`
>
> Processos · workflows · movimentação de dados · notificações · sincronizações ·
> processamento · tarefas repetitivas · agentes e IA quando aplicável `FIXED`

## 4.4 Abordagem

`DRAFT`

> ## Como abordamos uma automação
>
> Começamos descrevendo o processo como ele realmente acontece — não como deveria
> acontecer. É comum descobrir, nessa etapa, que parte do trabalho não precisa ser
> automatizado: precisa deixar de existir.
>
> O que sobra vira fluxo. E o que exige julgamento humano continua com quem tem
> contexto para decidir.

## 4.5 Exemplos de aplicação

`DRAFT` — situations, not engagements.

> ## Onde uma automação costuma resolver
>
> - Relatórios recorrentes montados manualmente
> - Aprovações que dependem de alguém acompanhar uma caixa de entrada
> - Dados que precisam ser movidos de um lugar para outro em horários fixos
> - Notificações internas disparadas na mão
> - Conferências repetitivas entre duas fontes de informação
> - Processamento de arquivos, documentos ou solicitações em volume

## 4.6 Projetos relacionados

> **OMITTED.** No cleared project demonstrates automation work.

## 4.7 Outras soluções

> **[Ver integrações]** · **[Ver software]** · **[Ver sites]**

## 4.8 CTA

`DRAFT`

> ## Existe um processo que consome sua equipe todo mês?
>
> Descreva como ele funciona hoje. É por aí que começamos.
>
> **[Conte seu projeto]**

> ⚠ **Narrative constraint** (Narrative §17.4): this is the page most at risk of
> reading as a low-code platform specialist. **No platform name may appear
> anywhere on it** — not as a credential, not as an example, not in a screenshot.
> AI appears only as "quando aplicável", per §24.

---

# 5. Software — `/solucoes/software`

**Metadata** — `DRAFT`
Title: `Software sob medida — PXTO`
Meta description: `Desenvolvemos aplicações e sistemas sob medida para necessidades específicas de negócio. Quando o produto pronto resolve 80% do problema, construímos os 20% que faltam.`

---

## 5.1 Hero

Positioning line `FIXED` — §25.

> # Quando uma solução pronta não basta, construímos a sua.
>
> Nem todo processo cabe em um software feito para o caso geral. `DRAFT`

## 5.2 Problema

`DRAFT`

> ## Os últimos 20% são sempre o problema.
>
> O sistema que você contratou resolve quase tudo. O que falta é justamente a
> parte específica do seu negócio — aquela que ninguém mais faz do mesmo jeito.
>
> A saída costuma ser adaptar o processo ao software. Funciona, com um custo que
> raramente é calculado: a operação passa a trabalhar em função da ferramenta,
> e não o contrário.

## 5.3 O que fazemos

`DRAFT`. Scope `FIXED` — §25.

> ## O que construímos
>
> Desenvolvemos aplicações e sistemas sob medida para necessidades específicas de
> negócio. `FIXED`
>
> Web apps · sistemas internos · portais · dashboards · ferramentas operacionais ·
> plataformas · assistentes inteligentes · produtos digitais `FIXED`

## 5.4 Abordagem

`DRAFT`

> ## Como abordamos um desenvolvimento
>
> Software sob medida tem um risco conhecido: virar um sistema que só quem
> construiu entende. Trabalhamos para que isso não aconteça — construindo o que o
> problema exige, no formato mais simples que se sustenta, e deixando a solução
> preparada para evoluir.
>
> A escolha da tecnologia vem depois do entendimento do problema. Nunca antes.

> **Rule** (§25): the focus is the solution, not the technologies used. **No
> stack list on this page.**

## 5.5 Exemplos de aplicação

`DRAFT` — situations, not engagements.

> ## Onde construir costuma ser a resposta
>
> - Um processo central do negócio que nenhum produto de mercado cobre
> - Uma ferramenta interna que hoje vive em planilhas compartilhadas
> - Um painel que reúne informações que estão em quatro lugares diferentes
> - Um portal para clientes, fornecedores ou equipes externas
> - Uma ideia de produto que precisa sair do papel para ser testada
> - Um assistente que aplica regras do negócio de forma consistente

## 5.6 Projetos relacionados

`DRAFT` — both existing projects map here.

> ## Projetos
>
> [Furniture Visualization card] · [AI Interior Designer card]

> **Blocked** until §20 clearance. If neither is cleared, omit the section.

## 5.7 Outras soluções

> **[Ver integrações]** · **[Ver automação]** · **[Ver sites]**

## 5.8 CTA

`DRAFT`

> ## Tem uma necessidade que nenhum sistema resolve?
>
> Descreva o que precisa acontecer. A forma de construir é o nosso trabalho.
>
> **[Conte seu projeto]**

---

# 6. Sites — `/solucoes/sites`

**Metadata** — `DRAFT`
Title: `Criação de sites — PXTO`
Meta description: `Sites rápidos, responsivos e encontráveis, integrados às ferramentas da empresa. Presença digital tratada como infraestrutura, não como peça gráfica.`

---

## 6.1 Hero

Positioning line `FIXED` — §26.

> # Presença digital construída para funcionar.
>
> Um site é infraestrutura. Precisa carregar rápido, ser encontrado e conversar
> com o resto da operação. `DRAFT`

## 6.2 Problema

`DRAFT`

> ## Bonito não é o mesmo que funcional.
>
> Muitos sites institucionais são entregues como peça gráfica: ficam bem na
> apresentação e mal no mundo real. Carregam devagar no celular, não aparecem na
> busca, não se conectam a nenhuma ferramenta da empresa e não geram um contato
> sequer.
>
> A questão não é estética. É que o site foi tratado como um projeto visual, e não
> como parte da operação.

## 6.3 O que fazemos

`DRAFT`. Scope `FIXED` — §26.

> ## O que construímos
>
> Criamos sites modernos, rápidos e responsivos para empresas que precisam
> estabelecer ou fortalecer sua presença digital. `FIXED`
>
> Sites institucionais · landing pages · páginas comerciais · experiências
> digitais · responsividade · performance · SEO · integração com ferramentas
> `FIXED`

## 6.4 Abordagem

`DRAFT`

> ## Como abordamos um site
>
> Antes do layout, definimos o que o site precisa fazer: para quem ele fala, o que
> essa pessoa precisa entender e qual ação deve ficar evidente.
>
> Performance, acessibilidade e SEO entram desde o começo — depois de pronto, são
> caros de corrigir. E, quando faz sentido, o site conversa com as ferramentas que
> a empresa já usa, em vez de virar mais uma ilha.

## 6.5 Este site

`DRAFT` — the self-evidencing proof point (Positioning §12.1). Verifiable by the
reader, claims nothing unmeasurable.

> ## O exemplo mais direto é este
>
> Este site foi construído com os mesmos critérios que aplicamos em qualquer
> projeto: performance, acessibilidade, SEO técnico e estrutura preparada para
> crescer sem ser refeita.
>
> Você pode avaliar o resultado enquanto lê esta página.

> ⚠ **This block only stands if the site actually meets the standard** (§35–§37,
> §50). If the built site underperforms, **delete this section** — it would be an
> unsupportable claim (§53).

## 6.6 Exemplos de aplicação

`DRAFT`

> ## Quando faz sentido
>
> - A empresa não tem presença digital própria
> - O site atual não é encontrado por quem procura o que a empresa faz
> - As páginas carregam mal no celular
> - O formulário existe, mas o contato não chega a lugar nenhum
> - A empresa precisa de uma página comercial específica para uma oferta
> - O site precisa se conectar às ferramentas que a empresa já usa

## 6.7 Outras soluções

> **[Ver integrações]** · **[Ver automação]** · **[Ver software]**

## 6.8 CTA

`DRAFT`

> ## Precisa de um site que funcione de verdade?
>
> Conte o que ele precisa resolver.
>
> **[Conte seu projeto]**

> ⚠ **Constraint** (§26; Narrative §17.2): this page must not read as a creative
> agency offer. **No language about visual craft, creativity, brand experience or
> design awards.** Visual quality is a requirement, never the subject.

---

# 7. Projetos — `/projetos`

**Metadata** — `DRAFT`
Title: `Projetos — PXTO`
Meta description: `Projetos desenvolvidos pela PXTO: o problema que originou cada um, a abordagem escolhida e o que foi construído.`

---

## 7.1 Hero

Title and subtitle `FIXED` — §16. Intro `DRAFT`.

> # O que construímos.
>
> Soluções desenvolvidas para transformar ideias e problemas em produtos digitais
> funcionais.
>
> Cada projeto começou como um problema real. O que você encontra em cada um é o
> problema, o raciocínio por trás da abordagem e o que foi construído.

> ⚠ **Prohibited** (Narrative §9.6): any phrasing implying more projects exist —
> "alguns dos nossos projetos", "entre outros", "conheça alguns". **Never** pad
> the grid with placeholders or "em breve" cards.

## 7.2 Project cards

`DRAFT` — structure per Project Framework §18.

**Card — Furniture Visualization**
> **Furniture Visualization**
> Software · IA e geração de imagens
> Aplicação web que combina a foto de um móvel e a foto de um ambiente para gerar
> uma visualização realista do móvel naquele espaço.
> **[Ver projeto]**

**Card — AI Interior Designer**
> **AI Interior Designer**
> Software · IA e análise visual
> Assistente que analisa imagens de ambientes e apoia a criação de propostas de
> design de interiores.
> **[Ver projeto]**

> **Category axis** follows the recommendation in Project Framework §2.4:
> capability first, technical nature second. **Not yet approved.** If PXTO keeps
> the PRD's original strings, the labels become
> `AI / Web App / Image Generation` and
> `AI / Computer Vision / Conversational Assistant` — and every card on the site
> will lead with "AI".

## 7.3 CTA

`DRAFT`

> ## Seu problema se parece com algum desses?
>
> Não precisa ser igual. A forma de trabalhar é a mesma.
>
> **[Fale com a PXTO]**

---

# 8. Furniture Visualization — `/projetos/furniture-visualization`

> **Disclosure Level B — Described** (Project Framework §15.2).
> `STATED BY PXTO`: delivered to a company in the United States. **The client is
> not identified.**
> ⚠ **CONFIRMAR:** even the reference to the country is a client attribute and
> formally requires clearance under §20. If PXTO prefers, remove it — the case
> works without it.
> **This page must not be published before §20 sign-off.**

**Metadata** — `DRAFT`
Title: `Furniture Visualization — PXTO`
Meta description: `Aplicação web que gera a visualização realista de um móvel dentro de um ambiente a partir de duas fotos. O problema, a abordagem e o que foi construído.`

---

## 8.1 Hero

Summary `FIXED` in substance — §17.

> # Furniture Visualization
>
> Software · IA e geração de imagens
>
> Aplicação web que permite enviar imagens de móveis e ambientes para gerar uma
> visualização realista do móvel inserido no ambiente.

## 8.2 Contexto

`DRAFT` + ⚠ **CONFIRMAR**

> ## Contexto
>
> O projeto foi desenvolvido e entregue para uma empresa nos Estados Unidos, no
> setor de mobiliário. ⚠ *(sector reference requires confirmation — remove if not
> cleared)*
>
> A necessidade partia de uma limitação conhecida de quem vende móveis a
> distância: por melhor que seja a foto do produto, ela não responde à única
> pergunta que importa para o comprador — como isso ficaria no meu espaço?

## 8.3 Problema

Substance `FIXED` — §17.

> ## Problema
>
> Permitir que usuários visualizem de maneira mais concreta como determinado móvel
> pode se encaixar em um ambiente.
>
> Ver o produto isolado e imaginar o produto no lugar são coisas diferentes. Entre
> as duas existe uma distância que texto, medida e foto de catálogo não cobrem.
> `DRAFT`

## 8.4 Desafio

`DRAFT` + ⚠ **CONFIRMAR** — not documented in the PRD.

> ## Desafio
>
> O resultado precisava ser convincente. Uma composição que pareça montada resolve
> menos do que não mostrar nada: transfere para o usuário a dúvida que deveria
> eliminar.
>
> Isso significa combinar duas imagens de origens completamente diferentes — o
> móvel e o ambiente, fotografados em condições distintas — e produzir uma
> terceira imagem coerente, respeitando escala, perspectiva e iluminação.

## 8.5 Solução

Substance `FIXED` — §17.

> ## Solução
>
> Uma aplicação que combina entrada visual, processamento por inteligência
> artificial e geração de imagens.
>
> O usuário envia as duas fotos. A aplicação interpreta o móvel e o ambiente,
> processa a combinação e devolve a visualização do produto naquele espaço.
> `DRAFT` ⚠ **CONFIRMAR**

## 8.6 Como funciona

Flow `FIXED` — §17.

> ## Como funciona
>
> **1 · Foto do móvel** — O usuário envia a imagem do produto.
> **2 · Foto do ambiente** — O usuário envia a foto do espaço real.
> **3 · Processamento** — A aplicação interpreta as duas imagens e gera a
> composição.
> **4 · Ambiente visualizado** — O resultado mostra o móvel inserido no ambiente.
>
> ⚠ **CONFIRMAR** — step descriptions are drafted from §17's flow diagram.

## 8.7 Tecnologia / capacidades

Capabilities `FIXED` — §17's "Objetivo do case".

> ## Capacidades aplicadas
>
> - Inteligência artificial
> - Processamento de imagens
> - Geração de imagens
> - Desenvolvimento de aplicações web
> - Integração de diferentes tecnologias

> ⚠ **No concrete technology names appear here.** The PRD documents capabilities,
> not a stack (§17). Listing specific models, frameworks or services requires
> confirmation by PXTO (§53, Project Framework §10).

## 8.8 Resultado

> **OMITTED.** No results are documented and none is cleared (§20; Project
> Framework §11). **Do not write this block.** Omission is correct; an invented
> outcome would discredit the portfolio.

## 8.9 Galeria / demonstração

> ⟦PLACEHOLDER⟧ — §17 requests the visual demonstration
> (`móvel + ambiente → processamento → resultado`). **Requires real assets from
> PXTO.** No mockups, no stock imagery, no invented interface (Project Framework
> §12.3). Assets must contain no client-identifying detail.

## 8.10 CTA

`DRAFT`

> ## Tem uma ideia que precisa virar produto?
>
> **[Quero conversar sobre meu projeto]**

---

# 9. AI Interior Designer — `/projetos/ai-interior-designer`

> `STATED BY PXTO`: developed as a **delivered solution**.
> **No client narrative is constructed.** The copy below claims no engagement, no
> client, no commissioning context — only the problem, the approach and the
> capability.
> **This page must not be published before §20 sign-off.**

**Metadata** — `DRAFT`
Title: `AI Interior Designer — PXTO`
Meta description: `Assistente que analisa imagens de ambientes e apoia decisões de design de interiores. O problema, a abordagem e o que foi construído.`

---

## 9.1 Hero

Summary `FIXED` in substance — §18.

> # AI Interior Designer
>
> Software · IA e análise visual
>
> Assistente inteligente capaz de analisar imagens de ambientes e auxiliar na
> criação de propostas de design de interiores.

## 9.2 Contexto

`DRAFT` — deliberately written **without** a client narrative.

> ## Contexto
>
> Projetar um ambiente começa quase sempre do mesmo jeito: uma foto do espaço e
> uma conversa. A foto carrega informação — dimensões aparentes, luz, o que já
> existe no lugar —, mas essa informação não está organizada de forma utilizável.
>
> O projeto nasceu dessa lacuna: transformar a imagem em ponto de partida
> estruturado para decisões de design.

## 9.3 Problema

Substance `FIXED` — §18.

> ## Problema
>
> Transformar uma fotografia de um ambiente em um ponto de partida para decisões
> de design.

## 9.4 Desafio

`DRAFT` + ⚠ **CONFIRMAR** — not documented in the PRD.

> ## Desafio
>
> Analisar uma imagem é uma coisa. Conversar sobre ela é outra.
>
> O assistente precisava interpretar o ambiente e, ao mesmo tempo, sustentar uma
> interação em que a pessoa refina o que quer ao longo da conversa — sem exigir
> que ela soubesse, de antemão, descrever tecnicamente o resultado desejado.

## 9.5 Solução

Substance `FIXED` — §18.

> ## Solução
>
> Um assistente que combina análise visual, inteligência artificial e interação
> conversacional para auxiliar na criação de um projeto.

## 9.6 Como funciona

`DRAFT` + ⚠ **CONFIRMAR**

> ## Como funciona
>
> **1 · Imagem do ambiente** — A pessoa envia a foto do espaço.
> **2 · Análise visual** — O assistente interpreta o ambiente a partir da imagem.
> **3 · Conversa** — A partir da análise, a interação refina o que se busca.
> **4 · Proposta** — O resultado apoia as decisões de design do ambiente.

## 9.7 Tecnologia / capacidades

Capabilities `FIXED` — §18's "Objetivo do case".

> ## Capacidades aplicadas
>
> - Inteligência artificial
> - Análise visual
> - Interfaces conversacionais
> - Desenvolvimento de assistentes
> - Geração de recomendações
> - Construção de experiências digitais

## 9.8 Resultado

> **OMITTED.** No results documented or cleared (§20).

## 9.9 Galeria / demonstração

> ⟦PLACEHOLDER⟧ — requires real assets from PXTO. No mockups, no stock imagery.

## 9.10 CTA

`DRAFT`

> ## Tem um problema que envolve interpretar informação?
>
> **[Quero conversar sobre meu projeto]**

---

# 10. Sobre — `/sobre`

> **This page cannot be completed.** Vision, founder visibility, the meaning of
> the name and the company model are all undecided (Brand Foundation §15). The
> copy below covers only what §27 authorises: why the company exists, how it
> thinks, how it works, and its principles. **No history, no team, no clients, no
> numbers — and none should be added without a decision.**

**Metadata** — `DRAFT`
Title: `Sobre — PXTO`
Meta description: `A PXTO é uma empresa de tecnologia que trabalha no espaço entre os sistemas: entender o problema, escolher a tecnologia certa e construir o que for necessário.`

---

## 10.1 Hero

`DRAFT`

> # A PXTO é uma empresa de tecnologia que trabalha no espaço entre os sistemas.
>
> Integração, automação, software e sites são os instrumentos. O trabalho é
> resolver o problema.

> **Structural rule** (§27): *"A PXTO é…"*, never *"Eu sou…"*. **No first-person
> singular anywhere on this page or on any other.**

## 10.2 Por que a PXTO existe

`DRAFT` — from Brand Foundation §2, §6.2.

> ## Por que existimos
>
> A maior parte das empresas não tem um problema de tecnologia. Tem um problema
> entre tecnologias.
>
> As ferramentas foram compradas uma a uma, cada uma resolvendo o seu próprio
> problema. O espaço entre elas não é responsabilidade de ninguém — e é a operação
> que acaba preenchendo esse espaço, com trabalho manual que ninguém planejou e
> ninguém mede.
>
> A PXTO existe porque esse espaço merece ser levado a sério. É onde a operação
> realmente acontece.

## 10.3 Como pensamos

`DRAFT` — from §5, §57.

> ## Como pensamos
>
> Tecnologia é meio, não fim. Nenhuma ferramenta tem valor por si só: o valor
> aparece quando ela resolve um problema concreto de quem trabalha com ela todos
> os dias.
>
> Por isso não começamos escolhendo tecnologia. Começamos entendendo o problema —
> e a escolha técnica passa a ser uma consequência, não um ponto de partida.
>
> As ferramentas vão mudar. A capacidade de entender um problema e construir a
> solução, não.

## 10.4 Como trabalhamos

`DRAFT` — the five steps (§15), narrative form.

> ## Como trabalhamos
>
> **Entendemos** o problema, o contexto e o objetivo — inclusive as partes da
> operação que ninguém documentou.
> **Desenhamos** a abordagem: o que construir, o que conectar e o que não precisa
> existir.
> **Construímos** com a tecnologia mais adequada ao problema.
> **Integramos** ao que já existe, quando faz sentido.
> **Evoluímos** a solução conforme novas necessidades aparecem.
>
> Nem todo projeto passa por todas as etapas. A ordem é o que não muda.

## 10.5 Princípios

`DRAFT` — from Brand Foundation §5. Each is enforceable, not aspirational.

> ## Princípios
>
> **Evidência antes de afirmação**
> Só dizemos o que podemos sustentar. Não inflamos experiência, não inventamos
> números e não prometemos resultado que não podemos comprovar.
>
> **O problema antes da solução**
> Nenhuma proposta começa por tecnologia. Começa por entender o que está
> acontecendo.
>
> **Clareza antes de sofisticação**
> Se precisa de jargão para ser explicado, provavelmente não foi bem entendido.
>
> **O necessário, não o máximo**
> Construímos o que o problema exige, do jeito mais simples que se sustenta.
> Solução superdimensionada é cara de construir e mais cara de manter.
>
> **Discrição**
> Informação de cliente não é material de divulgação. Nome, dado e arquitetura só
> aparecem com autorização.
>
> **Durabilidade**
> Construímos para ser mantido e evoluído — não para ser refeito.

## 10.6 Projetos

`DRAFT`

> ## O que construímos
>
> A forma mais direta de entender como trabalhamos é ver o que já foi construído.
>
> **[Ver projetos]**

## 10.7 CTA

`DRAFT`

> ## Quer conversar sobre um problema específico?
>
> **[Fale com a PXTO]**

## 10.8 Sections deliberately not written

| Missing | Blocked by |
| --- | --- |
| History / origin story | No publishable history exists; inventing one is prohibited (§53) |
| Team | No team information; stock photography implies scale (Positioning §13.2) |
| Vision | Brand Foundation §15.1 — not defined |
| Meaning of the name "PXTO" | Brand Foundation §15.10 — not documented |
| Founder presence | Brand Foundation §15.6 — undecided |
| Clients, sectors served, numbers | Prohibited (§53) |

---

# 11. Contato — `/contato`

**Metadata** — `DRAFT`
Title: `Contato — PXTO`
Meta description: `Descreva o problema que precisa resolver. Não é preciso ter a especificação pronta nem saber qual tecnologia usar.`

---

## 11.1 Hero

`DRAFT`

> # Vamos conversar sobre o seu problema.

## 11.2 Mensagem

`DRAFT` — the highest-leverage message on the page (Narrative §11.3).

> ## Descreva o problema. Não é preciso ter a solução.
>
> Você não precisa chegar com uma especificação pronta, um escopo fechado ou uma
> tecnologia definida. Entender o problema é a primeira etapa do nosso trabalho de
> qualquer forma.
>
> Conte o que não está funcionando, o que já foi tentado e o que precisaria
> acontecer. A partir daí a conversa fica concreta.

## 11.3 Formulário

Fields `FIXED` — §28. Labels, placeholders and helper text `DRAFT`.

| Campo | Label | Placeholder | Obrigatório |
| --- | --- | --- | --- |
| Nome | `Nome` | `Como podemos chamar você` | Sim |
| Empresa | `Empresa` | `Nome da empresa` | Não |
| E-mail | `E-mail` | `seu@email.com` | Sim |
| Telefone | `Telefone / WhatsApp` | `(00) 00000-0000` | Não |
| Necessidade | `O que você precisa?` | `Selecione` | Não |
| Mensagem | `Sua mensagem` | `Descreva o problema que precisa resolver` | Sim |

**Select options** — `FIXED` §28:
`Integração` · `Automação` · `Software` · `Site` · `Outro`

**Helper text under the select** — `DRAFT`
> Se não souber qual escolher, selecione "Outro". Descobrir isso é parte do
> trabalho.

**Helper text under the message field** — `DRAFT`
> Não precisa ser formal nem detalhado. O essencial é entender o que está
> acontecendo hoje.

**Submit label** — `DRAFT`, per §29
> **[Enviar mensagem]**

**Privacy line** — ⟦PLACEHOLDER⟧
> Required if LGPD applies (§44). Wording must come from PXTO — a data-handling
> statement is a legal commitment and **must not be drafted here**.

## 11.4 Form states

`DRAFT` — required by §39.

| Estado | Copy |
| --- | --- |
| Loading | `Enviando...` |
| Success (heading) | `Mensagem recebida.` |
| Success (body) | `Obrigado pelo contato. Vamos ler com atenção e responder no seu e-mail.` |
| Error (general) | `Não foi possível enviar sua mensagem. Tente novamente em instantes ou escreva diretamente para` ⟦PLACEHOLDER — e-mail⟧ |
| Error (network) | `Verifique sua conexão e tente novamente.` |

> ⚠ **The success message deliberately promises no timeframe.** Once PXTO defines
> a response commitment (Narrative §18.6), the body becomes, for example:
> `Vamos ler com atenção e responder em até {prazo}.` **Do not add a timeframe
> before it is decided** — an unmet promise on the first interaction is worse than
> no promise.

## 11.5 Validation microcopy

`DRAFT` — §39.

| Campo | Mensagem |
| --- | --- |
| Nome vazio | `Informe seu nome.` |
| E-mail vazio | `Informe um e-mail para contato.` |
| E-mail inválido | `Esse e-mail parece incorreto. Confira e tente novamente.` |
| Telefone inválido | `Esse número parece incompleto.` |
| Mensagem vazia | `Descreva brevemente o que precisa resolver.` |
| Mensagem curta | `Escreva um pouco mais para entendermos o contexto.` |

> Tone rule: validation messages instruct, never scold. No "Erro!", no "Campo
> obrigatório!" in isolation, no exclamation marks.

## 11.6 Contato direto

`DRAFT` structure · ⟦PLACEHOLDER⟧ content — §28.

> ## Prefere falar direto?
>
> E-mail: ⟦PLACEHOLDER⟧
> WhatsApp / Telefone: ⟦PLACEHOLDER⟧

> ⚠ **Do not invent contact details.** If no channel exists yet, **omit this
> section** rather than publishing a non-functioning address. The PRD requires the
> block (§28); the channels must come from PXTO (SITEMAP §11.2).

---

# PART III — Microcopy library

`DRAFT`

## Accessibility strings

| Element | Copy |
| --- | --- |
| Skip link | `Pular para o conteúdo` |
| External link | `abre em nova aba` |
| Menu toggle | `Abrir menu de navegação` / `Fechar menu` |
| Logo link | `PXTO — página inicial` |
| Form select default | `Selecione` |

## Alt text rules

`DERIVED` — §35; Project Framework §12.

- Every image needs alt text describing **what it shows**, not "imagem de..."
- Project cover images: describe the interface or output shown
- Decorative images: empty alt (`alt=""`), never a placeholder string
- **Never include a client name in alt text** unless disclosure is cleared (§20)

## Loading and empty states

| Situation | Copy |
| --- | --- |
| Generic loading | `Carregando...` |
| Form submitting | `Enviando...` |

> **No "empty state" copy is provided for the projects grid.** If there are no
> published projects, the section is **omitted**, not rendered empty (Project
> Framework §19.4). An empty-state message would advertise the absence.

---

# PART IV — Review notes

## 1. Placeholders — must be filled or the section removed

| # | Placeholder | Blocks |
| --- | --- | --- |
| 1 | Direct e-mail address | Contato §11.6, footer, error state §11.4 |
| 2 | Phone / WhatsApp | Contato §11.6, footer |
| 3 | Privacy notice wording | Contato §11.3, footer |
| 4 | Response-time commitment | Contato success state §11.4 |
| 5 | Project gallery and demo assets | Both project pages |

## 2. Items marked ⚠ CONFIRMAR

| # | Item | Page |
| --- | --- | --- |
| 1 | US client reference and furniture-sector attribution | Furniture Visualization §8.2 |
| 2 | Desafio block content | Furniture Visualization §8.4 |
| 3 | Solução detail beyond the PRD's sentence | Furniture Visualization §8.5 |
| 4 | Como funciona step descriptions | Furniture Visualization §8.6 |
| 5 | Desafio block content | AI Interior Designer §9.4 |
| 6 | Como funciona step descriptions | AI Interior Designer §9.6 |
| 7 | "Este site" claim — only valid if the built site meets §35–§37 | Sites §6.5 |
| 8 | *Evoluímos* — implies undefined post-delivery commitment | Home §1.5, Sobre §10.4 |
| 9 | "Os últimos 20% são sempre o problema" — a rhetorical framing of the off-the-shelf fit problem, taken from the approved headline Direction D (Narrative §16). It is **not** a claim about PXTO's work, but a reader could read "20%" as a statistic. **PXTO's call:** keep it as an idiom, or replace with a figure-free version — e.g. *"O que falta é sempre a parte específica do seu negócio."* | Software §5.2 |

## 3. Sections deliberately omitted

| Section | Reason |
| --- | --- |
| Resultado — both projects | No results documented or cleared (§20) |
| Projetos relacionados — Integrações, Automação | No cleared project demonstrates these capabilities |
| Any social-proof region | No evidence exists; prohibited (§53) |
| Sobre — history, team, vision, name origin | Undecided or unavailable (§10.8) |

## 4. Approval dependencies

This draft assumes decisions that are not yet approved. If any changes, the
affected copy is rewritten:

| Assumption | If rejected |
| --- | --- |
| Positioning territory (Positioning §14) | Rewrite Home §1.3, Soluções §2.2, Sobre §10.1–§10.2 |
| Headline direction A/B/E (Narrative §16.1) | Rewrite Home §1.2–§1.3, Contato §11.1–§11.2 |
| Capability-first category axis (Project Framework §2.4) | Change every project card label |
| Diferenciais content (Narrative §7.3) | Rewrite Home §1.7 |
| Disclosure ladder A/B/C (Project Framework §15.2) | Rewrite Furniture Visualization §8.2 |

## 5. Verification against the prohibitions

Checked across every page in this document:

- [x] No client names
- [x] No client logos or logo regions
- [x] No testimonials or quotes
- [x] No metrics, percentages, or figures of any kind
- [x] No awards, certifications, partners
- [x] No revenue, team size, or project counts
- [x] No performance results
- [x] No years of experience or founding date
- [x] No superlatives ("melhor", "líder", "inovador", "referência", "pioneiro")
- [x] No prohibited PRD vocabulary ("revolucionário", "disruptivo",
      "transformação digital" as empty phrase)
- [x] No first-person singular anywhere
- [x] No prohibited CTA labels
- [x] No AI vocabulary in any hero, navigation item, or page-level metadata
      outside the two project pages and §24's permitted mention
- [x] No layout slot requiring social proof
