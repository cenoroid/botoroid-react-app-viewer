import React, { Component } from "react";
import GoalsHeader from "./goalsHeader";
import Goal from "./goal";
import ToggleButton from "./toggleButton";

class GoalsContainer extends Component {
  componentDidMount() {
    this.getGoals();
  }
  getGoals = () => {
    this.props.socket.emit("get", "goals");
    this.props.socket.on("getgoals", (data) => {
      for (let index = 0; index < data.length; index++) {
        data[index].id = index + 1;
      }
      this.setState({ goals: data });
    });
  };
  handleToggle = () => {
    if (this.state.show === 0) {
      this.setState({ show: 1 });
    } else {
      this.setState({ show: 0 });
    }
  };
  handleGoalsUpdate = (goalObject, value) => {
    let goals = [...this.state.goals];
    let updateGoal = goals.find(({ goal }) => goal === goalObject.goal);
    updateGoal.current = updateGoal.current + value;
    this.setState({ goals });
    let data = {
      goal: goalObject.goal,
      username: this.props.user,
      value: value,
      state: goals,
    };
    this.props.socket.emit("goalupdate", data);
    this.props.onCurrencyUpdate(value);
  };
  state = {
    goals: [],
    show: 1,
  };
  render() {
    const renderPage = () => {
      if (this.state.show === 1) {
        return (
          <div>
            {this.state.goals.map((goal) => (
              <Goal
                key={goal.id}
                goal={goal}
                onCbucksAdd={(value) => this.handleGoalsUpdate(goal, value)}
                currency={this.props.currency}
              />
            ))}
          </div>
        );
      }
    };

    return (
      <div>
        <ToggleButton status={this.state.show} onToggle={this.handleToggle} />
        <GoalsHeader />
        {renderPage()}
      </div>
    );
  }
}

export default GoalsContainer;
