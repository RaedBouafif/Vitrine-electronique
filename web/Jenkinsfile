pipeline {

    agent any
    
    stages {


        stage('Build image Ms web') {
             when {
                
                expression { env.gitlabTargetBranch == 'B_web' }
            }
            steps { 
            dir ('web') {
			   script {
			    docker.withServer('tcp://35.180.206.6:4243') {
                        sh 'docker build . -t anonyme5/mwsimage:latest'
                        sh 'docker login -u anonyme5 -p Five12345'
                        sh 'docker push anonyme5/mwsimage:latest'
                    }
			 
               }
            }
        }
}
    stage('run in dev') {
          when {
                
                expression { env.gitlabTargetBranch == 'B_web' }
            }
            steps {
				script {
				docker.withServer('tcp://35.180.206.6:4243') {
				        sh 'docker rm --force market-web-service || true'
                        sh 'docker run --restart=always -d -p 91:91 --network=mysubnet --network-alias=market-web-service --name=market-web-service   anonyme5/mwsimage:latest'
                    }
				}
			   
              
            }
        }
     stage('Run in PRE-PROD Env') {
           when {
                
               beforeAgent true
                expression { env.gitlabTargetBranch == 'develop' }
            }
            agent {
          kubernetes {
        cloud 'kubernetes'
           label "kube"
          }
        }
            steps {
				script {
				 container('kubectl') {
                 sh 'kubectl delete deploy market-web-service -n jenkins  || true'
                     sh 'kubectl apply -f  web/web-deployment.yaml '
                     sh 'kubectl apply -f  web/web-service.yaml ' 
                     }
		}
			   
              
            }
        }
     stage('Run in PROD Env') {
           when {
                
               beforeAgent true
                expression { env.gitlabTargetBranch == 'release' }
            }
            agent {
          kubernetes {
        cloud 'kubernetesProd'
           label "kubeProd"
          }
        }
            steps {
				script {
				 container('kubectl') {
                 sh 'kubectl delete deploy market-web-service -n jenkins  || true'
                     sh 'kubectl apply -f  web/web-deployment.yaml '
                     sh 'kubectl apply -f  web/web-service.yaml ' 
                     }
		}
              
            }
        }

    }
   
}