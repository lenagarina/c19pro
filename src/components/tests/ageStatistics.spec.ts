import { mount } from '@vue/test-utils'
import ageStatistics from '../ageStatistics.vue'
import { describe, expect, test } from 'vitest'
import BootstrapVueNext from 'bootstrap-vue-next'
import router from '../../router'

describe('ageStatistics.vue', () => {

  test('render', () => {
    const wrapper = mount(ageStatistics, {
      global: {
        mocks: {
         
        },
        plugins: [BootstrapVueNext, router]
      },
      props: {
        type: 'district'
      }
    })
    expect(wrapper.text()).toMatch('COVID-19 Infektionen nach Altersgruppe')
  })

  test('percentCalculaterCasesPer100k', () => {
    const wrapper = mount(ageStatistics, {
      global: {
        mocks: {
          useRoute: ()=> {  return {params: { ags: 123 }}}
        },
        plugins: [BootstrapVueNext, router]
      },
      props: {
        type: 'district'
      }
    })

    expect(wrapper.vm.percentCalculaterCasesPer100k({casesMalePer100k:15000, casesFemalePer100k:20000})).toBe(17.5)
   })

   test('percentCalculaterDeathsPer100k', () => {
    const wrapper = mount(ageStatistics, {
      global: {
        mocks: {
          useRoute: ()=> {  return {params: { ags: 123 }}}
        },
        plugins: [BootstrapVueNext, router]
      },
      props: {
        type: 'district'
      }
    })

    expect(wrapper.vm.percentCalculaterDeathsPer100k({deathsMalePer100k:15000, deathsFemalePer100k:20000})).toBe(17.5)
   })
})
