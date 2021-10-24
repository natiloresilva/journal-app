import React from 'react'

export const NotesAppBar = () => {
    return (
        <div className="notes__appbar">
            <span>24 de Octubre 2021</span>

            <div>
                <button className="btn">
                    Picture
                </button>

                <button className="btn">
                    Save
                </button>
            </div>
        </div>
    )
}