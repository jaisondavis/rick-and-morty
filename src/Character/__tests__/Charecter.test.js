import { Character } from '@/Character'
import { createLocalVue, mount } from '@vue/test-utils'

import Vuetify from 'vuetify'


describe('Character page', () => {
    const localVue = createLocalVue()
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
    })

    const $route = {
        params: { 
            id: 30 
        }
    }

    const wrapper = mount(Character, {
        localVue,
        vuetify,
        mocks: {
            $route
        }
      })

    test('is a Vue component', () => {
        expect(wrapper.vm).toBeTruthy();
    })
    
})
