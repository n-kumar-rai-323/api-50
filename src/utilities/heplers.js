const randomStringGenerator = ( len = 100)=>{
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let length = characters.length; 
    let random = '';
    for ( let i = 0; i < len; i++ ) {
        let positon=Math.ceil(Math.random() * (length-1));
        random += characters.charAt(positon);
    }
    return random;
}

module.exports = { randomStringGenerator };