"use client"
import { createContext, useContext, useEffect, useRef, useState } from "react"

type Palette = "blue" | "orange" | "green" | "violet" | null

type PaletteContextType = {
	palette: Palette
	setPalette: (palette: Palette) => void
}

const PaletteContext = createContext<PaletteContextType | null>(null)

export default function PaletteProvider({ children }: { children: React.ReactNode }) {
	const [palette, setPalette] = useState<Palette | null>(null)
	const [isInitialized, setIsInitialized] = useState(false)
	const prevPaletteRef = useRef<Palette>(null)

	useEffect(() => {
		const savedPalette = localStorage.getItem("palette") as Palette
		if (savedPalette) {
			setPalette(savedPalette)
			prevPaletteRef.current = savedPalette
			document.documentElement.classList.add(savedPalette)
		}
		setIsInitialized(true)
	}, [])

	useEffect(() => {
		if (!isInitialized) return
		if (prevPaletteRef.current) document.documentElement.classList.remove(prevPaletteRef.current)
		if (palette === null) localStorage.removeItem("palette")
		else {
			localStorage.setItem("palette", palette)
			document.documentElement.classList.add(palette)
		}
		prevPaletteRef.current = palette
	}, [palette, isInitialized])

	return <PaletteContext.Provider value={{ palette, setPalette }}>{children}</PaletteContext.Provider>
}

export const usePalette = () => {
	const context = useContext(PaletteContext)
	if (context === null) throw new Error("usePalette must be used within a PaletteProvider")
	return context
}
