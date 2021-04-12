import { createContext, useContext } from 'react'

export const LocaleContext = createContext()

const useLocaleContext = () => useContext(LocaleContext)

export default useLocaleContext
