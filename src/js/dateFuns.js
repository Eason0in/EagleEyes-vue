const getInitDate = days => {
  let nowDate = new Date()
  nowDate.setDate(nowDate.getDate() + days)
  return nowDate.toISOString().slice(0, 10)
}

const getDateDiff = () => {
  let nowDate = new Date()
  nowDate.setDate(nowDate.getDate() + days)
  return nowDate.toISOString().slice(0, 10)
}

export { getInitDate, getDateDiff }
