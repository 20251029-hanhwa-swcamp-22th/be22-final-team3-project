# Team3 SETO 파이널 프로젝트

SETO는 프론트엔드, 5개 Spring Boot 백엔드 서비스, Kubernetes 매니페스트를 각각 독립 저장소로 관리하는 멀티 레포 프로젝트입니다. 이 루트 저장소는 각 저장소를 Git submodule로 묶어 전체 프로젝트 구조를 한 번에 확인하고 로컬 개발 환경을 실행하기 위한 상위 저장소입니다.

현재 운영 배포는 AWS EKS를 중심으로 구성되어 있으며, 정적 프론트엔드는 S3와 CloudFront에서 서비스하고 `/api/*` 요청은 CloudFront에서 ALB Ingress를 통해 EKS 내부 백엔드로 라우팅합니다. Kafka는 비용 절감을 위해 AWS MSK 대신 EKS 내부 단일 브로커 StatefulSet으로 운영합니다.

## 저장소 구조

| 경로 | 역할 | 배포 책임 |
|---|---|---|
| `team3-frontend` | Vue 기반 웹 프론트엔드 | S3 정적 배포, CloudFront 무효화 |
| `team3-backend-admin` | 인증, 조직, 기준정보, 관리자 API | ECR 이미지 빌드 후 EKS `admin` Deployment 업데이트 |
| `team3-backend-hr` | 인사, 근태, 구성원 관련 API | ECR 이미지 빌드 후 EKS `hr` Deployment 업데이트 |
| `team3-backend-scm` | 공급망, 재고, 발주 관련 API | ECR 이미지 빌드 후 EKS `scm` Deployment 업데이트 |
| `team3-backend-kms` | 지식관리, 키워드, 문서 관련 API | ECR 이미지 빌드 후 EKS `kms` Deployment 업데이트 |
| `team3-backend-batch` | 배치 작업, NLP 처리, 비동기 처리 | ECR 이미지 빌드 후 EKS `batch` Deployment 업데이트 |
| `team3-manifast` | EKS Kubernetes 매니페스트 | 클러스터 리소스 `kubectl apply` |
| `docker-compose.yml` | 로컬 통합 실행용 compose | 로컬 개발 전용 |

루트 저장소는 submodule SHA를 추적합니다. 실제 애플리케이션 코드 변경, GitHub Actions, Kubernetes manifest 변경은 각 submodule 저장소의 `main` 브랜치에서 관리됩니다.

## 사용 기술

### Frontend

