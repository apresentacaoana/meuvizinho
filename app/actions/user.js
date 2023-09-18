export default function verifierProps(user) {
    
    if(!user.bairro || !user.state || !user.country || !user.address_number || !user.street) return "missingInfo";
    if(!user.verified) return "validation"
}