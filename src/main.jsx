import React from 'react';
import { createRoot } from 'react-dom/client';
import { AppRegistry } from 'react-native';
import App from '../App';

AppRegistry.registerComponent('BrilhoNaturalApp', () => App);

const { element, getStyleElement } = AppRegistry.getApplication('BrilhoNaturalApp');
const rootTag = document.getElementById('root');

createRoot(rootTag).render(
  <>
    {getStyleElement()}
    {element}
  </>
);
