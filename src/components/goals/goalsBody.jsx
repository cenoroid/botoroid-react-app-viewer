import React from "react";
import { useSelector } from "react-redux";
import Goal from "./goal";

const GoalsBody = () => {
  const goals = useSelector((state) => state.entities.goals);
  return (
    <div className="goalsBody">
      {goals.map((goal) => (
        <Goal key={goal.id} goal={goal} />
      ))}
    </div>
  );
};

export default GoalsBody;
