import React, { useState } from 'react'

const Document = () => {
    const [mouseX, handleMouseX] = useState(0)
    const [mouseY, handleMouseY] = useState(0)
    const [menuDisplay, handleMenuDisplay] = useState('none')
    const [holdMenu, handleHoldMenu] = useState(false)
    const [isMenuOpened, handleMenuOpenState] = useState('MENU_CLOSED')
    const [popupDisplay, handlePopupDisplay] = useState('none')

    const handleMouseMovement = (evt) => {
        if(!holdMenu){
            handleMouseX(evt.clientX)
            handleMouseY(evt.clientY)
        }
    }

    const handleMenuPopup = (x, y) => evt => {
        evt.preventDefault()
        switch (isMenuOpened) {
            case 'MENU_OPENED':
                handleHoldMenu(true)
                handleMenuOpenState('MENU_CLOSED')
                handleMouseX(evt.clientX)
                handleMouseY(evt.clientY)
                break
            case 'MENU_CLOSED':
                handleHoldMenu(true)
                handleMenuDisplay('block')
                handleMenuOpenState('MENU_OPENED')
                handleMouseX(evt.clientX)
                handleMouseY(evt.clientY)
                break
            default:
                console.log('default')
        }
    }

    const handleMenuClose = (evt) => {
        handleHoldMenu(false)
        handleMenuDisplay('none')
        handleMenuOpenState('MENU_CLOSED')
    }

    const handleWrapperClick = (evt) => {
        if (isMenuOpened === 'MENU_OPENED' || isMenuOpened === 'MENU_CLOSED'){
            handleMenuClose()
        }
    }

    const handleSampleAction = () => {
        handleMenuClose()
        handlePopupDisplay('block')
    }

    const closePopup = () => {
        handlePopupDisplay('none')
    }

    return (
        <React.Fragment>
            <div onClick={handleWrapperClick} onContextMenu={handleMenuPopup(mouseX, mouseY)} onMouseMove={handleMouseMovement} style={{ height: '90vh', width: '100%', backgroundColor: '#dedede', marginTop: '65px', color: '#fefefe' }}>
                MouseX: {mouseX}  MouseY: {mouseY}
            </div>
            <div style={{ position: 'fixed', display: `${menuDisplay}`, top: `${mouseY}px`, left: `${mouseX}px`, width: '100px', height: '100px', backgroundColor: '#abcdef' }}>
                <button onClick={handleSampleAction}>Sample Action</button>
                <button onClick={handleMenuClose} style={{ position: 'fixed', display: `${menuDisplay}`, top: `${mouseY - 10}px`, left: `${mouseX + 110}px`, color: '#fff' }}>X</button>
            </div>
            <div style={{ display: `${popupDisplay}`, position: 'fixed', top: '40vh', left: '40%', width: '20%', height: '20vh', backgroundColor: '#1f1f1f'}}>
                SAMPLE POPUP XD 
                <button onClick={closePopup}>Close Popup</button>
            </div>
        </React.Fragment>
    )
}

export default Document
