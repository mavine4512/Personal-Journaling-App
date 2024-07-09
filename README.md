# Personal Journal App

### Description

Developed a mobile application for personal journaling using React Native, allowing users to write, categorize, and view their journal entries. The backend service, implemented with Node.js (Express.js) and MySQL, ensures secure user authentication and provides comprehensive CRUD operations for managing journal entries.


### Features:

- **User Authentication**: Securely sign up, log in, and manage user profiles.
- **Journal Entry Management**: Create, read, update, and delete journal entries with ease.
- **Categorization**: Organize journal entries into categories such as Personal, Work, and Travel.
- **Summary View**: View summaries of journal entries over selected periods, including Days of the week.
- **Settings**: Update personal information, including username and password.

### Technologies Used:

- **Frontend:**  React Native, React Navigation, Axios
- **Backend:** Express.js, MySQL.
- **Security:** JSON Web Tokens (JWT), bcrypt
- **Development Tools:** React Native CLI.

### Folder Structure

### Running the application

# Project Setup

Follow these steps to set up and run the project locally on your machine:

### Prerequisites

 - Node.js > 18 and npm installed on your machine ([Download Node.js](https://nodejs.org/))
 - Make sure you have android studio installed on your machine.([Download and install Android Studio ](https://developer.android.com/codelabs/basic-android-kotlin-compose-install-android-studio#0))
 - Make sure you have Xampp installed on your machine ([Download Apache](https://www.apachefriends.org/download.html))

### Installation

Clone the repository to your local machine and then do `cd PersonalJournal` to navigate to the frontend then install the dependencies using yarn then use yarn android to run the app:

* Front end 
```bash
git clone https://github.com/mavine4512/Personal-Journaling-App.git
cd PersonalJournal
yarn

yarn android
```

* BackEnd
```bash
cd Backend
yarn

yarn start
```

- Make sure on your Xampp you run the SQL file `journal_db.sql` which is at the backend directory, you can copy and past is at SQL column  and all the db and table will have been created.
upon  running your backend  `yarn start` you will see:

``bash
[nodemon] restarting due to changes...
[nodemon] starting `node index.js`
Server is running on port 3000
Connected to the MySQL database
```
## backend Folder Structure 

```plaintext
├── config.js
├── index.html
├── journal_db.sql
└──package.json

```
* How to connect to the backend from frontend
 - After you have started the backend `yarn start` you will need to connect both emulator, or if you are using real device you will need to use the same net work to connect.
 - You need to be on the same IP address.
   * How to get IP address: 
    run below on your terminal

        windows: `ipconfig`
        ``bash 
            ip address:  `192.168.178.251`
            status: active
        ```
        macOS: `ifconfig`
                ``bash 
                    inet `192.168.178.251` netmask 0xffffff00 broadcast 193.169.196.255
                    nat64 prefix 64:ff9b:: prefixlen 96
                    nd6 options=201<PERFORMNUD,DAD>
                    media: autoselect
                    status: active
                ```
    -  Take the Ip address you have found put in at `utilities/baseURl.js`:  export  const BaseUrl = "http://192.192.0.0:3000"
## FrontEnd Folder Structure 

```plaintext
├── --test--/
│   └── App.test.js
├── .bundle/
├── android/
├── ios/
├── src/
│   ├── assets/
│   │    ├── animetions/
│   │    ├── appUIImages/
│   │    │   ├── addNewEntry.png
│   │    │   ├── editEntry.png
│   │    │   ├── home.png
│   │    │   ├── login.png
│   │    │   ├── profileSetting.png
│   │    │   ├── register.png
│   │    │   ├── summary.png
│   │    │   └── summaryDropDown.png
│   │    └── images
│   │    │   ├── backgroundImages.png
│   │    │   ├── dummy.png
│   │    │   ├── login.png
│   │    │   └── signUp.png
│   ├── components/
│   │    ├── navigation/
│   │    │   └── tabs.js
│   │    ├── dialogs.js
│   │    └── icon.js
│   ├── localData/
│   │    └── localData.js
│   ├── redux/ 
│   │    ├── actions.js
│   │    └── reduser.js
│   ├── screens/
│   │    ├── Dashboard/
│   │    │   └── index.js
│   │    ├── EditJournal/
│   │    │   └── index.js
│   │    ├── Login/
│   │    │   ├── styles.js
│   │    │   └── index.js
│   │    ├── Register/
│   │    │   ├── styles.js
│   │    │   └── index.js
│   │    ├── settings/
│   │    │   └── index.js
│   │    ├── splash/
│   │    │   ├── styles.js
│   │    │   └── index.js
│   │    └── summary/
│   │    │   └── index.js
│   ├── utilities/
│   │    ├── baseUrl
│   │    ├── color.js
│   │    └── network.js
│   └── main.js
├── .buckconfig
├── .eslintrc.js
├── .node-version
├── .prettierrc.js
├── .ruby-version
├── .watchmanconfig
├── App.js
├── app.json
├── babelConfig.js
├── Gemfile
├── index.js
├── jsConfig.json
├── metro.config.js
├── package.json
├── yarn.lock
├── .gitignore
└── README.md
```

### Installation
run this on terminal

## Author

- [Mavine Naaman](https://github.com/mavine4512)

## App Images

