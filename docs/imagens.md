# Registro das imagens do site

**Atualizado em 11/11/2026.** Registro editorial de cada imagem usada nas páginas: de onde veio,
como foi feita, como foi tratada e o que ela pode ou não afirmar. Os originais em resolução
cheia ficam em `assets-source/imagens-originais/` (fora do git, 2 MB cada), e o site usa os
AVIF de `public/images/site/`.

## Natureza das imagens

**As duas imagens da Home são geradas por IA, não fotografias de um lugar real.** Decisão do
responsável em 11/11/2026, que pediu imagem de atmosfera e aceitou o uso de imagem gerada,
ciente de que isso contraria o `CLAUDE.md` §7.15 (ver "Regra" abaixo). Uma terceira, os
cabos emaranhados do Problema, foi testada e **retirada a pedido do responsável em
11/11/2026**: a seção voltou ao layout original. O original dela segue em
`assets-source/`, e o AVIF saiu do site. O texto alternativo de
cada uma diz "Imagem ilustrativa, gerada por IA", e nenhuma pode ser apresentada como o
ambiente, o trabalho ou o cliente da PXTO.

**Nenhuma** mostra pessoa, marca, logo, cliente, projeto ou produto da PXTO, e nenhuma afirma
nada sobre trabalho feito. Servem de metáfora: bagunça, ordem e calma.

## As imagens

| Arquivo | Onde | Metáfora | Original | Tratamento | Tamanho |
| --- | --- | --- | --- | --- | --- |
| `modelo.avif` | Fundo do Modelo de trabalho | A ordem, o resultado depois da bagunça | 1680x944 | **Saturação reduzida em 40%**: o azul do original era forte demais para a paleta neutra | 36 KB |
| `cta.avif` | Fundo do CTA final, **contêiner em largura total** da página (margem de 20px) e com a altura da tela | Calma, espaço, luz baixa | 1776x896 | Nenhum além da conversão para AVIF | 13 KB |

**Origem:** geradas no Canva (conector de imagem do Claude, na conta do responsável) em
11/11/2026. **Pedidos usados** (genéricos, sem nada do PXTO), em inglês, tal como enviados:

- `problema` (retirada): *Realistic photograph of a tangled mess of black and grey network cables and power
  cords behind a desk, shallow depth of field, moody dim lighting, no people, no text, no logos,
  no brand names* (16:9).
- `modelo`: *Realistic photograph of a neatly organized network patch panel with perfectly
  routed cables in a server rack, clean cable management, shallow depth of field, cool dim
  lighting, no people, no text, no logos, no brand names* (16:9).
- `cta`: *Calm minimal architecture photograph of a concrete building facade at twilight with
  soft light, deep blue and charcoal tones, lots of empty space, no people, no text, no logos*
  (2:1).

**Conversão:** `sharp` (que já vem com o Next), `avif({ quality: 52, effort: 5 })`. Sem
dependência nova.

## Contraste do texto sobre foto (medido)

O véu das imagens de fundo usa a cor do próprio tema. A medição foi feita contra os **pixels
reais** da faixa onde fica o texto, no pior pixel, **no recorte que o contêiner mostra**
(o recorte muda com a largura da página):

| Imagem | Véu | Tema escuro (texto claro) | Tema claro (texto escuro) |
| --- | --- | --- | --- |
| Modelo | 72% (padrão) | **6,11:1** | 8,59:1 |
| Modelo | 55% (leve) | **3,46:1, reprova** | 5,11:1 |
| CTA, recorte de largura total e altura da tela (1366x768 a 2560x1440) | 55% (leve) | 7,98:1 a 10,09:1 | 5,15:1 a 5,30:1 |

Por isso o **Modelo de trabalho usa o véu padrão de 72%**, e só o **CTA usa o leve (55%)**.
**Foto nova, ou contêiner de outro formato, exige medir de novo** antes de reduzir o véu (`DESIGN_SYSTEM.md` 13.2c). Dentro de uma
imagem de fundo, o texto usa sempre a tinta primária, nunca a secundária.

## Limites e cuidados

- **Detalhes de IA aparecem de perto.** Conferi as três em resolução cheia e não vi defeito, mas
  vale olhar de novo no site em tela grande.
- **Termos de uso comerciais** de imagem gerada no Canva são do responsável conferir na conta
  dele. Eu não os verifiquei.
- **Uma terceira imagem de atmosfera pode voltar** (por exemplo, o Hero), mas é decisão própria.
- **Não usar como evidência.** Nunca em uma página de projeto, em legenda que diga "nosso" ou
  "nossa", nem como se fosse o ambiente de trabalho.
- **Trocar por fotografia real** quando houver: basta substituir o AVIF e ajustar o alt em
  `src/content/imagens.ts`. O resto do site não muda.

## Regra

O `CLAUDE.md` §7.15 diz "Images: real only. No stock standing in for real work, no generated
mockups". O responsável decidiu usar imagem de atmosfera gerada nas duas posições acima.
**Exceção registrada em 11/11/2026, e só estas duas imagens**, porque nenhuma delas representa
trabalho, pessoa, cliente ou produto. Qualquer outra imagem gerada precisa de decisão própria.
