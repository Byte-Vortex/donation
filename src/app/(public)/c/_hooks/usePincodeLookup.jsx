import { useState, useEffect } from 'react'

export function usePincodeLookup(pincode) {
    const [location, setLocation] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (pincode.length !== 6) {
            setLocation(null)
            setError(null)
            return
        }

        const debounce = setTimeout(async () => {
            setLoading(true)
            try {
                const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`)
                const result = await res.json()
                const postOffices = result?.[0]?.PostOffice

                if (result?.[0]?.Status === 'Error') {
                    setError('Incorrect Pincode !')
                    setLocation(null)
                } else if (postOffices?.length > 0) {
                    const state = postOffices[0].State
                    const district = postOffices[0].Division
                    setLocation({ state, district })
                    setError(null)
                } else {
                    setLocation(null)
                    setError(null)
                }
            } catch {
                setError('Incorrect pincode')
                setLocation(null)
            } finally {
                setLoading(false)
            }
        }, 500)

        return () => clearTimeout(debounce)
    }, [pincode])

    return { location, error, loading }
}