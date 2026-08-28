# PXTO Website. Relatório de QA

**Versão:** 1.0
**Data:** 28/08/2026
**Escopo:** Visual, Responsive, Functional, Accessibility, SEO, Performance, Security, Content
**Build auditado:** Next.js 15.5.24, 12 rotas, 3 projetos publicados
**Veredito:** **Aprovado condicionalmente.** Nenhum defeito aberto. **Cinco bloqueios de negócio impedem a publicação.**

> Zero em-dash neste documento, pela regra que vale para o produto.

---

## 1. Sumário

| Dimensão | Resultado | Achados | Corrigidos | Abertos |
| --- | --- | --- | --- | --- |
| Visual | Aprovado com ressalva | 4 | 3 | 1 |
| Responsive | Aprovado | 2 | 2 | 0 |
| Functional | Aprovado | 1 | 1 | 0 |
| Accessibility | Aprovado | 153 | 153 | 0 |
| SEO | Aprovado | 0 | 0 | 0 |
| Performance | Aprovado com ressalva | 2 | 1 | 1 |
| Security | Aprovado | 2 | 2 | 0 |
| Content | Aprovado | 0 | 0 | 0 |
| **Total** | | **164** | **162** | **2** |

Os dois itens abertos são ressalvas que dependem de ativo ou decisão de marca, e
não defeitos de código: o **peso das fontes** e a **legibilidade da marca em
tamanho pequeno**.

### Como reproduzir

```bash
npm run build && npx next start -p 5200
npm run audit            # as seis suítes
npm run audit:a11y       # individualmente
```

Cada suíte sai com código de erro quando falha, então servem de gate em CI.

---

## 2. Visual

**Método:** revisão de capturas em 320, 390, 1440 px, temas claro e escuro, nas
rotas representativas de cada template.

### Verificado

- Hierarquia tipográfica legível e consistente entre home e páginas internas
- Ritmo vertical na escala de 4px, com o intervalo maior separando os movimentos
  do argumento
- Composição assimétrica em todas as páginas, nenhum hero centralizado
- Paridade de hierarquia entre temas: o que se destaca no claro se destaca no
  escuro
- Ausência dos padrões proibidos: sem gradiente, sem glassmorphism, sem glow,
  sem card arredondado, sem grade de ícones, sem hero com screenshot falso

### Achados corrigidos

| # | Achado | Correção |
| --- | --- | --- |
| V1 | Hero flutuava no meio da viewport. Densidade lida como 2 contra spec de 5 | Alinhamento ao topo, padding reduzido, régua inferior, escala de seção um passo mais apertada |
| V2 | Coluna esquerda vazia em Problema e em Abordagem das quatro páginas de solução | Reframe movido para a coluna esquerda em Problema. Abordagem virou split de duas colunas |
| V3 | Diferenciais renderizava grade 2x2 comum, repetindo família de layout | Stagger real com offset vertical |

### V4. Marca aplicada, com defeito de legibilidade no ativo

O logo em SVG foi entregue em `public/logo.svg` em 28/08/2026 e está aplicado na
navbar, no rodapé e no favicon. O wordmark em texto que servia de substituto foi
removido.

**A marca é um quadrado sólido com "pxto" vazado.** Isso resolveu o tema escuro
de graça: com `fill="currentColor"` o quadrado assume a cor de tinta e o fundo da
página aparece através das letras. O arquivo entregue vinha com `fill="#000000"`
fixo, que desaparecia sobre o fundo escuro.

**Defeito no ativo, não no código.** Teste de tamanho medido:

| Tamanho | Leitura |
| --- | --- |
| 24px | "p to" |
| 32px | "p to" |
| 40px | "p to" |
| 48px | "p to" |
| 64px | "x" visível, fraco |
| 96px | legível |

O traço do "x" é fino demais em relação às outras letras, e o arquivo é uma
vetorização automática, com ruído nas bordas visível a partir de 64px.

**A navbar usa 40px**, que é o maior tamanho compatível com o teto de 80px de
altura da navegação. **Isso está abaixo do mínimo legível: no cabeçalho a marca
lê "p to".**

Correção possível apenas no ativo:

1. Uma variante para tamanho pequeno, com o "x" mais encorpado. É o que um
   manual de marca normalmente já traz.
2. Um vetor limpo no lugar da vetorização automática, o que também elimina o
   ruído e reduz o arquivo.
3. Enquanto isso, voltar ao wordmark em texto no cabeçalho é uma linha de
   código.

