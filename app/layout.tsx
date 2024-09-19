import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@styles/globals.css";
import Nav from "@components/Nav"
import Provider from "@components/Provider"

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PromptBasket",
  description: "Discover & Share AI Prompts",
};
/*
- root layout is the component that stores the html document that is being rendered

- within the body are the two main divs (nested)
- the wrapping div uses "main" style and the nested div uses the gradient style
both of which can be found in globals


*/

// THIS IS NOT THE ORIGINAL BOILERPLATE CODE:
// const RootLayout = () => {
//   return (
//     <html lang="en">
//       <body>
        
//         <div className="main">
//           <div className="gradient"/>
//         </div>

//         <main className="app">
//           {children}
//         </main>

//       </body>
//     </html>
//   );
// }

// root layout takes children prop since it acts as a global wrapper for all pages in the application
// therefore, each page or component is a child to the rootlayout component
// children is defined as React.ReactNode - defining the type of children since im using typescript
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // inter is a font styling class - see imports
  return (
    <html lang="en">
      <body>
        <Provider>
        <div className="main">
          <div className="gradient"/>
        </div>

        <main className="app">
          <Nav />
          {children}
        </main>
        </Provider>
      </body>
    </html>
  );
}
