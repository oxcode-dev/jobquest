import { defineStore, acceptHMRUpdate } from 'pinia'

export const useJobsStore = defineStore("jobs", {
  persist: true,
  state: () => {
    return {
      applied: [],
      saved: []
    };
  },

  actions: {
    addAppliedJobs(jobs) {
      this.applied = jobs
    },
    addSavedJobs(jobs) {
      this.saved = jobs
    },
  },

  getters: {
    getAppliedJobs: (state) => state.applied,
    getSavedJobs: (state) => state.saved,
  },

});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useJobsStore, import.meta.hot))
}