import { Home } from '@/Universe'
import { createLocalVue, shallowMount } from '@vue/test-utils'

import Vuetify from 'vuetify'

describe('Home page', () => {
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

    const wrapper = shallowMount(Home, {
        localVue,
        vuetify,
        mocks: {
            $route
        }
      })

    test("is a Vue instance", () => {
        expect(wrapper.vm).toBeTruthy();
    })

    test("renders the logo", () => {
        expect(wrapper.find('.logo').exists()).toBe(true)
    })
})