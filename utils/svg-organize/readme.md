# SVG Organize

- `npm run svgorg` - runs the organize-svg script

## What it Does

It will take all the standard-layout svg files (IcoMoon.io generated), parse, and compile them into a single `iron-iconset-svg` file. The in/output files can be edited in the scrip itself, if so desired. Otherwise, it will look for a `svgs` directory sibling to the scrip, and output to the `unity-icon-set` directory. The output filename has the current timestamp prepended to it by default to avoid overwriting.

### To Change Source Dir and Target File
There are three lines at the top of the file:
```const outputFilename = `${Date.now()}.unity-icon-set.js` ```
```const source = __dirname + "/svgs"```
```const outpath = __dirname + `/../../src/components/unity-icon-set/${outputFilename}` ```

- `outputFilename` - filename of the result.
- `source` - path to svgs.
- `outpath` - path to write resulting file to.
