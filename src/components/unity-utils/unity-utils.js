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
export const isWhitespace = ({localName, textContent, nodeName}) => {
  // if has localname, not a text element
  if (!!localName) return false
  // count as whitespace if comment
  if (nodeName === '#comment' ||
  // if text element, ignore if empty
      typeof textContent === 'string' && !textContent.trim().length
    ) return true
  return false
}

// takes an array of elements, remove any that are just whitespace
// input:  array of elements
// output: array of elements
export const trimWhitespace = slots => slots.reduce((slots, current) => {
  return isWhitespace(current) ? slots : [...slots, current]
}, [])

// returns the specified element (non whitespace), false if there is no valid element
// input:  lit element
// output: lit element or false
export const getParent = ({parentNode}) => getNode(getParent, parentNode)

export const getPrevSibling = ({previousSibling}) => getNode(getPrevSibling, previousSibling)

export const getNextSibling = ({nextSibling}) => getNode(getNextSibling, nextSibling)

export const getNode = (getFunc, node) => {
  // no node, node not an object/element
  if (!node || typeof node !== 'object') return false
  // recurse if node is whitespace
  if (isWhitespace(node)) return getFunc(node)
  return node
}

export const isElement = (obj) => {
  try {
    //Using W3 DOM2 (works for FF, Opera and Chrome)
    return obj instanceof HTMLElement
  }
  catch(e){
    //Browsers not supporting W3 DOM2 don't have HTMLElement and
    //an exception is thrown and we end up here. Testing some
    //properties that all elements have (works on IE7)
    return (typeof obj==="object") &&
      (obj.nodeType===1) && (typeof obj.style === "object") &&
      (typeof obj.ownerDocument ==="object")
  }
}

// function to perform search/find from tagSeed and textSeed based on search input
// input:
//    tagSeed = array of tag-format objects (string "value" || object { label: string, value: string})
//   textSeed = array of strings
//     search = string with space separated terms to search for within tagSeed and textSeed
//    exclude = array of strings (tag component strings and/or text strings) to ignore from the seeds
//              given how exclude works, tags and text seeds should have no crossover
// output:
//   {
//     tags: [tag strings/objects that match],
//     text: [text strings that match]
//   }
export const findMatches = ({tagSeed=[], textSeed=[], search="", exclude=[]}) => {
  if (!Array.isArray(tagSeed) || !Array.isArray(textSeed)) return
  const excludeLib = exclude.reduce((lib, item) => ({...lib, [item]: item}), {})
  // split search on spaces into terms
  const allTerms = search.trim().split(/\s+/)
  let tagMatches = new Map()
  let textMatches = new Map()
  // for each term
  allTerms.forEach((term, index) => {
    if (!term) return
    // check against all tag results (string, tag.label, tag.value)
    let tagTermRegex
    if (tagSeed.length > 0) {
      const tagTerm = index > 0 ? allTerms.slice(index).join(" ") : allTerms.join(" ")
      tagTermRegex = RegExp(tagTerm, 'i')
    }
    tagSeed.forEach(tag => {
      // if tag includes term in any, add to matches
      if (tag instanceof Object) {
        // if tag is excluded, skip
        if (!!excludeLib[tag.value]
        ||  !!excludeLib[tag.label])
          return
        if (tag.value && (tagTermRegex.test(tag.value)) || (tag.label && tagTermRegex.test(tag.label)))
          tagMatches.set(tag.value, tag)
      }
    })
    // check against all strings in seed
    textSeed.forEach(text => {
      // if string includes term, add to matches
      // if text is excluded, skip
      if (!!excludeLib[tag]) return
      if (RegExp(term, 'i').test(text)) textMatches.set(text, text)
    })
  })
  let outTags = []
  let outText = []
  tagMatches.forEach(tag => outTags.push(tag))
  textMatches.forEach(text => outText.push(tag))
  return { tags: outTags, text: outText }
}
