const Course = ({ courses }) => {
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

export default Course;
