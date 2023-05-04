/*
    this code will one PUT fetch and using redirect follow
    POST auth, 
    GET cookie
    use cookie for redirect GET
    save out to fetch_not_STATUS_CODE.html 
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
        redirect: 'follow'  // KEY prevent fetch redirect to read cookie 
    };
    // do a POST to get cookie for next get
    const resp = await fetch("https://nextjs-demo-ebon-iota.vercel.app/", requestOptions)
    resp.text().then((body) => {
        fs.writeFileSync(`fetch_not_work_${resp.status}.html`, body);
       
    })

})()