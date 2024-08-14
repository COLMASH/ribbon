import type { Metadata } from 'next'
import { Providers } from '../lib/redux/provider'
import '../ui/styles/globals.css'
import { colors } from '@/ui/styles/ThemeRegistry/defaults'
import PersistLayout from './persistor'

export const metadata: Metadata = {
    title: 'Ribbon Pokedex App',
    description: 'A polished and responsive Pokedex App'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <Providers>
            <html lang="en">
                <body style={{ backgroundColor: colors.ribbonLightGreen }}>
                    <PersistLayout>{children}</PersistLayout>
                </body>
            </html>
        </Providers>
    )
}
