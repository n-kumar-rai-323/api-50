const randomStringGenerator = (len = 100) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charsLength = characters.length;
    let random = '';

    for (let i = 0; i < len; i++) {
        const position = Math.floor(Math.random() * charsLength);
        random += characters.charAt(position);
    }
    return random;
};

module.exports = { randomStringGenerator };
