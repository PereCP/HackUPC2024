# How to run this App on macOS
With brew on your computer install these comands
```
brew install node
brew install watchman
```

## Install node dependencies
After installing node you should install node dependencies using
```
npm i
```
## XCode

Please use the **latest version** of Xcode.

The easiest way to install Xcode is via the Mac App Store. Installing Xcode will also install the iOS Simulator and all the necessary tools to build your iOS app.

#### Command Line Tools

You will also need to install the Xcode Command Line Tools. Open Xcode, then choose Settings... (or Preferences...) from the Xcode menu. Go to the Locations panel and install the tools by selecting the most recent version in the Command Line Tools dropdown.

## Installing an iOS Simulator in Xcode
To install a simulator, open Xcode > Settings... (or Preferences...) and select the Platforms (or Components) tab. Select a simulator with the corresponding version of iOS you wish to use.

If you are using Xcode version 14.0 or greater than to install a simulator, open Xcode > Settings > Platforms tab, then click "+" icon and select iOS… option.

## CocoaPods

You will need to install CocoaPods with this comand:
```
brew install cocoapods
```


## Run iOS dependencies

```
cd ios
bundle install
bundle exec pod install
```

## How to launch the app

Before launching the first comand, be shure to be at the root of the project (where *package.json* is installed).

#### Step 1: Start Metro
```
npm start
```

#### Step 2: Start your application
```
npm run ios
```