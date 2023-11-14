import OneSignal from 'react-onesignal';

export default async function runOneSignal() {
  OneSignal.init({
    appId: '78dfecb4-3f6a-4709-9cb1-f459a3023bf2',
    allowLocalhostAsSecureOrigin: true,
    notifyButton: {
      enable: true
    },
    welcomeNotification: {
      title: 'One Signal',
      message: 'Thanks for subscribing!'
    }
  });
  OneSignal.Slidedown.promptPush();
}

// appId: '78dfecb4-3f6a-4709-9cb1-f459a3023bf2',

// appId: '3c39d600-d49d-4fd1-9c2d-8b09a7947db0',
