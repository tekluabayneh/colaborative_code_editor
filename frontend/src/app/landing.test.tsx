import "@testing-library/jest-dom";
import Landing from "./page";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as nextNavigation  from "next/navigation"
jest.mock("next/navigation", () => ({ 
 useRouter: jest.fn() 
 }))

describe("check if the landing page is rendeinng the component propely", () => { 
  it("check if component are render", () =>{ 
    const {container} = render(<Landing/>);
    expect(container).toMatchSnapshot()
  })


	it("assert buttons for auth", () => { 
             render(<Landing/>);
         const RegButton = screen.getByRole("button", {name:/Register Now/i})
         const SignButton = screen.getByRole("button", {name:/Sign in/i})
         const StartButton = screen.getByRole("button", {name:/Start today for free/i})

         expect(RegButton).toBeInTheDocument()          
         expect(SignButton).toBeInTheDocument()          
         expect(StartButton).toBeInTheDocument()          

	})

	it("sign in button should navigate to Auth url", async () => { 
         	 const push:jest.Mock<void, [string]> = jest.fn()
             render(<Landing/>);
            const RegButton = screen.getByRole("button", {name:/Register Now/i})

              await userEvent.click(RegButton)	
              expect(push).toHaveBeenCalledWith("/Auth") 
	})

     it.only("should toggle the editor perview image", async () => { 
             render(<Landing/>);
	const EditorBtn  = screen.getByRole("button", {name:/code editor/i}) 
	const CustomEditorBtn  = screen.getByRole("button", {name:/custom editor/i}) 

       expect(EditorBtn).toBeInTheDocument()
       expect(CustomEditorBtn).toBeInTheDocument()

        await userEvent.hover(EditorBtn) 
        expect(EditorBtn).toHaveClass("cursor-pointer")
 
        await userEvent.hover(CustomEditorBtn) 
        expect(EditorBtn).toHaveClass("cursor-pointer")
                 
       await userEvent.click(EditorBtn) 
	expect(EditorBtn).toHaveClass("bg-white text-black shadow-lg shadow-white/20") 


       await userEvent.click(CustomEditorBtn) 
	expect(CustomEditorBtn).toHaveClass("bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-600/30") 


     })
      

}) 

