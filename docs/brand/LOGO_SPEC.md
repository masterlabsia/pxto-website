# PXTO. Especificação dos arquivos de marca

**Versão:** 2.0
**Data:** 31/08/2026
**Para:** quem produzir ou substituir arquivos de marca
**Status:** briefing técnico. Não define identidade, define requisitos de arquivo.

> A v1.0 descrevia a marca quadrada com "pxto" vazado, substituída em 30/08/2026.
> Este documento descreve o que existe hoje e o que ainda falta.

---

## 1. O que existe hoje

| Arquivo | Conteúdo | Situação |
| --- | --- | --- |
| `public/logo.svg` | Wordmark horizontal "pxto", letras pretas e "x" verde `#308459`. Proporção 2.24:1 | **Em uso** na navbar e no rodapé |
| `public/favicon.png` | "x" isolado turquesa `#009D88` sobre quadrado preto, 1254x1254, 457 KB | Master. Os ícones do site são gerados dele |
| `src/app/icon.png` | 64x64, 1,8 KB | Favicon, gerado |
| `src/app/apple-icon.png` | 180x180, 7,6 KB | Ícone de aplicativo, gerado |

São duas marcas: uma assinatura horizontal e um ícone. O sistema está certo.

---

## 2. O que a marca nova resolveu

**A legibilidade em tamanho pequeno.** A marca anterior era um quadrado com
"pxto" vazado, e o traço do "x" era fino demais: media-se "p to" até 48px, e o
"x" só aparecia a partir de 64px. Na navbar, a 40px, a marca lia errado.

O wordmark horizontal é legível a **28px de altura**, que é o tamanho em uso na
navbar. Problema encerrado.

---

## 3. O que ela trouxe, e precisa de decisão

### 3.1. Três cores de marca concorrendo

| Onde | Cor | Contraste sobre branco |
| --- | --- | --- |
| Logo | Verde `#308459` | ~4,0:1 |
| Favicon | Turquesa `#009D88` | ~3,4:1 |
| Accent do site | Azul `#1B4DE4` | passa AA |

Na navbar as três aparecem ao mesmo tempo: logo verde à esquerda, botão azul à
direita, e o ícone turquesa na aba do navegador.

**Isso precisa de decisão da PXTO, não de código.** E tem consequência técnica:

- Se o **verde** virar o accent, `#308459` sobre branco dá cerca de 4,0:1. Passa
  raspando para texto de corpo e **todos os pares precisam ser revalidados** em
  AA antes da troca.
- Se o **turquesa** virar o accent, ele **reprova** para texto de corpo e links
  exigiriam um tom mais escuro.
- Se o **azul** permanecer, logo e favicon precisam ser refeitos.

### 3.2. Duas cores no wordmark, e o que isso exige

O wordmark tem dois papéis de cor: letras e "x". Isso é bom, e o site já trata:

- **Letras: `currentColor`.** Seguem a tinta do tema, funcionam no claro e no
  escuro sem um segundo arquivo.
- **"x": cor da marca**, fixa nos dois temas.

**Restrição para qualquer versão futura: no máximo duas cores, e a segunda
precisa vir declarada no arquivo.** O gerador reprova com três ou mais, porque
aí o tema não fecha sem entregar variantes por tema.

O arquivo entregue veio com as **letras sem cor declarada**, o que as renderiza
pretas por padrão e as faria sumir no tema escuro. O gerador trata isso: path
sem cor declarada vira `currentColor`.

### 3.3. A tipografia da marca

O arquivo registra a fonte original: **Aeonik Medium**, agora vetorizada.

Isso é informação de marca que não existia em lugar nenhum. A tipografia do site
ainda está marcada como candidata (Geist). **Se Aeonik for a fonte da marca, é
um argumento forte para ser também a do site**, e a decisão pertence ao mesmo
lote das cores.

---

## 4. Como trocar a marca

```bash
# 1. substitua o arquivo
cp nova-marca.svg public/logo.svg

# 2. regenere o módulo que o site lê
npm run build:logo
```

**Por que o passo 2 existe.** A geometria vive em `src/lib/logo-paths.ts`, para
que o `<symbol>` seja declarado uma vez por página e reutilizado por `<use>`, em
vez de repetir os paths na navbar e no rodapé. Sem o passo 2, trocar o SVG não
muda nada no site: foi exatamente o que aconteceu em 30/08/2026.

