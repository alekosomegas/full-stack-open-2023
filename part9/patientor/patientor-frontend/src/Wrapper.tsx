import diagnosesServices from "./services/diagnoses"
import { Diagnosis } from './types';
import { useEffect, createContext, useState, useContext, PropsWithChildren } from 'react'

interface ContextType {
    data: Diagnosis[] | undefined
}
export const AffiliateContext = createContext<ContextType | undefined>(undefined);

const AffiliateProvider = ({children}: PropsWithChildren<{}>) => {
    const [data, setData] = useState<Diagnosis[]>();
    const [loading, setLoading] = useState<Boolean>(false);

    const getData = async () => {
        setLoading(true)
        const da = await diagnosesServices.getAll();
        setData(da);
        setLoading(false)
    }

    useEffect(() => {
        getData()

    }, [])
    
    return (
        <AffiliateContext.Provider value={{data}}>
            {children}
        </AffiliateContext.Provider>        
    )
    
}

export default AffiliateProvider