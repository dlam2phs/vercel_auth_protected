/*
    this code will 

    POST auth, 
    GET cookie
    use cookie for redirect GET
    save out to fetch_work.html
*/
const fs = require("fs");
(async () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    let urlencoded = new URLSearchParams();
    urlencoded.append("_vercel_password", "password"); 

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'manual'  // KEY prevent fetch redirect to read cookie 
    };
    // do a POST to get cookie for next get
    const resp = await fetch("https://nextjs-demo-ebon-iota.vercel.app/", requestOptions)
    // redirect
    if ([301, 302, 303, 304, 306, 307, 308].includes(resp.status)) {
        let myHeadersWithCookie = new Headers()
        let vercelCookie = resp.headers.get('set-cookie') // get cookie from PUT
        myHeadersWithCookie.append("Cookie", vercelCookie);
        const requestOptionsWithNewCookie = {
            method: 'GET',
            headers: myHeadersWithCookie,
            //  credentials: "include",
        };
        const resWithCookie = await fetch(resp.url, requestOptionsWithNewCookie)
        resWithCookie.text().then((body) => {
            fs.writeFileSync(`fetch_not_work_${resWithCookie.status}.html`, body);
        })
    }
    // no redirect 
    else {
        resp.text().then((body) => {
            fs.writeFileSync(`fetch_not_work_${resp.status}.html`, body);
          
        }
        )
    }
})()