O gerador reprova, em vez de corrigir em silêncio, quando encontra:

- ausência de `viewBox`;
- nenhum `<path>`;
- mais de uma cor de acento;
- `transform` em `<path>` individual, que a extração não preserva.

---

## 5. Requisitos de arquivo

### 5.1. A armadilha do transform

**O erro mais provável, e o que já aconteceu.** O Inkscape exporta o desenho em
coordenadas cruas e o reposiciona com um `transform` no grupo de camada:

```xml
<g id="layer1" transform="translate(-112.4804,-127.89224)">
```

Extrair só os `<path>` e descartar esse transform desloca o desenho: o SVG
original renderiza certo e **a versão do site aparece cortada na direita e na
base**. O gerador agora preserva o transform dos grupos. Se o transform estiver
em paths individuais, ele reprova e pede o achatamento no editor.

### 5.2. Para qualquer SVG entregue

- Vetor nativo, **não vetorização automática de imagem**
- `viewBox` presente e coerente com o conteúdo
- Sem prolog XML, DOCTYPE, `width` e `height` fixos
- Sem `<style>` embutido, sem IDs de editor (colidem quando o SVG é inserido
  inline na página)
- Sem `<image>` embutido: um SVG que contém bitmap não é vetor
- No máximo duas cores, a segunda declarada explicitamente
- Alvo abaixo de 4 KB

### 5.3. Para PNG

- Master em tamanho razoável, **não 1254x1254 com 457 KB**
- Canal alpha quando houver transparência
- 512x512 basta como master de ícone

---

## 6. O que ainda falta

| Item | Situação |
| --- | --- |
| **Decisão de cor da marca** | Três cores concorrendo. Ver 3.1. É o item mais urgente |
| **Versão monocromática** | Não existe. Necessária para impressão e fundos difíceis |
| **Ícone em SVG** | Só existe em PNG. Vetor deixaria os ícones nítidos em qualquer densidade |
| **Ícone com fundo transparente** | Só existe a versão com quadrado preto |
| **Área de respiro** | Não definida. Distância mínima entre a marca e qualquer outro elemento, em fração da própria marca |
| **Tamanho mínimo** | Medido em 28px de altura para tela. Falta definir para impresso |
| **Usos proibidos** | Não documentados: distorção, rotação, troca de cor, contorno, sombra, recomposição das letras |

---

## 7. Como validar antes de entregar

```bash
npm run build:logo   # reprova arquivo malformado
npm run check        # typecheck, lint, ativos, build
npm run audit        # inclui contraste computado nos dois temas
```

Checagem visual mínima:

1. Renderizar a 24, 32, 48 e 96px de **altura**. A marca é horizontal: dimensione
   por altura, nunca force largura e altura juntas, que distorce.
2. Renderizar sobre `#fcfcfc` e sobre `#0e0f11`. **Precisa aparecer nos dois.**
3. Conferir se o desenho inteiro cabe no `viewBox`, sem corte na direita nem na
   base. É a falha de 5.1.
4. Conferir o contraste da cor da marca contra os dois fundos, em AA.

---

## 8. Checklist de entrega

- [x] Wordmark em SVG, vetor nativo
- [x] Legível a 28px de altura
- [x] Funciona nos dois temas
- [x] No máximo duas cores
- [ ] **Decisão sobre a cor da marca: verde, turquesa ou azul**
- [ ] Decisão sobre a tipografia: Aeonik é a fonte da marca e do site?
- [ ] Versão monocromática
- [ ] Ícone em SVG, com e sem fundo
- [ ] Master PNG do ícone em 512x512 com alpha
- [ ] Área de respiro e tamanho mínimo impresso
- [ ] Usos proibidos documentados

---

## 9. O que o site faz hoje

| Item | Estado |
| --- | --- |
| Navbar | Wordmark a 28px em mobile, 32px em desktop. Legível |
| Rodapé | Wordmark a 36px |
| Favicon | Gerado do PNG a 64px e 180px |
| Tema escuro | Resolvido: letras em `currentColor`, "x" na cor da marca |
| Accent do site | Azul `#1B4DE4`, candidato, **em conflito com o verde do logo** |
| `public/favicon.png` | 457 KB servidos publicamente sem uso. Pode sair de `public/` |

O pipeline de geração está em `scripts/build-logo.mjs` e o componente em
`src/components/ui/Logo.tsx`.
