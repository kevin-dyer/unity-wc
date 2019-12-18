
# SVG Organize

- `npm run svgorg` - runs the organize-svg script

## How to Run

1) Make sure `{repoRoot}/utils/svg-organize/svgs` has the `.svg` files you wish to use, both new **and** those currently in use.
1) Run `npm run svgorg` command. This can be done from any folder in the repo.
1) Check `{repoRoot}/src/components/unity-icon-set` for your new iconset
*If an error occurs, it should be listed in the console and the file will not be written*
1) Delete the old file and remove the timestamp from the name of the new file, update the component with `bit`

*The above filepaths are for the given defaults. Be aware of how custom paths will change where to put `.svg`'s to compile and where the iconset will be output to.*

## What it Does

It will take all the standard-layout svg files (IcoMoon.io generated), parse, and compile them into a single `iron-iconset-svg` file. The in/output files can be edited in the script itself, if so desired. Otherwise, it will look for a `svgs` directory sibling to the script, and output to the `unity-icon-set` directory. The output filename has the current timestamp prepended to it by default to avoid overwriting.

### To Change Source Dir and Target File
There are three lines at the top of the file:
```const outputFilename = `${Date.now()}.unity-icon-set.js` ```
```const source = __dirname + "/svgs"```
```const outpath = __dirname + `/../../src/components/unity-icon-set/${outputFilename}` ```

- `outputFilename` - filename of the result.
- `source` - path to svgs.
- `outpath` - path to write resulting file to.

All of these paths will be relative to `root`. `__dirname` is a relative path from root to the script itself, and is advised to have all custom pathing be based around it's inclusion.
