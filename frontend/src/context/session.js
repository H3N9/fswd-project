import React, {createContext, useContext, useState, useEffect, useCallback} from 'react'
import { useCookies } from 'react-cookie'
import {useLazyQuery, useMutation} from '@apollo/client'
import {LOGIN_MUTATION} from '../graphql/loginMutation'
import {ME_QUERY} from '../graphql/meQuery'


const SessionContext = createContext()


export const SessionProvider = (props) => {
    const { children } = props
    const [ user, setUser ] = useState(null)
    const [, setCookie, removeCookie] = useCookies(['token'])
    const [loadUser, {loading, data}] = useLazyQuery(ME_QUERY, { fetchPolicy: 'network-only' })
    const [login] = useMutation(LOGIN_MUTATION)
    

    const handleLogin = useCallback(async (username, password) => {
        try {
            const res = await login({ variables: { username, password } })
            if (res?.data?.login?.token) {
                setCookie('token', res?.data?.login?.token, {maxAge: 84600})
                setUser(res?.data?.login?.user)
                return true
            }
        } catch (err) {
                removeCookie('token')
                return false
        }
    }, [login, removeCookie, setCookie])

    const handleLogout = useCallback(() => {
        setUser(null)
        removeCookie('token')
    }, [removeCookie])

    useEffect(() => {
        if (data?.me) {
            setUser(data?.me)
        }
    }, [data])

    useEffect(() => {
        const loadData = async () => {
            try {
                await loadUser()
                
            } catch (err) {
                removeCookie('token')
            }
        }
        loadData()
    }, [loadUser, removeCookie])



    return (
        <SessionContext.Provider value={{login: handleLogin, logout: handleLogout, user}}>
            {children}
        </SessionContext.Provider>
    )
}

export const useSession = () => useContext(SessionContext)