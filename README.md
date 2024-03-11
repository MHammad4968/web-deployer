# Web-Deployer
Trying to make something like Vercel/Netlify (to learn primarily).

## NOTE: In development. Not fully functional yet.
Learning from @hkirat's video: https://youtu.be/c8_tafixiAs?feature=shared 
**BUT, making some changes.**


## Architecture
### Upload Service
Sends a post request to a node server to clone a github repo. A page to do this is included in **./frontend.**
### Request handler. 
Very simple express server. Simply fetches the requested file from AWS S3.

## Deviations from Harkirat's approach 
[List will keep getting updated]
- Using Amazon S3 instead of Cloudflare R2 [for the time being]
- Getting access token/secret from environment variables, rather than keeping them locally in the file.
- For the time being, no "deploy" function to compile from React to HTML/CSS. Assuming project uploaded is simply HTML/CSS/JS, and PNG/JPEG images. The rest is classified as plaintext.
