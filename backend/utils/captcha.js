exports.generatecaptcha=()=>{
    const chars='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let captcha='';
    for(let i=0;i<5;i++){
        captcha+=chars.charAt(Math.floor(Math.random()*chars.length));
    }
    return captcha;
}