import React, { Component } from 'react'
import Screenshots from 'react-screenshots'
import 'react-screenshots/dist/screenshots.css'
import image from 'react-screenshots/src/web/Battlecry.jpg'

export default class rainDrop extends Component {
    onSave = ({ viewer, dataURL }) => {
        console.log('SCREENSHOTS::SAVE', dataURL, viewer)
    }

    onCancel = () => {
        console.log('SCREENSHOTS::CANCEL')
    }

    onOk = ({ dataURL, viewer }) => {
        console.log('SCREENSHOTS::OK', dataURL, viewer)
    }

    render() {
        return (
            <div>
                <div>
                    <span>屏幕截图工具web版</span>
                    <a target="_blank" rel="noopener noreferrer" href="https://github.com/Hilbertangers/screenshots">仓库</a>
                </div>
                <Screenshots
                    image={image}
                    width={500}
                    height={600}
                    onSave={this.onSave}
                    onCancel={this.onCancel}
                    onOk={this.onOk}
                />
            </div>
        )
    }
}
