import { playfair, nunito } from './fonts';
import './globals.css';

export const metadata = {
  title: 'Serene Gallery - Next.js Image Showcase',
  description: 'A beautiful image gallery built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${nunito.variable} font-sans antialiased bg-neutral-50`}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}