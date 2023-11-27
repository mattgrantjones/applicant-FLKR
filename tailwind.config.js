/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin"
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },
    colors: {
      blue: {
        light: "#ecf2ff",
        medium: "#427CFF",
        dark: "#0051FF",
      },
      purple: {
        light: "#7D47E4",
        medium: "#6D47FF",
        dark: "#56379E",
      },
      pink: {
        light: "#fdd5dc",
        medium: "#fe5e7d",
        dark: "#B16CB0",
      },
      white: "#ffffff",
      midnight: "#272e42",
      black: "#111111",
      zinc: {
        light: "#F2F2F2",
        medium: "#E5E5E5",
        dark: "#a6a6a6",
      },
    },
    extend: {},
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          primary: (value) => ({
            backgroundColor: theme("colors.blue")[value],
            color:
              value === "light"
                ? theme("colors.midnight")
                : theme("colors.white"),
          }),
          secondary: (value) => ({
            backgroundColor: theme("colors.purple")[value],
            color: theme("colors.white"),
          }),
          "primary-inverted": (value) => ({
            backgroundColor: theme("colors.white"),
            color: theme("colors.blue")[value],
            border: `1px solid ${theme("colors.blue")[value]}`,
          }),
          "secondary-inverted": (value) => ({
            backgroundColor: theme("colors.white"),
            color: theme("colors.purple")[value],
            border: `1px solid ${theme("colors.purple")[value]}`,
          }),
        },
        {
          values: {
            light: "light",
            medium: "medium",
            dark: "dark",
            ...theme("spaces"),
          },
        }
      ),
        // Playing with some hover plugins
        matchUtilities(
          {
            hoverzoom: (value) => {
              const baseTransition = "all 0.2s ease-in-out"
              if (value === "sm") {
                return {
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                  transition: baseTransition,
                }
              }
              if (value === "md") {
                return {
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                  transition: baseTransition,
                }
              }
              if (value === "lg") {
                return {
                  "&:hover": {
                    transform: "scale(1.1)",
                  },
                  transition: baseTransition,
                }
              }
            },
          },
          {
            values: {
              sm: "sm",
              md: "md",
              lg: "lg",
            },
          }
        ),
        matchUtilities(
          {
            "flk-shadow": (value) => {
              if (value === "blue") {
                return {
                  boxShadow:
                    "2px 6px 12px 0 rgba(65,124,255,.33), 1px 2px 4px 0 rgba(65,124,255,.2)",
                }
              }
              if (value === "purple") {
                return {
                  boxShadow:
                    "2px 6px 12px 0 rgba(109,71,255,.2), 1px 2px 4px 0 rgba(109,71,255,.12)",
                }
              }
              if (value === "pink") {
                return {
                  boxShadow:
                    "2px 6px 12px 0 rgba(254,94,125,.2), 1px 2px 4px 0 rgba(254,94,125,.12)",
                }
              }
            },
          },
          {
            values: {
              blue: "blue",
              purple: "purple",
              pink: "pink",
            },
          }
        )
    }),
  ],
}
