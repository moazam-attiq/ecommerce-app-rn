import React, {createContext, useContext, useState} from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState('light');

  const themes = {
    light: {
      bg: 'white',
      text: 'black',
      inputBorder: 'grey',
      label: 'grey',
      buttonBg: 'black',
      buttonText: 'white',
    },
    dark: {
      bg: '#353635',
      text: '#c7c9c7',
      inputBorder: '#a1a1a1',
      label: '#b0b3b0',
      buttonBg: '#000',
      buttonText: '#fff',
    },
  };

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
    console.log('Theme Changed');
    
  };

  return (
    <ThemeContext.Provider value={{theme: themes[theme], toggleTheme, mode: theme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
