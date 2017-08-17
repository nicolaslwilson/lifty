# Lifty

Lifty is a simple Ionic2 app for logging workouts. 

### Preview

_Home Screen_

![home](/screenshots/home.png)

_Workout Entry_

![workout entry](/screenshots/entry.png)

_Workout History_

![workout history](/screenshots/history.png)

## Getting Started

To run the app in your browser you'll need to install Ionic and Cordova.

1. Run `$ sudo npm install -g ionic cordova`
2. Run `npm install` in project directory you've cloned to your local machine
3. You'll need to setup a project on Firebase and create the file `src/app/config.ts`
4. Add the following information to `config.ts`:

```
export class Config {
  public static FIREBASE_CONFIG = {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: ''
  };
  public static WEB_CLIENT_ID = '';
}
```

5. Run `ionic serve` to start the app in your browser.

