import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from 'next/link'
import { colors } from '@/ui/styles/ThemeRegistry/defaults'

interface NavBarProps {
    title: string
    links: { label: string; href: string }[]
}

export default function NavBar({ title, links }: NavBarProps) {
    return (
        <AppBar position="static" sx={{ backgroundColor: colors.ribbonGreen }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
                {links.map(link => (
                    <Button color="inherit" component={Link} href={link.href} key={link.href}>
                        {link.label}
                    </Button>
                ))}
            </Toolbar>
        </AppBar>
    )
}
