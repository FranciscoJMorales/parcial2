# Parcial 2

Francisco Morales
Carné: 1223319

Servicios:

- Receptor de textos `api` 
- Validador de textos `validator`
- Compresor `compressor`
- Guardado en base de datos no relacional `mongo`
- Rechazador de textos no válidos `rejector`

### Run 'api' with Dapr

1. Install dependencies: 

```bash
cd ./api
npm install
```
2. Run the 'api' app with Dapr: 

```bash
dapr run --app-id api --app-protocol http --dapr-http-port 3500 --resources-path ../components -- npm run start
```

### Run 'validator' with Dapr

1. Install dependencies: 

```bash
cd ./validator
npm install
```
2. Run the 'validator' app with Dapr: 

```bash
dapr run --app-port 5000 --app-id validator --app-protocol http --dapr-http-port 3501 --resources-path ../components -- npm run start
```

### Run 'compressor' with Dapr

1. Install dependencies: 

```bash
cd ./compressor
npm install
```
2. Run the 'compressor' app with Dapr: 

```bash
dapr run --app-port 5001 --app-id compressor --app-protocol http --dapr-http-port 3502 --resources-path ../components -- npm run start
```

### Run 'mongo' with Dapr

1. Install dependencies: 

```bash
cd ./mongo
npm install
```
2. Run the 'mongo' app with Dapr: 

```bash
dapr run --app-port 5002 --app-id mongo --app-protocol http --dapr-http-port 3503 --resources-path ../components -- npm run start
```

### Run 'rejector' with Dapr

1. Install dependencies: 

```bash
cd ./rejector
npm install
```
2. Run the 'rejector' app with Dapr: 

```bash
dapr run --app-port 5003 --app-id rejector --app-protocol http --dapr-http-port 3504 --resources-path ../components -- npm run start
```

To stop services:

```bash
dapr stop --app-id api
dapr stop --app-id validator
dapr stop --app-id compressor
dapr stop --app-id mongo
dapr stop --app-id rejector
```
