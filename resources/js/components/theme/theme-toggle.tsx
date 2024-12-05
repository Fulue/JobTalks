"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";

export default function ThemeToggle() {
    const { setTheme, theme } = useTheme();
    const [checked, setChecked] = useState<boolean>(true);

    // Синхронизируем состояние переключателя с текущей темой
    useEffect(() => {
        setChecked(theme === "light");
    }, [theme]);

    const handleThemeChange = (isChecked: boolean) => {
        setChecked(isChecked);
        setTimeout(() => {
            setTheme(isChecked ? "light" : "dark");
        }, 500);
    };

    return (
        <div>
            <div className="relative inline-grid h-9 items-center text-sm font-medium">
                <Switch
                    isSelected={checked}
                    onValueChange={handleThemeChange}
                    defaultSelected
                    color="default"
                    startContent={
                        <Sun size={16} strokeWidth={2} aria-hidden="true" />
                    }
                    endContent={
                        <Moon size={16} strokeWidth={2} aria-hidden="true" />
                    }
                    aria-label="Toggle theme"
                />
            </div>
        </div>
    );
}
