import React, { Component } from "react"
import GoalsHeader from "./goalsHeader"
import Goal from "./goal"
import ToggleButton from "./toggleButton"

class GoalsContainer extends Component {
  componentDidMount() {}
  handleToggle = () => {
    if (this.state.show === 0) {
      this.setState({ show: 1 })
    } else {
      this.setState({ show: 0 })
    }
  }

  state = {
    show: 1,
  }

  render() {
    const renderPage = () => {
      if (this.state.show === 1) {
        return (
          <div>
            {this.props.goals.map((goal) => (
              <Goal
                key={goal.id}
                goal={goal}
                onCbucksAdd={(value) => this.props.onCbucksAdd(goal, value)}
                currency={this.props.currency}
              />
            ))}
          </div>
        )
      }
    }

    return (
      <div>
        <ToggleButton status={this.state.show} onToggle={this.handleToggle} />
        <GoalsHeader />
        {renderPage()}
      </div>
    )
  }
}

export default GoalsContainer
