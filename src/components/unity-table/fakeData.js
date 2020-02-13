// example table data, should eventually turn into controls
// normally this would be taken from the store
import { html } from 'lit-element';

export const devices = {
  data: [
    {
      id: 'root',
      name: 'Global',
      icon: 'icons:folder',
      groups: [
        {
          id: 'africa',
          name: 'Africa',
          icon: 'icons:folder',//Not sure if this works
          description: 'Device Group',
          deployments: 'Test App, Control center Video Wall',
          createdAt: 'January 12, 2018 7:06pm',
          devices: [],
        },
        {
          id: 'asia',
          name: 'Asia',
          icon: 'icons:folder',
          description: 'Device Group',
          deployments: 'Test App, Control center Video Wall',
          createdAt: 'January 12, 2018 7:06pm',
        },
        {
          id: 'australia',
          name: 'Australia',
          icon: 'icons:folder',
          description: 'Device Group',
          deployments: 'Test App, Control center Video Wall',
          createdAt: 'January 12, 2018 7:06pm',
        },
        {
          id: 'europe',
          name: 'Europe',
          icon: 'icons:folder',
          description: 'Device Group',
          deployments: 'Test App, Control center Video Wall',
          createdAt: 'January 12, 2018 7:06pm',
        },
        {
          id: 'northAmerica',
          name: 'North America',
          icon: 'icons:folder',
          description: 'Device Group',
          deployments: 'Test App, Control center Video Wall',
          createdAt: 'January 12, 2018 7:06pm',
          groups: [
            {
              id: 'canada',
              name: 'Canada',
              icon: 'icons:folder',
              description: 'Device Group',
              deployments: 'Test App, Control center Video Wall',
              createdAt: 'January 12, 2018 7:06pm',
            },
            {
              id: 'mexico',
              name: 'Mexico',
              icon: 'icons:folder',
              description: 'Device Group',
              deployments: 'Test App, Control center Video Wall',
              createdAt: 'January 12, 2018 7:06pm',
            },
            {
              id: 'us',
              name: 'United States',
              icon: 'icons:folder',
              description: 'Device Group',
              deployments: 'Test App, Control center Video Wall',
              createdAt: 'January 12, 2018 7:06pm',
              devices: [
                {
                  id: 'abc001',
                  name: 'abc001',
                  icon: 'unity:cube',
                  description: 'Switch',
                  deployments: 'Test App, Control center Video Wall',
                  firmwareVersion: '1.0.1 (latest)',
                  status: 'Not Responding',
                  createdAt: 'January 12, 2018 7:06pm',
                },
                {
                  id: 'abc002',
                  name: 'abc002',
                  icon: 'unity:cube',
                  description: 'Switch',
                  deployments: 'Test App, Control center Video Wall',
                  firmwareVersion: '1.0.0',
                  status: 'Active',
                  createdAt: 'January 12, 2018 7:06pm',
                },
                {
                  id: 'abc003',
                  name: 'abc003',
                  icon: 'unity:cube',
                  description: 'Switch',
                  deployments: 'Test App, Control center Video Wall',
                  firmwareVersion: '1.0.0',
                  status: 'Active',
                  createdAt: 'January 12, 2018 7:06pm',
                },
                {
                  id: 'abc004',
                  name: 'abc004',
                  icon: 'unity:cube',
                  description: 'Switch',
                  deployments: 'Test App, Control center Video Wall',
                  firmwareVersion: '1.0.0',
                  status: 'Probable to fail',
                  createdAt: 'January 12, 2018 7:06pm',
                },
                {
                  id: 'abc005',
                  name: 'abc005',
                  icon: 'unity:cube',
                  description: 'Switch',
                  deployments: 'Test App, Control center Video Wall',
                  firmwareVersion: '1.0.0',
                  status: 'Active',
                  createdAt: 'January 12, 2018 7:06pm',
                },
                {
                  id: 'abc006',
                  name: 'abc006',
                  icon: 'unity:cube',
                  description: 'Switch',
                  deployments: 'Test App, Control center Video Wall',
                  firmwareVersion: '1.0.0',
                  status: 'Active',
                  createdAt: 'January 12, 2018 7:06pm',
                },

                {
                  id: 'abc007',
                  name: 'abc007',
                  icon: 'unity:cube',
                  description: 'tTube',
                  deployments: 'Test App, Control center Video Wall',
                  firmwareVersion: '1.0.0',
                  status: 'Active',
                  createdAt: 'January 12, 2018 7:06pm',
                },
                {
                  id: 'abc008',
                  name: 'abc008',
                  icon: 'unity:cube',
                  description: 'tTube',
                  deployments: 'Test App, Control center Video Wall',
                  firmwareVersion: '1.0.0',
                  status: 'Active',
                  createdAt: 'January 12, 2018 7:06pm',
                },
                {
                  id: 'abc009',
                  name: 'abc009',
                  icon: 'unity:cube',
                  description: 'tTube',
                  deployments: 'Test App, Control center Video Wall',
                  firmwareVersion: '1.0.0',
                  status: 'Active',
                  createdAt: 'January 12, 2018 7:06pm',
                },
                {
                  id: 'abc010',
                  name: 'abc010',
                  icon: 'unity:cube',
                  description: 'Can Light',
                  deployments: 'Test App, Control center Video Wall',
                  firmwareVersion: '1.0.0',
                  status: 'Active',
                  createdAt: 'January 12, 2018 7:06pm',
                },
                {
                  id: 'abc011',
                  name: 'abc011',
                  icon: 'unity:cube',
                  description: 'Can Light',
                  deployments: 'Test App, Control center Video Wall',
                  firmwareVersion: '1.0.0',
                  status: 'Active',
                  createdAt: 'January 12, 2018 7:06pm',
                }
              ]
            },
          ]
        },
      ],
    }
  ]
  ,
  columns: [
    {
      key: 'name',
      label: 'Name'
    },
    {
      key: 'deployments',
      label: 'Used in Deployments',
      format: (deployments='') => deployments
    },
    {
      key: 'firmwareVersion',
      label: 'Firmware Version',
      format: (version='') => version
    },
    {
      key: 'description',
      label: 'Description',
      format: (description='') => description
    },
    {
      key: 'status',
      label: 'Status',
      format: (status='') => status
    },
    {
      key: 'createdAt',
      label: 'Created at',
      format: (createdAt='') => createdAt
    },
  ]
  ,
  filters: [{column: "status", values: ["Active"], include: true} ],
  childKeys: ['groups', 'devices']
}
//Extra rows of fake data to test infinite scroll
let fillerRows = []
for(let i=0; i<200; i++) {
  fillerRows.push({
    id: `grey-${i}`,
    name: null,
    hex: `#4545${i % 45}`,
    favorite: false,
    icon: 'icons:add'
  })
}

