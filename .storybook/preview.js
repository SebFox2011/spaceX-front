// .storybook/preview.js

import { muiTheme } from 'storybook-addon-material-ui'
import theme1 from '../src/styles/theme/applicationTheme'
import styles from "../src/ui/widget-jss"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}