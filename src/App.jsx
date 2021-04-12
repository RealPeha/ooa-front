import React, { useState } from 'react'
import { IntlProvider } from 'react-intl'

import RU from './lang/ru.json'

import { LocaleContext } from './utils/useLocaleContext'

const App = ({ children }) => {
    const [locale, setLocale] = useState('ru')
    const [messages, setMessages] = useState(RU)

    const selectLanguage = (newLocale) => {
        setLocale(newLocale)
        setMessages(RU)
    }

    return (
        <LocaleContext.Provider value={{ locale, selectLanguage }}>
            <IntlProvider locale={locale} messages={messages}>
                {children}
            </IntlProvider>
        </LocaleContext.Provider>
    )
}

export default App
