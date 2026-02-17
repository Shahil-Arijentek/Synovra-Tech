import { type CardData } from './sceneConfig'

export const getCardPosition = (
  cardData: CardData,
  sceneIndex: number,
  isMobile: boolean
): string => {
  if (isMobile) {
    if (sceneIndex === 0) {
      if (cardData.position === 'right') {
        if (cardData.cardType === 'internal-resistance') return 'left-6 md:left-12 md:top-[80%] top-[20%]'
        return 'left-6 md:left-12 md:top-[18%] top-[20%]'
      }
      if (cardData.position === 'left') {
        if (cardData.cardType === 'voltage') return 'left-6 md:left-12 md:top-[8%] top-[5%]'
        return 'left-6 md:left-12 md:top-[8%] top-[5%]'
      }
      if (cardData.position === 'bottom-left' && cardData.cardType === 'health-gauge') {
        return '-right-12 md:right-8 md:left-auto md:top-[8%] top-[10%]'
      }
      if (cardData.position === 'bottom-right' && cardData.cardType === 'sulphation') {
        return '-right-4 md:right-4 md:left-auto md:top-[80%] top-[72%]'
      }
    }
    else if (sceneIndex === 1) {
      if (cardData.position === 'right') {
        if (cardData.cardType === 'internal-resistance') return 'left-6 md:left-12 md:top-[80%] top-[20%]'
        return 'left-6 md:left-12 md:top-[18%] top-[20%]'
      }
      if (cardData.position === 'left') {
        if (cardData.cardType === 'voltage') return 'left-6 md:left-12 md:top-[8%] top-[5%]'
        return 'left-6 md:left-12 md:top-[8%] top-[5%]'
      }
      if (cardData.position === 'bottom-left' && cardData.cardType === 'sulphation-detected') {
        return '-right-44 md:-right-1 md:left-auto md:top-[8%] top-[10%]'
      }
      if (cardData.position === 'bottom-right' && cardData.cardType === 'decision') {
        return '-right-20 md:-right-1 md:left-auto md:top-[80%] top-[72%]'
      }
    }
    else if (sceneIndex === 2) {
      if (cardData.cardType === 'barcode') {
        return 'left-28 md:left-12 md:top-[6%] top-[5%]'
      }
      if (cardData.cardType === 'system-record') {
        return 'left-28 md:left-12 md:top-[80%] top-[18%]'
      }
      if (cardData.cardType === 'seal') {
        return 'left-28 md:-right-16 md:left-auto md:top-[6%] top-[70%]'
      }
      if (cardData.cardType === 'route') {
        return 'left-28 md:-right-16 md:left-auto md:top-[80%] top-[83%]'
      }
      if (cardData.cardType === 'logged') {
        return '-right-4 md:right-2 md:left-auto md:top-[25%] top-[32%]'
      }
    }
    else if (sceneIndex === 3) {
      if (cardData.cardType === 'voltage') {
        return 'left-6 md:left-12 md:top-[8%] top-[5%]'
      }
      if (cardData.cardType === 'internal-resistance') {
        return 'left-6 md:left-12 md:top-[80%] top-[18%]'
      }
      if (cardData.cardType === 'sulphation') {
        return '-right-8 md:-right-2 md:left-auto md:top-[8%] top-[8%]'
      }
      if (cardData.cardType === 'record-lock') {
        return '-right-16 md:-right-2 md:left-auto md:top-[80%] top-[72%]'
      }
    }
    else if (sceneIndex === 4) {
      if (cardData.cardType === 'voltage-trend') {
        return 'left-6 md:left-12 md:top-[8%] top-[5%]'
      }
      if (cardData.cardType === 'internal-resistance') {
        return 'left-6 md:left-12 md:top-[80%] top-[18%]'
      }
      if (cardData.cardType === 'electrochemical-correction') {
        return '-right-8 md:right-8 md:left-auto md:top-[8%] top-[8%]'
      }
      if (cardData.cardType === 'plate-condition') {
        return 'left-20 md:-right-10 md:left-auto md:top-[80%] top-[72%]'
      }
      if (cardData.cardType === 'controlled') {
        return '-right-6 md:right-2 md:left-auto md:top-[26%] top-[90%]'
      }
    }
    else if (sceneIndex === 5) {
      if (cardData.cardType === 'performance-restored') {
        return '-right-8 md:right-8 md:left-auto md:top-[6%] top-[5%]'
      }
      if (cardData.cardType === 'health-gauge') {
        return 'left-6 md:left-12 md:top-[80%] top-[18%]'
      }
      if (cardData.cardType === 'warranty') {
        return 'left-6 md:left-12 md:top-[6%] top-[8%]'
      }
      if (cardData.cardType === 'record-lock') {
        return 'left-20 md:-right-6 md:left-auto md:top-[80%] top-[72%]'
      }
      if (cardData.cardType === 'certified') {
        return '-right-6 md:right-2 md:left-auto md:top-[25%] top-[90%]'
      }
    }
    else if (sceneIndex === 6) {
      if (cardData.cardType === 'lead') {
        return 'left-6 md:left-12 md:top-[6%] top-[24%]'
      }
      if (cardData.cardType === 'polymer') {
        return 'right-0 md:left-12 md:right-auto md:top-[80%] top-[24%]'
      }
      if (cardData.cardType === 'compliance-record') {
        return 'left-20 md:-right-4 md:left-auto md:top-[6%] top-[72%]'
      }
      if (cardData.cardType === 'recovery-certified') {
        return 'left-20 md:right-4 md:left-auto md:top-[80%] top-[5%]'
      }
      if (cardData.cardType === 'verified') {
        return '-right-4 md:right-2 md:left-auto md:top-[25%] top-[92%]'
      }
    }
  }
  
  if (sceneIndex === 0) {
    if (cardData.position === 'right') return 'right-10 sm:right-14 md:right-auto md:left-[19em] top-20 sm:top-24 md:top-28 lg:top-12 lg:left-[19em] xl:top-12 xl:left-[19.5em] 2xl:top-12 2xl:left-[20em]'
    if (cardData.position === 'left') return 'left-8 sm:left-10 md:left-12 top-20 sm:top-24 md:top-28 lg:top-12 lg:left-12 xl:top-12 xl:left-14 2xl:top-12 2xl:left-16'
    if (cardData.position === 'bottom-left' && cardData.cardType === 'health-gauge') return 'left-12 sm:left-14 md:left-[4rem] top-[38%] sm:top-[40%] md:top-[44%] lg:top-[22rem] lg:left-[4.5rem] xl:top-[23rem] xl:left-[5rem] 2xl:top-[24rem] 2xl:left-[5.5rem]'
    if (cardData.position === 'bottom-left') return 'left-12 sm:left-14 md:left-[4rem] top-[38%] sm:top-[40%] md:top-[44%] lg:top-[22rem] lg:left-[4.5rem] xl:top-[22rem] xl:left-[5rem] 2xl:top-[22rem] 2xl:left-[5.5rem]'
    if (cardData.position === 'bottom-right' && cardData.cardType === 'sulphation') return 'left-12 sm:left-14 md:left-[4rem] top-[68%] sm:top-[70%] md:top-[74%] lg:top-[41rem] lg:left-[4.5rem] xl:top-[27.5rem] xl:left-[5rem] 2xl:top-[42rem] 2xl:left-[5.5rem]'
    if (cardData.position === 'bottom-right') return 'left-12 sm:left-14 md:left-[4rem] top-[68%] sm:top-[70%] md:top-[74%] lg:top-[41rem] lg:left-[4.5rem] xl:top-[27rem] xl:left-[5rem] 2xl:top-[41rem] 2xl:left-[5.5rem]'
  } else if (sceneIndex === 1) {
    if (cardData.position === 'right') return 'right-10 sm:right-14 md:right-auto md:left-[19em] top-20 sm:top-24 md:top-28 lg:top-12 lg:left-[19em] xl:top-12 xl:left-[19.5em] 2xl:top-12 2xl:left-[20em]'
    if (cardData.position === 'left') return 'left-8 sm:left-10 md:left-12 top-20 sm:top-24 md:top-28 lg:top-12 lg:left-12 xl:top-12 xl:left-14 2xl:top-12 2xl:left-16'
    if (cardData.position === 'bottom-left') return 'left-12 sm:left-14 md:left-28 lg:left-[4.5rem] xl:left-[5rem] 2xl:left-[5.5rem] top-[34%] sm:top-[36%] md:top-[40%] lg:top-[23rem] xl:top-[23rem] 2xl:top-[23rem]'
    if (cardData.position === 'bottom-right') return 'left-12 sm:left-14 md:left-28 lg:left-[4.5rem] xl:left-[5rem] 2xl:left-[5.5rem] top-[65%] sm:top-[67%] md:top-[71%] lg:top-[41rem] xl:top-[41rem] 2xl:top-[41rem]'
  } else if (sceneIndex === 2) {
    if (cardData.position === 'right') {
      if (cardData.cardType === 'logged') return 'right-10 sm:right-12 md:right-16 bottom-16 md:bottom-20 lg:bottom-20 xl:bottom-20 2xl:bottom-20'
      return 'left-12 sm:left-14 md:left-20 top-[67%] sm:top-[69%] md:top-[73%] lg:top-[43rem] lg:left-[4.5rem] xl:top-[43rem] xl:left-[5rem] 2xl:top-[43rem] 2xl:left-[5.5rem]'
    }
    if (cardData.position === 'left') return 'left-12 sm:left-14 md:left-20 top-14 sm:top-16 md:top-20 lg:top-12 lg:left-[4.5rem] xl:top-12 xl:left-[5rem] 2xl:top-12 2xl:left-[5.5rem]'
    if (cardData.position === 'bottom-left') return 'left-12 sm:left-14 md:left-20 top-[22%] sm:top-[24%] md:top-[28%] lg:top-[14rem] lg:left-[4.5rem] xl:top-[14rem] xl:left-[5rem] 2xl:top-[14rem] 2xl:left-[5.5rem]'
    if (cardData.position === 'bottom-right') return 'left-12 sm:left-14 md:left-20 top-[41%] sm:top-[42%] md:top-[46%] lg:top-[27rem] lg:left-[4.5rem] xl:top-[27rem] xl:left-[5rem] 2xl:top-[27rem] 2xl:left-[5.5rem]'
  } else if (sceneIndex === 3) {
    if (cardData.position === 'right') return 'right-10 sm:right-14 md:right-auto md:left-[19em] top-20 sm:top-24 md:top-28 lg:top-12 lg:left-[19em] xl:top-12 xl:left-[19.5em] 2xl:top-12 2xl:left-[20em]'
    if (cardData.position === 'left') return 'left-8 sm:left-10 md:left-12 top-20 sm:top-24 md:top-28 lg:top-12 lg:left-12 xl:top-12 xl:left-14 2xl:top-12 2xl:left-16'
    if (cardData.position === 'bottom-left') return 'left-12 sm:left-14 md:left-16 top-[34%] sm:top-[36%] md:top-[40%] lg:top-[22rem] lg:left-[4.5rem] xl:top-[22rem] xl:left-[5rem] 2xl:top-[22rem] 2xl:left-[5.5rem]'
    if (cardData.position === 'bottom-right') return 'left-12 sm:left-14 md:left-16 top-[64%] sm:top-[66%] md:top-[70%] lg:top-[40rem] lg:left-[4.5rem] xl:top-[40rem] xl:left-[5rem] 2xl:top-[40rem] 2xl:left-[5.5rem]'
  } else if (sceneIndex === 4) {
    if (cardData.position === 'right') {
      if (cardData.cardType === 'controlled') return 'right-10 sm:right-12 md:right-16 bottom-16 md:bottom-20 lg:bottom-20 xl:bottom-20 2xl:bottom-20'
      return 'right-10 sm:right-14 md:right-auto md:left-[19em] top-20 sm:top-24 md:top-28 lg:top-12 lg:left-[19em] xl:top-12 xl:left-[19.5em] 2xl:top-12 2xl:left-[20em]'
    }
    if (cardData.position === 'left') return 'left-8 sm:left-10 md:left-12 top-20 sm:top-24 md:top-28 lg:top-12 lg:left-12 xl:top-12 xl:left-14 2xl:top-12 2xl:left-16'
    if (cardData.position === 'bottom-left') return 'left-12 sm:left-14 md:left-16 top-[38%] sm:top-[40%] md:top-[44%] lg:top-[22rem] lg:left-[4.5rem] xl:top-[22rem] xl:left-[5rem] 2xl:top-[22rem] 2xl:left-[5.5rem]'
    if (cardData.position === 'bottom-right') return 'left-12 sm:left-14 md:left-16 top-[68%] sm:top-[70%] md:top-[74%] lg:top-[41.5rem] lg:left-[4.5rem] xl:top-[41.5rem] xl:left-[5rem] 2xl:top-[41.5rem] 2xl:left-[5.5rem]'
  } else if (sceneIndex === 5) {
    if (cardData.position === 'top') return 'left-12 sm:left-14 md:left-20 top-20 sm:top-22 md:top-26 lg:top-16 lg:left-[4.5rem] xl:top-16 xl:left-[5rem] 2xl:top-16 2xl:left-[5.5rem]'
    if (cardData.position === 'left') {
      if (cardData.cardType === 'health-gauge') return 'left-10 sm:left-12 md:left-16 top-[35%] sm:top-[37%] md:top-[41%] lg:top-[22rem] lg:left-[3rem] xl:top-[22rem] xl:left-[3.5rem] 2xl:top-[22rem] 2xl:left-[4rem]'
      return 'left-10 sm:left-12 md:left-16 top-[35%] sm:top-[37%] md:top-[41%] lg:top-[22rem] lg:left-[4.5rem] xl:top-[22rem] xl:left-[5rem] 2xl:top-[22rem] 2xl:left-[5.5rem]'
    }
    if (cardData.position === 'right') {
      if (cardData.cardType === 'certified') return 'right-10 sm:right-12 md:right-16 bottom-16 md:bottom-20 lg:bottom-20 xl:bottom-20 2xl:bottom-20'
      if (cardData.cardType === 'warranty') return 'right-12 sm:right-14 md:right-auto md:left-[20rem] top-[35%] sm:top-[37%] md:top-[41%] lg:top-[22rem] lg:left-[19.5em] xl:top-[22rem] xl:left-[20em] 2xl:top-[22rem] 2xl:left-[20.5em]'
      return 'right-12 sm:right-14 md:right-auto md:left-[20rem] top-[35%] sm:top-[37%] md:top-[41%] lg:top-[22rem] lg:left-[19em] xl:top-[22rem] xl:left-[19.5em] 2xl:top-[22rem] 2xl:left-[20em]'
    }
    if (cardData.position === 'bottom') return 'left-12 sm:left-14 md:left-20 top-[60%] sm:top-[62%] md:top-[66%] lg:top-[41em] lg:left-[4.5rem] xl:top-[41em] xl:left-[5rem] 2xl:top-[41em] 2xl:left-[5.5rem]'
  } else if (sceneIndex === 6) {
    if (cardData.position === 'left') return 'left-8 sm:left-10 md:left-12 top-16 sm:top-18 md:top-22 lg:top-16 lg:left-[3rem] xl:top-16 xl:left-[3.5rem] 2xl:top-16 2xl:left-[4rem]'
    if (cardData.position === 'right') {
      if (cardData.cardType === 'verified') return 'right-10 sm:right-12 md:right-16 bottom-16 md:bottom-20 lg:bottom-20 xl:bottom-20 2xl:bottom-20'
      return 'right-10 sm:right-14 md:right-auto md:left-[19em] top-16 sm:top-18 md:top-22 lg:top-16 lg:left-[19.5em] xl:top-16 xl:left-[20em] 2xl:top-16 2xl:left-[20.5em]'
    }
    if (cardData.position === 'bottom-left') return 'left-12 sm:left-14 md:left-16 top-[35%] sm:top-[37%] md:top-[41%] lg:top-[24rem] lg:left-[4.5rem] xl:top-[24rem] xl:left-[5rem] 2xl:top-[24rem] 2xl:left-[5.5rem]'
    if (cardData.position === 'bottom-right') return 'left-12 sm:left-14 md:left-16 top-[60%] sm:top-[62%] md:top-[66%] lg:top-[40rem] lg:left-[4.5rem] xl:top-[40rem] xl:left-[5rem] 2xl:top-[40rem] 2xl:left-[5.5rem]'
  }
  
  if (cardData.position === 'right') return 'right-16 md:right-auto md:left-[16rem] top-24 md:top-28 lg:top-20'
  if (cardData.position === 'left') return 'left-6 md:left-8 top-24 md:top-28 lg:top-20'
  if (cardData.position === 'bottom-left') return 'left-4 md:left-8 top-[20rem] md:top-[22rem] lg:top-[20rem]'
  if (cardData.position === 'bottom-right') return 'left-4 md:left-[16rem] top-[22rem] md:top-[24rem] lg:top-[22rem]'
  
  return 'left-4 md:left-8 top-1/2 md:top-[52%] lg:top-1/2 -translate-y-1/2'
}

