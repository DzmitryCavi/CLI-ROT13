
## Caesar cipher CLI tool



**Installation:**

```
$ git clone https://github.com/DzmitryCavi/Caesar-cipher-CLI-tool.git

$ cd Caesar-cipher-CLI-tool/

$ npm i -g
```

**Usage example:**

CLI tool accept 4 options:

1.  **-s, --shift**: a shift
2.  **-i, --input**: an input file
3.  **-o, --output**: an output file
4.  **-a, --action**: an action encode/decode

Encode 1.txt to 2.txt with shift 7:
```bash
$ CC -s 7 -i "./1.txt" -o "./2.txt" -a encode 
```
Decode 2.txt to 3.txt with shift 7:
```bash
$ CC  --shift 7 --input 2.txt --output 3.txt --action decode
```
Decode stdin to stdout with shift 7:
```bash
$ CC --action decode --shift 7
```
Encode 1.txt to 2.txt with shift 13:
```bash
$ npm run encode
```
Decode 2.txt to 1.txt with shift 13:
```bash
$ npm run decode
```


