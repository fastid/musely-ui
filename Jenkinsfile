pipeline {
  agent any
  stages {
    stage('yarn') {
      steps {
        sh 'yarn'
      }
    }

    stage('build:theme') {
      steps {
        sh 'yarn build:theme'
      }
    }

  }
}