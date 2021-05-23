import React,{useState} from 'react';
import {
    createMuiTheme, MuiThemeProvider
  } from '@material-ui/core/styles';
import Roadster from './Roadster';
import applicationTheme from '../../styles/theme/applicationTheme';
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

export default {
  title: 'Example/Roadster',
  component: Roadster,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};



const Template = (args) => {
    const [theme, setTheme] = useState(createMuiTheme(applicationTheme('blueTheme', 'light', 'ltr')));
    return <MuiThemeProvider theme={theme}><QueryClientProvider client={queryClient}><Roadster {...args} /> </QueryClientProvider>     </MuiThemeProvider>
}



export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Roadster',
};
