import app from "./app.js";

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';
app.listen(PORT, HOST, function(){
    console.log(`Server start on port ${PORT}`);
});

