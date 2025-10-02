import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { WebView } from 'react-native-webview';

const Featherpeacockloader = () => {
  const featherpeacockloaderhtml = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
          body {
            margin: 0;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background: transparent;
          }
          svg { display: block; max-width: 100%; height: auto; }
        </style>
      </head>
      <body>
        <svg xmlns="http://www.w3.org/2000/svg" width="300" viewBox="0 0 300 150">
          <defs>
            <g id="feather">
              <path d="M150,150 l-30,-100 a30,30 0 0,1 60,0 Z" fill="#018EB0" style="fill-opacity: 0.85;"/>
            </g>
            <g id="crown">
              <path d="M150,75 l-1.25,-6 a1.25,1.25 0 0,1 2.5,0 Z" fill="#fff"/>
            </g>
          </defs>

          <use href="#feather"/>
          <use href="#feather">
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite"
              values="23,150,150; 20,150,150; 23,150,150" dur="2s"/>
          </use>
          <use href="#feather">
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite"
              values="46,150,150; 40,150,150; 46,150,150" dur="2s"/>
          </use>
          <use href="#feather">
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite"
              values="69,150,150; 60,150,150; 69,150,150" dur="2s"/>
          </use>
          <use href="#feather">
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite"
              values="-23,150,150; -20,150,150; -23,150,150" dur="2s"/>
          </use>
          <use href="#feather">
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite"
              values="-46,150,150; -40,150,150; -46,150,150" dur="2s"/>
          </use>
          <use href="#feather">
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite"
              values="-69,150,150; -60,150,150; -69,150,150" dur="2s"/>
          </use>

          <g>
            <use href="#crown"/>
            <use href="#crown" transform="translate(1,0) rotate(30,150,75)"/>
            <use href="#crown" transform="translate(-1,0) rotate(-30,150,75)"/>
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite"
              values="-45,150,75; -60,150,75; -45,150,75" dur="2s"/>
          </g>

          <g>
            <path d="M105,145 c60,-10 10,-95 40,-80 l5,0 c-30,5 45,40 0,110 M139,66 a1,1 0 1,0 2,0 a1,1 0 1,0 -2,0"
              fill="#fff" fill-rule="evenodd" transform="translate(0,5) rotate(10,105,145)" />
          </g>
        </svg>
      </body>
    </html>
  `;

  return (
    <LinearGradient colors={['#ECA12A', '#C69414']} style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        source={{ html: featherpeacockloaderhtml }}
        style={{ backgroundColor: 'transparent' }}
        scrollEnabled={false}
      />
    </LinearGradient>
  );
};

export default Featherpeacockloader;
