import type { ThemeConfig } from 'antd'

export const defaultTheme: ThemeConfig = {
  token: {
    fontSize: 14,
    colorPrimary: '#fb9a60',
  },
}

export const darkTheme: ThemeConfig = {
  ...defaultTheme,
  token: {
    ...defaultTheme.token,
    colorText: 'rgb(227,227,227)',
    colorBgBase: '#1b1b1d',
    colorBorder: '#979797',
    colorPrimary: '#475569',
    colorPrimaryBg: '#131415',
    colorPrimaryBgHover: '#1a1c20',
    colorPrimaryBorder: '#23282e',
    colorPrimaryBorderHover: '#2b313a',
    colorPrimaryHover: '#5b626b',
    colorPrimaryActive: '#353e4b',
    colorPrimaryTextHover: '#5b626b',
    colorPrimaryText: '#3f4b5c',
    colorPrimaryTextActive: '#353e4b',
  },
}

export const UITheme = {
  space: {
    normal: 16,
    large: 24,
  },
}
