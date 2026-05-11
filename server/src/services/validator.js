const webDomainAllow=[
    'mercadolibre.com.mx',
    'amazon.com.mx',
    'amazon.com',
    'ebay.com',
    'facebook.com/marketplace',
]

const validatorURL=(url)=>{
    try {
        const urlObj = new URL(url);
        //Verify if the hostname of the URL includes any of the allowed domains
        return webDomainAllow.some(domain => urlObj.hostname.includes(domain));
    } catch (error) {
        console.error('Invalid URL:', error);
        return false;
    }
}

module.exports = {validatorURL}