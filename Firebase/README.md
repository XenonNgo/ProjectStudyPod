# Setting Up Firebase Authentication, Realtime Database & Hosting
## Step 1: Create a Firebase Project

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseTitle.jpeg" width="375">

Go to Firebase Console and create a new project

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseName.png" width="375">

Give your project a name <br>
In this example, we will be naming our project as "Firebase Setup"

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseAnalytics.png" width="375">

Enable Google Analytics for the project

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseAnalytics2.png" width="375">

Choose Default Account for Firebase and create the project

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Firebase.png" width="375">

Navigate to build under product categories on the left <br>
We will be using Authentication, Realtime Database & Hosting for this project

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

## Step 2: Setup Authentication

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseAuth.png" width="750">

Get started with Authentication

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseAuth2.png" width="750">

Many methods of authentication are available <br>
You may enable other providers for your application if you wish to implement them <br>
For this project, we will be using Email/Password for authentication

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseAuth3.png" width="750">

Enable the Email/Password sign-in provider

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

## Step 3: Setup Realtime Database

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseRTDB.png" width="750">

Create database with Realtime Database

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseRTDB2.png" width="750">

Select a Realtime Database location <br>
In this example, we will be using United States (us-central1) for the database location

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseRTDB3.png" width="750">

Select "Start in test mode" for security rules

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseRTDB4.png" width="750">

Navigate to rules in Realtime Database <br>
Replace the rules with the code below

```
{
  "rules": {
    "connections": {
      "value1": {
    	".read": "auth.uid != null",
    	".write": "auth.uid != null",
        ".validate": "newData.val() <= 1 && newData.val() >= 0"
      },
      "$others": {
    	".read": "auth.uid != null",
    	".write": "auth.uid != null" 
      }
    },
    "door": {
      "int": {
    	".read": "auth.uid != null",
    	".write": "auth.uid != null",
        ".validate": "newData.val() <= 1 && newData.val() >= 0"
      },
      "value1": {
        ".read": false,
        ".write": "auth.uid != null"
      }
    },
    "users": {
      "$uid": {
        "value2": {
          ".read": "$uid === auth.uid",
	  ".write": "$uid === auth.uid",
          ".validate": "newData.val() <= 3 && newData.val() >= 1"
        },
        "$others": {
          ".read": false,
          ".write": "$uid === auth.uid"
        }, 
      }
    }
  }
}
```

WARNING!
> The security rules provided above are the minimum requirements for the system to function, and includes baseline security measures. <br>
> The rules used by Study Pod will not be shown to protect our database. <br>
> It is advisable to configure secure Realtime Database rules for increased data protection before deploying to production. <br>
> Some examples include preventing unverified users from performing read/write operations, and preventing modification/deletion of data.

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

## Step 4: Setup Web App

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseConfig.png" width="750">

Navigate to project overview to setup your web app

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseConfig2.png" width="750">

Give your web app a name <br>
We will set up Firebase Hosting later

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseConfig3.png" width="750">

Copy the firebaseConfig to your notepad

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseWebApp.png" width="750">

Clone the repository or download the ZIP file of [ProjectStudyPod](https://github.com/XenonNgo/ProjectStudyPod) <br>
Extract the files after the download completes

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseWebApp2.png" width="750">

Navigate to the Web App folder <br>
Open the config.js file with Visual Studio Code or equivalent <br>

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseWebApp3.png" width="750">

Replace the code shown above with the firebaseConfig that you copied to your notepad earlier

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

## Step 5: Setup Hosting

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseHosting2.png" width="750">

Create a new folder named public

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseHosting.png" width="750">

Copy all files in the Web App folder to the public folder

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseHosting3.png" width="750">

Open command prompt and run the code below

```
npm install -g firebase-tools
```

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseHosting4.png" width="750">

Change directory to the path shown above and run the codes below

```
firebase login
```

```
firebase init
```

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseHosting5.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseHosting8.png" width="750">

Follow the configurations shown above

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseHosting7.png" width="750">

Run the code below

```
firebase deploy
```

Your web app will be accessible at the hosting URL when deployed successfully
