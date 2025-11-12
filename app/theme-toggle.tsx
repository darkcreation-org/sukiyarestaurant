"use client";

import { useTheme } from "next-themes";

export function ThemeToggle(){
    const {theme, setTheme} = useTheme();
    return(
        <div className="flex">
            <button
            onClick={()=> setTheme(theme === "light" ? "dark" : "light")}
            >
                theme toggle
            </button>
        </div>
        
    )
}