import '../src/components/unity-layout/unity-section'
import { html } from 'lit-element'
import {
  withKnobs,
  text,
  boolean
} from "@storybook/addon-knobs"

export default {
  title: 'Sections',
  decorators: [withKnobs]
}


export const Standard = () => {
  const contentOne = text("Inner Section 1 content", "This is the content inside of the section.")
  const contentTwo = text("Inner Section 2 content", "This is the content inside of the section.")
  const contentThree = text("Inner Section 3 content", "This is the content inside of the section.")
  const contentFour = text("Inner Section 4 content", "This is the content inside of the section.")
  const innerBorderedOne = boolean("Inner Section 1 Bordered", false)
  const innerNowrapOne = boolean("Inner Section 1 No Wrap", false)
  const innerBorderedTwo = boolean("Inner Section 2 Bordered", false)
  const innerNowrapTwo = boolean("Inner Section 2 No Wrap", false)
  const innerBorderedThree = boolean("Inner Section 3 Bordered", false)
  const innerNowrapThree = boolean("Inner Section 3 No Wrap", false)
  const innerBorderedFour = boolean("Inner Section 4 Bordered", false)
  const innerNowrapFour = boolean("Inner Section 4 No Wrap", false)
  const outerBordered = boolean("Outer Section Bordered", false)
  const outerNowrap = boolean("Outer Section No Wrap", false)
  const vertPosOne = text("Section 1 --vertical-position", "flex-start")
  const horizPosOne = text("Section 1 --horizontal-position", "flex-start")
  const vertPosTwo = text("Section 2 --vertical-position", "flex-start")
  const horizPosTwo = text("Section 2 --horizontal-position", "center")
  const vertPosThree = text("Section 3 --vertical-position", "center")
  const horizPosThree = text("Section 3 --horizontal-position", "center")
  const vertPosFour = text("Section 4 --vertical-position", "flex-end")
  const horizPosFour = text("Section 4 --horizontal-position", "flex-end")
  const sectionStyle = "height: 400px; width: 400px;"
  const contentStyle = "height: 300px; width: 300px; border: 1px solid black;"
  return html`
    <unity-section ?nowrap="${outerNowrap}" ?bordered="${outerBordered}">
      <unity-section
        style="--vertical-position: ${vertPosOne}; --horizontal-position: ${horizPosOne}; ${sectionStyle}"
        ?nowrap="${innerNowrapOne}" ?bordered="${innerBorderedOne}"
      >
        <div style="${contentStyle}">
          ${contentOne}
        </div>
      </unity-section>
      <unity-section
        style="--vertical-position: ${vertPosTwo}; --horizontal-position: ${horizPosTwo}; ${sectionStyle}"
        ?nowrap="${innerNowrapTwo}" ?bordered="${innerBorderedTwo}"
      >
        <div style="${contentStyle}">
          ${contentTwo}
        </div>
      </unity-section>
      <unity-section
        style="--vertical-position: ${vertPosThree}; --horizontal-position: ${horizPosThree}; ${sectionStyle}"
        ?nowrap="${innerNowrapThree}" ?bordered="${innerBorderedThree}"
      >
        <div style="${contentStyle}">
          ${contentThree}
        </div>
      </unity-section>
      <unity-section
        style="--vertical-position: ${vertPosFour}; --horizontal-position: ${horizPosFour}; ${sectionStyle}"
        ?nowrap="${innerNowrapFour}" ?bordered="${innerBorderedFour}"
      >
        <div style="${contentStyle}">
          ${contentFour}
        </div>
      </unity-section>
    </unity-section>
  `
}
