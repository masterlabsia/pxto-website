# Registro editorial das parcerias

**Atualizado em 11/11/2026.** Este arquivo é o registro de divulgação, como o que existe
para cada projeto em `projects/`. **Nada daqui vai para o site.** O dado de runtime
(`src/content/parcerias.ts`) leva só o nome e se a empresa está autorizada, porque tudo o que
está lá é publicável (`CLAUDE.md` §16.6).

**Regra de partida** (`CLAUDE.md` §16): empresa nenhuma é citada sem autorização por escrito.
O padrão é não citar. Liberar uma empresa é decisão humana assinada, e um agente pode preparar
o registro, nunca liberar.

## Empresas

| Empresa | Como aparece no site | Relação | Autorização | Logo | Citada desde |
| --- | --- | --- | --- | --- | --- |
| Play9ContentGroup | `Play9ContentGroup`, só texto | **Não informada.** O responsável usou a palavra "parceria" | **Declarada** pelo responsável em 11/11/2026. **Comprovante escrito: a anexar** | Não | 11/11/2026 |
| Casaeaser | `Casaeaser`, só texto | **Não informada.** O responsável usou a palavra "parceria" | **Declarada** pelo responsável em 11/11/2026. **Comprovante escrito: a anexar** | Não | 11/11/2026 |

## Pendências do responsável

1. **Anexar ou referenciar o comprovante escrito** de cada autorização (e-mail ou contrato) nesta
   tabela. Hoje a autorização foi só declarada em sessão, e a regra pede o escrito.
2. **Confirmar a grafia oficial** de cada nome. Estão como o responsável digitou, e se o nome
   oficial tem espaço, acento ou símbolo, o ajuste é uma linha em `src/content/parcerias.ts`.
3. **Definir o tipo de relação** (cliente, parceira, outra). Enquanto isso o site diz apenas
   "Parcerias" e nada mais sobre a relação.
4. **Logo**, se for usado: arquivo oficial e autorização de uso de marca, que é outra
   autorização, além da de citar o nome.

## O que a seção pode e não pode mostrar

- **Pode:** o nome da empresa, em texto, com peso igual para todas, **numa faixa que
  passa na tela** (`PartnersMarquee`), logo abaixo do Hero e sem título visível. A faixa
  para no hover e no foco, e fica parada sob reduced-motion. A repetição dos nomes na faixa é
  técnica (o loop não pode ter vão) e não significa mais empresas.
- **Não pode:** logo (sem a autorização de marca), número ("mais de X empresas"), depoimento,
  descrição do que foi feito, resultado atribuído, setor ou qualquer detalhe que identifique
  a operação da empresa (`CLAUDE.md` §16.5).
- **Não pode virar** faixa de logos, contador, selo ou grade com destaque.
- **Some sozinha** se nenhuma empresa estiver autorizada, ou se a autorização de todas for
  retirada (`authorized: false`).

## Lacuna de acessibilidade assumida

A faixa **não tem botão de pausa**, por pedido do responsável em 11/11/2026. O critério WCAG
2.2.2 pede um jeito de parar movimento automático que dura mais de 5 segundos. Hoje a faixa
para no hover, no foco dentro e sob "reduzir movimento", mas **quem usa só o teclado não tem
como pará-la**. O axe do projeto não testa esse critério, então as auditorias passam. Se o
critério virar exigência, as saídas sem botão são parar a faixa depois de alguns ciclos ou
deixá-la parada por padrão em telas sem hover.

## Como retirar uma empresa

Mude `authorized` para `false` em `src/content/parcerias.ts`, ou apague a linha. A empresa deixa
de aparecer na próxima publicação. Registre aqui a data e o motivo.

## Defesa automática

`scripts/audit-content.mjs` bloqueia nomes confidenciais em qualquer parte do site
(`play9`, `playnest`, `playconnect`, `highq`, `thomson`, `pipedrive`). Os dois nomes autorizados
acima são aceitos **somente** dentro da seção marcada com `data-partners`. Fora dela, ou
qualquer outro nome da lista, mesmo dentro dela, o build continua falhando.