export const colors = {
  data: [
    {
      id: 'red',
      name: 'red',
      hex: '#ff0000',
      favorite: true,
      image: 'show image',
      children: [{
          id: 'innerRed1',
          name: 'inner red1',
          hex: '#ff0022',
          favorite: true,
          icon: 'icons:add'
        },
        {
          id: 'innerRed2',
          name: 'inner red2',
          hex: '#ff0066',
          favorite: true,
          icon: 'icons:delete',
          _children: [
            {
              id: 'redGrandchild1',
              name: 'red grandchild',
              hex: '#73a123',
              favorite: false,
              icon: 'icons:bug-report',
              _children: [
                {
                  id: 'redGrandchild2',
                  name: 'red grandchild2',
                  hex: '#73a199',
                  favorite: false,
                  icon: 'icons:build',
                }
              ]
            }
          ]
        },
        {
          id: 'innerBlue1',
          name: 'inner blue1',
          hex: '#ff0066',
          favorite: true,
          icon: 'icons:delete'
        }],
    },
    {id: 'black', name: 'black', hex: '#000000', favorite: true, icon: 'work'},
    {id: 'yellow', name: 'yellow', hex: '#ffff00', favorite: false, icon: 'social:domain'},
    {id: 'green', name: 'green', hex: '#00ff00', favorite: true, icon: 'work'},
    {id: 'grey', name: 'grey', hex: '#888888', favorite: false, image: 'show image', icon: 'build'},
    {id: 'magenta', name: 'magenta', hex: '#ff00ff', favorite: false, icon: 'social:domain'},


    //TO add extra rows
    ...fillerRows
  ],

  columns: [
    {
      key: 'hex',
      label: 'Hex value',
      width: 200,
      format: (hex, datum) => html`<span style="color: ${hex}">${hex}</span>`
    },
    {
      key: 'name',
      label: 'Color',
      width: 300,
      format: (name, datum) => !!name ? `${name.charAt(0).toUpperCase()}${name.slice(1)}` : ''
    },
    {
      key: 'favorite',
      label: 'Favourite?',
      width: 500,
      format: (value, datum) => value ? 'I love it!' : 'passible, I guess'
    }
  ],

  filters: [{column: "name", values: ["Grey"], include: false} ],
  childKeys: ['children', '_children']
}