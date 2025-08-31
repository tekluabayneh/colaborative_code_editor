jest.mock("../../models/Owners", () => ({ 
	find:jest.fn(),
	findOne:jest.fn(),
        insertOne: jest.fn()
}))

jest.mock("../../models/user", () => ({ 
	find:jest.fn(),
	findOne:jest.fn(),
}))


import controllers from "../auth.controller" 
import Owners from "../../models/Owners"
import Users from "../../models/user"
jest.mock("nanoid" , () => ({ 
nanoid: jest.fn()
}))
import {Request, Response} from "express"
describe("register auth controller test", () => { 

	it("should not register user if input are invalid", async() => { 
		const res = {
			status: jest.fn().mockReturnThis(), 
			json: jest.fn()
		} as unknown as Response 

		const req = { 
			body:{
				userName:"fakeName", 
				email:"fake@gamil.com", 
				password:""
			} } as Request

		  (Owners.insertOne as jest.Mock).mockReturnValueOnce({acknadegmen:false})


		await controllers.Register(req, res)
                 
       expect(res.status).toHaveBeenCalledWith(400)
      expect(res.json).toHaveBeenCalledWith({message:'User was not registered correctly'}) 

	})

})
