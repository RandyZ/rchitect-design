# FROM localhub.aihelp.net/aihelp-tools/node-16.20.2-tools
FROM localhub.aihelp.net/aihelp-tools/node-16.20.2-slim-tools

LABEL CONTAINER.AUTHOR="Randy"
LABEL CONTAINER.AUTHOR.MAIL="zhangshi3421@gmail.com"

RUN npm install -g sonarqube-scanner && sonar-scanner --help

# docker build -t localhub.aihelp.net/aihelp-tools/node-16.20.2-slim-tools-sonar .