import { useSharesStore } from '../stores/shares'
import { useFirebaseDB } from '../composables/useFirebaseDB';
import { o_O } from '~/helpers';

export const useSharedData = () => {
    const sharesStore = useSharesStore()
    const { getAllData } = useFirebaseDB()

    const fetchCategories = async() => {
        let [error, data] = await o_O(getAllData('categories'))
    
        if(error) return alert(error)
        sharesStore.addCategories(data)
    }

    const fetchIndustries = async() => {
        let [error, data] = await o_O(getAllData('industries'))
    
        if(error) return alert(error)
        sharesStore.addIndustries(data)
    }

    return { fetchCategories, fetchIndustries }
}