import './globals.css'

export const metadata = {
    title: 'LnF - Lost n Found',
    description: 'Onchain lost and found with Base Pay',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
