# PXTO. Especificação dos arquivos de marca

**Versão:** 1.0
**Data:** 28/08/2026
**Para:** quem for recriar as logos
**Status:** briefing técnico. Não define identidade, define requisitos de arquivo.

> Este documento não decide como a marca deve ser. Ele registra o que os
> arquivos precisam cumprir para funcionar no site, com base no que foi medido
> nos arquivos entregues em 28/08/2026.

---

## 1. O que existe hoje

| Arquivo | Conteúdo | Situação |
| --- | --- | --- |
| `public/logo.svg` | Quadrado sólido com "pxto" vazado | Aplicado na navbar e no rodapé. **Ilegível abaixo de 64px** |
| `public/favicon.png` | "x" turquesa sobre quadrado preto, 1254x1254, 457 KB | Redimensionado para os ícones do site. **O master é grande demais para ficar em `public/`** |

São duas marcas diferentes, e isso está certo: uma assinatura completa e um
ícone. O problema está na execução dos arquivos, não no sistema.

---

## 2. Os dois problemas medidos

### 2.1 O wordmark não sobrevive em tamanho pequeno

Teste de legibilidade do `logo.svg`, renderizado e medido:

| Tamanho | Leitura |
| --- | --- |
| 24px | "p to" |
| 32px | "p to" |
| 40px | "p to" |
| 48px | "p to" |
| 64px | "x" visível, fraco |
| 96px | legível |

**A navbar usa 40px**, que é o maior tamanho compatível com o teto de 80px de
altura da navegação. Nesse tamanho a marca lê "p to".

Causa: o traço do "x" é fino demais em relação ao peso das outras letras. Num
wordmark, todos os traços precisam de peso óptico comparável, senão o mais fino
desaparece primeiro.

### 2.2 Os arquivos são vetorização automática, não vetor nativo

O `logo.svg` tem a assinatura de um autotrace: um grupo com
`transform="translate(0,1254) scale(0.1,-0.1)"` e um path único com 62
subcaminhos, vários deles resíduos de um pixel. O ruído fica visível a partir
de 64px, principalmente nas bordas do "x".

Consequências: arquivo maior que o necessário, bordas sujas ao ampliar, e
impossibilidade de ajustar traço ou espaçamento sem redesenhar.

---

## 3. O que precisa ser entregue

### 3.1 Marca principal (wordmark)

| Requisito | Valor |
| --- | --- |
| Formato | SVG, vetor nativo, **não vetorização de imagem** |
| Construção | Caminhos limpos, sem resíduos, sem grupos de transformação aninhados |
| `viewBox` | Presente e ajustado ao conteúdo |
| Cor | **Um único preenchimento**, para que o site possa trocar por `currentColor` |
| Sem | `width`/`height` fixos, prolog XML, DOCTYPE, IDs gerados, `<style>` embutido |
| Tamanho de arquivo | Alvo abaixo de 3 KB |

### 3.2 Variante para tamanho pequeno

**Este é o item que falta e que resolve o problema da navbar.**

Uma versão do wordmark ajustada para funcionar entre 24 e 48px:

- Traço do "x" com peso comparável ao do "p", "t" e "o"
- Espaçamento entre letras ligeiramente aberto
- Detalhes que somem nesse tamanho, simplificados ou removidos

É prática normal de manual de marca. Um logotipo bem construído tem ao menos
duas versões de desenho, não apenas dois tamanhos do mesmo arquivo.

**Critério de aceite:** renderizado a 32px, as quatro letras precisam ser
distinguíveis.

### 3.3 Ícone

O "x" isolado já cumpre esse papel e funciona bem. O que falta:

| Requisito | Valor |
| --- | --- |
| Formato | **SVG**, além do PNG |
| Fundo | Versão com fundo e versão com fundo transparente |
| Legibilidade | Verificar a 16px, que é o tamanho real na aba do navegador |

O SVG do ícone importa porque hoje os ícones do site são gerados por
redimensionamento de um PNG. Com vetor, ficam nítidos em qualquer densidade de
tela.

### 3.4 Conjunto completo

| Arquivo | Uso |
| --- | --- |
| `logo.svg` | Assinatura, tamanhos grandes |
| `logo-compact.svg` | Navbar e usos entre 24 e 48px |
| `icon.svg` | Favicon e ícone de aplicativo |
| `icon-transparent.svg` | Sobreposição em fundos variados |
| Versão monocromática | Uma cor, para impressão e fundos difíceis |

---

## 4. Requisitos de cor

O site tem dois temas e ambos precisam funcionar.

### 4.1 Como o site resolve isso hoje

O `logo.svg` entregue vinha com `fill="#000000"` fixo, e **desaparecia sobre o
fundo escuro** (`#0e0f11`). A correção aplicada foi trocar por `currentColor`:
o quadrado assume a cor do texto e o fundo da página aparece através das letras
vazadas.

