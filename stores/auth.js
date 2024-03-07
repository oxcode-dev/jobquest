import { defineStore, acceptHMRUpdate } from 'pinia'

export const useAuthStore = defineStore("auth", {
  persist: true,
  state: () => {
    return {
      auth: {},
      user: {},
    };
  },

  actions: {
    saveAuthUser(auth) {
      this.auth = auth
    }, 
    clearAuthUser() {
      this.auth = {}
      this.user = {}
    },
    saveAuthUserDetail(user) {
      this.user = user
    }, 
  },

  getters: {
    getAuthUser: (state) => state.auth,
    getUserDetails: (state) => state.user,
    getAuthUserDetail: (state) => {
      if(state.auth && state.auth.email){
        return {
          displayName: state?.auth?.displayName || '',
          email: state?.auth?.email || '',
          photoURL: state?.auth?.photoURL || '',
          emailVerified: state?.auth?.emailVerified || false,
          uid: state?.auth?.uid || '',
        }
      }
      return {}
    }
  },

});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}