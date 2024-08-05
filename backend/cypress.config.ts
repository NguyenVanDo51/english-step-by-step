import { defineConfig } from 'cypress'

export default defineConfig({
  projectId: 'c7yets',
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false,
    setupNodeEvents (on, config) {
      config.env = config.env || {}
      config.env.FOO = process.env.FOO
      config.env.BAR = process.env.BAR
      config.env.username = process.env.USER_NAME
      config.env.BASE_URL = process.env.BASE_URL ?? "http://localhost:3000"

      return config
    },
  },
  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
})