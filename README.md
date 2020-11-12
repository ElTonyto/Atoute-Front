# Atoute 👋 - Front

### Prerequisites

- Install NodeJS & NPM [download NodeJS & NPM](https://nodejs.org/en/download/)
- Install the docker stack as defined in the [tools repository](https://gitlab.com/atoute/back/-/tree/master/docker)

## Install

### Local
```bash
    npm install
```

### Docker
```bash 
    # Create image
    docker build -t registry.gitlab.com/atoute/app .  
```

## Test

### Local
```bash
    npm start
```
Accessible sur localhost:3000

### Docker
```bash 
    # Run container
    docker run -p 8080:3000 egistry.gitlab.com/atoute/app 
```

Accessible sur localhost:8080
