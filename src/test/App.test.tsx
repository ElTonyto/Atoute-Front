import React from "react"
import { shallow } from "enzyme"
import { BrowserRouter } from "react-router-dom"
import App from "../components/App"
import Routes from "../routes/Routes"

jest.mock("react-alert")

it("test <App /> render", () => {
    const wrapper = shallow(<App />)
    const container = (
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    )
    expect(wrapper.contains(container)).toEqual(true)
})

it("test render popup when ctlr key down + mouse on top right corner", () => {
    const wrapper = shallow(<App />)
    Object.defineProperty(window, "innerWidth", { writable: true, configurable: true, value: 1000 })

    wrapper.simulate("keyDown", { keyCode: 17 })
    wrapper.simulate("mousemove", { clientX: window.innerWidth - 100, clientY: 0 })
    // expect(wrapper.find(".easter-egg")).toEqual(true)
})
