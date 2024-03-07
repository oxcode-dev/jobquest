import { defineStore, acceptHMRUpdate } from 'pinia'

export const useSavedStore = defineStore("saved", {
  persist: true,
  state: () => {
    return {
      jobs: [],
    };
  },

  actions: {
    addSavedJobs(jobs) {
      this.jobs = jobs
    },
  },

  getters: {
    getSavedJobs: (state) => state.jobs,
  },

});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSavedStore, import.meta.hot))
}