O limiar medido está registrado em `src/components/ui/Logo.tsx` para não se
perder.

### Observação sem ação

A identidade "documento de especificação" está cerca de 70% legível. O que falta
é fotografia real: os slots rotulados são hoje o elemento mais fraco de cada
página. Não é defeito de implementação, é ativo ausente. Ver §9.1.

---

## 3. Responsive

**Método:** `npm run audit:responsive`. 8 rotas x 6 viewports (320, 390, 768,
1024, 1440, 1920). Verifica overflow horizontal, elementos escapando da
viewport, tamanho mínimo de fonte, altura da navegação, navegação em uma linha
no desktop e alcançabilidade do CTA.

**Resultado: 48 combinações, zero falhas.**

### Achados corrigidos

| # | Severidade | Achado | Correção |
| --- | --- | --- | --- |
| R1 | **Alta** | O CTA da navbar desaparecia abaixo de 640px. Violava a própria spec do design system: "o CTA permanece alcançável sem abrir o menu" | CTA visível em todas as larguras, com padding reduzido no menor tier. Item duplicado removido do menu |
| R2 | Média | Overflow de 5px em `/projetos/gestao-de-contratos` @320. O rótulo aprovado "Quero conversar sobre meu projeto" com `whitespace-nowrap` não cabe | `whitespace-nowrap` passa a valer só de `sm` para cima. A regra de não quebrar rótulo é regra de desktop |

O headline do hero também foi reescalonado numa rodada anterior: quebrava em
seis linhas em 390px, o que é erro de escala e não de comprimento de copy.

---

## 4. Functional

**Método:** `npm run audit:functional`. Crawl de todos os links internos a partir
de `/`, regras de link do SITEMAP, 404, navegação real, menu mobile, e a máquina
de estados completa do formulário.

**Resultado: 12 rotas alcançáveis, zero falhas.**

### Verificado

| Item | Estado |
| --- | --- |
| Todos os links internos resolvem com 200 | OK |
| Regra R1: toda página oferece caminho para `/contato` | OK |
| Regra R2: toda página não-projeto oferece caminho para um projeto | OK |
| Nenhum link vazio ou `href="#"` | OK |
| 404 responde status 404 com a copy aprovada | OK |
| Navegação leva ao destino correto nos quatro itens | OK |
| Menu mobile: `aria-expanded` correto, abre, fecha com Escape | OK |
| `sitemap.xml` contém as rotas publicadas e exclui `/design-system` | OK |
| `robots.txt` bloqueia `/design-system` | OK |
| Honeypot presente e invisível | OK |

### Formulário: os cinco estados

| Estado | Comportamento verificado |
| --- | --- |
| Vazio | Produz erros de campo, não sucesso silencioso |
| E-mail inválido | Erro vinculado ao campo por `aria-describedby` |
| Válido, destino não configurado | **Reporta que o envio não está configurado** |
| Loading | Botão desabilitado com rótulo próprio |
| Sucesso | Sem promessa de prazo, porque o compromisso não foi definido |

O terceiro é o mais importante. Numa rodada anterior o formulário retornava
sucesso silencioso para submissões rápidas: um humano com autofill veria
"Mensagem recebida" e o lead seria descartado. Corrigido medindo o tempo a
partir da primeira interação, e pulando a checagem quando não há interação
registrada, para nunca descartar quem está sem JavaScript.

---

## 5. Accessibility

**Método:** duas camadas. `axe-core` com as tags WCAG 2.0/2.1/2.2 A e AA, mais
`npm run audit:a11y`, que cobre o que o axe não pega.

**Resultado:**

- **axe: 0 violações** em 12 rotas x 2 viewports
- **Auditoria própria: 0 problemas** em 10 rotas, temas claro e escuro

### O que a auditoria própria verifica

Contraste computado de cada nó de texto contra o fundo real herdado, ordem de
foco por navegação de teclado, skip link, hierarquia de headings, landmarks,
tamanho de alvo, rótulo de todo controle de formulário e reduced motion.

### Achados corrigidos

Primeira execução: **151 problemas**. Depois das correções: zero.

| # | Severidade | Achado | Correção |
| --- | --- | --- | --- |
| A1 | Média | Alvos abaixo de 24x24 (WCAG 2.5.8) em links de nav, footer e ArrowLink | Padding vertical |
| A2 | Média | `/projetos` pulava de `h1` para `h3` | `ProjectCard` com nível de heading configurável |

