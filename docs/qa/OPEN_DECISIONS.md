# Decisões em aberto

**Status:** índice. O conteúdo vive nas issues.

As sete decisões que pertencem à PXTO, e não ao código, foram abertas como
issues em 31/08/2026. Cada uma segue o formato do `CLAUDE.md` §20: o que está
ambíguo, qual documento resolve, as opções, qual seria a escolha recomendada e
por quê, e o que fica bloqueado enquanto isso.

> **Atualização de 11/11/2026.** Várias destas decisões foram tomadas no código, na prática:
> **#1** o acento deixou de ser uma cor (é a tinta), então a briga entre o azul e o verde do
> logo acabou, e fica só a escolha entre verde e turquesa para o ícone. **#2** o site usa
> **Manrope**, e não Geist, e a pergunta sobre Aeonik na marca continua aberta. **#3** o
> movimento foi emendado de forma mais larga (`CLAUDE.md` §7.9). **#4** o slot do Hero
> **não leva mídia**: é só texto e a luz do mouse. **#5** a foto do globo **saiu**. As issues
> do GitHub não foram fechadas daqui, e quem decide fechá-las é o responsável.

| # | Decisão | Recomendação |
| --- | --- | --- |
| [1](../../issues/1) | Cor da marca: verde, turquesa ou azul | Manter o azul, refazer logo e favicon |
| [2](../../issues/2) | Aeonik é a fonte da marca e do site? | Aeonik na marca, Geist no site, salvo licença já existente |
| [3](../../issues/3) | Emendar §7.9 para o desenho único no Hero | Emendar, de forma estreita |
| [4](../../issues/4) | Slot do Hero: fotografia ou diagrama | Emendar o §9 e manter o diagrama |
| [5](../../issues/5) | A foto do Posicionamento contraria três regras | Trocar a imagem |
| [6](../../issues/6) | O orçamento de 90 kB de JS é inatingível | Corrigir o número |
| [7](../../issues/7) | Liberação de divulgação dos três projetos | Sem contorno técnico, exige assinatura |

Label `decisão` no repositório reúne todas.

## Por que issue e não runbook

Decisão tem estado final, então fecha. Entrada de runbook vive enquanto o
sistema se comportar daquele jeito, e por isso não fecha nunca. Os dois têm
ciclos de vida opostos. Ver `../technical/RUNBOOK.md`.

## Duas correções que a medição impôs

**O verde do logo reprova em AA.** Havia sido estimado em cerca de 4,0:1 sobre
branco e descrito como "passando raspando". Medido: **4,48:1 no tema claro e
4,17:1 no escuro**, ou seja reprova nos dois para texto de corpo. Passa apenas
como conteúdo não textual, no mínimo de 3:1.

**O accent do site é um par, não um valor.** `#1B4DE4` no claro e `#5B86FF` no
escuro, e é por isso que passa nos dois temas. O verde do logo e o turquesa do
favicon são valor único, sem variante escura. **Qualquer cor que vire a cor da
marca precisa de dois valores.** Isso encarece bastante a opção de promover o
verde a accent, que à primeira vista parecia a mais simples.
