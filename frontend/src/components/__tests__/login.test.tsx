import "@testing-library/jest-dom"
import { screen, render, waitFor } from "@testing-library/react"
import Login from "../login"

const orginalFetch = global.fetch
describe("Login Component", () => {
    beforeEach(() => {
        render(<Login toogle={() => { }} />)
    })

    afterEach(() => {
        global.fetch = orginalFetch
    })


    it("should render the login form", async () => {
        const mockedData = {
            email: "sdfjsdklfjsl"
        }
        // @ts-expect-error global fetch will be replaced by other methond later
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ success: true, data: mockedData })
            })
        )

        await waitFor(() => {
            const loginForm = screen.getByText(/Login to continue to CodeSync/i)
            expect(loginForm).toBeInTheDocument()
        })
    })

})



