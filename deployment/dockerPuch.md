# Run to access your docker hub account

```
docker login --username=<username>
```

# Run to upload images to google hub

```
docker build -t psn-authentication-db:v1.0 ./psn_authentication/psn_authentication_db
docker tag psn-authentication-db:v1.0 julian9999/psn-authentication-db:v1.0
docker push julian9999/psn-authentication-db:v1.0
```

```
docker build -t psn-authentication-ms:v1.0 ./psn_authentication/psn_authentication_ms
docker tag psn-authentication-ms:v1.0 julian9999/psn-authentication-ms:v1.0
docker push julian9999/psn-authentication-ms:v1.0
```

```
docker build -t psn-ur-ms:v1.0 ./psn_user_relationships_ms
docker tag psn-ur-ms:v1.0 julian9999/psn-ur-ms:v1.0
docker push julian9999/psn-ur-ms:v1.0
```

```
docker build -t psn-post-ms:v1.0 ./psn_post_ms
docker tag psn-post-ms:v1.0 julian9999/psn-post-ms:v1.0
docker push julian9999/psn-post-ms:v1.0
```

```
docker build -t psn-notification-ms:v1.0 ./psn_notification_ms
docker tag psn-notification-ms:v1.0 julian9999/psn-notification-ms:v1.0
docker push julian9999/psn-notification-ms:v1.0
```

```
docker build -t psn-notification-ws-ms:v1.0 ./psn_notification_ws_ms
docker tag psn-notification-ws-ms:v1.0 julian9999/psn-notification-ws-ms:v1.0
docker push julian9999/psn-notification-ws-ms:v1.0
```

```
docker build -t psn-chat-ms:v1.0 ./psn_chat_ms
docker tag psn-chat-ms:v1.0 julian9999/psn-chat-ms:v1.0
docker push julian9999/psn-chat-ms:v1.0
```

```
docker build -t psn-ag:v1.0 ./psn_ag
docker tag psn-ag:v1.0 julian9999/psn-ag:v1.0
docker push julian9999/psn-ag:v1.0
```

```
docker build -t psn-ag-rp:v1.0 ./psn_ag_rp
docker tag psn-ag-rp:v1.0 julian9999/psn-ag-rp:v1.0
docker push julian9999/psn-ag-rp:v1.0
```

```
docker build -t psn-interface:v1.0 ./psn_interface
docker tag psn-interface:v1.0 julian9999/psn-interface:v1.0
docker push julian9999/psn-interface:v1.0
```

```
docker build -t psn-interface-rp:v1.0 ./psn_interface_rp
docker tag psn-interface-rp:v1.0 julian9999/psn-interface-rp:v1.0
docker push julian9999/psn-interface-rp:v1.0
```

```
docker build -t psn-wa:v1.0 ./psn_wa
docker tag psn-wa:v1.0 julian9999/psn-wa:v1.0
docker push julian9999/psn-wa:v1.0
```

```
docker build -t psn-wa-rp:v1.0 ./psn_wa_rp
docker tag psn-wa-rp:v1.0 julian9999/psn-wa-rp:v1.0
docker push julian9999/psn-wa-rp:v1.0
```
