import { GlobalStyles } from "restyle";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <GlobalStyles>
        {{
          body: {
            margin: 0,
            padding: 0,
            fontFamily: "sans-serif",
            backgroundColor: "#181C14",
            color: "#ECDFCC",
          },
        }}
      </GlobalStyles>
      <body>{children}</body>
    </html>
  );
}
