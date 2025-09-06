
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

// jest.mock("../document.controller", () => ({ 
//  GetAllOwnerFolderTree: jest.fn(() => { 
// 		// Promise.resolve({fileTree: []})
// 		fileTree:[]
// 	})
//  }))

import { Request, Response } from "express"
import DocController from "../document.controller"
import { GetAllOwnerFolderTree } from "../document.controller"
import Owners from "../../models/Owners"

describe("document controller test", () => { 

	const req = { 
		body:{ 
			email:"",
		}} as Request

	const res ={ 
		status:jest.fn().mockReturnThis(),
		json:jest.fn()
	} as unknown as Response
       
	it("should not fetch any folder tree if email are not provided", async () => { 
		await DocController.GetAllFolderTree(req, res)

           expect(res.status).toHaveBeenCalledWith(400)
           expect(res.json).toHaveBeenCalledWith({message:"email is mandatory"})
	})


	it("should not collect any file tree if user is not found", async () => { 

	const req = { 
		body:{ 
			email:"man@gmail.com",
		}} as Request


		await DocController.GetAllFolderTree(req, res);
	               await GetAllOwnerFolderTree(req, res);
		(Owners.insertOne as jest.Mock).mockReturnValueOnce([])



		   expect(res.status).toHaveBeenCalledWith(404)
		   expect(res.json).toHaveBeenCalledWith({message:"user not found"})

		})


	})
