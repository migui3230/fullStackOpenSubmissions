const Course = ({ courses }) => {
  // TODO: change this component to map over the courses array then use the same logic to map over the parts array
  // TODO: find a way to dynamically render the sum of exercises within the mapping too?

  // const sum = courses.parts.reduce((total, part) => total + part.exercises, 0);

  // map over an array of objects and map over the parts array within the object and add a bold text to sum the exercises
  return (
    <>
      {courses.map((course) => {
        const sum = course.parts.reduce(
          (total, part) => total + part.exercises,
          0
        );
        return (
          <div key={course.id}>
            <h2>{course.name}</h2>
            {course.parts.map((part) => {
              return (
                <p key={part.id}>
                  {part.name} {part.exercises}
                </p>
              );
            })}
            <strong>total of {sum} exercises</strong>
          </div>
        );
      })}
    </>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <>
      <h1>Web development curriculum</h1>
      <Course courses={courses} />
    </>
  );
};

export default App;
