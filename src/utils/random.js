export const random = (min, max) => {
    const random = Math.random()
    min = Math.round(min)
    max = Math.floor(max)
  
    return random * (max - min) + min
}
  