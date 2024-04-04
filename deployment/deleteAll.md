# Run to remove components in the cluster:

```
kubectl delete service psn-notification-ws-ms-service
kubectl delete service psn-notification-ms-service
kubectl delete service psn-rabbitmq-service
kubectl delete service psn-chat-ms-service
kubectl delete service psn-post-ms-service
kubectl delete service psn-ag-service
kubectl delete service psn-ur-ms-service
kubectl delete service psn-ur-db-admin-service
kubectl delete service psn-ur-db-service
kubectl delete service psn-authentication-ms-service
kubectl delete service psn-phpmyadmin-service
kubectl delete service psn-authentication-db-service
kubectl delete service psn-phpldapadmin-service
kubectl delete service psn-openldap-service

kubectl delete deployment psn-notification-ws-ms-deployment
kubectl delete deployment psn-notification-ms-deployment
kubectl delete deployment psn-rabbitmq-deployment
kubectl delete deployment psn-chat-ms-deployment
kubectl delete deployment psn-post-ms-deployment
kubectl delete deployment psn-ag-deployment
kubectl delete deployment psn-ur-ms-deployment
kubectl delete deployment psn-ur-db-deployment
kubectl delete deployment psn-authentication-ms-deployment
kubectl delete deployment psn-phpmyadmin-deployment
kubectl delete deployment psn-authentication-db-deployment
kubectl delete deployment psn-phpldapadmin-deployment
kubectl delete deployment psn-openldap-deployment

kubectl delete persistentvolumeclaims psn-rabbitmq-claim
kubectl delete persistentvolumeclaims psn-neo4j-claim
kubectl delete persistentvolumeclaims psn-mysql-claim
kubectl delete persistentvolumeclaims psn-openldap-claim

kubectl delete persistentvolume psn-rabbitmq-persistent-volume
kubectl delete persistentvolume psn-neo4j-persistent-volume
kubectl delete persistentvolume psn-mysql-persistent-volume
kubectl delete persistentvolume psn-openldap-persistent-volume
```