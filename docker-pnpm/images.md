# 公司内部镜像
## Node：18.16.0
- 镜像说明：镜像为官方镜像`node:18.16.0-alpine`
- `reg.nexus.wmqhealth.com/tools/node-18.16.0-alpine:latest`

## Node：18.16.0 with pnpm
- 镜像说明：镜像在官方镜像的基础上增加了pnpm 8.x，添加编译工具，[Dockerfile](Dockerfile.pnpm)
- `reg.nexus.wmqhealth.com/tools/node-18.16.0-alpine-pnpm:latest`

## Node：18.16.0 with pnpm and tools
- 镜像说明：在支持pnpm和编译工具的基础上增加部分npm的全局应用，[Dockerfile](Dockerfile.tools)
- `reg.nexus.wmqhealth.com/tools/node-18.16.0-alpine-pnpm-tools:latest`

## SonarScannerCli 4.x
- 镜像说明：用于Sonar扫描，base [sonarsource/sonar-scanner-cli](https://hub.docker.com/r/sonarsource/sonar-scanner-cli) 添加npm、pnpm和相关编译库，[Dockerfile](Dockerfile.sonar)
- `reg.nexus.wmqhealth.com/tools/sonar.alpine-node18.16.0-pnpm` 