# Firebase Authentication & Realtime Database
**Step 1: Create a Firebase Project**

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseTitle.jpeg" width="375">

Go to Firebase Console and create a new project.

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseName.png" width="375">

Give your project a name. <br>
In this example, we will be naming our project as "Firebase Setup".

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseAnalytics.png" width="375">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseAnalytics2.png" width="375">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Firebase.png" width="375">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

**Step 2: Setup Authentication**

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseAuth.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseAuth2.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseAuth3.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

**Step 3: Setup Realtime Database**

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseRTDB.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseRTDB2.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseRTDB3.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseRTDB4.png" width="750">

```
{
  "rules": {
    ".read": "auth.uid != null && auth.token.email_verified === true",
    ".write": "auth.uid != null && auth.token.email_verified === true",
    "connections": {
      "value1": {
        ".validate": "newData.val() <= 1 && newData.val() >= 0"
      }
    },
    "door": {
      "int": {
        ".validate": "newData.val() <= 1 && newData.val() >= 0"
      }
    },
    "users": {
      "$uid": {
        "value2": {
          ".validate": "newData.val() <= 3 && newData.val() >= 1"
        }
      }
    }
  }
}
```

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

**Step 4: Setup Web App**

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseConfig.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseConfig2.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/FirebaseConfig3.png" width="750">

<img src="https://github.com/XenonNgo/ProjectStudyPod/blob/main/Firebase/Images/Border.png" width="750">

# Firebase Hosting