![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-3.0-F7D336?style=for-the-badge&logo=pinia&logoColor=111111)
![Vue Router](https://img.shields.io/badge/Vue_Router-5.0-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.13-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-4.5-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20.19%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

- Vue 3 기반 SPA입니다.
- Vite로 빌드하고, Pinia와 Vue Router로 상태와 라우팅을 관리합니다.
- Axios로 backend API를 호출하고, Chart.js로 dashboard chart를 구성합니다.

프론트엔드 운영 빌드는 API base URL을 별도로 고정하지 않고 같은 도메인의 `/api/*` 경로를 사용합니다. 따라서 브라우저는 `https://seto-be22-final.site` 하나의 도메인으로 정적 파일과 API를 모두 호출합니다.

### Backend

![Java](https://img.shields.io/badge/Java-21-007396?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5.12-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Gradle](https://img.shields.io/badge/Gradle-Build-02303A?style=for-the-badge&logo=gradle&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring_Security-JWT-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white)
![JPA](https://img.shields.io/badge/Spring_Data_JPA-ORM-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![MyBatis](https://img.shields.io/badge/MyBatis-3.0.4-B21F2D?style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-External_DB-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Kafka](https://img.shields.io/badge/Spring_Kafka-Messaging-231F20?style=for-the-badge&logo=apachekafka&logoColor=white)
![OpenFeign](https://img.shields.io/badge/OpenFeign-Service_Call-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![Actuator](https://img.shields.io/badge/Actuator-Prometheus_Metrics-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Container-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Amazon ECR](https://img.shields.io/badge/Amazon_ECR-Image_Registry-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)

- Java 21과 Spring Boot 3.5.12 기반의 5개 backend service로 구성되어 있습니다.
- 인증과 권한은 Spring Security와 JWT를 사용합니다.
- 데이터 접근은 Spring Data JPA와 MyBatis를 함께 사용하며, 외부 MySQL에 연결합니다.
- 서비스 간 호출은 OpenFeign, 비동기 메시징은 Spring Kafka를 사용합니다.
- Actuator와 Micrometer Prometheus registry를 통해 `/actuator/prometheus` metric을 노출합니다.

서비스별 추가 특징은 다음과 같습니다.

| 서비스 | 주요 특징 |
|---|---|
| Admin | 인증, 조직 및 기준정보 API, GCP 인증 라이브러리 사용 |
| HR | OpenFeign, Excel 처리용 Apache POI 사용 |
| SCM | OpenFeign 기반 서비스 간 호출 |
| KMS | 지식관리 API, OpenFeign 기반 서비스 간 호출 |
| Batch | Spring Batch, Google Cloud Language API, Kafka 기반 비동기 처리 |

### Infrastructure

![AWS](https://img.shields.io/badge/AWS-ap--northeast--2-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![Amazon EKS](https://img.shields.io/badge/Amazon_EKS-seto--cluster-FF9900?style=for-the-badge&logo=amazoneks&logoColor=white)
![Kubernetes](https://img.shields.io/badge/Kubernetes-EKS-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![Amazon S3](https://img.shields.io/badge/Amazon_S3-Frontend_Hosting-569A31?style=for-the-badge&logo=amazons3&logoColor=white)
![CloudFront](https://img.shields.io/badge/CloudFront-CDN-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![ALB](https://img.shields.io/badge/ALB-Ingress-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![Secrets Manager](https://img.shields.io/badge/Secrets_Manager-Secrets-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![External Secrets](https://img.shields.io/badge/External_Secrets-Operator-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white)
![Kafka](https://img.shields.io/badge/Kafka-KRaft_Single_Broker-231F20?style=for-the-badge&logo=apachekafka&logoColor=white)
![EBS](https://img.shields.io/badge/EBS-gp3_PVC-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-OIDC_CI%2FCD-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)
![Prometheus](https://img.shields.io/badge/Prometheus-Monitoring-E6522C?style=for-the-badge&logo=prometheus&logoColor=white)
![Grafana](https://img.shields.io/badge/Grafana-Dashboard-F46800?style=for-the-badge&logo=grafana&logoColor=white)
![Elasticsearch](https://img.shields.io/badge/Elasticsearch-Logs-005571?style=for-the-badge&logo=elasticsearch&logoColor=white)
![Kibana](https://img.shields.io/badge/Kibana-Log_UI-005571?style=for-the-badge&logo=kibana&logoColor=white)
![Fluent Bit](https://img.shields.io/badge/Fluent_Bit-Log_Collector-49BDA5?style=for-the-badge)

- AWS EKS `seto-cluster`에서 backend, Kafka, logging component를 실행합니다.
- Frontend는 S3에 정적 파일로 배포하고 CloudFront로 서비스합니다.
- ALB Ingress가 `/api/*` 요청을 EKS backend service로 라우팅합니다.
- Secret은 AWS Secrets Manager와 External Secrets Operator로 주입합니다.
- Monitoring은 Prometheus/Grafana, logging은 Fluent Bit/Elasticsearch/Kibana로 구성합니다.

## AWS 배포 환경 핵심 정보

| 항목 | 값 |
|---|---|
| AWS Account | `481961345072` |
| Region | `ap-northeast-2` |
| EKS Cluster | `seto-cluster` |
| EKS main namespace | `seto` |
| Monitoring namespace | `monitoring` |
| External Secrets namespace | `external-secrets` |
| ECK operator namespace | `elastic-system` |
| Public domain | `https://seto-be22-final.site` |
| CloudFront distribution | `E205VWED73OV56` |
| CloudFront domain | `d15gaw8p2q8mhx.cloudfront.net` |
| Frontend S3 bucket | `seto-frontend-481961345072-481961345072-ap-northeast-2-an` |
| Database | External MySQL `playdata4.iptime.org:9001/setodb` |

## EKS 런타임 구조

### Backend 서비스

| 서비스 | Deployment | Service | Port | Replica | 주요 Ingress path |
|---|---|---|---:|---:|---|
| Admin | `admin` | `admin` | 8080 | 2 | `/api/v1/auth`, `/api/v1/organization`, `/api/v1/equipment-management`, `/api/v1/domain-keyword`, `/api/v1/industry`, `/api/v1/algorithm-version` |
| HR | `hr` | `hr` | 8081 | 2 | `/api/v1/hr` |
| SCM | `scm` | `scm` | 8082 | 2 | `/api/v1/scm` |
| KMS | `kms` | `kms` | 8083 | 2 | `/api/kms` |
| Batch | `batch` | `batch` | 8084 | 1 | `/api/v1/batch` |

Backend image repository:

```text
481961345072.dkr.ecr.ap-northeast-2.amazonaws.com/seto/backend-admin
481961345072.dkr.ecr.ap-northeast-2.amazonaws.com/seto/backend-hr
481961345072.dkr.ecr.ap-northeast-2.amazonaws.com/seto/backend-scm
481961345072.dkr.ecr.ap-northeast-2.amazonaws.com/seto/backend-kms
481961345072.dkr.ecr.ap-northeast-2.amazonaws.com/seto/backend-batch
```

### Kafka

MSK Serverless는 비용 문제 때문에 현재 사용하지 않습니다. 운영 클러스터에서는 Kafka를 EKS 내부 StatefulSet으로 실행합니다.

| 항목 | 값 |
|---|---|
| StatefulSet | `kafka` |
| Service | `kafka` |
| Bootstrap server | `kafka.seto.svc.cluster.local:9092` |
| Protocol | `PLAINTEXT` |
| Image | `apache/kafka:4.2.0` |
| Storage | `5Gi` EBS gp3 PVC |
| PVC | `kafka-data-kafka-0` |

Kafka 비용을 줄이기 위해 사용하지 않을 때는 compute만 중지할 수 있습니다.

```bash
kubectl scale statefulset kafka -n seto --replicas=0
```

다시 사용할 때:

```bash
kubectl scale statefulset kafka -n seto --replicas=1
kubectl rollout status statefulset/kafka -n seto --timeout=300s
```

이 구성은 비용 절감용 단일 브로커입니다. 장애 허용이 필요한 운영 환경에서는 다중 브로커 Kafka 또는 관리형 서비스를 다시 검토해야 합니다. PVC를 삭제하면 Kafka topic 데이터도 삭제됩니다.

### Secrets

애플리케이션 secret은 Kubernetes manifest에 직접 저장하지 않고 AWS Secrets Manager에 저장한 뒤 External Secrets Operator가 Kubernetes Secret으로 동기화합니다.

| Kubernetes 리소스 | 역할 |
|---|---|
| `ClusterSecretStore/aws-secrets-manager` | EKS에서 AWS Secrets Manager를 읽기 위한 store |
| `ExternalSecret/app-secrets` | JWT, AES, 애플리케이션 공통 secret |
| `ExternalSecret/db-credentials` | 외부 MySQL 접속 정보 |
| `ExternalSecret/gcp-key` | GCP service account JSON |
| `ServiceAccount/external-secrets-sa` | External Secrets Operator IRSA identity |

GCP key는 backend pod 내부에서 `/secrets/gcp/gcp-key.json` 경로로 mount됩니다.

### Backend workflow

각 백엔드 저장소의 `.github/workflows/deploy.yml`이 담당합니다.

| 이벤트 | 동작 |
|---|---|
| Pull Request to `main` | Gradle build로 컴파일 및 기본 검증 |
| Push to `main` | Docker image build, ECR push, EKS Deployment image 업데이트, rollout 확인 |

대표 흐름:

```text
checkout
configure AWS credentials with OIDC
login to ECR
./gradlew build -x test --no-daemon
docker build
docker push :GITHUB_SHA and :latest
aws eks update-kubeconfig
kubectl set image deployment/<service>
kubectl rollout status deployment/<service>
```

### Frontend workflow

`team3-frontend/.github/workflows/deploy.yml`이 담당합니다.

| 이벤트 | 동작 |
|---|---|
| Pull Request to `main` | `npm ci`, `npm run build` |
| Push to `main` | S3 bucket sync, CloudFront invalidation |

### Manifest workflow

`team3-manifast/.github/workflows/apply-manifests.yml`이 담당합니다.

| 이벤트 | 동작 |
|---|---|
| Pull Request to `main` | Kubernetes YAML parse validation |
| Push to `main` | EKS kubeconfig 설정, manifest apply, 주요 rollout 확인 |

RBAC manifest는 `k8s/rbac/github-deploy-rbac.yaml`에 있지만, GitHub Actions role이 자기 자신의 cluster-level RBAC을 생성하거나 수정하지 않도록 관리자 권한으로 수동 bootstrap해야 합니다.

### GitHub Variables and Secrets

각 submodule 저장소에 필요한 값은 GitHub `Settings > Secrets and variables > Actions`에 등록합니다.

| 이름 | 종류 | 예시 |
|---|---|---|
| `AWS_REGION` | Repository variable | `ap-northeast-2` |
| `AWS_ACCOUNT_ID` | Repository variable | `481961345072` |
| `EKS_CLUSTER_NAME` | Repository variable | `seto-cluster` |
| `K8S_NAMESPACE` | Repository variable | `seto` |
| `S3_BUCKET_NAME` | Frontend repository variable | `seto-frontend-481961345072-481961345072-ap-northeast-2-an` |
| `CLOUDFRONT_DISTRIBUTION_ID` | Frontend repository variable | `E205VWED73OV56` |
| `AWS_DEPLOY_ROLE_ARN` | Repository secret | `arn:aws:iam::481961345072:role/seto-github-deploy` |

GitHub Actions는 장기 AWS access key를 저장하지 않고 OIDC로 `seto-github-deploy` IAM role을 assume합니다.

## 모니터링

모니터링은 `monitoring` namespace의 kube-prometheus-stack으로 구성되어 있습니다.

| 구성요소 | 역할 |
|---|---|
| Prometheus | Kubernetes, node, pod, backend actuator metric 수집 |
| Grafana | dashboard 시각화 |
| Alertmanager | alert rule 알림 처리 |
| kube-state-metrics | Kubernetes object 상태 metric 제공 |
| node-exporter | node CPU, memory, disk, network metric 제공 |
| ServiceMonitor `seto-backends` | backend `/actuator/prometheus` scrape |
| PrometheusRule `seto-alerts` | SETO 서비스용 alert rule |

Grafana 접속:

```bash
kubectl port-forward svc/prometheus-grafana -n monitoring 3000:80
```

브라우저에서 접속:

```text
http://localhost:3000
```

Grafana admin password 확인:

```bash
kubectl get secret prometheus-grafana -n monitoring \
  -o jsonpath='{.data.admin-password}' | base64 --decode
```

유용한 PromQL 예시:

```promql
sum(rate(http_server_requests_seconds_count{namespace="seto"}[5m])) by (application, uri, status)
histogram_quantile(0.95, sum(rate(http_server_requests_seconds_bucket{namespace="seto"}[5m])) by (le, application, uri))
sum(rate(container_cpu_usage_seconds_total{namespace="seto", container!="POD", container!=""}[5m])) by (pod)
sum(container_memory_working_set_bytes{namespace="seto", container!="POD", container!=""}) by (pod)
kube_deployment_status_replicas_available{namespace="seto"}
```

## 로깅

로그 수집은 Fluent Bit, Elasticsearch, Kibana로 구성되어 있습니다.

| 구성요소 | 역할 |
|---|---|
| Fluent Bit | 각 node의 container log 수집 |
| Elasticsearch `seto-es` | 로그 저장 및 검색 |
| Kibana `seto-kibana` | 로그 조회 UI |
| ECK Operator | Elasticsearch와 Kibana lifecycle 관리 |
| StorageClass `ebs-auto-gp3` | Elasticsearch PVC용 EBS gp3 storage |

Kibana 접속:

```bash
kubectl port-forward svc/seto-kibana-kb-http -n seto 5601:5601
```

브라우저에서 접속:

```text
https://localhost:5601
```

ECK가 자체 서명 인증서를 사용하므로 로컬 접속 시 브라우저에서 인증서 경고가 발생할 수 있습니다. 이 경우 `localhost(안전하지 않음)으로 이동`을 선택해 접속하면 됩니다.

Kibana 계정:

```text
Username: elastic
Password: 아래 명령으로 확인한 값
```

```bash
kubectl get secret seto-es-es-elastic-user -n seto \
  -o jsonpath='{.data.elastic}' | base64 --decode
```

Kibana data view 예시:

```text
Name: seto-logs
Index pattern: seto-logs-*
Timestamp field: @timestamp
```

실제 index 이름 확인:

```bash
kubectl port-forward svc/seto-es-es-http -n seto 9200:9200
curl -k -u elastic:<PASSWORD> https://localhost:9200/_cat/indices?v
```

## 로컬 실행

루트의 `docker-compose.yml`은 통합 로컬 실행용입니다. Kafka는 compose 내부에서 KRaft 모드로 실행되고, 백엔드 서비스들은 `kafka:9092`를 bootstrap server로 사용합니다.

사전 준비:

```bash
git clone --recurse-submodules <root-repository-url>
cd be22-final-team3-project
```

이미 clone한 경우 submodule 동기화:

```bash
git submodule update --init --recursive
git submodule foreach 'git checkout main && git pull origin main'
```

GCP key가 필요한 로컬 기능을 사용하려면 다음 파일이 필요합니다.

```text
secrets/gcp-key.json
```

로컬 통합 실행:

```bash
docker compose up --build
```

기본 로컬 포트:

| 서비스 | URL |
|---|---|
| Frontend | `http://localhost` |
| Admin | `http://localhost:8080` |
| HR | `http://localhost:8081` |
| SCM | `http://localhost:8082` |
| KMS | `http://localhost:8083` |
| Batch | `http://localhost:8084` |
| Kafka | `localhost:9092` |

## 운영 확인 명령

AWS kubeconfig 설정:

```bash
aws eks update-kubeconfig \
  --name seto-cluster \
  --region ap-northeast-2
```

주요 리소스 확인:

```bash
kubectl get pods -n seto
kubectl get ingress,svc,deploy,statefulset -n seto
kubectl get pods -n monitoring
kubectl get externalsecret -n seto
kubectl get clustersecretstore aws-secrets-manager
```

Backend rollout 확인:

```bash
kubectl rollout status deployment/admin -n seto --timeout=300s
kubectl rollout status deployment/hr -n seto --timeout=300s
kubectl rollout status deployment/scm -n seto --timeout=300s
kubectl rollout status deployment/kms -n seto --timeout=300s
kubectl rollout status deployment/batch -n seto --timeout=300s
```

Kafka topic 확인:

```bash
kubectl exec -n seto kafka-0 -- \
  /opt/kafka/bin/kafka-topics.sh \
  --bootstrap-server localhost:9092 \
  --list
```

운영 사이트 확인:

```bash
curl -I https://seto-be22-final.site/login
```

서비스 로그 확인:

```bash
kubectl logs -n seto deployment/admin --tail=100
kubectl logs -n seto deployment/hr --tail=100
kubectl logs -n seto deployment/scm --tail=100
kubectl logs -n seto deployment/kms --tail=100
kubectl logs -n seto deployment/batch --tail=100
```

## 운영 시 주의사항

- MSK Serverless는 비용 절감을 위해 제거한 상태입니다. MSK bootstrap server, IAM Kafka authentication 설정을 다시 넣으면 현재 내부 Kafka 구성과 충돌할 수 있습니다.
- 현재 Kafka는 단일 브로커입니다. 데모와 비용 절감에는 적합하지만 고가용성 운영 구성은 아닙니다.
- Kafka를 scale-to-zero하면 compute 비용은 줄지만 PVC는 유지됩니다. PVC 삭제는 topic 데이터 삭제를 의미합니다.
- Secret 값은 Git에 커밋하지 않습니다. AWS Secrets Manager와 External Secrets Operator를 통해 주입합니다.
- GitHub Actions deploy role의 Kubernetes RBAC은 관리자 계정으로 먼저 bootstrap해야 합니다.
- 루트 저장소에서 submodule 포인터를 업데이트하려면 각 submodule의 변경이 먼저 해당 저장소 `main`에 merge되어 있어야 합니다.
- `.claude/deployement` 문서는 배포 작업 이력과 상세 절차를 보관하는 보조 문서입니다. 실제 배포 source of truth는 각 submodule의 workflow와 `team3-manifast/k8s` manifest입니다.
