```
bun install
bun run dev
```

```
open http://localhost:3000
```


maybe use this if prismock library does not work

    "itest": "yarn test:dbreset",
    "test:dbreset": "export $(cat .env.test | xargs) && prisma migrate reset --force"