export const getMobileScale = (cardType: string, sceneIndex: number, isMobile: boolean): string => {
  if (!isMobile) return ''
  
  if (sceneIndex === 0) {
    const isVoltageOrResistance = cardType === 'voltage' || cardType === 'internal-resistance'
    const isHealthGauge = cardType === 'health-gauge'
    const isSulphation = cardType === 'sulphation'
    const scale = isVoltageOrResistance ? 'scale-[0.60] md:scale-[0.70]' : isHealthGauge ? 'scale-[0.80] md:scale-[0.90]' : isSulphation ? 'scale-[0.80] md:scale-[0.90]' : 'scale-[0.70] md:scale-[0.80]'
    return `${scale} origin-top-left`
  }
  
  if (sceneIndex === 1) {
    const isVoltageOrResistance = cardType === 'voltage' || cardType === 'internal-resistance'
    const isSulphationDetected = cardType === 'sulphation-detected'
    const isDecision = cardType === 'decision'
    const scale = isVoltageOrResistance ? 'scale-[0.60] md:scale-[0.70]' : isSulphationDetected ? 'scale-[0.70] md:scale-[0.80]' : isDecision ? 'scale-[0.70] md:scale-[0.80]' : 'scale-[0.70] md:scale-[0.80]'
    return `${scale} origin-top-left`
  }
  
  if (sceneIndex === 2) {
    return 'scale-[0.70] md:scale-[0.70] origin-top-left'
  }
  
  if (sceneIndex === 3) {
    const isVoltageOrResistance = cardType === 'voltage' || cardType === 'internal-resistance'
    const isSulphation = cardType === 'sulphation'
    const isRecordLock = cardType === 'record-lock'
    const scale = isVoltageOrResistance ? 'scale-[0.60] md:scale-[0.70]' : isSulphation ? 'scale-[0.70] md:scale-[0.80]' : isRecordLock ? 'scale-[0.70] md:scale-[0.80]' : 'scale-[0.70] md:scale-[0.80]'
    return `${scale} origin-top-left`
  }
  
  if (sceneIndex === 4) {
    const isVoltageTrendOrResistance = cardType === 'voltage-trend' || cardType === 'internal-resistance'
    const isElectrochemical = cardType === 'electrochemical-correction'
    const isPlateCondition = cardType === 'plate-condition'
    const isControlled = cardType === 'controlled'
    const scale = isVoltageTrendOrResistance ? 'scale-[0.60] md:scale-[0.70]' : isElectrochemical ? 'scale-[0.80] md:scale-[0.90]' : isPlateCondition ? 'scale-[0.70] md:scale-[0.80]' : isControlled ? 'scale-[0.70] md:scale-[0.80]' : 'scale-[0.70] md:scale-[0.80]'
    return `${scale} origin-top-left`
  }
  
  if (sceneIndex === 5) {
    const isHealthGauge = cardType === 'health-gauge'
    const isWarranty = cardType === 'warranty'
    const isPerformanceRestored = cardType === 'performance-restored'
    const isRecordLock = cardType === 'record-lock'
    const isCertified = cardType === 'certified'
    const scale = isHealthGauge ? 'scale-[0.60] md:scale-[0.70]' : isWarranty ? 'scale-[0.60] md:scale-[0.70]' : isPerformanceRestored ? 'scale-[0.80] md:scale-[0.90]' : isRecordLock ? 'scale-[0.70] md:scale-[0.80]' : isCertified ? 'scale-[0.70] md:scale-[0.80]' : 'scale-[0.70] md:scale-[0.80]'
    return `${scale} origin-top-left`
  }
  
  if (sceneIndex === 6) {
    const isLead = cardType === 'lead'
    const isPolymer = cardType === 'polymer'
    const isRecoveryCertified = cardType === 'recovery-certified'
    const isComplianceRecord = cardType === 'compliance-record'
    const isVerified = cardType === 'verified'
    const scale = isLead ? 'scale-[0.60] md:scale-[0.70]' : isPolymer ? 'scale-[0.60] md:scale-[0.70]' : isRecoveryCertified ? 'scale-[0.80] md:scale-[0.90]' : isComplianceRecord ? 'scale-[0.70] md:scale-[0.80]' : isVerified ? 'scale-[0.70] md:scale-[0.80]' : 'scale-[0.70] md:scale-[0.80]'
    return `${scale} origin-top-left`
  }
  
  return 'scale-[0.70] md:scale-[0.80] origin-top-left'
}
