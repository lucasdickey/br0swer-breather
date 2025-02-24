export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (localStorage.getItem('darkMode') === 'true' ||
                  (!localStorage.getItem('darkMode') &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
