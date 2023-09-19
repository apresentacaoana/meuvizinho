export default function verifierProps(user) {
    if(user.role === 'admin') return "admin"
    if(!user.bairro || !user.state || !user.country || !user.address_number || !user.street) return "missingInfo";
    if(!user.verified) return "validation"
    if(!user.buyAt) return "subscribe"
}