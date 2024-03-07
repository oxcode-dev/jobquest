import { errorResponse } from '~/helpers/FirebaseErrorResponse';
import 
  { collection, doc, getDocs, getDoc, getCountFromServer, query, orderBy, startAfter,
    endBefore, limit, limitToLast, where,
} from 'firebase/firestore'
export const useJobs = (table='jobs', orderByColumn='created_at', orderDirection = 'desc', limitNm=30) => {
    const { $db } = useNuxtApp()

    const collectionRef = collection($db, table)
    const orderByParam = ref(orderByColumn)
    const limitNumber = ref(limitNm)
    const limitOrder = ref(orderDirection)
    const lastItemId = ref(null)
    const firstItemId = ref(null)
    const allData = ref([])
    const currentPage = ref(1)
    const getTotalData = ref(1)
    const pages = ref(1)
    const isLoading = ref(true)
    const pageTitle = computed(() => `<span>Page <b>${currentPage.value}</b> of ${pages.value}</span>`)

    const countAllData = async() => {
        const snapshot = await getCountFromServer(collectionRef);
        getTotalData.value = snapshot.data().count;
        pages.value = Math.ceil(getTotalData.value/limitNumber.value)
    }

    const getData = async () => {
        try{
            const first = query(collectionRef, orderBy(orderByParam.value, limitOrder.value), limit(limitNumber.value));
            const data = await getDocs(first);
            lastItemId.value = data.docs[data.docs.length-1]?.id || null;
            allData.value = data.docs.map(doc => ({...doc.data(), id: doc.id}))
        }
        catch(error) {
            console.log(error)
        }
    }

    const handleNextPage = async(selectedPage) => {
        if(lastItemId.value && selectedPage <= pages.value) {
            try{
                const dataDoc = doc(db, table, lastItemId.value);
                const result = await getDoc(dataDoc);

                const next = query(collectionRef, orderBy(orderByParam.value, limitOrder.value), startAfter(result), limit(limitNumber.value));
                const data = await getDocs(next);
                
                lastItemId.value = selectedPage === pages.value ? null : data.docs[data.docs.length-1]?.id || null;
                firstItemId.value = selectedPage === 1 ? null : data.docs[0]?.id || null;
                currentPage.value = selectedPage

                allData.value = data.docs.map(doc => ({...doc.data(), id: doc.id}))
            }
            catch(error) {
                console.log(error)
            }
        }
    }

    const handlePrevPage = async(selectedPage) => {
        if(firstItemId.value && selectedPage >= 1) {
            try{
                const dataDoc = doc(db, table, firstItemId.value);
                const result = await getDoc(dataDoc);

                const prev = query(collectionRef, orderBy(orderByParam.value, limitOrder.value), endBefore(result), limitToLast(limitNumber.value));
                const data = await getDocs(prev);
                
                currentPage.value = selectedPage
                lastItemId.value = selectedPage === pages.value ? null : data.docs[data.docs.length-1]?.id || null;
                firstItemId.value = selectedPage === 1 ? null : data.docs[0]?.id || null;

                allData.value = data.docs.map(doc => ({...doc.data(), id: doc.id}))
            }
            catch(error) {
                console.log(error)
            }
        }
    }

    onMounted(() => {
        getData()
        countAllData()
        setTimeout(() => isLoading.value = false, 2000)
    })

    return {
        pageTitle, pages, currentPage, handleNextPage, handlePrevPage, allData, isLoading,
        getData, countAllData
    }
}

export const useGetJobs = () => {
    const { $db } = useNuxtApp()
    const getJobsLimit = async (table, limitNm=30) =>  {
        const collectionRef = collection($db, table)
        try{
          const queryFn = query(collectionRef, where("isOpen", "==", true), limit(limitNm))
          const result = await getDocs(queryFn)
        //   console.log(result.docs)
          return result.docs.map(doc => ({...doc.data(), id: doc.id}))
        }
        catch(error) {
          console.log(error)
          return errorResponse(error)
        }
    }

    return { getJobsLimit}
}