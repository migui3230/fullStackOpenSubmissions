// header component that takes in a prop
const Header = (props) => {
  console.log(props.course.name);
  return <h1> {props.course.name}</h1>;
};

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercise}
      </p>
    </>
  );
};

// content component
const Content = (props) => {
  return (
    <>
      <Part
        part={props.course.parts[0].name}
        exercise={props.course.parts[0].exercises}
      />
      <Part
        part={props.course.parts[1].name}
        exercise={props.course.parts[1].exercises}
      />
      <Part
        part={props.course.parts[2].name}
        exercise={props.course.parts[2].exercises}
      />
    </>
  );
};

// total component
const Total = (props) => {
  return (
    <p>
      Number of exercises{" "}
      {props.course.parts[0].exercises +
        props.course.parts[1].exercises +
        props.course.parts[2].exercises}
    </p>
  );
};

// TODO: switch the course into a full object with course and parts
// TODO: change the props used for all the components to match the right place in the object
const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div className="App">
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
