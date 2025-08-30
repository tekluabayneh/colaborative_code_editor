jest.mock("../../models/Owners", () => ({
		__esModule: true,   
		default: {
			find: jest.fn(),
			findOne: jest.fn(),
		}
	}));

	jest.mock("../../models/user", () => ({
		__esModule: true,   
		default: {
			find: jest.fn(),
			findOne: jest.fn(),
		}
	}));

import validator from "../validator"
import Owners from "../../models/Owners"
import Users from "../../models/user"

describe("test validate utils", () => { 

	it("should return false since email is invalid", () => { 
		const result = validator.validateEmailAndPassword("password", "fakeEmail@gmail") 
		expect(result).toBe(false)
	}) 

	it("should return false since email is missing @", () => { 
		const result = validator.validateEmailAndPassword("password", "fakeEmail#gmail.com") 
		expect(result).toBe(false)
	}) 

	it("should return false since password length is less than 6", () => { 
		const result = validator.validateEmailAndPassword("pass", "tekluabayneh@gmail.com")
		expect(result).toBe(false)
	}) 

	it("should return true since password and email are valid input", () => { 
		const result = validator.validateEmailAndPassword("password", "tekluabayneh@gmail.com")
		expect(result).toBe(true)
	}) 



}) 

	// ============================ /// ======================== 

describe("db mock validation", () => { 
it("should return user does not exist message", async () => {
  (Owners.find as jest.Mock).mockResolvedValueOnce([]);

  const email = "fakeEmail@gamil.com";
  expect(await validator.isUserAlreadyRegistered(email)).toBeFalsy();
});

})

