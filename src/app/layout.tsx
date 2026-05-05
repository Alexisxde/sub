import PaletteProvider from "@/providers/palette-provider"
import QueryProvider from "@/providers/query-provider"
import SessionProvider from "@/providers/session-provider"
import ThemeProvider from "@/providers/theme-provider"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import { Toaster } from "sileo"
import "./globals.css"

const dmSans = DM_Sans({
	subsets: ["latin"],
	variable: "--font-sans",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})

export const metadata: Metadata = { title: "Subscription App" }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="es" className={dmSans.variable} suppressHydrationWarning>
			<body className={dmSans.className}>
				<SessionProvider>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
						<PaletteProvider>
							<QueryProvider>{children}</QueryProvider>
						</PaletteProvider>
					</ThemeProvider>
					<Toaster position="top-right" theme="system" />
				</SessionProvider>
			</body>
		</html>
	)
}
