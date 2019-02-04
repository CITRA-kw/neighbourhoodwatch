# Neighbourwatch
The goal of Neighbourwatch is to ensure all local traffic remains local to Kuwait. Local Traffic leaks causing additional performance degradation, security risk, waste of resources, and has a negative financial impact. Neighbourwatch is a tool that compares routes advertised to the Internet are advised to the ixkw exchange (Kuwait Local Traffic Exchange) and generates a reports.

## Getting Started
Using Neighbourwatch is easy to install and use.

### Installing
Use NPM to install ():
```
npm install -g neighbourhoodwatch
```
### Usage
Neighbourhoodwatch supports multiple functionality:

#### list/ls
List all differences between selected speaker and ixkw route servers.
```
neighbourhoodwatch list [speaker alias]
```

#### all/a
List all differences between selected ixkw route servers and the internet for all speakers
```
neighbourhoodwatch all
```

#### missing/m
List all missing prefixes from ixkw route servers compare to the internet for all Kuwait registered IPs.
```
neighbourhoodwatch missing
```

### Supported ISPs / MNOs
| BGP Speaker   | Command Alias     |
| ------------- | -------------     |
| Gulfnet       | gulfnet           |
| KEMS          | kems              |
| Zajil Kuwait  | (Unfied with kems)|
| Qualitynet    | qnet              |
| Fasttelco     | fast              |
| Kuwait Data Center| (Unfied with fast)|
| Zain Kuwait   | zainkw            | 
| Ooredoo Kuwait| ooredookw         |  
| Viva Kuwait   | Not Supported     | 
| Mada Kuwait   | madakw            |