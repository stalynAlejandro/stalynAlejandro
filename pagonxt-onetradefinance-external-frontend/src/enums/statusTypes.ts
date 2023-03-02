const statusTypes = {
  AWAITING_INSTRUCTIONS: 'AWAITING_INSTRUCTIONS',
  COMPLETE_INFORMATION: 'COMPLETE_INFORMATION',
  DRAFT: 'DRAFT',
  IN_PROGRESS: 'IN_PROGRESS',
  ISSUED: 'ISSUED',
} as const;

export default statusTypes;

export type StatusTypes = typeof statusTypes[keyof typeof statusTypes];
