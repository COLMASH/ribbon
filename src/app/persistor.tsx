'use client'

import { useEffect, useState } from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from '@/lib/redux/store'
import ThemeRegistry from '@/ui/styles/ThemeRegistry/ThemeRegistry'
import routes from '@/lib/routes/routes'
import { Navbar } from '@/ui/components/Navbars'
import { Box } from '@mui/material'

export default function PersistLayout({ children }: { children: React.ReactNode }) {
    const [isMounted, setIsMounted] = useState(false)

    const links = Object.values(routes).map(route => ({
        label: route.label,
        href: route.path
    }))

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsMounted(true)
        }
    }, [])

    if (!isMounted) return null

    return (
        <PersistGate loading={null} persistor={persistor}>
            <Navbar title="Ribbon Pokedex" links={links} />
            <Box component="main" sx={{ flexGrow: 1, m: 5 }}>
                <ThemeRegistry>{children}</ThemeRegistry>
            </Box>
        </PersistGate>
    )
}
