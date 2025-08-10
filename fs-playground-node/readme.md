## Example Usage
```bash
node cli.js mkdir testFolder
node cli.js cd testFolder
node cli.js write file1.txt "Hello"
node cli.js append file1.txt " World"
node cli.js read file1.txt
node cli.js copy file1.txt file2.txt
node cli.js move file2.txt moved.txt
node cli.js delete moved.txt
node cli.js cd ..
node cli.js rmdir testFolder
```