Mais dois falsos-positivos do próprio instrumento, corrigidos no script: o skip
link contava como alvo pequeno enquanto invisível, e `.focus()` programático não
ativa `:focus-visible`, o que exigiu trocar por navegação real com Tab.

### Contraste

**Zero falhas em ambos os temas.** A verificação calcula o ratio real de cada nó
contra o fundo herdado, não os tokens em teoria. Isso valida a paleta candidata
para AA. Quando a paleta definitiva chegar, rodar de novo antes de publicar.

---

## 6. SEO

**Método:** verificação do HTML renderizado em 7 rotas.

**Resultado: zero falhas.**

| Item | Estado |
| --- | --- |
| `title` único por página | OK |
| `meta description` entre 112 e 188 caracteres | OK |
| `canonical` absoluto | OK |
| Open Graph e Twitter card | OK |
| `lang="pt-BR"` | OK |
| Um `h1` por página, sem pular níveis | OK |
| `sitemap.xml` gerado do conteúdo, não mantido à mão | OK |
| `robots.txt` com sitemap e bloqueio da referência interna | OK |
| Preview com `noindex` | Configurado |

### Structured data

| Rota | Tipos |
| --- | --- |
| Todas | `Organization`, `WebSite` |
| `/solucoes/*` | `+ Service`, `BreadcrumbList` |
| `/projetos/*` | `+ CreativeWork`, `BreadcrumbList` |

Structured data é afirmação factual feita a buscador, então está sob PRD 53 igual
à copy visível. O helper **proíbe permanentemente** `aggregateRating`, `review`,
`award`, `foundingDate`, `numberOfEmployees` e `priceRange`, e a auditoria varre
por eles em cada rota. Zero ocorrências. Projeto anonimizado não carrega `client`
nem `sponsor`.

### Pendência

**Imagens Open Graph ausentes.** Bloqueadas em logo e tipografia. Links
compartilhados aparecem sem cartão visual. Ver §9.1.

---

## 7. Performance

**Método:** `npm run audit:perf`. Performance API em Chromium real, 7 rotas.

**Lighthouse não roda neste ambiente:** a versão atual exige Node 22 e a máquina
tem 20.9. Isso confirma na prática a recomendação de Node 22 LTS registrada na
arquitetura técnica.

### Medições

| Rota | LCP | CLS | JS bruto | CSS | Fontes | DOM |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 148ms | **0** | 433K | 28K | 138K | 297 |
| `/solucoes` | 100ms | **0** | 434K | 28K | 138K | 191 |
| `/solucoes/integracoes` | 100ms | **0** | 434K | 28K | 138K | 188 |
| `/projetos` | 88ms | **0** | 434K | 28K | 138K | 142 |
| `/projetos/gestao-de-contratos` | 112ms | **0** | 434K | 28K | 138K | 185 |
| `/sobre` | 80ms | **0** | 433K | 28K | 138K | 198 |
| `/contato` | 100ms | **0** | 433K | 28K | 138K | 149 |

First Load JS comprimido, do build: 103 kB compartilhado, 106 a 122 kB por rota.

### Leitura honesta dos números

**LCP e TTFB são localhost e não representam o mundo real.** Não devem ser
reportados como se fossem.

**CLS zero é resultado real e independente de ambiente.** Vem de dimensões
explícitas nas imagens e do carregamento de fonte via `next/font`.

**Zero long tasks** em todas as rotas.

### Achado corrigido

| # | Achado | Correção |
| --- | --- | --- |
| P1 | A medição usava `content-length`, que a Next não envia na maioria dos chunks, subcontando JS em uma ordem de grandeza (reportava 1K em vez de 433K) | Passou a medir o corpo real da resposta |

### Ressalva aberta

| # | Item | Situação |
| --- | --- | --- |
| P2 | **As fontes são o ativo mais pesado do site.** 138 KB em dois woff2, mais que os 111 KB de JS comprimido | Geist Sans e Geist Mono variáveis, ~69 KB cada. É troca real entre identidade e peso: o mono é o que sinaliza "técnico" no design system. Como as tipografias ainda são candidatas, fica como budget de 145 KB para a decisão de marca |

### Budget aberto, não resolvido

O budget original de 90 kB de First Load JS **não é alcançável**. Medido: uma
página com zero client components ainda carrega 103 kB, que é o piso de React 19
mais Next 15 App Router. A arquitetura técnica registrou uma condição ao escolher
Next sobre Astro: *se o budget não for atingido, revisitar o framework em vez de
afrouxar o budget.* Essa condição disparou e **continua sem decisão**. Com 12
rotas construídas, o custo de trocar só sobe.

