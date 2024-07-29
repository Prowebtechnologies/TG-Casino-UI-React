// multiplierImages
import multiplier0dot1Img from '../../../../../assets/plinko/img/multipliers/multiplier0.1.png'
import multiplier0dot3Img from '../../../../../assets/plinko/img/multipliers/multiplier0.3.png'
import multiplier0dot5Img from '../../../../../assets/plinko/img/multipliers/multiplier0.5.png'
import multiplier0dot7Img from '../../../../../assets/plinko/img/multipliers/multiplier0.7.png'
import multiplier1dot5Img from '../../../../../assets/plinko/img/multipliers/multiplier1.5.png'
import multiplier1Img from '../../../../../assets/plinko/img/multipliers/multiplier1.png'
import multiplier10Img from '../../../../../assets/plinko/img/multipliers/multiplier10.png'
import multiplier110Img from '../../../../../assets/plinko/img/multipliers/multiplier110.png'
import multiplier15Img from '../../../../../assets/plinko/img/multipliers/multiplier15.png'
import multiplier18Img from '../../../../../assets/plinko/img/multipliers/multiplier18.png'
import multiplier2Img from '../../../../../assets/plinko/img/multipliers/multiplier2.png'
import multiplier25Img from '../../../../../assets/plinko/img/multipliers/multiplier25.png'
import multiplier3Img from '../../../../../assets/plinko/img/multipliers/multiplier3.png'
import multiplier33Img from '../../../../../assets/plinko/img/multipliers/multiplier33.png'
import multiplier41Img from '../../../../../assets/plinko/img/multipliers/multiplier41.png'
import multiplier5Img from '../../../../../assets/plinko/img/multipliers/multiplier5.png'
import multiplier88Img from '../../../../../assets/plinko/img/multipliers/multiplier88.png'

import multiplierBest from '../../../../../assets/plinko/sounds/multiplier-best.wav';
import multiplierGood from '../../../../../assets/plinko/sounds/multiplier-good.wav'
import multiplierLow from '../../../../../assets/plinko/sounds/multiplier-low.wav'
import multiplierRegular from '../../../../../assets/plinko/sounds/multiplier-regular.wav'

const multiplierSounds = {
  110: multiplierBest,
  88: multiplierBest,
  41: multiplierBest,
  33: multiplierBest,
  25: multiplierBest,
  18: multiplierGood,
  15: multiplierGood,
  10: multiplierGood,
  5: multiplierGood,
  3: multiplierRegular,
  2: multiplierRegular,
  1.5: multiplierRegular,
  1: multiplierRegular,
  0.5: multiplierLow,
  0.3: multiplierLow
}

const multipliers = {
  110: {
    label: 'block-110',
    sound: multiplierBest,
    img: multiplier110Img
  },
  88: {
    label: 'block-88',
    sound: multiplierBest,
    img: multiplier88Img
  },
  41: {
    label: 'block-41',
    sound: multiplierBest,
    img: multiplier41Img
  },
  33: {
    label: 'block-33',
    sound: multiplierBest,
    img: multiplier33Img
  },
  25: {
    label: 'block-25',
    sound: multiplierBest,
    img: multiplier25Img
  },
  18: {
    label: 'block-18',
    sound: multiplierGood,
    img: multiplier18Img
  },
  15: {
    label: 'block-15',
    sound: multiplierGood,
    img: multiplier15Img
  },
  10: {
    label: 'block-10',
    sound: multiplierGood,
    img: multiplier10Img
  },
  5: {
    label: 'block-5',
    sound: multiplierGood,
    img: multiplier5Img
  },
  3: {
    label: 'block-3',
    sound: multiplierRegular,
    img: multiplier3Img
  },
  2: {
    label: 'block-2',
    sound: multiplierRegular,
    img: multiplier2Img
  },
  1.5: {
    label: 'block-1.5',
    sound: multiplierRegular,
    img: multiplier1dot5Img
  },
  1: {
    label: 'block-1',
    sound: multiplierRegular,
    img: multiplier1Img
  },
  0.7: {
    label: 'block-0.7',
    sound: multiplierLow,
    img: multiplier0dot7Img
  },
  0.5: {
    label: 'block-0.5',
    sound: multiplierLow,
    img: multiplier0dot5Img
  },
  0.3: {
    label: 'block-0.3',
    sound: multiplierLow,
    img: multiplier0dot3Img
  },
  0.1: {
    label: 'block-0.1',
    sound: multiplierLow,
    img: multiplier0dot1Img
  }
}

export const getMultiplier = (value) => {
  return multipliers[value]
}

export const multiplyBlocks16LinesLow = [
  getMultiplier(33),
  getMultiplier(25),
  getMultiplier(10),
  getMultiplier(5),
  getMultiplier(1.5),
  getMultiplier(1),
  getMultiplier(0.7),
  getMultiplier(0.5),
  getMultiplier(0.3),
  getMultiplier(0.5),
  getMultiplier(0.7),
  getMultiplier(1),
  getMultiplier(1.5),
  getMultiplier(5),
  getMultiplier(10),
  getMultiplier(25),
  getMultiplier(33)
]
export const multiplyBlocks16LinesMedium = [
  getMultiplier(88),
  getMultiplier(33),
  getMultiplier(15),
  getMultiplier(5),
  getMultiplier(3),
  getMultiplier(1.5),
  getMultiplier(0.7),
  getMultiplier(0.5),
  getMultiplier(0.3),
  getMultiplier(0.5),
  getMultiplier(0.7),
  getMultiplier(1.5),
  getMultiplier(3),
  getMultiplier(5),
  getMultiplier(15),
  getMultiplier(33),
  getMultiplier(88)
]
export const multiplyBlocks16LinesHigh = [
  getMultiplier(110),
  getMultiplier(88),
  getMultiplier(41),
  getMultiplier(10),
  getMultiplier(1.5),
  getMultiplier(1),
  getMultiplier(0.5),
  getMultiplier(0.3),
  getMultiplier(0.1),
  getMultiplier(0.3),
  getMultiplier(0.5),
  getMultiplier(1),
  getMultiplier(1.5),
  getMultiplier(10),
  getMultiplier(41),
  getMultiplier(88),
  getMultiplier(110)
]

export const multiplyBlocksByLinesQnt = {
  0: multiplyBlocks16LinesLow,
  1: multiplyBlocks16LinesMedium,
  2: multiplyBlocks16LinesHigh,
}

export const getMultiplierByLinesQnt = (value) => {
  return multiplyBlocksByLinesQnt[value]
}

export const getMultiplierSound = (value) => {
  return multiplierSounds[value]
}
