pipeline {agent any    options {     	skipDefaultCheckout(true)    }    stages {        stage('Build') {            steps {                sh { sleep .1; echo pass; } | script -q /dev/null -c 'ssh user@192.168.0.36 /home/user/apps/nuxtBase/run.sh'            }        }    }}
