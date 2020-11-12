import React from "react"
import { shallow } from "enzyme"
import Login from "../../../components/pages/auth/Login"
// import { loginApi } from "../../../components/pages/auth/includes/authApi"
// jest.mock("../../../api/ApiRequest")

it("test <Login /> render", () => {
    const location = { state: undefined }
    shallow(<Login location={location} />)
})

/*
it("renders Login view", () => {
    const location = { state: undefined }
    const wrapper = shallow(<Login location={location} />)

    const emailInput = wrapper.find(".form-auth-input").at(0)
    const passInput = wrapper.find(".form-auth-input").at(1)
    emailInput.simulate("change", { target: { value: "test@test.com" } })
    passInput.simulate("change", { target: { value: "test" } })

    const form = wrapper.find("form")
    form.simulate("submit", {
        preventDefault: () => {},
        target: {
            elements: {
                emailInput: { value: "test@test.com" },
                passInput: { value: "test" }
            }
        }
    })

    // TODO find a way to mock api call

    loginApi("email", "password").then(res => {
        expect(res.success).toEqual(true)
    })
})
*/
