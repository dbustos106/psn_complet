# Run to create vpc

```
gcloud compute networks create psn-vpc --subnet-mode=custom
```

# Run to create subnets

```
gcloud compute networks subnets create subnet-priv \
    --region=us-east1 \
    --network=psn-vpc \
    --range=10.1.0.0/16 \
    --enable-private-ip-google-access \
    --secondary-range pods=10.10.0.0/16,services=10.100.0.0/16
```

```
gcloud compute networks subnets create subnet-pub \
    --region=us-east1 \
    --network=psn-vpc \
    --range=10.2.0.0/16 \
    --secondary-range pods=10.11.0.0/16,services=10.101.0.0/16
```

# Create router and Nat

# Run to create clusters

```
gcloud beta container clusters create psn-cluster1 \
    --zone us-east1-b --num-nodes 4 \
    --enable-private-nodes \
    --master-ipv4-cidr 172.16.0.32/28 \
    --machine-type e2-medium --disk-size 32 \
    --network psn-vpc --subnetwork subnet-priv \
    --cluster-dns clouddns --cluster-dns-scope vpc \
    --cluster-dns-domain cluster1 \
    --enable-ip-alias \
    --enable-l4-ilb-subsetting \
    --cluster-secondary-range-name=pods --services-secondary-range-name=services
```

```
gcloud container clusters update psn-cluster1 \
    --enable-master-authorized-networks \
    --zone us-east1-b \
    --master-authorized-networks 10.11.0.0/16,190.26.21.40/32,186.29.249.39/32,10.3.0.0/16,10.4.0.0/16,192.168.0.0/16,10.1.0.0/16
```

```
gcloud beta container clusters create psn-cluster2 \
    --zone us-east1-b --num-nodes 2 \
    --machine-type e2-medium --disk-size 32 \
    --network psn-vpc --subnetwork subnet-pub \
    --cluster-dns clouddns --cluster-dns-scope vpc \
    --cluster-dns-domain cluster2 \
    --enable-ip-alias \
    --enable-l4-ilb-subsetting \
    --cluster-secondary-range-name=pods --services-secondary-range-name=services
```

