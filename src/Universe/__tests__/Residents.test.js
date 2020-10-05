import { Residents } from '@/Universe'
import { createLocalVue, shallowMount } from '@vue/test-utils'

import Vuetify from 'vuetify'

describe('Residents page', () => {
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

    const wrapper = shallowMount(Residents, {
        localVue,
        vuetify,
        mocks: {
            $route
        },
        propsData: {
            residents: []
        }
      })

    test("is a Vue instance", () => {
        expect(wrapper.vm).toBeTruthy()
    })

    test('it should', () => {
        expect(true).toBeTruthy()
    })
})