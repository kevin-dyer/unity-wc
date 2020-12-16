import { html } from 'lit-element'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, boolean } from "@storybook/addon-knobs"
// import '@bit/smartworks.unity.unity-core/unity-card'
import '../src/components/unity-card/unity-card'
import '@bit/smartworks.unity.unity-core/unity-select-menu'

export default {
  title: 'Card',
  decorators: [withKnobs]
}

export const Card = () => {
  const title = text('Title', 'Mallard')
  const description = text('Description', 'The males have irridescent green feathers on their head.')
  const imageUrl = text('Image URL', 'https://cdn.download.ams.birds.cornell.edu/api/v1/asset/187768561/2400')
  const onClose = action('Clicked close!')

  return html`
    <div style="display: flex; justify-content: space-around;">
      <unity-card
        title="${title}"
        description="${description}"
        image="${imageUrl}"
        .menuOptions="${selectMenuOptions}"
        menuButton
        hoverAnimation
      >
      </unity-card>
      
      
      <unity-card
        title="Owl"
        description="The design of their feathers allows them to fly nearly silently."
        image="https://nas-national-prod.s3.amazonaws.com/styles/social_media_photo/s3/web_fb_web_a1_1902_16_barred-owl_sandra_rothenberg_kk.jpg?itok=d-vhSb_I"
        closeButton
        .onClose="${onClose}"
        hoverAnimation
      >
      </unity-card>
      
      <unity-card
        title="No Image"
        description="This card has no image."
        hoverAnimation
      >
      </unity-card>
      
      <unity-card
        title="Kittens"
        image="http://placekitten.com/180/150"
        hoverAnimation
        centerContent
      >
      </unity-card>
    </div>
  `
}

const selectMenuOptions = [
  {
    id: '1',
    label: 'Move',
    icon: 'unity:folder_open'
  },
  {
    id: '2',
    label: 'Duplicate',
    icon: 'unity:duplicate'
  },
  {
    id: '3',
    label: 'Apply Model',
    icon: 'unity:magic_wand'
  },
  {
    id: '4',
    label: 'Delete',
    icon: 'unity:trash_delete'
  },
]