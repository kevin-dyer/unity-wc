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
import {devices} from '../src/components/unity-table/fakeData.js'
import {deviceData} from '../src/components/unity-table/largeDataSet.js'

const {
  columns: defaultColumns,
  childKeys: defaultChildKeys,
  filters: defaultFilters
} = devices


export default {
  title: 'Table',
  decorators: [withKnobs]
};


export const Standard = () => {
  const selectable = boolean("Selectable", true)
  const filter = text("Filter", "")
  const childKeys = array("Child Keys", defaultChildKeys)
  const columns = array('Columns', defaultColumns)
  const columnFilters = array('Column Filters', defaultFilters)
  const data = array('Data', deviceData)
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

export const Password = () => html`
  <unity-text-input label="Password" password></unity-text-input>
`;
