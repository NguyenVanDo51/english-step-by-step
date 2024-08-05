// In Next.js, this file would be called: app/providers.jsx
"use client"

// We can not useState or useRef in a server component, which is why we are
// extracting this part out into it's own file with 'use client' on top
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export const queryClient = new QueryClient()

export default function Providers({ children }: any) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
