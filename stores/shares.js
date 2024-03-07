import { defineStore, acceptHMRUpdate } from 'pinia'

export const useSharesStore = defineStore("shares", {
  persist: true,
  state: () => {
    return {
      faqs: [],
      industries: [],
      categories: [],
    };
  },

  actions: {
    addFaqs(faqs) {
        this.faqs = faqs
    },
    addCategories(categories) {
        this.categories = categories
    },
    addIndustries(industries) {
        this.industries = industries
    }
  },

  getters: {
    getFaqs: (state) => state.faqs,
    getCategories: (state) => state.categories,
    getIndustries: (state) => state.industries,
  },

});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSharesStore, import.meta.hot))
}