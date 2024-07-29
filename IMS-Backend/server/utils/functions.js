function generateOTP(length = 6) {

    // Declare a digits variable  
    // which stores all digits  
    let digits = '0123456789';
    let OTP = '';
    let len = digits.length
    for (let i = 0; i < length; i++) {
        OTP += digits[Math.floor(Math.random() * len)];
    }
    return OTP;
}

module.exports = {
    generateOTP
}