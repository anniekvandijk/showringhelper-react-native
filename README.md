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

expo build:android -t apk

builds are signed by Expo. Signing key in file showring-helper.jks which is gitIgnored. 

Expo website: https://expo.io/@anniekvandijk/showring-helper  
Builds for Stores can also be found there

## Firebase
The app is connecting to firebase FireStore project Showring helper. 
Firebase config is in the .env file (also gitIgnored)

## Deploying Android app
Download build
Go to Google play console to upload app

## Deploying IOS app
first create certificate for push notifications
1. Login to https://developer.apple.com/
2. Go to the “Certificates, Identifiers and Profiles” section
3. Select “App IDs” in the Identifiers section on the left column
4. Choose your app ID, edit it and check “Push Notifications”. Save changes
5. Generate a certificate for the production push service: go to the “Certificates” section, and follow the assistant to add a “Apple Push Notification service SSL (Sandbox & Production)” certificate for your app
6. Download certificate to mac
7. Double click to add certificate to keychain
8. Go to Keychain Access > Certificate Assistant > Request a Certificate from a Certificate Authority.
9. In the Certificate Window opened, enter your Email Address (apple email), Common Name, and leave the CA Email Address field empty. Choose a name to identify it as provision certificate signing request. For example provision_my_store.CertificateSigningRequest.
10. Upload to your Identifiers for your App Id in section Push notifications

Download build
On a mac, use the application loader to upload app to App Store Connect
Go to App Store Connect for deployment