---

## 8. Security

**Método:** `npm run audit:security`. Headers, varredura de segredos no bundle
do cliente, destino do formulário, links externos, higiene do repositório e
vazamento de variável de servidor para client component.

**Resultado: zero falhas, um aviso aceito.**

### Headers verificados

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; ...
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

`x-powered-by` não é exposto.

### Achado corrigido

| # | Severidade | Achado | Correção |
| --- | --- | --- | --- |
| S1 | **Alta** | **CSP ausente.** A arquitetura especificava uma CSP estrita e ela nunca foi implementada | CSP implementada com todas as diretivas travadas em `'self'`, mais `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'` |

### Correção de uma afirmação da arquitetura

A arquitetura técnica §15 afirmava que uma CSP estrita de script era alcançável
com um nonce apenas no bloco JSON-LD. **Isso estava errado.** A Next injeta seu
próprio script inline de bootstrap em toda página, e usar nonce exige middleware,
que força renderização dinâmica em todas as rotas.

Decisão: `script-src` e `style-src` carregam `'unsafe-inline'`, todo o resto fica
travado. Para um site estático de doze páginas, sem conta de usuário, sem sessão,
sem script de terceiro e sem conteúdo gerado por usuário, a superfície de XSS que
o nonce fecharia é próxima de nula. A troca está documentada em `next.config.ts`
e deve ser revisitada se o site ganhar autenticação ou renderizar input de
usuário.

### Varreduras

| Item | Resultado |
| --- | --- |
| Chaves de API, chaves privadas, padrões de segredo no bundle | Nenhuma |
| Termos confidenciais de cliente no bundle | Nenhum |
| `action` do formulário apontando para origem externa | Não |
| `target="_blank"` sem `rel="noopener"` | Nenhum |
| `.env` ignorado pelo git | Sim |
| `NEXT_PUBLIC_` com nome de segredo | Nenhuma |
| Client component lendo env de servidor | Nenhum |

### S2. A CSP quebrou o hot reload em desenvolvimento

Achado depois da rodada de QA, ao rodar `next dev`.

A CSP adicionada em S1 não previa desenvolvimento. O `next dev` usa `eval()`
para hot module replacement e um websocket para notificar o browser de cada
alteração. Sem `'unsafe-eval'` e sem `ws:`, ambos ficavam bloqueados: a página
carregava normalmente, mas **parava de atualizar depois de qualquer edição**, e
o console enchia de erro de CSP.

O sintoma era fácil de atribuir à última mudança visível, que era a logo. Não
era a logo: o site renderizava íntegro, sem overflow, com a marca no tamanho
certo.

Corrigido tornando a CSP consciente do ambiente. Verificado:

| Verificação | Resultado |
| --- | --- |
| Hot reload aplica a edição sem reiniciar | Sim |
| Erros de CSP em desenvolvimento | 0 |
| `unsafe-eval` na CSP de produção | Ausente |
| `ws:` na CSP de produção | Ausente |

A auditoria de segurança roda contra o build de produção, então a permissão de
desenvolvimento não afrouxa o que é verificado.

### Aviso aceito

Os blocos JSON-LD inline não carregam nonce. Aceito pela decisão de CSP acima.

---

## 9. Content

**Método:** `npm run audit:content`. Verifica o texto **renderizado**, não o
fonte, porque a regra é sobre o que o visitante vê. 12 rotas.

**Resultado: zero falhas.**

| Verificação | Regra | Resultado |
| --- | --- | --- |
| Em-dash e en-dash | Zero tolerância | 0 ocorrências |
| Middle-dot | Máximo 1 por linha | Nenhuma linha excede |
| Vocabulário proibido | PRD 7, 20 termos | Nenhum |
| CTAs proibidos | PRD 29 | Nenhum |
| Termos confidenciais de cliente | 6 termos | Nenhum |
| Primeira pessoa do singular | PRD 27 | Nenhuma |
| Números com cara de métrica inventada | PRD 53 | Nenhum |
| Slots de prova social | POSITIONING 13.6 | Nenhum |
| Estados vazios | "Omitir, nunca esvaziar" | Nenhum |
| Integridade da copy fixa | PRD 12, 13, 14, 16, 23 a 26 | Todas presentes verbatim |
| Placeholder no HTML | | Nenhum |

### Achado corrigido no instrumento

