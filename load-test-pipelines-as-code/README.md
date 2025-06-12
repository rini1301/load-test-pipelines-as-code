# Load Test Pipelines as Code – Demo with k6 Operator

This project shows how to run declarative load tests using the k6 Operator in a local Kubernetes cluster (Minikube).

## 🧰 Prerequisites

- Docker
- Minikube
- kubectl
- Helm
- (Optional) k6 CLI for local testing

## 🚀 Steps to Run

### 1. Start Minikube

```bash
minikube start --memory=4096 --cpus=2
```

### 2. Install k6 Operator

```bash
kubectl create namespace k6-operator
helm repo add k6 https://grafana.github.io/k6-charts
helm repo update
helm install k6-operator k6/k6-operator -n k6-operator
```

### 3. Create ConfigMap for Load Test Script

```bash
kubectl create configmap k6-scripts \
  --from-file=checkout-test.js=./k6-script/checkout-test.js \
  -n k6-operator
```

### 4. Apply Load Test YAML

```bash
kubectl apply -f manifests/api-load-test.yaml -n k6-operator
```

### 5. View Test Logs

```bash
kubectl get pods -n k6-operator
kubectl logs <k6-pod-name> -n k6-operator
```

---

## 🧪 Local Run (No Kubernetes)

If you'd prefer to run the test directly without Kubernetes:

```bash
npm install -g k6
k6 run ./k6-script/checkout-test.js
```

---

## 📎 References

- [k6 Operator](https://github.com/grafana/k6-operator)
- [k6 Docs](https://k6.io/docs/)
- [Helm](https://helm.sh/)
- [Minikube](https://minikube.sigs.k8s.io/)
