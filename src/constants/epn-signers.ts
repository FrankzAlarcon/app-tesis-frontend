interface EPNSigner {
  name: string
  ci: string
}

export interface EPNSigners {
  representanteComision: EPNSigner
  decano: EPNSigner
}

export const epnSigners: EPNSigners = {
  representanteComision: {
    name: 'MSc. Luz Marina Vintimilla',
    ci: '1706496419'
  },
  decano: {
    name: 'Dr. José Lucio',
    ci: '1707211742'
  }
}