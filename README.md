# Frontend for "Odd Number" web app
## An anonymous platform to help user idenfity un-familiar phone call number
<br/>
<br/>

## **Basic function of the web app:**
- User can search for any U.S phone number.
- User who knows some info of any phone number can post message to inform others.
- User can like or dislike other's message to help highlight useful information.
<br/>
<br/>

## **Implementation details:**
- Re-usable function components by `react.js`
- Multi-page structure enabled by `react-dom`
- State management through `react hooks`, useState, useEffect, useRef
- http request via async/await `axios`
- css styling with `bootstrap5` and some manual tweaking
<br/>
<br/>

## **Simple frontend authentication mechanism:**
- Since this is an anonymous platform, anyone can post message. Sometimes user would like to delete or change the post, but it doesn't make sense to allow any user to delete any message on the website, as he/she might not be the post owner.
- A simple mechanism is therefore included via `browser cookie`.
- Every message contains a message id which is an encrypted string from user's brower cookie.
- When user wants to delete certain message, frontend will check if this message id matches user's browser cookie by encrypting user's cookie and compare the result with message id. If it is a match, the delete action is permitted.
- Message id is public, and exposed to browser's inspection tool, but user can't use it to back-calculate the message owner's cookie value since the encryption is one-way only.
<br/>
<br/>

### _For backend implementation, please check the repository: ['Odd Number' Backend](https://github.com/RupertDeng/odd-number.backend)_

