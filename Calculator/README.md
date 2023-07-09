# What I learn.
- To make an alert for user:
```js
// to install
    npm install --save react-toastify  
    npm install react-toastify --save
// when we use 
    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';

    // how to use
    const notify = () => toast("Wow so easy!");
    // in return.
        <ToastContainer />

```