export const SCENE_FRAME_COUNTS = [
  60,   // Scene 1: 0-4s
  60,   // Scene 2: 4-8s
  84,   // Scene 3: 8-26s
  120,  // Scene 4: 16-28s
  187,  // Scene 5: 28-44s
  125,  // Scene 6: 43-56s
  88    // Scene 7: 56-67s
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
  // Scene 1: Initial Diagnostics
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
  // Scene 2: Sulphation Detection
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
  // Scene 4: Diagnostic Lock
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
  // Scene 5: Recovery Process
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
  // Scene 6: Performance Verification
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
        cardType: 'health-gauge',
        value: '98%',
        status: '',
        position: 'left'
      },
      {
        cardType: 'warranty',
        value: 'WARRANTY ACTIVE',
        status: 'EXTENDED COVERAGE ENABLED',
        position: 'right'
      },
      {
        cardType: 'record-lock',
        value: 'DIAGNOSTIC',
        status: 'RECORD LOCKED',
        position: 'bottom'
      },
      {
        cardType: 'certified',
        value: '',
        status: '',
        position: 'right'
      }
    ]
  },
  // Scene 7: Final Summary
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

// Scene timings in seconds
export const sceneTimings = [
  { start: 0, pause: 4, sceneIndex: 0 },      // Scene 1: 0-4s
  { start: 4, pause: 8, sceneIndex: 1 },      // Scene 2: 4-8s
  { start: 8, pause: 26, sceneIndex: 2 },     // Scene 3: 8-26s
  { start: 26, pause: 42, sceneIndex: 3 },    // Scene 4: 26-42s
  { start: 42, pause: 45, sceneIndex: 4 },    // Scene 5: 42-45s
  { start: 45, pause: 55, sceneIndex: 5 },    // Scene 6: 45-55s
  { start: 55, pause: 67, sceneIndex: 6 }     // Scene 7: 55-67s 
]