Isso só funciona porque a marca usa **um único preenchimento**. Se a nova versão
tiver duas ou mais cores, essa solução deixa de funcionar e será preciso entregar
uma variante por tema.

**Recomendação:** manter a marca em um único preenchimento.

### 4.2 Conflito de cor a resolver

| Onde | Cor |
| --- | --- |
| `favicon.png` entregue | Turquesa, medido em **`#009D88`** |
| Accent do site hoje | Azul **`#1B4DE4`**, marcado como candidato |

**São cores diferentes, e uma delas está errada.** O site usa o azul em links,
foco, estados ativos e botões primários. O ícone da aba usa turquesa. Hoje um
visitante vê duas cores de marca concorrendo.

Isso precisa de decisão da PXTO, não de código:

1. **O turquesa é a cor da marca.** Nesse caso o accent do design system muda
   para `#009D88` e todos os pares de contraste precisam ser revalidados em AA.
   O turquesa sobre branco dá cerca de 3,4:1, o que **reprova** para texto de
   corpo e exige um tom mais escuro para links.
2. **O azul é a cor da marca.** Nesse caso o ícone precisa ser refeito em azul.
3. **O turquesa é só do ícone.** Possível, mas raro e difícil de sustentar.

Enquanto não houver decisão, o site segue com o azul candidato e o ícone com
turquesa, e a inconsistência permanece visível.

---

## 5. Requisitos técnicos

Para qualquer SVG entregue:

- Sem prolog XML nem DOCTYPE
- Sem `width` e `height` fixos, apenas `viewBox`
- Sem `<style>` embutido, sem classes, sem IDs gerados por editor. IDs colidem
  quando o SVG é inserido em linha na página
- Sem `<image>` embutido. Um SVG que contém um bitmap não é vetor
- Sem metadados de editor, camadas ocultas ou objetos fora da área
- Caminhos com números arredondados, três casas decimais bastam
- Passar por otimização (SVGO ou equivalente) antes da entrega

Para PNG:

- Entregar o master em tamanho razoável, **não 1254x1254 com 457 KB**
- Com canal alpha quando houver transparência
- 512x512 é suficiente como master de ícone

---

## 6. Espaçamento e uso

Ainda não definido, e faz falta:

- **Área de respiro:** distância mínima entre a marca e qualquer outro elemento,
  expressa em fração da própria marca
- **Tamanho mínimo:** por meio, impresso e em tela
- **Fundos permitidos:** claro, escuro, sobre imagem
- **Usos proibidos:** distorção, rotação, troca de cor, contorno, sombra,
  recomposição das letras

---

## 7. Como validar antes de entregar

O site tem um teste de tamanho pronto. Depois de substituir os arquivos:

```bash
npm run build
npx next start -p 5600
npm run audit          # inclui contraste em ambos os temas
```

E a checagem visual mínima:

1. Renderizar o wordmark a 24, 32, 40, 48, 64 e 96px. **As quatro letras
   precisam ser distinguíveis a partir de 32px.**
2. Renderizar sobre `#fcfcfc` e sobre `#0e0f11`. A marca precisa aparecer nos
   dois.
3. Renderizar o ícone a 16px e conferir se ainda é reconhecível.
4. Conferir o contraste da cor da marca contra os dois fundos, em AA.

---

## 8. Checklist de entrega

- [ ] `logo.svg`, vetor nativo, preenchimento único, abaixo de 3 KB
- [ ] `logo-compact.svg`, legível a 32px
- [ ] `icon.svg`, com e sem fundo
- [ ] Versão monocromática
- [ ] Master PNG do ícone, 512x512, com alpha
- [ ] Decisão sobre a cor da marca: turquesa ou azul
- [ ] Área de respiro e tamanho mínimo definidos
- [ ] Usos proibidos documentados
- [ ] Todos os SVGs otimizados e sem metadados de editor

---

## 9. O que o site faz enquanto isso

| Item | Estado |
| --- | --- |
| Navbar | Usa `logo.svg` a 40px. **Lê "p to".** Trocar por `logo-compact.svg` quando existir |
| Rodapé | Usa `logo.svg` a 56px. Aceitável |
| Favicon | Gerado do `favicon.png` a 64px e 180px. Funciona |
| Tema escuro | Resolvido por `currentColor` |
| Accent | Azul candidato `#1B4DE4`, em conflito com o turquesa do ícone |
| `public/favicon.png` | 457 KB servidos publicamente sem uso. **Pode sair de `public/`**, os ícones já são gerados |

Voltar ao wordmark em texto no cabeçalho, até existir a variante compacta, é uma
linha em `src/components/layout/Navbar.tsx`.

O limiar de legibilidade medido está registrado em `src/components/ui/Logo.tsx`.
