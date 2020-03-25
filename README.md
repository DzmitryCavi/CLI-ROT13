
## Caesar cipher CLI tool

CLI tool accept 4 options:

1.  **-s, --shift**: a shift
2.  **-i, --input**: an input file
3.  **-o, --output**: an output file
4.  **-a, --action**: an action encode/decode

**Installation:**

...

**Usage example:**

```bash
$ CC -s 7 -i "./input.txt" -o "./output.txt" -a encode
```

```bash
$ CC  --shift 7 --input plain.txt --output encoded.txt --action encode
```

```bash
$ CC --action decode --shift 7 --input decoded.txt --output plain.txt
```

