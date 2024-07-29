const colors = {
    background: '#0000',
    primary: '#213743',
    secondary: '#3d5564',
    text: '#F2F7FF',
    purple: '#C52BFF',
    purpleDark: '#8D27B3'
}
const scale = 16/20  
const pins = {
    startPins: 3,
    pinSize: 2*scale,
    pinGap: 20*scale
}

const ball = {
    ballSize: 5.7*scale
}

const engine = {
    engineGravity: 1
}

const world = {
    width: 300,//267
    height: 300
}

export const config = {
    pins,
    ball,
    engine,
    world,
    colors
}
  