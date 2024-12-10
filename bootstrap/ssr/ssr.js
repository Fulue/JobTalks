import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { Link as Link$1, Head, router, Deferred, createInertiaApp } from "@inertiajs/react";
import { ThemeProvider as ThemeProvider$1, useTheme } from "next-themes";
import { Sun, Moon, Github, Code, HomeIcon, ListIcon, UsersIcon, ArrowLeft, Video, Search, ListFilter, X, ThumbsUp, ThumbsDown, CheckCircle, ArrowRight, BotMessageSquare, Eye } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Switch, NextUIProvider, Navbar, NavbarBrand, Image, NavbarContent, NavbarItem, Link, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Divider, Card, CardBody, Chip, Spinner, CardFooter, Skeleton, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Tooltip, Pagination } from "@nextui-org/react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Balancer from "react-wrap-balancer";
import { AnimatePresence, motion } from "framer-motion";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism/index.js";
import { PrismLight } from "react-syntax-highlighter";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";
import createServer from "@inertiajs/react/server";
import ReactDOMServer from "react-dom/server";
function ThemeProvider({ children, ...props }) {
  return /* @__PURE__ */ jsx(ThemeProvider$1, { ...props, children });
}
function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [checked, setChecked] = useState(true);
  useEffect(() => {
    setChecked(theme === "light");
  }, [theme]);
  const handleThemeChange = (isChecked) => {
    setChecked(isChecked);
    setTimeout(() => {
      setTheme(isChecked ? "light" : "dark");
    }, 500);
  };
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("div", { className: "relative inline-grid h-9 items-center text-sm font-medium", children: /* @__PURE__ */ jsx(
    Switch,
    {
      isSelected: checked,
      onValueChange: handleThemeChange,
      defaultSelected: true,
      color: "default",
      startContent: /* @__PURE__ */ jsx(Sun, { size: 16, strokeWidth: 2, "aria-hidden": "true" }),
      endContent: /* @__PURE__ */ jsx(Moon, { size: 16, strokeWidth: 2, "aria-hidden": "true" }),
      "aria-label": "Toggle theme"
    }
  ) }) });
}
function cn$1(...inputs) {
  return twMerge(clsx(inputs));
}
const Main = ({ children, className, id }) => {
  return /* @__PURE__ */ jsx(
    "main",
    {
      className: cn$1(
        // `Main` Specific Styles
        "prose-p:m-0 max-w-none",
        // General Prose
        "prose prose-neutral prose:font-sans dark:prose-invert xl:prose-lg",
        // Prose Headings
        "prose-headings:font-normal",
        // Prose Strong
        "prose-strong:font-semibold",
        // Inline Links
        "prose-a:underline prose-a:decoration-primary/50 prose-a:underline-offset-2 prose-a:text-foreground/75 prose-a:transition-all",
        // Inline Link Hover
        "hover:prose-a:decoration-primary hover:prose-a:text-foreground",
        // Blockquotes
        "prose-blockquote:not-italic",
        // Pre and Code Blocks
        "prose-pre:border prose-pre:bg-muted/25 prose-pre:text-foreground",
        className
      ),
      id,
      children
    }
  );
};
const Section = ({ children, className, id }) => {
  return /* @__PURE__ */ jsx("section", { className: cn$1("py-8 fade-in md:py-12", className), id, children });
};
const Container = ({ children, className, id }) => {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn$1("mx-auto max-w-5xl", "p-6 sm:p-8", className),
      id,
      children
    }
  );
};
const Logo = "/build/assets/logo-ZJN5M-eU.svg";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const menuItems = ["Главная", "Блог", "О нас"];
const Nav = (props) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return /* @__PURE__ */ jsxs(
    Navbar,
    {
      isBordered: true,
      ...props,
      classNames: {
        base: cn("border-default-100", {
          "bg-default-200/50 dark:bg-default-100/50": isMenuOpen
        }),
        wrapper: "w-full justify-end",
        item: "hidden md:flex"
      },
      height: "60px",
      isMenuOpen,
      onMenuOpenChange: setIsMenuOpen,
      children: [
        /* @__PURE__ */ jsxs(NavbarBrand, { children: [
          /* @__PURE__ */ jsx(
            Image,
            {
              src: Logo,
              className: "size-6 dark:invert",
              radius: "none"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "ml-2 text-small font-medium", children: "JobTalks" })
        ] }),
        /* @__PURE__ */ jsx(NavbarContent, { justify: "center", children: menuItems.map((item, index) => /* @__PURE__ */ jsx(NavbarItem, { children: /* @__PURE__ */ jsx(
          Link,
          {
            as: Link$1,
            className: "text-default-500",
            href: "/",
            size: "sm",
            children: item
          }
        ) }, `${item}-${index}`)) }),
        /* @__PURE__ */ jsx(NavbarContent, { className: "hidden md:flex", justify: "end", children: /* @__PURE__ */ jsx(NavbarItem, { className: "ml-2 !flex gap-2", children: /* @__PURE__ */ jsx(
          Button,
          {
            startContent: /* @__PURE__ */ jsx(Github, { size: 16 }),
            color: "default",
            variant: "ghost",
            children: "GitHub"
          }
        ) }) }),
        /* @__PURE__ */ jsx(NavbarMenuToggle, { className: "text-default-400 md:hidden" }),
        /* @__PURE__ */ jsx(NavbarMenu, { className: "top-[calc(var(--navbar-height)_-_1px)] max-h-fit bg-default-200/50 pb-6 pt-6 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50", children: menuItems.map((item, index) => /* @__PURE__ */ jsxs(NavbarMenuItem, { children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              as: Link$1,
              className: "mb-2 w-full text-default-500",
              href: "#",
              size: "md",
              children: item
            }
          ),
          index < menuItems.length - 1 && /* @__PURE__ */ jsx(Divider, { className: "opacity-50" })
        ] }, `${item}-${index}`)) })
      ]
    }
  );
};
function RootLayout({ children }) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(NextUIProvider, { children: /* @__PURE__ */ jsxs(
    ThemeProvider,
    {
      attribute: "class",
      defaultTheme: "system",
      enableSystem: true,
      disableTransitionOnChange: true,
      children: [
        /* @__PURE__ */ jsx(Nav, {}),
        /* @__PURE__ */ jsx(Main, { children }),
        /* @__PURE__ */ jsx(Footer, {})
      ]
    }
  ) }) });
}
const Footer = () => {
  return /* @__PURE__ */ jsx("footer", { className: "flex w-full flex-col", children: /* @__PURE__ */ jsx(Container, { className: "flex w-full justify-between", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl pb-8 pt-16 sm:pt-24lg:pt-32", children: [
    /* @__PURE__ */ jsxs("div", { className: "xl:grid xl:grid-cols-2 xl:gap-8 items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-8 md:pr-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 justify-start", children: [
          /* @__PURE__ */ jsx(
            Image,
            {
              src: Logo,
              className: "size-9 dark:invert",
              radius: "none"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-medium font-medium", children: "JobTalks" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-small text-default-500", children: "Сервис с вопросами и ответами для подготовки к техническим интервью в IT." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex mt-8 md:mt-0 md:justify-end", children: /* @__PURE__ */ jsx(ThemeToggle, {}) })
    ] }),
    /* @__PURE__ */ jsx(Divider, { className: "my-4" }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-between gap-2 pt-8", children: /* @__PURE__ */ jsxs("p", { className: "text-small text-default-400", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " JobTalks Inc. Все права защищены."
    ] }) })
  ] }) }) });
};
function WordRotate({
  words,
  duration = 2500,
  framerProps = {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.25, ease: "easeOut" }
  },
  className
}) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words, duration]);
  return /* @__PURE__ */ jsx("div", { className: "overflow-hidden py-2", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
    motion.h1,
    {
      className: cn(className),
      ...framerProps,
      children: words[index]
    },
    index
  ) }) });
}
const Java = ({ size = 240, className = "" }) => {
  const svgSize = `${size}px`;
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 48 48",
      width: svgSize,
      height: svgSize,
      className,
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#d43a02",
            d: "M23.65,24.898c-0.998-1.609-1.722-2.943-2.725-5.455C19.229,15.2,31.24,11.366,26.37,3.999c2.111,5.089-7.577,8.235-8.477,12.473C17.07,20.37,23.645,24.898,23.65,24.898z"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#d43a02",
            d: "M23.878,17.27c-0.192,2.516,2.229,3.857,2.299,5.695c0.056,1.496-1.447,2.743-1.447,2.743s2.728-0.536,3.579-2.818c0.945-2.534-1.834-4.269-1.548-6.298c0.267-1.938,6.031-5.543,6.031-5.543S24.311,11.611,23.878,17.27z"
          }
        ),
        /* @__PURE__ */ jsxs(
          "linearGradient",
          {
            id: "P9ujQJgz7XN9Qbny9S64Ha",
            x1: "22.677",
            x2: "30.737",
            y1: "21.174",
            y2: "43.318",
            gradientUnits: "userSpaceOnUse",
            children: [
              /* @__PURE__ */ jsx("stop", { offset: "0", stopColor: "#5c65d6" }),
              /* @__PURE__ */ jsx("stop", { offset: ".999", stopColor: "#464eb0" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "url(#P9ujQJgz7XN9Qbny9S64Ha)",
            d: "M32.084,25.055c1.754-0.394,3.233,0.723,3.233,2.01c0,2.901-4.021,5.643-4.021,5.643s6.225-0.742,6.225-5.505C37.521,24.053,34.464,23.266,32.084,25.055z M29.129,27.395c0,0,1.941-1.383,2.458-1.902c-4.763,1.011-15.638,1.147-15.638,0.269c0-0.809,3.507-1.638,3.507-1.638s-7.773-0.112-7.773,2.181C11.683,28.695,21.858,28.866,29.129,27.395z"
          }
        ),
        /* @__PURE__ */ jsxs(
          "linearGradient",
          {
            id: "P9ujQJgz7XN9Qbny9S64Hb",
            x1: "19.498",
            x2: "27.296",
            y1: "22.77",
            y2: "44.196",
            gradientUnits: "userSpaceOnUse",
            children: [
              /* @__PURE__ */ jsx("stop", { offset: "0", stopColor: "#5c65d6" }),
              /* @__PURE__ */ jsx("stop", { offset: ".999", stopColor: "#464eb0" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "url(#P9ujQJgz7XN9Qbny9S64Hb)",
            d: "M27.935,29.571c-4.509,1.499-12.814,1.02-10.354-0.993c-1.198,0-2.974,0.963-2.974,1.889c0,1.857,8.982,3.291,15.63,0.572L27.935,29.571z"
          }
        ),
        /* @__PURE__ */ jsxs(
          "linearGradient",
          {
            id: "P9ujQJgz7XN9Qbny9S64Hc",
            x1: "18.698",
            x2: "26.59",
            y1: "23.455",
            y2: "45.14",
            gradientUnits: "userSpaceOnUse",
            children: [
              /* @__PURE__ */ jsx("stop", { offset: "0", stopColor: "#5c65d6" }),
              /* @__PURE__ */ jsx("stop", { offset: ".999", stopColor: "#464eb0" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "url(#P9ujQJgz7XN9Qbny9S64Hc)",
            d: "M18.686,32.739c-1.636,0-2.695,1.054-2.695,1.822c0,2.391,9.76,2.632,13.627,0.205l-2.458-1.632C24.271,34.404,17.014,34.579,18.686,32.739z"
          }
        ),
        /* @__PURE__ */ jsxs(
          "linearGradient",
          {
            id: "P9ujQJgz7XN9Qbny9S64Hd",
            x1: "18.03",
            x2: "25.861",
            y1: "24.198",
            y2: "45.712",
            gradientUnits: "userSpaceOnUse",
            children: [
              /* @__PURE__ */ jsx("stop", { offset: "0", stopColor: "#5c65d6" }),
              /* @__PURE__ */ jsx("stop", { offset: ".999", stopColor: "#464eb0" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "url(#P9ujQJgz7XN9Qbny9S64Hd)",
            d: "M36.281,36.632c0-0.936-1.055-1.377-1.433-1.588c2.228,5.373-22.317,4.956-22.317,1.784c0-0.721,1.807-1.427,3.477-1.093l-1.42-0.839C11.26,34.374,9,35.837,9,37.017C9,42.52,36.281,42.255,36.281,36.632z"
          }
        ),
        /* @__PURE__ */ jsxs(
          "linearGradient",
          {
            id: "P9ujQJgz7XN9Qbny9S64He",
            x1: "20.725",
            x2: "28.228",
            y1: "24.582",
            y2: "45.197",
            gradientUnits: "userSpaceOnUse",
            children: [
              /* @__PURE__ */ jsx("stop", { offset: "0", stopColor: "#5c65d6" }),
              /* @__PURE__ */ jsx("stop", { offset: ".999", stopColor: "#464eb0" })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "url(#P9ujQJgz7XN9Qbny9S64He)",
            d: "M39,38.604c-4.146,4.095-14.659,5.587-25.231,3.057C24.341,46.164,38.95,43.628,39,38.604z"
          }
        )
      ]
    }
  );
};
const PHP = ({ size = 32, className = "" }) => /* @__PURE__ */ jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 128 128",
    className,
    children: /* @__PURE__ */ jsx(
      "path",
      {
        fill: "#6181B6",
        d: "M64 33.039c-33.74 0-61.094 13.862-61.094 30.961s27.354 30.961 61.094 30.961 61.094-13.862 61.094-30.961-27.354-30.961-61.094-30.961zm-15.897 36.993c-1.458 1.364-3.077 1.927-4.86 2.507-1.783.581-4.052.461-6.811.461h-6.253l-1.733 10h-7.301l6.515-34h14.04c4.224 0 7.305 1.215 9.242 3.432 1.937 2.217 2.519 5.364 1.747 9.337-.319 1.637-.856 3.159-1.614 4.515-.759 1.357-1.75 2.624-2.972 3.748zm21.311 2.968l2.881-14.42c.328-1.688.208-2.942-.361-3.555-.57-.614-1.782-1.025-3.635-1.025h-5.79l-3.731 19h-7.244l6.515-33h7.244l-1.732 9h6.453c4.061 0 6.861.815 8.402 2.231s2.003 3.356 1.387 6.528l-3.031 15.241h-7.358zm40.259-11.178c-.318 1.637-.856 3.133-1.613 4.488-.758 1.357-1.748 2.598-2.971 3.722-1.458 1.364-3.078 1.927-4.86 2.507-1.782.581-4.053.461-6.812.461h-6.253l-1.732 10h-7.301l6.514-34h14.041c4.224 0 7.305 1.215 9.241 3.432 1.935 2.217 2.518 5.418 1.746 9.39zM95.919 54h-5.001l-2.727 14h4.442c2.942 0 5.136-.29 6.576-1.4 1.442-1.108 2.413-2.828 2.918-5.421.484-2.491.264-4.434-.66-5.458-.925-1.024-2.774-1.721-5.548-1.721zM38.934 54h-5.002l-2.727 14h4.441c2.943 0 5.136-.29 6.577-1.4 1.441-1.108 2.413-2.828 2.917-5.421.484-2.491.264-4.434-.66-5.458s-2.772-1.721-5.546-1.721z"
      }
    )
  }
);
const Python = ({ size = 256, className = "" }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 256 255",
    className,
    children: [
      /* @__PURE__ */ jsxs("defs", { children: [
        /* @__PURE__ */ jsxs(
          "linearGradient",
          {
            id: "logosPython0",
            x1: "12.959%",
            x2: "79.639%",
            y1: "12.039%",
            y2: "78.201%",
            children: [
              /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#387EB8" }),
              /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#366994" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "linearGradient",
          {
            id: "logosPython1",
            x1: "19.128%",
            x2: "90.742%",
            y1: "20.579%",
            y2: "88.429%",
            children: [
              /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#FFE052" }),
              /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#FFC331" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "path",
        {
          fill: "url(#logosPython0)",
          d: "M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072M92.802 19.66a11.12 11.12 0 0 1 11.13 11.13a11.12 11.12 0 0 1-11.13 11.13a11.12 11.12 0 0 1-11.13-11.13a11.12 11.12 0 0 1 11.13-11.13"
        }
      ),
      /* @__PURE__ */ jsx(
        "path",
        {
          fill: "url(#logosPython1)",
          d: "M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897m34.114-19.586a11.12 11.12 0 0 1-11.13-11.13a11.12 11.12 0 0 1 11.13-11.131a11.12 11.12 0 0 1 11.13 11.13a11.12 11.12 0 0 1-11.13 11.13"
        }
      )
    ]
  }
);
const Javascript = ({ size = 256, className = "" }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 256 256",
    className,
    children: [
      /* @__PURE__ */ jsx("path", { fill: "#F7DF1E", d: "M0 0h256v256H0z" }),
      /* @__PURE__ */ jsx("path", { d: "m67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371c7.905 0 12.89-3.092 12.89-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259c-19.245 0-30.416-9.967-36.087-21.996m85.07-2.576l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607c9.969 0 16.325-4.984 16.325-11.858c0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257c0-18.044 13.747-31.792 35.228-31.792c15.294 0 26.292 5.328 34.196 19.247l-18.732 12.03c-4.125-7.389-8.591-10.31-15.465-10.31c-7.046 0-11.514 4.468-11.514 10.31c0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804c0 21.654-17.012 33.51-39.867 33.51c-22.339 0-36.774-10.654-43.819-24.574" })
    ]
  }
);
const Qa = ({ size = 256, className = "" }) => /* @__PURE__ */ jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    width: size,
    height: size,
    viewBox: "0 0 256 269",
    className,
    children: /* @__PURE__ */ jsx(
      "path",
      {
        fill: "#2CB134",
        d: "M234.153.003a1.72 1.72 0 0 1 1.533 2.683l-66.298 90.057a2.56 2.56 0 0 1-3.832 0l-23.377-26.059a2.713 2.713 0 0 0-4.215.384l-14.18 18.011a3 3 0 0 0 .384 3.066l42.154 43.687a2.56 2.56 0 0 0 3.833 0L252.93 38.71a1.77 1.77 0 0 1 3.066 1.15v226.485a1.809 1.809 0 0 1-1.917 1.916H1.92a1.809 1.809 0 0 1-1.917-1.916V1.92A1.809 1.809 0 0 1 1.92.003ZM169.005 152.91a41.817 41.817 0 0 0-42.538 42.92c0 26.443 19.161 43.305 44.07 43.305a52.758 52.758 0 0 0 32.192-9.964a2.372 2.372 0 0 0 .383-3.066l-6.898-10.347a2.319 2.319 0 0 0-3.066-.383a37.449 37.449 0 0 1-20.31 6.515c-13.414 0-21.845-8.431-23.377-18.395a.824.824 0 0 1 .766-.766h57.867a2.472 2.472 0 0 0 2.299-2.3v-2.3c0-26.825-16.862-45.22-41.388-45.22m-57.1-14.563a61.35 61.35 0 0 0-41.389-13.796c-26.059 0-42.154 15.329-42.154 33.724c0 41.771 63.615 28.358 63.615 47.903c0 6.131-6.132 12.263-19.161 12.263a48.156 48.156 0 0 1-33.34-13.03a2.56 2.56 0 0 0-3.833.383L25.68 219.59a2.372 2.372 0 0 0 .384 3.066c10.347 9.58 24.91 16.096 45.22 16.096c29.891 0 44.454-15.33 45.22-35.257c0-41.388-63.615-29.508-63.615-47.136c0-6.515 5.749-11.114 15.712-11.114a47.562 47.562 0 0 1 30.275 10.347a2.426 2.426 0 0 0 3.449-.383l9.964-13.413a2.426 2.426 0 0 0-.383-3.449m57.483 31.424c10.423-.583 19.422 7.227 20.311 17.629a.824.824 0 0 1-.766.766h-39.09a.824.824 0 0 1-.766-.766c1.282-10.198 10.035-17.795 20.311-17.629"
      }
    )
  }
);
const Kubernetes = ({ size = 240, className = "" }) => {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: size,
      height: size,
      className,
      viewBox: "0 0 128 128",
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#326ce5",
            d: "M63.556 1.912a8.51 8.44 0 0 0-3.26.826L15.795 24a8.51 8.44 0 0 0-4.604 5.725L.214 77.485a8.51 8.44 0 0 0 1.155 6.47a8.51 8.44 0 0 0 .484.672l30.8 38.296a8.51 8.44 0 0 0 6.653 3.176l49.394-.012a8.51 8.44 0 0 0 6.653-3.17l30.789-38.301a8.51 8.44 0 0 0 1.645-7.142l-10.996-47.76a8.51 8.44 0 0 0-4.604-5.726L67.682 2.738a8.51 8.44 0 0 0-4.126-.826"
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fill: "#fff",
            d: "M63.975 18.143v.01c-1.472.014-2.664 1.336-2.664 2.972c0 .028.005.052.005.074c-.002.222-.012.49-.005.684c.035.946.24 1.668.365 2.535c.17 1.42.215 2.547.224 3.687l.036-.164a41 41 0 0 0-.118-2.394c.139 1.228.24 2.364.186 3.392c-.015-.325-.061-.677-.066-.982l-.036.164c.003.347.096.79.069 1.123c-.061.29-.291.495-.467.742l-.025.121c.173-.227.354-.444.46-.699c-.134.423-.42.796-.707 1.094c.08-.124.146-.262.24-.385l.026-.12c-.145.203-.227.457-.385.61l-.006.006l-.064 1.12a35 35 0 0 0-4.797.736a34.3 34.3 0 0 0-17.398 9.935c-.296-.202-.8-.56-.95-.672l-.005-.005l-.01.002c-.478.064-.95.207-1.57-.153c-1.187-.8-2.271-1.907-3.584-3.24c-.601-.637-1.037-1.246-1.754-1.861c-.163-.141-.41-.33-.592-.473a3.2 3.2 0 0 0-1.87-.705c-.825-.028-1.62.294-2.14.947c-.925 1.16-.628 2.933.658 3.96l.04.026c.174.143.39.326.552.446c.762.561 1.457.849 2.21 1.293c1.594.984 2.91 1.798 3.956 2.779c.402.427.474 1.19.53 1.525v.008l.847.754c-4.561 6.874-6.675 15.36-5.432 24.006l-1.103.324l-.004.006c-.295.381-.712.972-1.135 1.147c-1.366.43-2.908.588-4.77.783c-.872.073-1.626.031-2.556.207c-.205.04-.49.112-.713.164l-.023.006l-.04.011c-1.58.383-2.6 1.837-2.27 3.272c.327 1.435 1.873 2.306 3.464 1.963l.039-.006h.002c.02-.005.038-.015.05-.018c.22-.048.496-.101.69-.154c.913-.245 1.574-.603 2.393-.916c1.76-.632 3.218-1.16 4.637-1.365c.582-.046 1.204.362 1.517.537l.008.004l1.152-.197c2.674 8.274 8.266 14.96 15.346 19.162l-.48 1.152l.003.01c.174.45.364 1.057.237 1.492c-.516 1.336-1.4 2.749-2.408 4.326c-.488.728-.99 1.295-1.43 2.131c-.107.201-.24.507-.342.717c-.69 1.475-.184 3.177 1.143 3.816c1.335.643 2.99-.036 3.707-1.513l.007-.008v-.01c.1-.207.242-.478.329-.674c.378-.866.505-1.607.77-2.441h-.003c.706-1.773 1.094-3.627 2.059-4.778c.26-.31.688-.432 1.136-.552l.01-.004l.6-1.084a34.44 34.44 0 0 0 24.556.062c.172.303.478.865.563 1.01l.004.006l.008.004c.458.149.948.223 1.35.816c.722 1.237 1.218 2.703 1.822 4.475c.265.832.397 1.575.775 2.441c.087.2.23.475.33.684c.715 1.482 2.375 2.163 3.713 1.52c1.326-.64 1.832-2.34 1.143-3.815c-.102-.21-.243-.518-.348-.719c-.441-.836-.943-1.397-1.43-2.125c-1.01-1.577-1.843-2.885-2.36-4.222c-.213-.685.036-1.104.206-1.555l.006-.014l-.01-.01a1 1 0 0 1-.09-.168a6 6 0 0 1-.12-.29c-.08-.21-.16-.442-.224-.596c7.358-4.35 12.786-11.285 15.34-19.295c.347.054.93.155 1.12.193l.01.002l.009-.004c.402-.265.76-.606 1.475-.549c1.419.205 2.876.734 4.638 1.366c.817.312 1.479.677 2.393.921c.194.052.47.101.69.149c.012.003.029.012.05.017h.002l.04.004c1.59.341 3.137-.528 3.464-1.963s-.691-2.888-2.272-3.269c-.227-.052-.551-.141-.775-.184c-.93-.176-1.683-.132-2.557-.205c-1.86-.195-3.402-.353-4.77-.783c-.547-.213-.942-.872-1.138-1.148l-.006-.006l-1.066-.31a34.4 34.4 0 0 0-.56-12.425a34.5 34.5 0 0 0-4.983-11.525c.278-.252.785-.701.932-.836l.007-.006v-.01c.044-.48.006-.97.495-1.494c1.045-.98 2.364-1.797 3.957-2.779c.754-.444 1.454-.731 2.214-1.293c.174-.128.408-.328.588-.473c1.286-1.026 1.584-2.798.658-3.959c-.925-1.16-2.718-1.267-4.003-.242c-.182.145-.43.332-.594.473c-.717.618-1.16 1.226-1.76 1.863c-1.313 1.335-2.398 2.446-3.586 3.246c-.507.294-1.258.193-1.603.172h-.008l-1.004.719c-5.775-6.048-13.63-9.916-22.09-10.672a64 64 0 0 1-.064-1.174v-.008l-.006-.006c-.35-.333-.76-.61-.864-1.318v-.002c-.115-1.428.077-2.967.3-4.824c.125-.867.332-1.59.366-2.535c.009-.216-.005-.527-.005-.758c0-1.645-1.203-2.982-2.688-2.982zm-3.514 13.7a35 35 0 0 0-3.59.552a35 35 0 0 1 3.59-.551zm-4.781.823a34 34 0 0 0-3.711 1.133a34 34 0 0 1 3.71-1.133zm-4.825 1.564a34 34 0 0 0-3.496 1.666a34 34 0 0 1 3.496-1.666M28.8 35.377q.212.03.418.086a3 3 0 0 0-.418-.086m.943.283q.198.096.38.219a3 3 0 0 0-.38-.219m16.549.848a34 34 0 0 0-3.176 2.14a34 34 0 0 1 3.176-2.14m14.346 2.344l-.787 13.93l-.057.029l-.002.013c-.002.05-.014.095-.02.143a2.4 2.4 0 0 1-.263.857q-.055.106-.121.207a2.35 2.35 0 0 1-.69.662c-.07.045-.147.08-.222.118a2.4 2.4 0 0 1-.873.226c-.045.003-.088.014-.133.014c-.05 0-.094-.022-.143-.026a2.3 2.3 0 0 1-.943-.304c-.045-.026-.094-.041-.137-.069l-.006.022l.004-.022c-.044-.027-.102-.016-.144-.047l-.012-.01l-.022.014l-11.421-8.097c.093-.091.192-.174.287-.264a27.4 27.4 0 0 1 3.23-2.635c.237-.165.473-.332.715-.49a27.4 27.4 0 0 1 3.816-2.078c.24-.107.487-.204.73-.305a27.4 27.4 0 0 1 4.044-1.312c.12-.03.238-.067.36-.094c.576-.13 1.162-.206 1.745-.299l.006-.025h.004l-.006.025c.355-.056.704-.14 1.06-.183zm6.726.002c.197.024.39.068.586.097a28 28 0 0 1 3.16.656q.618.166 1.225.36a28 28 0 0 1 3.033 1.168q.562.255 1.112.535a28 28 0 0 1 2.83 1.662q.514.346 1.015.717a28 28 0 0 1 2.496 2.074c.144.134.297.257.438.395l-11.346 8.044l-.04-.015l-.01.008c-.045.032-.094.045-.14.074a2.35 2.35 0 0 1-.882.334c-.077.012-.153.03-.23.033a2.35 2.35 0 0 1-.99-.176a2 2 0 0 1-.265-.127a2.35 2.35 0 0 1-.746-.65c-.05-.069-.088-.146-.13-.22a2.4 2.4 0 0 1-.288-.887c-.006-.055-.026-.103-.03-.159v-.011l-.011-.006zm-25.238.576a34 34 0 0 0-2.81 2.576a34 34 0 0 1 2.81-2.576m50.916 8.14a35 35 0 0 1 1.522 2.594a35 35 0 0 0-1.522-2.594m1.994 3.508q.732 1.491 1.317 3.045a35 35 0 0 0-1.317-3.045m-54.576.69l10.43 9.328l-.012.056l.01.008c.94.817 1.07 2.23.293 3.203c-.028.035-.068.057-.098.09a2.35 2.35 0 0 1-.986.65c-.043.015-.078.043-.121.055l-.014.002l-.012.047l-13.367 3.86c-.02-.185-.02-.37-.037-.555a27 27 0 0 1-.092-3.344q.019-.58.063-1.158a27 27 0 0 1 .457-3.307q.121-.61.273-1.215a27 27 0 0 1 .99-3.162q.21-.554.448-1.097a27 27 0 0 1 1.51-2.987c.09-.156.17-.32.265-.474m47.002.007c.097.158.176.324.27.483a28 28 0 0 1 1.53 3.01c.15.346.298.694.434 1.046a28 28 0 0 1 1.04 3.288c.045.175.104.346.144.523c.69 3.002.86 5.999.578 8.896l-13.434-3.87l-.011-.057l-.014-.004c-.045-.012-.084-.034-.127-.049a2.4 2.4 0 0 1-.79-.455q-.088-.076-.17-.16a2.35 2.35 0 0 1-.491-.824c-.027-.078-.044-.158-.063-.239a2.4 2.4 0 0 1-.03-.892c.009-.049.01-.096.02-.145c.01-.045.038-.084.05-.129a2.3 2.3 0 0 1 .599-.996c.034-.033.054-.076.09-.107l.01-.01l-.006-.03zm9.228 3.305q.497 1.448.864 2.938a35 35 0 0 0-.864-2.938m-34.824 6.752h4.262l2.65 3.314l-.95 4.133l-3.83 1.84l-3.837-1.848l-.953-4.132zm13.727 11.395c.18-.01.357.008.533.04l.014.003l.023-.03l13.828 2.338c-.064.18-.147.351-.215.53a28 28 0 0 1-1.36 3.011q-.284.544-.593 1.074a28 28 0 0 1-1.853 2.768q-.364.48-.748.941a28 28 0 0 1-2.29 2.432q-.436.41-.892.8a28 28 0 0 1-2.64 2.012c-.16.107-.31.225-.471.329l-5.365-12.967l.015-.022l-.004-.011c-.02-.045-.026-.092-.043-.137a2.4 2.4 0 0 1-.135-.889c.004-.081.006-.162.018-.242a2.35 2.35 0 0 1 .334-.89c.045-.072.098-.137.15-.204a2.4 2.4 0 0 1 .68-.578c.043-.024.079-.055.123-.076c.289-.139.59-.218.89-.232zm-23.31.056l.013.002c.03 0 .06.008.092.01a2.35 2.35 0 0 1 1.226.445q.103.074.196.158a2.35 2.35 0 0 1 .689 1.106c.008.03.022.059.03.09c.11.479.065.98-.13 1.431l-.005.012l.04.05l-5.31 12.837c-.155-.1-.3-.212-.451-.315a28 28 0 0 1-2.64-2.011a28 28 0 0 1-.891-.803a28 28 0 0 1-2.272-2.408q-.39-.468-.76-.951a28 28 0 0 1-1.82-2.704a27 27 0 0 1-.627-1.123a28 28 0 0 1-1.346-2.947c-.07-.181-.154-.356-.22-.539l13.707-2.326l.023.03l.014-.005q.22-.04.443-.039zm2.304 1.994a2 2 0 0 1 .02.344a2 2 0 0 0-.02-.344m-.008.703a2.3 2.3 0 0 1-.1.4q.067-.195.1-.4m9.334 2.944c.058-.002.114.013.172.015a2.3 2.3 0 0 1 .752.159c.054.021.112.03.164.056v.002a2.3 2.3 0 0 1 1.043.99l.006.012h.053l6.757 12.213c-.276.092-.557.173-.836.256a28 28 0 0 1-.996.277c-.283.074-.564.15-.85.215c-.124.029-.25.046-.376.072a27.5 27.5 0 0 1-4.18.561c-.28.016-.558.035-.838.043a27.5 27.5 0 0 1-4.32-.223c-.28-.036-.56-.085-.838-.13a27.5 27.5 0 0 1-4.055-.975c-.127-.041-.257-.072-.384-.115l6.742-12.188h.01l.007-.012c.026-.048.065-.085.094-.13a2.4 2.4 0 0 1 .606-.647q.123-.09.26-.164a2.4 2.4 0 0 1 .85-.262c.054-.005.103-.023.157-.025M52.297 98.69a34 34 0 0 0 3.758 1.137a34 34 0 0 1-3.758-1.137m23.385.09q-1.605.572-3.258.983a35 35 0 0 0 3.258-.983m-4.575 1.281a34 34 0 0 1-3.718.563a34 34 0 0 0 3.718-.563m-13.937.016a34 34 0 0 0 3.898.572a34 34 0 0 1-3.898-.572m8.91.649a34 34 0 0 1-3.851.005a34 34 0 0 0 3.85-.005z"
          }
        )
      ]
    }
  );
};
const iconComponents = {
  Php: (color, size = 65) => /* @__PURE__ */ jsx(PHP, { size, className: color }),
  Java: (color, size = 65) => /* @__PURE__ */ jsx(Java, { size, className: color }),
  Python: (color, size = 65) => /* @__PURE__ */ jsx(Python, { size, className: color }),
  Javascript: (color, size = 65) => /* @__PURE__ */ jsx(Javascript, { size, className: color }),
  Qa: (color, size = 65) => /* @__PURE__ */ jsx(Qa, { size, className: color }),
  Kubernetes: (color, size = 65) => /* @__PURE__ */ jsx(Kubernetes, { size, className: color })
};
function Home({ professions }) {
  return /* @__PURE__ */ jsxs(RootLayout, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: "Главная" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: "Сервис с вопросами и ответами для подготовки к техническим интервью в IT."
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Главная" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: "Сервис с вопросами и ответами для подготовки к техническим интервью в IT."
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Content$2, { professions }) }) })
  ] });
}
const Content$2 = ({ professions }) => {
  return /* @__PURE__ */ jsxs("article", { className: "prose-m-none", children: [
    /* @__PURE__ */ jsx("h1", { className: "scroll-m-20 text-4xl font-extrabold lg:text-5xl", children: /* @__PURE__ */ jsxs(Balancer, { children: [
      "Подготовка к собеседованию",
      /* @__PURE__ */ jsx(
        WordRotate,
        {
          words: [
            /* @__PURE__ */ jsx("span", { className: "text-indigo-500 dark:text-indigo-400", children: "PHP" }),
            /* @__PURE__ */ jsx("span", { className: "text-yellow-400 dark:text-yellow-500", children: "Frontend" }),
            /* @__PURE__ */ jsx("span", { className: "text-red-500 dark:text-red-600", children: "Java" }),
            /* @__PURE__ */ jsx("span", { className: "text-yellow-400 dark:text-yellow-500", children: "Python" }),
            /* @__PURE__ */ jsx("span", { className: "text-blue-500 dark:text-blue-600", children: "DevOps" })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("p", { className: "mt-6 text-lg text-default-500", children: "Сервис с вопросами и ответами для подготовки к техническим интервью в IT." }),
    /* @__PURE__ */ jsx("div", { className: "not-prose mt-6 grid gap-4 md:grid-cols-3", children: professions.map((profession) => /* @__PURE__ */ jsx(
      Card,
      {
        isPressable: true,
        onMouseMove: () => {
          router.prefetch(
            `/profession/${profession.id}/questions`,
            { method: "get" },
            { cacheFor: "30s" }
          );
        },
        onPress: () => router.visit(
          `/profession/${profession.id}/questions`
        ),
        className: "w-full",
        children: /* @__PURE__ */ jsxs(CardBody, { className: "flex justify-between flex-col px-5 pt-6 gap-4", children: [
          iconComponents[profession.icon] ? iconComponents[profession.icon](
            profession.icon_color
          ) : /* @__PURE__ */ jsx(Code, { size: 65 }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("b", { children: profession.profession }),
            /* @__PURE__ */ jsx(Divider, { className: "my-4" }),
            /* @__PURE__ */ jsxs("span", { className: "flex justify-between text-sm text-muted-foreground", children: [
              /* @__PURE__ */ jsx("p", { children: "Вопросов" }),
              /* @__PURE__ */ jsxs("b", { className: "text-default-500", children: [
                " ",
                profession.count
              ] })
            ] })
          ] })
        ] })
      },
      profession.id
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-12 mt-12", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold lg:text-4xl", children: "Подготовьтесь к собеседованию с JobTalks" }),
        /* @__PURE__ */ jsx(Balancer, { className: "mt-3 text-muted-foreground text-default-500", children: "JobTalks — это онлайн-платформа для подготовки к собеседованиям в IT, где вы найдете вопросы для собеседования разных уровней сложности и ответы на вопросы собеседования. Мы предоставляем не только текстовые ответы, но и видеоуроки с тайм-кодами, что позволяет вам готовиться к интервью на практике и без лишних усилий." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6 lg:space-y-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex", children: [
          /* @__PURE__ */ jsx(HomeIcon, { className: "flex-shrink-0 mt-2 h-6 w-6" }),
          /* @__PURE__ */ jsxs("div", { className: "ms-5 sm:ms-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-semibold", children: "Удобство и доступность" }),
            /* @__PURE__ */ jsx(Balancer, { className: "mt-1 text-muted-foreground text-default-500", children: "Мы сделали процесс подготовки максимально простым и доступным. Все вопросы собеседования и ответы собраны в одном месте, чтобы вы могли сосредоточиться на важном: подготовке к собеседованию. Интуитивно понятный интерфейс и доступность материалов в любое время помогают вам эффективно готовиться без лишних сложностей." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex", children: [
          /* @__PURE__ */ jsx(ListIcon, { className: "flex-shrink-0 mt-2 h-6 w-6" }),
          /* @__PURE__ */ jsxs("div", { className: "ms-5 sm:ms-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-semibold", children: "Разнообразие вопросов по профессиям и уровням сложности" }),
            /* @__PURE__ */ jsx(Balancer, { className: "mt-1 text-muted-foreground text-default-500", children: "На платформе JobTalks есть как базовые вопросы собеседования, так и более сложные, чтобы подготовиться к интервью на разных уровнях. Мы предлагаем вопросы для собеседования для новичков, а также сложные вопросы для собеседования для более опытных специалистов, что позволяет эффективно готовиться к собеседованиям на любую позицию в IT." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex", children: [
          /* @__PURE__ */ jsx(UsersIcon, { className: "flex-shrink-0 mt-2 h-6 w-6" }),
          /* @__PURE__ */ jsxs("div", { className: "ms-5 sm:ms-8", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-base sm:text-lg font-semibold", children: "Развитие навыков и профессионального сообщества" }),
            /* @__PURE__ */ jsx(Balancer, { className: "mt-1 text-muted-foreground text-default-500", children: "JobTalks — это не только инструмент для подготовки к собеседованию, но и пространство для развития вашего профессионального уровня. Мы предоставляем актуальные материалы для подготовки к собеседованию, а также создаем сообщество профессионалов, где каждый может улучшить свои навыки и поделиться опытом." })
          ] })
        ] })
      ] })
    ] })
  ] });
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Home
}, Symbol.toStringTag, { value: "Module" }));
function QuestionDetails({
  question,
  timestamps
}) {
  return /* @__PURE__ */ jsxs(RootLayout, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: question.question }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: `Ответ с видео примерами на вопрос - ${question.question}`
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: question.question }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: `Ответ с видео примерами на вопрос - ${question.question}`
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Content$1, { question, timestamps }) }) })
  ] });
}
const Content$1 = ({
  question,
  timestamps
}) => {
  return /* @__PURE__ */ jsxs("article", { className: "prose-m-none space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "sm",
            onClick: () => history.back(),
            isIconOnly: true,
            color: "default",
            variant: "light",
            "aria-label": "Назад",
            children: /* @__PURE__ */ jsx(ArrowLeft, { size: 16 })
          }
        ),
        /* @__PURE__ */ jsx(Chip, { color: "default", variant: "flat", children: question.profession })
      ] }),
      /* @__PURE__ */ jsx("h3", { className: "scroll-m-20 text-xl font-extrabold lg:text-3xl", children: question.question }),
      /* @__PURE__ */ jsx("p", { className: "text-answer" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-default-500", children: "Общий ответ на вопрос и видео примеры" })
    ] }),
    /* @__PURE__ */ jsx(Divider, { className: "my-4" }),
    question.answers && question.answers.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: question.answers.map((answer) => /* @__PURE__ */ jsx(
      Markdown,
      {
        className: "text-answer",
        remarkPlugins: [remarkGfm],
        components: {
          code(props) {
            const {
              children,
              className,
              node,
              ...rest
            } = props;
            const match = /language-(\w+)/.exec(
              className || ""
            );
            return match ? /* @__PURE__ */ jsx(
              PrismLight,
              {
                className: "!rounded-xl !shadow-small",
                ...rest,
                PreTag: "div",
                children: String(children).replace(
                  /\n$/,
                  ""
                ),
                language: match[1],
                style: oneDark,
                ref: null
              }
            ) : /* @__PURE__ */ jsx("code", { ...rest, className, children });
          }
        },
        children: answer.answer
      },
      answer.id
    )) }) : /* @__PURE__ */ jsx("p", { className: "text-default-500", children: "Общего ответа не найдено" }),
    /* @__PURE__ */ jsx(Divider, { className: "my-4" }),
    /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold lg:text-2xl", children: "Видео с вопросами" }),
    /* @__PURE__ */ jsx(
      Deferred,
      {
        data: "timestamps",
        fallback: /* @__PURE__ */ jsx("div", { className: "not-prose grid md:grid-cols-2 gap-4", children: Array.from({ length: 5 }).map((_, index) => /* @__PURE__ */ jsxs(Card, { className: "h-[188px]", shadow: "sm", children: [
          /* @__PURE__ */ jsx(CardBody, { className: "overflow-visible p-2", children: /* @__PURE__ */ jsx("div", { className: "bg-content2 w-full h-32 rounded-large flex justify-center items-center", children: /* @__PURE__ */ jsx(Spinner, { color: "default", size: "lg" }) }) }),
          /* @__PURE__ */ jsxs(CardFooter, { className: "justify-between", children: [
            /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-3/5 rounded-lg" }),
            /* @__PURE__ */ jsx(Skeleton, { className: "h-4 w-16 rounded-lg" })
          ] })
        ] }, index)) }),
        children: /* @__PURE__ */ jsx(Fragment, { children: timestamps && timestamps.length > 0 ? /* @__PURE__ */ jsx("div", { className: "not-prose grid md:grid-cols-2 gap-4", children: timestamps.map((timestamp) => /* @__PURE__ */ jsxs(
          Card,
          {
            shadow: "sm",
            isPressable: true,
            onPress: () => window.open(
              timestamp.url + "&t=" + timestamp.start_time_seconds,
              "_blank"
            ),
            children: [
              /* @__PURE__ */ jsx(CardBody, { className: "overflow-visible p-2", children: /* @__PURE__ */ jsx("div", { className: "bg-content2 w-full h-32 rounded-large flex justify-center items-center", children: /* @__PURE__ */ jsx(Video, { size: 64 }) }) }),
              /* @__PURE__ */ jsxs(CardFooter, { className: "text-small gap-4 justify-between", children: [
                /* @__PURE__ */ jsx("b", { className: "truncate", children: timestamp.video_name }),
                /* @__PURE__ */ jsx("p", { className: "text-default-500", children: timestamp.start_time })
              ] })
            ]
          },
          timestamp.id
        )) }) : /* @__PURE__ */ jsx("div", { children: "Таймкоды не найдены" }) })
      }
    )
  ] });
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: QuestionDetails
}, Symbol.toStringTag, { value: "Module" }));
const SearchFilter = ({
  searchQuery,
  handleSearchChange,
  selectedKeys,
  setSelectedKeys,
  tags,
  handleTagChange,
  handleClearTag
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex w-full items-center space-x-4", children: [
    /* @__PURE__ */ jsx("search", { className: "w-full", role: "search", children: /* @__PURE__ */ jsx(
      Input,
      {
        size: "lg",
        defaultValue: searchQuery,
        onChange: handleSearchChange,
        variant: "bordered",
        labelPlacement: "outside",
        placeholder: "Введите фразу для поиска",
        startContent: /* @__PURE__ */ jsx(
          Search,
          {
            size: 16,
            strokeWidth: 2,
            "aria-hidden": "true",
            className: "text-default-400 pointer-events-none flex-shrink-0"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsxs(Dropdown, { children: [
      /* @__PURE__ */ jsx(DropdownTrigger, { children: /* @__PURE__ */ jsx(Button, { size: "lg", variant: "bordered", className: "capitalize", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          ListFilter,
          {
            size: 16,
            strokeWidth: 2,
            "aria-hidden": "true",
            className: "text-default-400"
          }
        ),
        "Фильтр"
      ] }) }) }),
      /* @__PURE__ */ jsxs(
        DropdownMenu,
        {
          "aria-label": "Single selection example",
          variant: "flat",
          disallowEmptySelection: true,
          selectionMode: "single",
          selectedKeys,
          onSelectionChange: (key) => {
            setSelectedKeys(key);
            const selectedTagId = Array.from(key)[0].toString();
            if (selectedTagId) {
              handleTagChange(selectedTagId);
            }
          },
          children: [
            /* @__PURE__ */ jsx(
              DropdownSection,
              {
                className: "max-h-96 overflow-y-auto",
                title: "Тема вопроса",
                children: tags && typeof tags === "object" ? Object.values(tags).length > 0 ? Object.values(tags).map((tag) => /* @__PURE__ */ jsx(DropdownItem, { children: tag.tag }, tag.id)) : /* @__PURE__ */ jsx(
                  DropdownItem,
                  {
                    textValue: "Нет доступных тегов",
                    hideSelectedIcon: true,
                    children: /* @__PURE__ */ jsx("span", { children: "Нет доступных тегов" })
                  }
                ) : /* @__PURE__ */ jsx(
                  DropdownItem,
                  {
                    textValue: "Нет доступных тегов",
                    hideSelectedIcon: true,
                    children: /* @__PURE__ */ jsx("span", { children: "Нет доступных тегов" })
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx(
              DropdownItem,
              {
                hideSelectedIcon: true,
                className: "flex items-center text-danger",
                color: "danger",
                onClick: handleClearTag,
                textValue: "Сбросить фильтр",
                children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx(X, { size: 16, strokeWidth: 2, "aria-hidden": "true" }),
                  "Сбросить фильтр"
                ] })
              }
            )
          ]
        }
      )
    ] })
  ] });
};
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SearchFilter
}, Symbol.toStringTag, { value: "Module" }));
const highlightEnglishWords = (text) => {
  const regex = /(?:\s|^|[.,?])(([a-zA-Z.()@#$%^&*_\[\]{}+\-='0-9/]|[А-Я]{2,}|[a-zA-Z\s])+(?:\s+\d+)?|[a-zA-Z]+-[а-яА-Я]+)(?=\s|[.,?:]|$)/g;
  return text.replace(regex, (match, p1) => {
    return match.replace(
      p1,
      `<span class="whitespace-nowrap bg-default-200 px-1.5 rounded">${p1}</span>`
    );
  });
};
const QuestionText = ({ text }) => {
  return /* @__PURE__ */ jsx(
    "h5",
    {
      className: "text-sm",
      dangerouslySetInnerHTML: { __html: highlightEnglishWords(text) }
    }
  );
};
const QuestionCard = ({
  question,
  selectedTagId,
  handleTagBadgeClick,
  handleLinkClick
}) => {
  const [userReaction, setUserReaction] = useState(question.user_reaction);
  const handleReaction = async (reaction) => {
    try {
      const response = await axios.post(
        `/question/${question.id}/reaction`,
        {
          reaction
        }
      );
      if (response.data.result === true) {
        setUserReaction(reaction);
      }
    } catch (error) {
      console.error("Error updating reaction:", error);
    }
  };
  return /* @__PURE__ */ jsx(Card, { children: /* @__PURE__ */ jsxs(CardBody, { className: "flex justify-between flex-col px-5 pt-6 gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: () => handleReaction("like"),
            className: "rounded-full",
            variant: userReaction === "like" ? "flat" : "bordered",
            disabled: userReaction === "like",
            isIconOnly: true,
            children: /* @__PURE__ */ jsx(
              ThumbsUp,
              {
                size: 16,
                strokeWidth: 2,
                "aria-hidden": "true"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: () => handleReaction("dislike"),
            className: "rounded-full",
            variant: userReaction === "dislike" ? "flat" : "bordered",
            disabled: userReaction === "dislike",
            isIconOnly: true,
            children: /* @__PURE__ */ jsx(
              ThumbsDown,
              {
                size: 16,
                strokeWidth: 2,
                "aria-hidden": "true"
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(Chip, { variant: "flat", children: [
        /* @__PURE__ */ jsx("span", { className: "text-muted-foreground mr-1", children: "Вероятность:" }),
        /* @__PURE__ */ jsxs("span", { children: [
          question.percentage,
          "%"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Balancer, { ratio: 0.4, children: /* @__PURE__ */ jsx(QuestionText, { text: question.question }) }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-3", children: question.tags && question.tags.map((tag) => /* @__PURE__ */ jsx(
      Chip,
      {
        startContent: selectedTagId === tag.id ? /* @__PURE__ */ jsx(
          CheckCircle,
          {
            size: 16,
            strokeWidth: 2,
            "aria-hidden": "true"
          }
        ) : null,
        className: cn(tag.color, "cursor-pointer"),
        onClick: () => handleTagBadgeClick(tag.id),
        color: "default",
        children: tag.tag
      },
      tag.id
    )) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          onClick: () => {
            handleLinkClick();
            question.views++;
          },
          as: Link$1,
          href: `/question/${question.id}`,
          className: "group px-0",
          color: "foreground",
          showAnchorIcon: true,
          anchorIcon: /* @__PURE__ */ jsx(
            ArrowRight,
            {
              size: 16,
              className: "ml-1 transition-transform group-hover:translate-x-1"
            }
          ),
          children: "Подробнее"
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex gap-3 items-center text-default-500 text-xs", children: [
        question.ease ? /* @__PURE__ */ jsx(
          Tooltip,
          {
            placement: "bottom-end",
            showArrow: true,
            content: "Ответ GPT 4o-mini",
            children: /* @__PURE__ */ jsx(BotMessageSquare, { size: 16 })
          }
        ) : null,
        /* @__PURE__ */ jsxs("div", { className: "flex gap-1", children: [
          /* @__PURE__ */ jsx(Eye, { size: 16 }),
          /* @__PURE__ */ jsx("span", { children: question.views })
        ] })
      ] })
    ] })
  ] }) });
};
const QuestionCardSkeleton = () => {
  return /* @__PURE__ */ jsx("div", { className: "not-prose grid md:grid-cols-2 gap-4 ", children: Array.from({ length: 5 }).map((_, index) => /* @__PURE__ */ jsx(Card, { className: "h-[224px]", children: /* @__PURE__ */ jsxs(CardBody, { className: "flex justify-between flex-col px-5 pt-6 gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "flex rounded-full size-10 " }),
        /* @__PURE__ */ jsx(Skeleton, { className: "flex rounded-full size-10 " })
      ] }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-40 rounded-full" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-2.5", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-3.5 w-3/5 rounded-lg" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-3.5 w-2/5 rounded-lg" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
      /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-32 rounded-full" }),
      /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-24 rounded-full" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsx(
      Link,
      {
        isDisabled: true,
        className: "group px-0 opacity-50",
        color: "foreground",
        showAnchorIcon: true,
        anchorIcon: /* @__PURE__ */ jsx(
          ArrowRight,
          {
            size: 16,
            className: "ml-1 transition-transform group-hover:translate-x-1"
          }
        ),
        children: "Подробнее"
      }
    ) })
  ] }) }, index)) });
};
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  QuestionCard,
  QuestionCardSkeleton
}, Symbol.toStringTag, { value: "Module" }));
const restoreScrollPosition = (questions) => {
  const currentPath = window.location.pathname;
  if (questions !== void 0) {
    const savedScrollData = sessionStorage.getItem("scrollPos");
    if (savedScrollData) {
      const savedData = JSON.parse(savedScrollData);
      if (savedData.path === currentPath) {
        setTimeout(() => {
          window.scrollTo({
            top: savedData.scrollPos,
            behavior: "smooth"
          });
        }, 250);
        sessionStorage.removeItem("scrollPos");
      } else {
        sessionStorage.removeItem("scrollPos");
      }
    }
  }
};
const saveScrollPosition = () => {
  const currentPath = window.location.pathname;
  sessionStorage.setItem(
    "scrollPos",
    JSON.stringify({
      path: currentPath,
      // Путь страницы
      scrollPos: window.scrollY
      // Позиция скролла
    })
  );
};
function Questions({
  questions,
  profession,
  tags
}) {
  return /* @__PURE__ */ jsxs(RootLayout, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: profession.profession }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "description",
          content: `Вопросы для собеседования на профессию ${profession.profession}`
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "og:title", content: profession.profession }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "og:description",
          content: `Вопросы для собеседования на профессию ${profession.profession}`
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Section, { children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(
      Content,
      {
        questions,
        profession,
        tags
      }
    ) }) })
  ] });
}
const Content = ({ questions, profession, tags }) => {
  const [searchActive, setSearchActive] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    Number(new URL(window.location.href).searchParams.get("page")) || 1
  );
  const [lastPage, setLastPage] = useState(1);
  const [selectedTagId, setSelectedTagId] = useState(
    new URL(window.location.href).searchParams.get("filter[tags]") || null
  );
  const [selectedKeys, setSelectedKeys] = React.useState(
    /* @__PURE__ */ new Set([selectedTagId || "all"])
  );
  const [searchQuery, setSearchQuery] = useState(
    new URL(window.location.href).searchParams.get("filter[search]") || ""
  );
  const debouncedSearch = useDebouncedCallback((query) => {
    const newUrl = updateURL({ "filter[search]": query, page: null });
    router.visit(newUrl);
  }, 1e3);
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };
  const handleTagChange = (tagId) => {
    setSelectedTagId(tagId.toString());
    const newUrl = updateURL({ "filter[tags]": tagId, page: null });
    router.visit(newUrl);
  };
  const handleTagBadgeClick = (tagId) => {
    let newUrl = "";
    if (selectedTagId == tagId) {
      setSelectedTagId(null);
      newUrl = updateURL({ "filter[tags]": null, page: null });
    } else {
      setSelectedTagId(tagId);
      newUrl = updateURL({ "filter[tags]": tagId, page: null });
    }
    router.visit(newUrl, {});
  };
  useEffect(() => {
    if (questions && questions.lastPage) {
      setLastPage(questions.lastPage);
    }
    const searchParam = new URL(window.location.href).searchParams.get(
      "filter[search]"
    );
    if (searchParam && searchParam.length > 0) {
      setSearchActive(true);
    } else {
      setSearchActive(false);
    }
  }, [questions, searchQuery]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
    const newUrl = updateURL({ page });
    router.visit(newUrl);
  };
  const handleClearTag = () => {
    setSelectedTagId(null);
    const newUrl = updateURL({ "filter[tags]": null, page: null });
    router.visit(newUrl);
  };
  const updateURL = (params) => {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value.toString());
      } else {
        url.searchParams.delete(key);
      }
    });
    return url.toString();
  };
  useEffect(() => {
    restoreScrollPosition(questions);
  }, [questions]);
  const handleLinkClick = () => {
    saveScrollPosition();
  };
  return /* @__PURE__ */ jsxs("article", { className: "prose-m-none space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
      iconComponents[profession.icon] ? iconComponents[profession.icon](profession.icon_color, 100) : /* @__PURE__ */ jsx(Code, { size: 65 }),
      /* @__PURE__ */ jsx("h3", { className: "scroll-m-20 text-xl font-extrabold lg:text-4xl", children: /* @__PURE__ */ jsxs(Balancer, { children: [
        profession.profession,
        " - Вопросы"
      ] }) }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-default-500", children: "Список вопросов для вашей профессии" })
    ] }),
    /* @__PURE__ */ jsx(
      SearchFilter,
      {
        searchQuery,
        handleSearchChange,
        selectedKeys,
        setSelectedKeys,
        tags,
        handleTagChange,
        handleClearTag
      }
    ),
    questions && questions.items.length > 0 && searchQuery.length > 0 && searchActive ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxs("span", { className: "whitespace-nowrap text-sm text-default-500", children: [
      "Вопросов найдено: ",
      /* @__PURE__ */ jsx("b", { children: questions.total })
    ] }) }) : "",
    /* @__PURE__ */ jsx(Deferred, { data: "questions", fallback: /* @__PURE__ */ jsx(QuestionCardSkeleton, {}), children: /* @__PURE__ */ jsxs(Fragment, { children: [
      questions && questions.items.length > 0 ? /* @__PURE__ */ jsx("div", { className: "not-prose grid gap-4 md:grid-cols-2", children: questions.items.map((question) => /* @__PURE__ */ jsx(
        QuestionCard,
        {
          question,
          selectedTagId,
          handleTagBadgeClick,
          handleLinkClick
        },
        question.id
      )) }) : /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsx("span", { className: "whitespace-nowrap text-sm text-default-500", children: "Вопросы не найдены" }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
        Pagination,
        {
          size: "lg",
          showControls: true,
          total: lastPage,
          initialPage: currentPage,
          onChange: handlePageChange,
          variant: "light"
        }
      ) })
    ] }) })
  ] });
};
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Questions
}, Symbol.toStringTag, { value: "Module" }));
const appName = "JobTalks";
createServer(
  (page) => createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    resolve: (name) => {
      const pages = /* @__PURE__ */ Object.assign({ "./pages/home.tsx": __vite_glob_0_0, "./pages/question-details.tsx": __vite_glob_0_1, "./pages/questions.tsx": __vite_glob_0_2, "./pages/questions/question-card.tsx": __vite_glob_0_3, "./pages/questions/search-filter.tsx": __vite_glob_0_4 });
      return pages[`./pages/${name}.tsx`];
    },
    setup: ({ App, props }) => /* @__PURE__ */ jsx(App, { ...props }),
    title: (title) => `${title} - ${appName}`
  })
);
