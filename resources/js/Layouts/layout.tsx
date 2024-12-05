import { ThemeProvider } from "@/components/theme/theme-provider";

import ThemeToggle from "@/components/theme/theme-toggle";
import { Container, Main } from "@/components/craft";
import Logo from "@/logo.svg";

import { Link } from "@inertiajs/react";

import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link as NextLink,
    Divider,
    NextUIProvider,
    Button,
    Image,
} from "@nextui-org/react";

import type { NavbarProps } from "@nextui-org/react";
import { Github } from "lucide-react";

const menuItems = ["Главная", "Блог", "О нас"];

const Nav = (props: NavbarProps) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    return (
        <Navbar
            isBordered
            {...props}
            classNames={{
                base: cn("border-default-100", {
                    "bg-default-200/50 dark:bg-default-100/50": isMenuOpen,
                }),
                wrapper: "w-full justify-end",
                item: "hidden md:flex",
            }}
            height="60px"
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}
        >
            <NavbarBrand>
                <Image
                    src={Logo}
                    className="size-6 dark:invert"
                    radius="none"
                />
                <span className="ml-2 text-small font-medium">JobTalks</span>
            </NavbarBrand>

            <NavbarContent justify="center">
                {menuItems.map((item, index) => (
                    <NavbarItem key={`${item}-${index}`}>
                        <NextLink
                            as={Link}
                            className="text-default-500"
                            href="/"
                            size="sm"
                        >
                            {item}
                        </NextLink>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent className="hidden md:flex" justify="end">
                <NavbarItem className="ml-2 !flex gap-2">
                    <Button
                        startContent={<Github size={16} />}
                        color="default"
                        variant="ghost"
                    >
                        GitHub
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenuToggle className="text-default-400 md:hidden" />

            <NavbarMenu className="top-[calc(var(--navbar-height)_-_1px)] max-h-fit bg-default-200/50 pb-6 pt-6 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50">
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <NextLink
                            as={Link}
                            className="mb-2 w-full text-default-500"
                            href="#"
                            size="md"
                        >
                            {item}
                        </NextLink>
                        {index < menuItems.length - 1 && (
                            <Divider className="opacity-50" />
                        )}
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
};

export default function RootLayout({ children }: PropsWithChildren) {
    return (
        <>
            <NextUIProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Nav />
                    <Main>{children}</Main>
                    <Footer />
                </ThemeProvider>
            </NextUIProvider>
        </>
    );
}
const Footer = () => {
    return (
        <footer className="flex w-full flex-col">
            <Container className="flex w-full justify-between">
                <div className="max-w-7xl pb-8 pt-16 sm:pt-24lg:pt-32">
                    <div className="xl:grid xl:grid-cols-2 xl:gap-8 items-center">
                        <div className="space-y-8 md:pr-8">
                            <div className="flex items-center gap-3 justify-start">
                                <Image
                                    src={Logo}
                                    className="size-9 dark:invert"
                                    radius="none"
                                />
                                <span className="text-medium font-medium">
                                    JobTalks
                                </span>
                            </div>
                            <p className="text-small text-default-500">
                                Сервис с вопросами и ответами для подготовки к
                                техническим интервью в IT.
                            </p>
                        </div>
                        <div className="flex mt-8 md:mt-0 md:justify-end">
                            <ThemeToggle />
                        </div>
                    </div>
                    <Divider className="my-4" />
                    <div className="flex flex-wrap justify-between gap-2 pt-8">
                        <p className="text-small text-default-400">
                            © {new Date().getFullYear()} JobTalks Inc. Все
                            права защищены.
                        </p>
                    </div>
                </div>
            </Container>
        </footer>
    );
};
