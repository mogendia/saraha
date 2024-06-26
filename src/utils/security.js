import bcrypt from "bcryptjs"

export const hash = ({plainText , salt = process.env.SALT_ROUND}={})=>{
    const hashResult = bcrypt.hashSync(plainText, parseInt(salt))
    return hashResult
}

export const compare = ({plainText, hashValue}={})=>{
   
    const match = bcrypt.compareSync(plainText, hashValue)
    return match
}