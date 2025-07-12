import "@testing-library/jest-dom"
import { screen, render } from "@testing-library/react"
import Auth from "./page"


describe("Auth Component", () => {
    it("it should render the login form by default", () => {
        render(<Auth />)
        const loginForm = screen.getByText(/Login to continue to CodeSync/i)
        expect(loginForm).toBeInTheDocument()
    })
})

