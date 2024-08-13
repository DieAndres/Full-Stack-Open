//component header
const Header = ({ name }) => <h1>{name}</h1>;
//component Part
const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

//component Content
const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map((part) =>
        <li key={part.id}>
          <Part name={part.name} exercises={part.exercises}></Part>
        </li>
      )}
    </ul>
  );
};
//component Total
const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Number of exercises {totalExercises}</p>;
}
const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total
        parts={course.parts}
      ></Total>
    </div>
  );
};

export default Course;