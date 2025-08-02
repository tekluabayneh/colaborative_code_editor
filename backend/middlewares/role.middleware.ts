
import validator from "../Utils/validator"
const {isUserRoleOwnerOrUser} = validator

const checkRole = async (email: string) => {
       return await isUserRoleOwnerOrUser(email)
}


export default checkRole;