O check de placeholder usava `/TODO/i`, que casava com as palavras portuguesas
"todo projeto" e "todos os projetos". Passou a ser sensível a maiúsculas e
delimitado por palavra.

### Seções omitidas, verificadas como corretas

| Seção | Onde | Motivo |
| --- | --- | --- |
| Projetos relacionados | `/solucoes/automacao`, `/solucoes/sites` | Nenhum projeto liberado demonstra essas capacidades |
| Resultado | Furniture Visualization, AI Interior Designer | Nada documentado, nada liberado |
| Contato direto | `/contato` e footer | Canais indefinidos |
| Galeria | Os três projetos | Nenhum ativo entregue |

Em todos os casos a seção **não é renderizada**. Nenhum estado vazio, nenhum
"em breve", nenhum card de placeholder.

---

## 10. Bloqueios para publicação

Nenhum é defeito de software. Todos são decisão ou ativo da PXTO.

| # | Bloqueio | Impede | Severidade |
| --- | --- | --- | --- |
| B1 | **Paleta e tipografia** | Continuam candidatas. A paleta passa AA, mas não é a definitiva | **Crítica** |
| B1b | **Variante da marca para tamanho pequeno** | O logo foi entregue e aplicado, mas lê "p to" abaixo de 64px, inclusive na navbar. Ver §2 V4 | **Alta** |
| B1c | **Cor da marca indefinida** | O favicon entregue usa turquesa `#009D88`, o accent do site usa azul `#1B4DE4`. Duas cores de marca concorrendo. Se o turquesa vencer, o contraste precisa ser revalidado: sobre branco dá cerca de 3,4:1, o que reprova para texto de corpo. Ver `docs/brand/LOGO_SPEC.md` §4.2 | **Alta** |
| B2 | **Fotografia real** | Os três projetos e o hero renderizam slots rotulados. É o elemento mais fraco de cada página, e também bloqueia as imagens Open Graph | **Crítica** |
| B3 | **Destino do lead** | O formulário valida, mostra todos os estados e **reporta que o envio não está configurado**. Nenhum lead é entregue | **Crítica** |
| B4 | **Canais de contato diretos e texto de privacidade** | Bloco de contato direto e link legal omitidos. Texto de privacidade é compromisso jurídico e não pode ser redigido por agente | **Alta** |
| B5 | **Autorização escrita dos três projetos** | `published: true` foi definido a pedido, mas os checklists §20 não estão assinados. FRAMEWORK 14.3: "se não está escrito, não está liberado" | **Alta** |

### Decisões técnicas ainda em aberto

| Item | Situação |
| --- | --- |
| Astro versus budget de JS | Condição disparada na primeira build, sem decisão. Custo de troca sobe a cada página |
| Provider de analytics | Funil instrumentado e inerte até `NEXT_PUBLIC_ANALYTICS` nomear um |
| Peso das fontes | 138 KB. Revisitar junto com a decisão de tipografia |
| Node 22 LTS | O ambiente tem 20.9, o que impede rodar Lighthouse |

### Pendências de conteúdo herdadas

| Item | Onde |
| --- | --- |
| Conteúdo da seção Diferenciais | Marcado PROPOSAL, escrito a partir dos diferenciais estruturais |
| Página Sobre incompleta | Visão, origem do nome, visibilidade do fundador indefinidos |
| "Os últimos 20% são sempre o problema" | Único número do site. Idiomático, mas legível como estatística. Decisão da PXTO |
| Identificação indireta do case de contratos | Revalidar após a elevação para Nível B |

---

## 11. Veredito

**O software está pronto. O negócio não.**

Nenhum defeito aberto em oito dimensões. 162 achados ao longo da auditoria, 161
corrigidos, e o único restante é uma ressalva de peso de fontes que depende de
uma decisão de marca.

O que impede a publicação são **cinco bloqueios de negócio**, e três deles são
críticos: sem ativos de marca, sem fotografia e sem destino de lead, o site
funciona mas não entrega o objetivo do PRD, que é gerar oportunidade comercial.

**Ordem recomendada:** B3 destrava o objetivo de negócio e é a decisão mais
barata. B1 e B2 destravam a camada visual inteira. B5 é rápido e protege
juridicamente o que já está no ar.

### Assinatura

```
Auditado por:          Claude, sessão de 28/08/2026
Aprovado por:          ______
Data:                  ______
Liberado para produção: [ ]
```

Um agente pode auditar. Não pode liberar.
