import '@bit/smartworks.unity.unity-core/unity-section'
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


export const VerticalAlignment = () => {
  const contentOne = text("Inner Section 1 content", "This is the content inside of the section.")
  const contentTwo = text("Inner Section 2 content", "This is the content inside of the section.")
  const contentThree = text("Inner Section 3 content", "This is the content inside of the section.")
  const innerBorderedOne = boolean("Inner Section 1 Bordered", true)
  const innerNowrapOne = boolean("Inner Section 1 No Wrap", false)
  const innerBorderedTwo = boolean("Inner Section 2 Bordered", true)
  const innerNowrapTwo = boolean("Inner Section 2 No Wrap", false)
  const innerBorderedThree = boolean("Inner Section 3 Bordered", true)
  const innerNowrapThree = boolean("Inner Section 3 No Wrap", false)
  const outerBordered = boolean("Outer Section Bordered", true)
  const outerNowrap = boolean("Outer Section No Wrap", false)
  const vertPosOne = text("Section 1 --vertical-position", "flex-start")
  const vertPosTwo = text("Section 2 --vertical-position", "center")
  const vertPosThree = text("Section 3 --vertical-position", "flex-end")
  const sectionStyle = "height: 200px; width: 200px;"
  const contentStyle = "width: 100px;"
  return html`
    <unity-section ?nowrap="${outerNowrap}" ?bordered="${outerBordered}">
      <unity-section
        style="--vertical-position: ${vertPosOne}; ${sectionStyle}"
        ?nowrap="${innerNowrapOne}" ?bordered="${innerBorderedOne}"
      >
        <div style="${contentStyle}">
          ${contentOne}
        </div>
      </unity-section>
      <unity-section
        style="--vertical-position: ${vertPosTwo}; ${sectionStyle}"
        ?nowrap="${innerNowrapTwo}" ?bordered="${innerBorderedTwo}"
      >
        <div style="${contentStyle}">
          ${contentTwo}
        </div>
      </unity-section>
      <unity-section
        style="--vertical-position: ${vertPosThree}; ${sectionStyle}"
        ?nowrap="${innerNowrapThree}" ?bordered="${innerBorderedThree}"
      >
        <div style="${contentStyle}">
          ${contentThree}
        </div>
      </unity-section>
    </unity-section>
  `
}

export const HorizontalAlignment = () => {
  const contentOne = text("Inner Section 1 content", "This is the content inside of the section.")
  const contentTwo = text("Inner Section 2 content", "This is the content inside of the section.")
  const contentThree = text("Inner Section 3 content", "This is the content inside of the section.")
  const innerBorderedOne = boolean("Inner Section 1 Bordered", true)
  const innerNowrapOne = boolean("Inner Section 1 No Wrap", false)
  const innerBorderedTwo = boolean("Inner Section 2 Bordered", true)
  const innerNowrapTwo = boolean("Inner Section 2 No Wrap", false)
  const innerBorderedThree = boolean("Inner Section 3 Bordered", true)
  const innerNowrapThree = boolean("Inner Section 3 No Wrap", false)
  const outerBordered = boolean("Outer Section Bordered", true)
  const outerNowrap = boolean("Outer Section No Wrap", false)
  const horizPosOne = text("Section 1 --horizontal-position", "flex-start")
  const horizPosTwo = text("Section 2 --horizontal-position", "center")
  const horizPosThree = text("Section 3 --horizontal-position", "flex-end")
  const sectionStyle = "height: 200px; width: 200px;"
  const contentStyle = "width: 100px;"
  return html`
    <unity-section ?nowrap="${outerNowrap}" ?bordered="${outerBordered}">
      <unity-section
        style="--horizontal-position: ${horizPosOne}; ${sectionStyle}"
        ?nowrap="${innerNowrapOne}" ?bordered="${innerBorderedOne}"
      >
        <div style="${contentStyle}">
          ${contentOne}
        </div>
      </unity-section>
      <unity-section
        style="--horizontal-position: ${horizPosTwo}; ${sectionStyle}"
        ?nowrap="${innerNowrapTwo}" ?bordered="${innerBorderedTwo}"
      >
        <div style="${contentStyle}">
          ${contentTwo}
        </div>
      </unity-section>
      <unity-section
        style="--horizontal-position: ${horizPosThree}; ${sectionStyle}"
        ?nowrap="${innerNowrapThree}" ?bordered="${innerBorderedThree}"
      >
        <div style="${contentStyle}">
          ${contentThree}
        </div>
      </unity-section>
    </unity-section>
  `
}
