---
slug: gestao-de-contratos
title: Gestão de contratos
category: Sistema interno / Integração
solutions: [Integrações, Software]
published: true
featured: true
order: 1
---

# Gestão de contratos

> **Registro editorial. NÃO PUBLICADO.** Só conteúdo liberado é copiado para
> `src/content/projects/gestao-de-contratos.ts` (PROJECT_FRAMEWORK 1.1).

## Origem do conteúdo

Escrito a partir do blueprint que a própria PXTO produziu para o projeto,
localizado no repositório do cliente em `pxto/docs/`. Nenhum conteúdo foi
inferido do código-fonte do cliente.

**Correção de registro:** este projeto foi inicialmente descrito como "um CLI".
Não é. É um módulo de gestão do ciclo de vida de contratos dentro de um
dashboard web interno. O registro anterior (`ferramenta-cli`) foi removido.

## Disclosure

**Nível: B, Described** (PROJECT_FRAMEWORK 15.2). Elevado de C para B em
28/08/2026: a situação pode ser descrita como a operação jurídica do cliente,
mantendo empresa e setor de mercado fora.

| Permissão | Concedida | Fonte | Data |
| --- | --- | --- | --- |
| Cliente pode ser nomeado | **Não** | Declarado pela PXTO como confidencial | |
| Logo pode ser usado | **Não** | idem | |
| Associação pode ser pública | **Sim** | Confirmado pela PXTO em sessão | 28/08/2026 |
| Situação pode ser descrita | **Sim**, como área jurídica | idem | 28/08/2026 |
| Setor de mercado pode ser mencionado | **Não** | Não concedido | |
| Resultado pode ser divulgado | **Sim**, qualitativo | Módulo confirmado em produção | 28/08/2026 |
| Capacidades confirmadas | **Sim** | idem | 28/08/2026 |
| Imagem disponível | **Não** | idem | 28/08/2026 |

> **Registro da autorização:** concedida verbalmente em sessão de trabalho com a
> PXTO em 28/08/2026. **Ainda não existe registro escrito** conforme exige
> PROJECT_FRAMEWORK 14.3: "Se não está escrito, não está liberado." Formalizar
> antes de conectar o domínio de produção.

### Nunca publicar

Tudo abaixo está no material do projeto e **está deliberadamente fora** do
registro runtime:

| Item | Motivo |
| --- | --- |
| Nome do cliente | Confidencial |
| Nome da ferramenta jurídica externa substituída | Arquitetura do cliente (PRD 20) |
| Nome do CRM de origem | idem |
| Nome do provedor de armazenamento | idem |
| Stack interna do cliente (framework, camada de dados, banco) | Arquitetura proprietária (PRD 20) |
| Setor de atuação | Combinado com o resto, aproxima a identificação (14.5) |
| Volume do acervo migrado | Métrica não autorizada (PRD 20) |
| Duração do projeto, número de commits, tabelas, operações, testes | Métricas não autorizadas (PRD 20, PRD 53) |
| Nomes de equipes ou fóruns internos do cliente | Informação interna |

### Identificação indireta (14.5)

**Risco médio.** A combinação de "contratos", "ferramenta jurídica externa
licenciada" e o setor tornaria o cliente reconhecível para alguém do mercado. Por
isso o setor **não** é publicado e nenhuma ferramenta é nomeada. Se a PXTO
liberar o setor, reavaliar antes de publicar.

## Conteúdo publicado

| Bloco | Estado |
| --- | --- |
| Resumo | Publicado, anonimizado |
| Contexto | Publicado. Apenas o enquadramento de confidencialidade |
| Problema | Publicado, anonimizado. É o bloco mais forte do case |
| Desafio | Publicado. Inclui o fato de o processo antigo não estar documentado |
| Solução | Publicado, sem nomear ferramentas |
| Como funciona | Publicado, sem nomear ferramentas |
| Capacidades | Publicado como **categorias de capacidade**, não como stack. Confirmadas pela PXTO |
| Resultado | **Publicado, qualitativo.** Ver abaixo |
| Capa | **Pendente.** Nenhum ativo existe (confirmado em 28/08/2026) |

### Por que o Resultado é qualitativo

A PXTO confirmou que o módulo está em produção, o que autoriza um bloco de
resultado. Ele é qualitativo por decisão, não por falta de dado: o material do
projeto tem volumes, duração e contagens, e **nenhum desses números é métrica
autorizada** (PRD 20, PRD 53).

Cada afirmação publicada é consequência direta da solução estar no ar, e espelha
um ponto de dor documentado no fluxo anterior:

| Dor no fluxo antigo | Afirmação publicada |
| --- | --- |
| Dupla digitação entre venda e contrato | "deixou de ser recriado à mão a partir da venda" |
| Ponte de sincronização entre os dois sistemas | "deixou de ser necessária" |
| Documentos fora do ambiente da empresa | "passaram a viver no ambiente da própria empresa" |
| Sem visão de prazos na operação | "prazos, responsáveis e pendências ficaram visíveis" |

Nenhuma afirmação vai além do que o fluxo TO-BE documenta.

### Capa

Não existe ativo. A capa continua marcada `pending: true` e renderiza o slot
rotulado. **Uma captura anonimizada do quadro de fases resolveria**, desde que
sem nome de cliente, sem dados reais e sem marca.

## Valor deste case para o posicionamento

É o **primeiro case não-IA do portfólio** e o primeiro que demonstra integração.
Antes dele, os dois projetos publicados eram de IA, contra um posicionamento que
proíbe IA como identidade (PRD 4, POSITIONING 15.1).

Também é o case que mais literalmente encarna o território proposto: o problema
não estava nos sistemas, estava entre eles. Por isso recebeu `order: 1` e abre a
listagem.

## Em aberto

1. **Autorização por escrito.** As liberações de 28/08/2026 foram verbais.
   FRAMEWORK 14.3 exige registro escrito com fonte e data.
2. **Capa.** Nenhum ativo existe. Uma captura anonimizada do quadro de fases
   resolveria.
3. **Identificação indireta.** Com a área jurídica agora nomeada, revalidar se a
   combinação de contratos, ferramenta jurídica externa licenciada e função
   torna o cliente reconhecível para alguém do mercado. Ver 14.5.

## Checklist de publicação (PROJECT_FRAMEWORK 20)

### Identificação
- [x] Nome não pode ser divulgado (decidido)
- [x] Logo não pode ser divulgado (decidido)
- [x] Associação permitida (28/08/2026)
- [ ] Autorização registrada **por escrito**

### Conteúdo
- [x] Problema pode ser descrito
- [x] Solução pode ser descrita
- [x] Capacidades confirmadas pela PXTO (28/08/2026)
- [ ] Imagens podem ser utilizadas (nenhum ativo existe)
- [x] Resultados podem ser divulgados, qualitativos (28/08/2026)

### Confidencialidade
- [x] Sem informação proprietária
- [x] Sem dados internos
- [x] Sem arquitetura proprietária
- [x] Sem informação comercial
- [x] Sem métricas não autorizadas
- [x] Nível de divulgação atribuído: B
- [ ] Identificação indireta reverificada após a elevação para B

## Sign-off

```
Nível de divulgação:   B
Liberado por:          ______  (verbal em 28/08/2026, falta registro escrito)
Data:                  28/08/2026
Fonte da autorização:  ______
```

**Estado atual:** `published: true`. Quatro das cinco liberações foram
concedidas. Faltam o registro escrito e a reverificação de identificação
indireta antes de conectar o domínio de produção.
