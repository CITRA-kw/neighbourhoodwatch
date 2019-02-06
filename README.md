# Neighbourwatch(BETA)
The goal of Neighbourwatch is to ensure all local traffic remains local to Kuwait. Local Traffic leaks causing additional performance degradation, security risk, waste of resources, and has a negative financial impact. Neighbourwatch is a tool that compares routes advertised to the Internet are advised to the ixkw exchange (Kuwait Local Traffic Exchange) and generates a reports.

## Getting Started
Using Neighbourwatch is easy to install and use.

### Installing
Use NPM to install:
```
npm install -g neighbourhoodwatch
```

### Update
Use NPM to update:
```
npm update -g neighbourhoodwatch
```

### Usage
Neighbourhoodwatch supports multiple functionality:

#### list | ls
List all differences between selected speaker and ixkw route servers.
```
neighbourhoodwatch list [speaker alias]
```
#### list example
```
neighbourhoodwatch list gulfnet

//output

┌─────────┬────────────────────┐
│ (index) │       Values       │
├─────────┼────────────────────┤
│    0    │  '46.31.64.0/24'   │
│    1    │  '46.31.64.0/23'   │
│    2    │  '46.31.65.0/24'   │
│    3    │  '46.31.70.0/23'   │
│    4    │  '46.31.70.0/24'   │
│    5    │  '46.31.71.0/24'   │
│    6    │ '91.140.244.0/24'  │
│    7    │ '91.140.249.0/24'  │
│    8    │ '91.209.172.0/24'  │
│    9    │ '185.187.176.0/24' │
│   10    │ '188.231.12.0/24'  │
│   11    │ '188.231.14.0/24'  │
│   12    │ '194.54.238.0/24'  │
│   13    │ '194.54.238.0/23'  │
│   14    │ '194.126.32.0/23'  │
│   15    │ '194.126.32.0/24'  │
│   16    │ '194.126.37.0/24'  │
│   17    │ '194.126.40.0/24'  │
│   18    │ '194.126.51.0/24'  │
│   19    │ '194.126.63.0/24'  │
│   20    │ '213.132.227.0/24' │
└─────────┴────────────────────┘
ixkw difference to Internet: -21 / ixkw: 74 / Internet: 95
```

#### missing | m
List all missing prefixes from ixkw route servers compare to the internet for all Kuwait registered IPs.
```
neighbourhoodwatch missing
```
#### missing example
```
....

│   739   │   '188.71.96.0/20'   │
│   740   │  '217.69.176.0/24'   │
│   741   │  '217.69.187.0/24'   │
│   742   │   '78.89.135.0/24'   │
│   743   │   '78.89.160.0/22'   │
│   744   │   '78.89.164.0/22'   │
│   745   │   '78.89.176.0/22'   │
└─────────┴──────────────────────┘
Total Routes of in ixkw: 1715
Total Routes of Kuwait: 1846
Difference: -131
```
#### speakers | s
List all BGP Speakers in Kuwait
```
neighbourhoodwatch speakers
```
#### speakers example
```
neighbourhoodwatch speakers

//output

Kuwait BGP Speakers
-------------------

ISPs/MNOs
---------
Gulfnet / AS3225
KEMS / AS6412
Zajil Kuwait / AS42781
Qualitynet / AS9155
Fasttelco / AS21050
Kuwait Data Center / AS43852
Zain Kuwait / AS42961
Ooredoo Kuwait / AS29357
Viva Kuwait / AS47589
Mada Kuwait / AS47442

...
```

### Supported ISPs / MNOs
| BGP Speaker   | Speaker Alias     |
| ------------- | -------------     |
| Gulfnet       | gulfnet           |
| KEMS          | kems              |
| Zajil Kuwait  | kems  *Unified    |
| Qualitynet    | qnet              |
| Fasttelco     | fast              |
| Kuwait Data Center| fast *Unified |
| Zain Kuwait   | zainkw            | 
| Ooredoo Kuwait| ooredookw         |  
| Viva Kuwait   | Not Connected     | 
| Mada Kuwait   | madakw            |

## Roadmap
Please open an issue for additional requested features.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details