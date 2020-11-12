import React, { useCallback, useEffect, useState } from "react"
import { BrowserRouter } from "react-router-dom"
import { useAlert } from "react-alert"
import Routes from "../routes/Routes"
import EasterEggImg from "../assets/img/easterEgg/easter_egg.jpg"
import "../assets/css/EasterEgg.css"

const App: React.FC = () => {
    const alert: any = useAlert()
    const [keyPressed, setKeyPressed] = useState<boolean>(false)
    const [isMousePosition, setIsMousePosition] = useState<boolean>(false)
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)

    const keyDownHandler = useCallback(e => {
        if (e.keyCode === 17) {
            setKeyPressed(true)
        }
    }, [])

    const keyUpHandler = useCallback(e => {
        if (e.keyCode === 17) {
            const elements = document.querySelectorAll(".easter-egg-container")
            if (elements.length > 0) {
                elements.item(0).remove()
            }
            setKeyPressed(false)
            setIsMousePosition(false)
            setIsAlertOpen(false)
        }
    }, [])

    const mouseHandler = useCallback(e => {
        if (e.clientX > window.innerWidth - 100 && e.clientY < 100) {
            setIsMousePosition(true)
        }
        else {
            const elements = document.querySelectorAll(".easter-egg-container")
            if (elements.length > 0) {
                elements.item(0).remove()
                setKeyPressed(false)
                setIsMousePosition(false)
                setIsAlertOpen(false)
            }
        }
    }, [])

    if (keyPressed && isMousePosition && !isAlertOpen) {
        alert.show(
            <div className="easter-egg">
                <img src={EasterEggImg} width="150px" alt="easter egg" />
                <p>Quand la fin du sprint approche mais qu"il reste encore beaucoup de tickets "en cours"</p>
            </div>,
            {
                onOpen: () => {
                    setIsAlertOpen(true)
                }
            }
        )
    }

    useEffect(() => {
        window.addEventListener("keydown", keyDownHandler)
        window.addEventListener("keyup", keyUpHandler)
        window.addEventListener("mousemove", mouseHandler)

        return () => {
            window.removeEventListener("keydown", keyDownHandler)
            window.removeEventListener("mousemove", mouseHandler)
            window.removeEventListener("keyup", keyUpHandler)
        }
    }, [keyDownHandler, keyUpHandler, mouseHandler])

    return (
        <BrowserRouter>
            <Routes />
        </BrowserRouter>
    )
}

export default App
