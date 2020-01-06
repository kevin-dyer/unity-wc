const fs = require('fs')

// changing this can result in forced overwrites
const outputFilename = `${Date.now()}.unity-icon-set.js`
// these paths can be edited if the defaults aren't wanted
const source = __dirname + "/svgs"
const outpath = __dirname + `/../../src/components/unity-icon-set/${outputFilename}`
const options = { encoding: "UTF8" }

const {
  readdirSync: getFilenames,
  readFileSync: read,
  writeFile: write
} = fs

// consts for file layout/structure
const fileStart = `import { html } from '@polymer/polymer/lib/utils/html-tag.js'
import '@polymer/iron-iconset-svg/iron-iconset-svg'
const unitIconSet = html\`<iron-iconset-svg name="unity" size="32">
  <svg>
    <defs>`
const fileEnd = `    </defs>
  </svg>
</iron-iconset-svg>\`

document.head.appendChild(unitIconSet.content)
`
const makeTitle = title => `      <g id="${title}">`
const indent = path => `        ${path}`
const formatPaths = paths => paths.reduce((allPaths, path) => [...allPaths, indent(path)], [])
const endG = `      </g>`

// start the output file
let output = [fileStart]
// get all the filenames in the intended dir
const files = getFilenames(source, options)

files.forEach(filename => {
  // only read the file if it's a .svg
  if (filename.endsWith(`.svg`)) {
    const svg = read(`${source}/${filename}`, options)
    // split into lines
    const lines = svg.split('\n')
    // pull out title
    const title = lines[2].slice(7, -8)
    // pull out all the paths
    const paths = formatPaths(lines.slice(3, -2))
    // add to output
    output = [...output, makeTitle(title), ...paths, endG]
  }
})

// add end of output and join with newlines
output.push(fileEnd)
output = output.join('\n')

// write out the file, will not have overwrite issues as filename is preceded with Date.now()
write(outpath, output, options, (...args)=>{ !!args[0] && console.log(args)})
