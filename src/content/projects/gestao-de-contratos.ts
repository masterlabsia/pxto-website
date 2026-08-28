import type { Project } from "../schemas";

/**
 * Disclosure Level B, Described (PROJECT_FRAMEWORK 15.2).
 * Delivered under a confidentiality agreement.
 *
 * Cleared by PXTO on 2026-08-28:
 *   - the situation may be described as the client's legal operation
 *   - the module is in production, so a qualitative result may be published
 *   - the project may be publicly associated with PXTO
 *   - the capability list is confirmed
 *   - no image asset is available
 *
 * Deliberately absent, and it must stay absent:
 *   - the client's name
 *   - the client's market sector. Only the legal function is described
 *   - the names of the third-party tools involved. Naming the external legal
 *     tool, the CRM or the storage provider would publish the client's own
 *     architecture (PRD 20)
 *   - every figure. Volumes, durations, commit counts, table counts and test
 *     counts exist in the project material and are NOT authorised metrics
 *     (PRD 20, PRD 53). The result below is qualitative for that reason
 *
 * Editorial record and clearance: docs/projects/gestao-de-contratos.md
 */
export const gestaoDeContratos: Project = {
  slug: "gestao-de-contratos",
  title: "Gestão de contratos",
  category: "Sistema interno / Integração",
  // The first non-AI case in the portfolio, and the first that demonstrates
  // integration work (POSITIONING 12.3).
  solutions: ["integracoes", "software"],
  summary:
    "Módulo interno que trouxe o ciclo de vida de contratos para dentro da operação, eliminando a ponte manual entre o sistema comercial e a ferramenta jurídica externa em que o processo vivia.",

  context:
    "A operação jurídica de uma empresa que não pode ser identificada. O projeto foi entregue sob acordo de confidencialidade: o cliente não é nomeado e as ferramentas envolvidas também não.",

  problem:
    "O jurídico operava fora de casa. O ciclo de vida dos contratos rodava em uma ferramenta externa e licenciada, apartada do resto da operação. A venda acontecia em um sistema; o contrato, em outro. A ponte entre os dois dependia de sincronização automática e de redigitação manual. Não havia prazo controlado, trilha de auditoria integrada nem visão única de pendências.",

  challenge:
    "Trazer o processo para dentro da operação sem perder o histórico. Além de reconstruir o fluxo, era preciso migrar o acervo existente de contratos e documentos. O desenho do processo antigo não estava documentado em lugar nenhum: precisou ser reconstruído a partir do próprio sistema legado antes que qualquer coisa pudesse ser desenhada.",

  solution:
    "Um módulo dentro da stack que a empresa já usava, integrado ao sistema comercial na entrada e ao armazenamento de documentos na saída. O fluxo ganhou fases explícitas com pré-requisitos, prazos contados em dias úteis, níveis de permissão por perfil e trilha de auditoria.",

  process:
    "O contrato passa a existir quando a venda é fechada no sistema comercial, sem redigitação. Avança por fases com pré-requisitos definidos, cada uma com prazo próprio. Os documentos ficam versionados no armazenamento da própria empresa, e não em uma ferramenta de terceiros. Cada ação registra autor e data em uma trilha que não pode ser alterada.",

  // Capability categories, not the client's stack (PROJECT_FRAMEWORK 10).
  technologies: [
    "Integração de sistemas",
    "Desenvolvimento de software sob medida",
    "Modelagem de processo",
    "Migração de dados",
    "Controle de acesso por perfil",
  ],

  /**
   * Qualitative only, by design. The project material contains volumes and
   * durations, and none of them is an authorised metric (PRD 20). Every
   * statement below is a direct consequence of the solution being live.
   */
  results:
    "O módulo está em produção. O contrato deixou de ser recriado à mão a partir da venda, e a ponte de sincronização entre os dois sistemas deixou de ser necessária. Os documentos passaram a viver no ambiente da própria empresa, e prazos, responsáveis e pendências ficaram visíveis na mesma operação onde a venda acontece.",

  coverImage: {
    src: "/images/projects/gestao-de-contratos/cover.avif",
    alt: "Quadro de acompanhamento de contratos por fase.",
    width: 1600,
    height: 1200,
    pending: true,
  },

  published: true,
  featured: true,
  order: 1,
};
