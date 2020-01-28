// takes an array of slots, remove any that are just whitespace
export const trimSlots = slots => slots.reduce((slots, current) => {
  // if has localname, not a text element
  if (!!current && !!current.localName) return [...slots, current]
  // if text element, ignore if empty
  if (!!current && current.textContent.trim().length === 0) return slots
  return [...slots, current]
}, [])
