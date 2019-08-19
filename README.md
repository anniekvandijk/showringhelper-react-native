# Showring helper

This is a React Native app build with Expo and conecting to Firebase. This app is part of project Showring helper which contains a management web app (https://showringhelper.web.app) and a website (https://showringhelper.com)

Owner of this project and owner of the the Expo-cli, Store accounts and Firebase project is Anniek van Dijk (anniek@animundo.nl) 

## Expo
Run with Expo local:  
expo start

deploy to Expo:  
expo publish

make a build as bundle:  
expo build:android -t app-bundle  
expo build:ios -t app-bundle  
builds are signed by Expo. Signing key in file showring-helper.jks which is gitIgnored. 

Expo website: https://expo.io/@anniekvandijk/showring-helper  
Builds for Stores can also be found there

## Firebase
The app is connecting to firebase FireStore project Showring helper. 
Firebase config is in the .env file (also gitIgnored)







