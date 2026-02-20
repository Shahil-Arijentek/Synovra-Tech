export const SCENE_FRAME_COUNTS = [
  60,
  60,
  84,
  120,
  187,
  125,
  88
]

export type CardData = {
  cardType: string
  value: string
  status: string
  position: 'left' | 'right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'center-bottom'
}

export type SceneConfig = {
  id: number
  headline: string
  subline: string
  cards: CardData[]
}

export const sceneConfig: SceneConfig[] = [
  {
    id: 1,
    headline: 'DIAGNOSTIC TRACE — BASELINE RECORDED',
    subline: 'In-service electrical signature logged',
    cards: [
      {
        cardType: 'voltage',
        value: '12.4V',
        status: 'STABLE',
        position: 'left'
      },
      {
        cardType: 'internal-resistance',
        value: '4.2mΩ',
        status: 'LOW',
        position: 'right'
      },
      {
        cardType: 'health-gauge',
        value: '99%',
        status: '',
        position: 'bottom-left'
      },
      {
        cardType: 'sulphation',
        value: 'NEGLIGIBLE',
        status: '',
        position: 'bottom-right'
      }
    ]
  },
  {
    id: 2,
    headline: 'DIAGNOSTIC TRACE — DECLINE DETECTED',
    subline: 'Sulphation onset identified',
    cards: [
      {
        cardType: 'voltage',
        value: '11.8V',
        status: 'DEGRADED',
        position: 'left'
      },
      {
        cardType: 'internal-resistance',
        value: '8.7mΩ',
        status: 'HIGH',
        position: 'right'
      },
      {
        cardType: 'sulphation-detected',
        value: 'DETECTED',
        status: '',
        position: 'bottom-left'
      },
      {
        cardType: 'decision',
        value: 'MAINTENANCE',
        status: 'RECOMMENDED',
        position: 'bottom-right'
      }
    ]
  },
  {
    id: 3,
    headline: 'DIAGNOSTIC TRACE — CHAIN OF CUSTODY',
    subline: 'Pickup logged • Route verified',
    cards: [
      {
        cardType: 'barcode',
        value: 'SNV-A12-4587',
        status: '',
        position: 'left'
      },
      {
        cardType: 'system-record',
        value: 'SYSTEM RECORD CREATED',
        status: '',
        position: 'bottom-left'
      },
      {
        cardType: 'route',
        value: '',
        status: '',
        position: 'bottom-right'
      },
      {
        cardType: 'seal',
        value: 'SEALED & LOGGED',
        status: '',
        position: 'right'
      },
      {
        cardType: 'logged',
        value: '',
        status: '',
        position: 'right'
      }
    ]
  },
  {
    id: 4,
    headline: 'DIAGNOSTIC TRACE — ELIGIBILITY CONFIRMED',
    subline: 'Cell-level health profile generated',
    cards: [
      {
        cardType: 'voltage',
        value: '11.8V',
        status: 'LOCKED',
        position: 'left'
      },
      {
        cardType: 'internal-resistance',
        value: '8.7mΩ',
        status: 'LOCKED',
        position: 'right'
      },
      {
        cardType: 'sulphation',
        value: 'DETECTED',
        status: '',
        position: 'bottom-left'
      },
      {
        cardType: 'record-lock',
        value: 'DIAGNOSTIC',
        status: 'RECORD LOCKED',
        position: 'bottom-right'
      }
    ]
  },
  {
    id: 5,
    headline: 'DIAGNOSTIC TRACE — CONTROLLED RESTORATION',
    subline: 'Electrochemical correction in progress',
    cards: [
      {
        cardType: 'voltage-trend',
        value: '12.4V',
        status: 'RISING',
        position: 'left'
      },
      {
        cardType: 'internal-resistance',
        value: '4.2mΩ',
        status: 'FALLING',
        position: 'right'
      },
      {
        cardType: 'electrochemical-correction',
        value: '',
        status: '',
        position: 'bottom-left'
      },
      {
        cardType: 'plate-condition',
        value: 'PLATE RESTORED',
        status: '',
        position: 'bottom-right'
      },
      {
        cardType: 'controlled',
        value: '',
        status: '',
        position: 'right'
      }
    ]
  },
  {
    id: 6,
    headline: 'PATH AHEAD — SECOND LIFE ENABLED',
    subline: 'Performance restored • Track continues',
    cards: [
      {
        cardType: 'performance-restored',
        value: '',
        status: '',
        position: 'top'
      },
      {
        cardType: 'warranty',
        value: 'WARRANTY',
        status: '12-24 M',
        position: 'right'
      },
      {
        cardType: 'certified',
        value: '',
        status: '',
        position: 'right'
      }
    ]
  },
  {
    id: 7,
    headline: 'PATH AHEAD — MATERIAL RECOVERY',
    subline: 'Recycling initiated after verified service life',
    cards: [
      {
        cardType: 'lead',
        value: '98%',
        status: 'RECOVERED',
        position: 'left'
      },
      {
        cardType: 'polymer',
        value: '92%',
        status: 'RECOVERED',
        position: 'right'
      },
      {
        cardType: 'compliance-record',
        value: 'COMPLIANCE RECORD GENERATED',
        status: '',
        position: 'bottom-left'
      },
      {
        cardType: 'recovery-certified',
        value: 'RECOVERY CERTIFIED',
        status: '',
        position: 'bottom-right'
      },
      {
        cardType: 'verified',
        value: '',
        status: '',
        position: 'right'
      }
    ]
  }
]

export const sceneTimings = [
  { start: 0, pause: 4, sceneIndex: 0 },
  { start: 4, pause: 8, sceneIndex: 1 },
  { start: 8, pause: 26, sceneIndex: 2 },
  { start: 26, pause: 42, sceneIndex: 3 },
  { start: 42, pause: 45, sceneIndex: 4 },
  { start: 45, pause: 55, sceneIndex: 5 },
  { start: 55, pause: 67, sceneIndex: 6 }
]
