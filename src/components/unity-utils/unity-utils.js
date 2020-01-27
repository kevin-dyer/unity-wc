/*
    Lit-Element Properties and Curiosities
  One of the biggest things to note, and by far one of the most annoying things by far, is that
  Lit-Element's html`` tags will translate all text in them into a text element, including the
  whitespace we use for formatting. Unless elements are made to be one line, or with clever
  formatting, almost all elements will have children/siblings of newlines and tabs, even if the
  element doesn't have any element siblings. The easiest way to tell if these exist is if the
  element doesn't have a 'localName', and you can check that '.textContent.trim().length === 0'.
  You can usually skip this if you are using only named slots, or if you don't need your element
  to be aware of slot/element content

  Lit-Elements also have a wide variety of features upon them. A quick way to see this for yourself
  is to add a log for `[this]`, which will allow you to expand your element like an object. It has
  many of the same properties you'll see on HTML elements, as well as some of their own. Some
  useful ones include:
    localName - the name of the element tag, will not exist on a text element
    slot - the slot the element is assigned to
    innerHTML - the HTML rendering inside the element
    outerHTML - the HTML of the element's tag
    parentNode, parentElement - parent element (not sure what the difference is)
    childNodes - array of all children elements
    firstChild, lastChild - first/last child of the above array
    previousSibling - the element that comes before this in the written order
    nextSibling - the element that comes after this in the written order
  Note should be taken for the the child and sibling functions. Because of the interaction above
  where whitespace becomes a text element, it is often likely that childNodes will contain a number
  of whitespace filled text nodes, while each of the first/lastChild and previous/nextSibling will
  most likely be one of these whitespace filled text elements. There are utils below to help handle
  those parsing the whitespace elements out, as well as traversing sibling elements.
*/

// determines if the passed in element is whitespace or not
// input:  element
// output: bool
export const isWhitespace = ({localName, textContent}) => {
  // if has localname, not a text element
  if (!!localName) return false
  // if text element, ignore if empty
  if (typeof textContent === 'string') {
    if (textContent.trim().length === 0) return true
  }
  return false
}

// takes an array of elements, remove any that are just whitespace
// input:  array of elements
// output: array of elements
export const trimWhitespace = slots => slots.reduce((slots, current) => {
  return isWhitespace(current) ? slots : [...slots, current]
}, [])

// returns the previous/next valid sibling (non whitespace), false if there is no valid sibling
// input:  lit element
// output: lit element or false
export const getPrevSibling = ({previousSibling}) => {
  // no sibling, sibling not an object/element
  if (!previousSibling || typeof previousSibling !== 'object') return false
  // recurse if sibling is whitespace
  if (isWhitespace(previousSibling)) return getPrevSibling(previousSibling)
  return previousSibling
}

export const getNextSibling = ({nextSibling}) => {
  // no sibling, sibling not an object/element
  if (!nextSibling || typeof nextSibling !== 'object') return false
  // recurse if sibling is whitespace
  if (isWhitespace(nextSibling)) return getNextSibling(nextSibling)
  return nextSibling
}
