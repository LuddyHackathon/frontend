import React from 'react';
import { AppRegistry, Platform, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme, adaptNavigationTheme, PaperProvider } from 'react-native-paper';
import merge from 'deepmerge';

import { name as appName } from './app.json';
import App from './src/App';

import iconFont from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';

import { PreferencesContext } from './src/PreferencesContext';
import { AccessTokenProvider } from './src/AccessTokenProvider';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

AppRegistry.registerComponent('main', () => App);

function Main() {
  const [isThemeDark, setIsThemeDark] = React.useState(true);

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;
  let statusBarStyle = isThemeDark ? 'light-content' : 'dark-content';

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      isThemeDark,
    }),
    [toggleTheme, isThemeDark]
  );

  return (
    <PreferencesContext.Provider value={preferences}>
      <AccessTokenProvider>
        <PaperProvider theme={theme}>
          <StatusBar
            backgroundColor={theme.colors.background}
            barStyle={statusBarStyle}
            hidden={false}
          />
          <NavigationContainer theme={theme}>
            <App theme />
          </NavigationContainer>
        </PaperProvider>
      </AccessTokenProvider>
    </PreferencesContext.Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);

if (Platform.OS === 'web') {
  if (module.hot) {
    module.hot.accept();
  }
  // Generate CSS for icons
  const iconFontStyles = `@font-face {
    src: url(${iconFont});
    font-family: MaterialCommunityIcons;
  }`;

  const style = document.createElement('style');
  style.type = 'text/css';

  // Append the iconFontStyles to the stylesheet
  if (style.styleSheet) {
    style.styleSheet.cssText = iconFontStyles;
  } else {
    style.appendChild(document.createTextNode(iconFontStyles));
  }

  document.head.appendChild(style);
  AppRegistry.runApplication(appName, {
    rootTag: document.getElementById('root')
  })
};
