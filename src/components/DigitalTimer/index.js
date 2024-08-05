// Write your code here
import './index.css'
import {Component} from 'react'

const initialState = {
  min: 25,
  sec: 0,
  isTimerRunning: false,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.cti()
  }

  cti = () => clearInterval(this.timerId)

  posClick = () => {
    this.setState(prev => ({min: prev.min + 1}))
  }

  negClick = () => {
    const {min} = this.state
    if (min > 1) this.setState(prev => ({min: prev.min - 1}))
  }

  resetChange = () => {
    this.cti()
    this.setState(initialState)
  }

  incSec = () => {
    const {min, sec} = this.state
    const isTimerCompleted = sec === min * 60

    if (isTimerCompleted) {
      this.cti()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prev => ({sec: prev.sec + 1}))
    }
  }

  onChangeStartOrPause = () => {
    const {min, sec, isTimerRunning} = this.state
    const isTimerCompleted = sec === min * 60

    if (isTimerCompleted) {
      this.setState({sec: 0})
    }
    if (isTimerRunning) {
      this.cti()
    } else {
      this.timerId = setInterval(this.incSec, 1000)
    }
    this.setState(prev => ({isTimerRunning: !prev.isTimerRunning}))
  }

  getSecInTimeFormat = () => {
    const {min, sec} = this.state
    const totalSec = min * 60 - sec

    const totalMinutes = Math.floor(totalSec / 60)
    const totalSeconds = Math.floor(totalSec % 60)

    const stringifiedMin = totalMinutes > 9 ? totalMinutes : `0${totalMinutes}`
    const stringifiedSec = totalSeconds > 9 ? totalSeconds : `0${totalSeconds}`

    return `${stringifiedMin}:${stringifiedSec}`
  }

  render() {
    const {min, sec, isTimerRunning} = this.state
    const imgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altDesc = isTimerRunning ? 'pause icon' : 'play icon'
    const desc = isTimerRunning ? 'Pause' : 'Start'
    const circleDesc = isTimerRunning ? 'Running' : 'paused'
    const btnDisabled = sec > 0
    console.log(sec)

    return (
      <div className="bg1">
        <div className="bg2">
          <h1 className="h1">Digital Timer</h1>
          <div className="bg3">
            <div className="bg4">
              <div className="bg44">
                <div className="circle-bg">
                  <div className="time-bg">
                    <h1 className="time">{this.getSecInTimeFormat()}</h1>
                  </div>
                  <div className="run-bg">
                    <p className="run">{circleDesc}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg5">
              <div className="icon-bg">
                <div className="icon-bg1">
                  <div className="icon-img-bg">
                    <button
                      className="icon-btn"
                      type="button"
                      onClick={this.onChangeStartOrPause}
                    >
                      <img src={imgUrl} alt={altDesc} className="icon-img" />
                    </button>
                  </div>
                  <div className="icon-img-bg">
                    <button
                      className="icon-h icon-btn"
                      type="button"
                      onClick={this.onChangeStartOrPause}
                    >
                      {desc}
                    </button>
                  </div>
                </div>
                <div className="icon-bg2">
                  <div className="icon-img-bg">
                    <button
                      className="icon-btn"
                      type="button"
                      onClick={this.resetChange}
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                        alt="reset icon"
                        className="icon-img"
                      />
                    </button>
                  </div>
                  <div className="icon-img-bg">
                    <button
                      className="icon-h icon-btn"
                      type="button"
                      onClick={this.resetChange}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
              <p className="set-para">Set Timer limit</p>
              <div className="change-bg">
                <button
                  type="button"
                  disabled={btnDisabled}
                  className="sign"
                  onClick={this.negClick}
                >
                  -
                </button>

                <div className="target-bg">
                  <div className="target">
                    {' '}
                    <p className="target">{min}</p>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={btnDisabled}
                  className="sign"
                  onClick={this.posClick}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
