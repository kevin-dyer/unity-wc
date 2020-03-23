// import '@bit/smartworks.unity.unity-text-input';
// import '../src/components/unity-text-input/unity-text-input.js'

//TODO: must import from bit (to have correct copy of unity-dropdown)
import '../src/components/unity-table/unity-table.js'
import { html } from 'lit-element';
import {
  withKnobs,
  text,
  boolean,
  number,
  array
} from "@storybook/addon-knobs";
import { action } from '@storybook/addon-actions';
import {devices, colors} from '../src/components/unity-table/fakeData.js'
// import {deviceData} from '../src/components/unity-table/largeDataSet.js'


export default {
  title: 'Table',
  decorators: [withKnobs]
};


export const Standard = () => {
  const {
    data: defaultDevices,
    columns: defaultColumns,
    childKeys: defaultChildKeys,
    filters: defaultFilters
  } = devices
  const selectable = boolean("Selectable", true)
  const filter = text("Filter", "")
  const childKeys = array("Child Keys", defaultChildKeys)
  const columns = array('Columns', defaultColumns)
  const columnFilters = array('Column Filters', defaultFilters)
  const data = array('Data', defaultDevices)
  const endReachedThreshold = number("endReachedThreshold", 200)

  //TODO: how do I hook this up?
  const highlightedRow = text('highlightedRow', "")

  return html`
    <unity-table
      ?selectable=${selectable}
      filter=${filter}
      .keyExtractor=${(datum, index) => datum.id}
      .slotIdExtractor=${(row, column) => `${row._rowId}-${column.key}`}
      .childKeys=${childKeys}
      .data=${data}
      .columns=${columns}
      .columnFilter=${columnFilters}
      .onFilterChange=${action("onFilterChange")}
      endReachedThreshold=${endReachedThreshold}
      .onEndReached="${action("onEndReached")}"
      highlightedRow="${highlightedRow}"
      .onSelectionChange="${action('onSelectionChange')}"
      .onClickRow="${action('onClickRow')}"
      .onDisplayColumnsChange="${action("onDisplayColumnsChange")}"
      .onColumnChange="${action("onColumnChange")}"
      style="--highlight-color: grey"
    >
    </unity-table>
  `;
}

// NOTE: This does not work in story book
// The custom slots do not update correctly as table rows are expanded/collapsed
// However it works outside the storybook in my-table
export const CustomContent = () => {
  const {
    data: defaultDevices,
    columns: defaultColumns,
    childKeys: defaultChildKeys,
    filters: defaultFilters
  } = colors
  const selectable = boolean("Selectable", true)
  const filter = text("Filter", "")
  const childKeys = array("Child Keys", defaultChildKeys)
  const columns = array('Columns', defaultColumns)
  const columnFilters = array('Column Filters', defaultFilters)
  const data = array('Data', defaultDevices)
  const endReachedThreshold = number("endReachedThreshold", 200)
  const highlightedRow = text('highlightedRow', "")

  return html`
    <unity-table
      ?selectable=${selectable}
      filter=${filter}
      .keyExtractor=${(datum, index) => datum.id}
      .slotIdExtractor=${(row, column) => `${row._rowId}-${column.key}`}
      .childKeys=${childKeys}
      .data=${data}
      .columns=${columns}
      .columnFilter=${columnFilters}
      .onFilterChange=${action("onFilterChange")}
      endReachedThreshold=${endReachedThreshold}
      .onEndReached="${action("onEndReached")}"
      highlightedRow="${highlightedRow}"
      .onSelectionChange="${action('onSelectionChange')}"
      .onClickRow="${action('onClickRow')}"
      .onDisplayColumnsChange="${action("onDisplayColumnsChange")}"
      .onColumnChange="${action("onColumnChange")}"
      style="--highlight-color: grey"
    >
      <div key="red-hex" slot="red-hex" style="color:red;">Red's Custom Name</div>
      <div key="red-name" slot="red-name" style="border-radius:15px;height:15px;width:15px;background-color:red;border:1px solid red;"></div>

      <div key="innerRed1-hex" slot="innerRed1-hex" style="color:red;">Inner Red 1</div>
      <div key="innerRed1-name" slot="innerRed1-name" style="border-radius:15px;height:15px;width:15px;background-color:red;border:1px solid red;"></div>

      <div key="innerRed2-hex" slot="innerRed2-hex" style="color:red;">Inner Red 2</div>
      <div key="innerRed2-name" slot="innerRed2-name" style="border-radius:15px;height:15px;width:15px;background-color:red;border:1px solid red;"></div>

      <div key="innerBlue1-hex" slot="innerBlue1-hex" style="color:red;">Inner Blue 1</div>
      <div key="innerBlue1-name" slot="innerBlue1-name" style="border-radius:15px;height:15px;width:15px;background-color:blue;border:1px solid blue;"></div>


      <div key="black-hex" slot="black-hex" style="color:black;">Black</div>
      <div key="black-name" slot="black-name" style="border-radius:15px;height:15px;width:15px;background-color:black;border:1px solid yellow;"></div>

      <div key="yellow-hex" slot="yellow-hex" style="color:black;">Yellow</div>
      <div key="yellow-name" slot="yellow-name" style="border-radius:15px;height:15px;width:15px;background-color:yellow;border:1px solid yellow;"></div>

      <div key="green-hex" slot="green-hex" style="color:green;">Green</div>
      <div key="green-name" slot="green-name" style="border-radius:15px;height:15px;width:15px;background-color:green;border:1px solid green;"></div>

      <div key="magenta-hex" slot="magenta-hex" style="color:magenta;">Purple Rain</div>
      <div key="magenta-name" slot="magenta-name" style="border-radius:15px;height:15px;width:15px;background-color:magenta;border:1px solid magenta;"></div>

    </unity-table>
  `;
}