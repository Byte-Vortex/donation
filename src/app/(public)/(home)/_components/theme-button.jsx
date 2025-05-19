"use client"

import { BsSunFill as Sun, BsMoonFill as Moon, BsDisplay as System } from 'react-icons/bs'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown"
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';


export default function ThemeButton() {


    const { theme, setTheme } = useTheme();

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (


        <DropdownMenu>
            <DropdownMenuTrigger
                asChild
            >
                <Button size="icon" className="text-lg">
                    {theme === 'system' ? <System /> : theme === 'dark' ? <Moon /> : <Sun />}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent sideOffset={12} className="w-40">

                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>

                    <DropdownMenuRadioItem value="light">
                        <Sun className='inline-block mr-2' />
                        <span> Light </span>
                    </DropdownMenuRadioItem>

                    <DropdownMenuRadioItem value="dark">
                        <Moon className='inline-block mr-2' />
                        <span> Dark </span>
                    </DropdownMenuRadioItem>

                    <DropdownMenuRadioItem value="system">
                        <System className='inline-block mr-2' />
                        <span> System </span>
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>


    )
}