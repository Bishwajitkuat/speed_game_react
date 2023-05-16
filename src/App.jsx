import React from "react";
import Option from "./Components/Option";

class App extends React.Component {
  state = {
    options: [1, 2, 3, 4],
    currentOption: 0,
    score: 0,
    speed: 1000,
    life: 0,
    scoreUpdate: false,
    clicked: false,
    btnStatus: false,
  };
  timer;

  // game mechanism
  gamePlay = () => {
    if (this.state.life > 4) {
      return this.gameClose();
    }
    this.setState({ scoreUpdate: true });
    let nextOption;
    do {
      nextOption = Math.floor(Math.random() * (4 - 1 + 1)) + 1;
    } while (nextOption === this.state.currentOption);
    this.setState({
      currentOption: nextOption,
    });
    if (!this.state.clicked) {
      this.setState({
        life: this.state.life + 1,
      });
    }
    this.setState({ clicked: false });
    this.timer = setTimeout(this.gamePlay, this.state.speed);
  };

  gameClose = () => {
    console.log("game end");
    this.setState({
      options: [1, 2, 3, 4],
      currentOption: 0,
      score: 0,
      speed: 1000,
      life: 0,
      scoreUpdate: false,
      clicked: false,
    });
    clearTimeout(this.timer);
  };

  handleClick = (item) => {
    this.setState({ clicked: true });
    if (this.state.currentOption !== item && this.state.scoreUpdate) {
      this.setState({ life: this.state.life + 1 });
    }
    if (this.state.currentOption === item && this.state.scoreUpdate) {
      this.setState({
        score: this.state.score + 1,
        scoreUpdate: false,
      });
    }
  };
  handleStart = () => {
    this.setState({ btnStatus: true });
    this.gamePlay();
  };
  handleStop = () => {
    this.setState({ btnStatus: false });
    this.gameClose();
  };
  render() {
    return (
      <div>
        <h1>Test Your Speed</h1>
        <p>Score: {this.state.score}</p>
        <div className="optionParent">
          {this.state.options.map((item) => (
            <Option
              key={item}
              active={this.state.currentOption === item}
              click={() => this.handleClick(item)}
            />
          ))}
        </div>
        {!this.state.btnStatus ? (
          <button onClick={this.handleStart}>Start</button>
        ) : (
          <button onClick={this.handleStop}>Stop</button>
        )}
      </div>
    );
  }
}

export default App;
