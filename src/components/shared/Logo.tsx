import { Leaf } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2 group z-50">
            <div className="flex bg-accent h-10 w-10 items-center justify-center rounded-xl text-accent-foreground shadow-lg shadow-accent/20 transition-transform group-hover:scale-110">
                <Leaf className="text-accent-foreground h-6 w-6" />
            </div>
            <span className="text-xl font-bold tracking-tight">EcoSpark</span>
        </Link>
    )
}

export default Logo