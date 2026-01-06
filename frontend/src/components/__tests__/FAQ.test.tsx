import "@testing-library/jest-dom";
import {screen, render} from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import FAQ from "../FAQ";


describe("FAQ compontene test ", () => { 

beforeEach(() => { 
render(<FAQ/>) 
})

it("should the title render", () => {
 const header = screen.getByRole("heading", {level:2}) 
 expect(header).toHaveTextContent("Frequently Asked Questions")
 expect(header).toBeInTheDocument()

})

it.only("should toogle the FQA description", async () => {
const buttons = [0,1,2,3,4] 

buttons.forEach(async (index) =>{ 
const buttons = screen.getByTestId(`plus_btn_${index}`)
expect(buttons).toBeInTheDocument()

const element = screen.getByTestId(`indicator_${index}`)
expect(element).toBeInTheDocument()
console.log(element.getAttribute("style"))

// initially closed
// expect(element).toHaveStyle("gridTemplateRows:0fr")
expect(element).toHaveStyle("grid-template-rows: 0fr")

// click to open
await userEvent.click(buttons)
// expect(element).toHaveStyle("gridTemplateRows:1fr")
expect(element).toHaveStyle("grid-template-rows: 1fr")

console.log(element.getAttribute("style"))


})

})



})



