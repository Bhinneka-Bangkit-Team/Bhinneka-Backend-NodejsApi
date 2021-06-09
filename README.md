
![GitHub contributors](https://img.shields.io/github/contributors/Bhinneka-Bangkit-Team/Bhinneka-Android-App) ![GitHub forks](https://img.shields.io/github/forks/Bhinneka-Bangkit-Team/Bhinneka-Android-App) ![GitHub issues](https://img.shields.io/github/issues/Bhinneka-Bangkit-Team/Bhinneka-Android-App) ![GitHub pull requests](https://img.shields.io/github/issues-pr/Bhinneka-Bangkit-Team/Bhinneka-Android-App)

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://github.com/Bhinneka-Bangkit-Team/Bhinneka-MachineLearning-Research/blob/main/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Bhinneka Project - SELARAS</h3>

  <p align="center">
    Building magical things into our beloved application!
    <br />
    <a href="https://github.com/Bhinneka-Bangkit-Team"><strong>Explore all of our repositories »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues">Request Feature</a>
  </p>
</p>

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-selaras">About Selaras</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#our-feature">Our Feature</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

##
## About The Project
Homepage           |  Speech-Text Feature          |  Text-Speech Feature        | Sign Language-Speech Feature
:-------------------------:|:-------------------------: |:-------------------------:|:-------------------------:
![](https://github.com/Bhinneka-Bangkit-Team/Bhinneka-MachineLearning-Research/blob/main/capss4.jpg) | ![](https://github.com/Bhinneka-Bangkit-Team/Bhinneka-MachineLearning-Research/blob/main/capss3.jpg) | ![](https://github.com/Bhinneka-Bangkit-Team/Bhinneka-MachineLearning-Research/blob/main/capss2.jpg) | ![](https://github.com/Bhinneka-Bangkit-Team/Bhinneka-MachineLearning-Research/blob/main/capss1.jpg)

Hello, we want to introduce you to the KOMUNITAS (Komunikasi Tanpa Batas) project, with an app named "SELARAS". Selaras is a sign language interpreter mobile app, specially tailored to serve the needs of the deaf and HoH community in Indonesia with the help of technology. Using chat-based user interface, it is able to convert sign language (SIBI) to text, and then converted into speech with Google Cloud Speech in live !. It also has a feature to listen for conversation using Google Cloud Speech to Text.

### Built With
* [Native Android (Kotlin MVVM)](https://developer.android.com)
* [TensorFlow and TensorFlow Lite](https://tensorflow.org)
* [Google Mediapipe Framework](https://google.github.io/mediapipe/)
* [Nestjs (Node.js framework)](https://nestjs.com)
* [Google Cloud Platform](https://cloud.google.com)

## Our Feature
```
The is are our MVP Feature:

1. Translate one hand and two hand sign language into text.
2. Convert text to speech and speech to text
3. Bubble chat feature so users can easyly read and communicate
```
## Getting Started

### Clone the Repository

As usual, you get started by cloning the project to your local machine:

```
$ git://github.com/Bhinneka-Bangkit-Team/Bhinneka-Backend-NodejsApi.git
```

### Prerequisites


1. Download and install [Nodejs](https://nodejs.org/en/download/)

2. Install packages
  ```sh
  npm install
  ```

3. Configure Database Connection and Cloud Storage bucket
* Edit the database connection in `ormconfig.json` file
* Edit the bucket name in `/src/googleapis/googleapis.service.ts` file, change `bhinneka-backend-bucket` into your bucket name
  
4. Run the app

* Start
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

* Test
```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License
Copyright (c) 2021 - Bhinneka Bangkit Team
