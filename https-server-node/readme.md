# Test HTML and static files
Run:

```bash
node server.js
```
Visit:

`https://localhost:4433/` → homepage

`https://localhost:4433/about` → about page

`https://localhost:4433/public/style.css` → CSS file

Browser will apply the CSS to the homepage.

# Test API
### get notes
```bash
curl -k https://localhost:4433/api/notes
```

### add a note
```bash
curl -k -X POST https://localhost:4433/api/notes \
  -H "Content-Type: application/json" \
  -d '{"text": "My first API note"}'
```

### delete a note
```bash
curl -k -X DELETE https://localhost:4433/api/notes/1
```