import { useColorScheme as useNativewindColorScheme } from 'nativewind'

export function useColorScheme() {
  // const { colorScheme, setColorScheme, toggleColorScheme } = useNativewindColorScheme();
  const { setColorScheme, toggleColorScheme } = useNativewindColorScheme()
  const colorScheme: 'light' | 'dark' | undefined = 'light'
  return {
    colorScheme: colorScheme ?? 'dark',
    // isDarkColorScheme: colorScheme === 'dark',
    isDarkColorScheme: false,
    setColorScheme,
    toggleColorScheme,
  }
}
