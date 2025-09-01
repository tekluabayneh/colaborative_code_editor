jest.mock("../../models/Owners", () => ({ 
	find:jest.fn(),
	findOne:jest.fn(),
	insertOne: jest.fn()
}))

jest.mock("../../models/user", () => ({ 
	find:jest.fn(),
	findOne:jest.fn(),
}))
jest.mock("nanoid" , () => ({ 
	nanoid: jest.fn()
}))

beforeEach(() => { 
jest.clearAllMocks()
})

import controllers from "../auth.controller" 
import Owners from "../../models/Owners"
import Users from "../../models/user"
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

		(Owners.insertOne as jest.Mock).mockReturnValueOnce([])


		await controllers.Register(req, res)

		expect(res.status).toHaveBeenCalledWith(400)
		expect(res.json).toHaveBeenCalledWith({message:'User was not registered correctly'}) 

	})


	it("should not register user already exits", async() => { 
		const res = {
			status: jest.fn().mockReturnThis(), 
			json: jest.fn()
		} as unknown as Response 

		const req = { 
			body:{
				userName:"fakeName", 
				email:"fake@gamil.com", 
				password:"123456"
			} } as Request

		(Owners.insertOne as jest.Mock).mockRejectedValueOnce(() => { 
			throw new Error("user alrady exits")
		})


		await controllers.Register(req, res)

		expect(res.status).toHaveBeenCalledWith(400)
		expect(res.json).toHaveBeenCalledWith({message:'User was not registered correctly'}) 

	})




	it("should not register user already exits", async() => { 
		const res = {
			status: jest.fn().mockReturnThis(), 
			json: jest.fn()
		} as unknown as Response 

		const req = { 
			body:{
				userName:"fakeName", 
				email:"fake@gamil.com", 
				password:"123456"
			} } as Request

		(Owners.insertOne as jest.Mock).mockReturnValueOnce({
			acknowledged: true,
			insertedId:"fakeId",
			_id:"fakeId"
		})


		await controllers.Register(req, res)

		expect(res.status).toHaveBeenCalledWith(200)
		expect(res.json).toHaveBeenCalledWith({message:'Registration successful'}) 

	})

})



describe("login test", () => { 

	it("should not login user if the user does not exists in db", async () => { 
		const res = { 
			status:jest.fn().mockReturnThis(),
			json:jest.fn(),
		} as unknown as Response 
		const req = { 
			body:{ 
				email:"fakegmail.com",
				password:"123456",
			} 
		} as Request
                 (Owners.findOne as jest.Mock).mockRejectedValueOnce(null)

		await controllers.Login(req, res)


           expect(res.status).toHaveBeenCalledWith(400)
           expect(res.json).toHaveBeenCalledWith({message:"user not found"})
	})

	it("should not login if password is empty register them as oauth login user", async () => { 
		const res = { 
			status:jest.fn().mockReturnThis(),
			json:jest.fn(),
		} as unknown as Response 
		const req = { 
			body:{ 
				email:"fake@gmail.com",
				password:"",
			} 
		} as Request

             (Owners.findOne as jest.Mock).mockReturnValueOnce({ 
			acknowledged: true,
			insertedId:"fakeId",
			_id:"fakeId"})


		await controllers.Login(req, res)


           expect(res.status).toHaveBeenCalledWith(400)
           expect(res.json).toHaveBeenCalledWith({ message: "This account was created using Google or GitHub. Please log in with that provider."})

	})


})
