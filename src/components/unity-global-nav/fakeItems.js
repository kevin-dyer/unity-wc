export const topItem = {
  key: 'item-0',
  label: 'Top Item 0',
  short: false,
  icon: 'account-balance',
  children: []
}

export const innerItem = {
  key: 'item-0-0',
  label: 'Item 0-0',
  icon: 'query-builder'
}

export const items = {
  top: [
    {
      key: 'item-1',
      label: 'Top Item 1',
      short: true,
      icon: 'unity:relate'
    },
    {
      key: 'item-0',
      label: 'Top Item 0',
      short: false,
      icon: 'unity:cube',
      children: [
        {
          key: 'item-0-0',
          label: 'Item 0-0',
          icon: 'unity:db'
        },
        {
          key: 'item-0-1',
          label: 'Item 0-1',
          icon: 'unity:scatter_chart'
        },
        {
          key: 'item-0-2',
          label: 'Item 0-2',
          icon: 'unity:image'
        },
        {
          key: 'item-0-3',
          label: 'Item 0-3',
          icon: 'unity:adv_forecast'
        }
      ]
    },
    {
      key: 'item-2',
      label: 'Top Item 2',
      short: false,
      icon: 'unity:schedule'
    },
    {
      key: 'item-3',
      label: 'Top Item 3',
      short: true,
      icon: 'unity:funnel_chart',
      children: [
        {
          key: 'item-3-0',
          label: 'Item 3-0',
          icon: 'unity:calendar'
        }
      ]
    },
    {
      key: 'item-4',
      label: 'Top Item 4',
      short: false,
      icon: 'unity:circle_markup',
      disabled: true
    }
  ],
  bottom: [
    {
      key: 'item-5',
      label: 'Bottom Item 0',
      short: true
    },
    {
      key: 'item-6',
      label: 'Bottom Item 1',
      short: false
    },
    {
      key: 'item-7',
      label: 'Bottom Item 2',
      short: true
    },
    {
      key: 'item-8',
      label: 'Bottom Item 3',
      short: true,
      disabled: true
    },
    {
      key: 'item-9',
      label: 'Bottom Item 4',
      short: false
    }
  ]
}
