import './globals.css';
import OidcProvider from './providers/OidcProvider';

export const metadata = {
  title: 'Collaborative Code Editor',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <OidcProvider>
          {children}
        </OidcProvider>
      </body>
    </html>
  );
}
