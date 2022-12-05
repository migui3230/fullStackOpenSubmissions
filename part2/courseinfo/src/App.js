import { useState } from "react";

const Course = ({ course }) => {
  // TODO: create a useState hook for the total amount of exercises
  // TODO: set the state as we are mapping over the parts array

  const sum = course.parts.reduce((total, part) => total + part.exercises, 0);

  return (
    <>
      <h2>{course.name}</h2>
      {course.parts.map((part) => (
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      ))}
      <strong>total of {sum} exercises</strong>
    </>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
