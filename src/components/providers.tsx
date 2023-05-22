"use client";

import {ReactElement, ReactNode, useEffect, useState} from "react";
import {ThemeProvider} from "next-themes";

export const Providers = ({ children }: { children: ReactNode }): ReactElement => {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if(!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      {children}
    </ThemeProvider>
  )
}
