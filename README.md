# vercel_auth_protected
Demo on how to use fetch extract cookie for next page.


## does not work
This code use fetch PUT and out result to fetch_not_work_STATUS.html

```
node .\fetch_not_work.js
```

## This code work
This use to fetch call.
1. fetch PUT to auth user and get cookie
2. get cookie from PUT and use it for redirected url GET
3. output result to fetch_work_STATUS.html

```
node .\fetch_work.js
```