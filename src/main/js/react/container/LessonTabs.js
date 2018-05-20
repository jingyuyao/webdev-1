import React from "react";
import lessonService from "../service/LessonService";

class LessonTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lessons: []
    };

    this.refreshLessons = this.refreshLessons.bind(this);
    this.createNewLesson = this.createNewLesson.bind(this);
    this.newLessonTitleChanged = this.newLessonTitleChanged.bind(this);
    this.removeLesson = this.removeLesson.bind(this);
  }

  componentDidMount() {
    this.refreshLessons();
  }

  componentDidUpdate(prevProps) {
    if (this.props.optModuleId !== prevProps.optModuleId) {
      this.refreshLessons();
    }
  }

  refreshLessons() {
    if (this.props.optModuleId) {
      lessonService
        .findAllByModuleId(this.props.optModuleId)
        .then(lessons => this.setState({lessons: lessons}));
    }
  }

  createNewLesson(event) {
    event.preventDefault();

    const module = {
      title: this.state.newLessonTitle,
      course: {
        id: this.props.courseId
      }
    };
    this.setState({newLessonTitle: ""});

    moduleService
      .create(module)
      .then(this.refreshLessons);
  }

  newLessonTitleChanged(event) {
    this.setState({newLessonTitle: event.target.value});
  }

  removeLesson(id) {
    moduleService
      .remove(id)
      .then(this.refreshLessons);
  }

  render() {
    const lessonForm = this.props.optModuleId ? (
      <form onSubmit={this.createNewLesson}>
        <label>
          Title
          <input
            type="text"
            value={this.state.newLessonTitle}
            onChange={this.newLessonTitleChanged}/>
        </label>
        <button type="submit">Submit</button>
      </form>
    ) : null;
    const lessonTabs = this.state.lessons.map(lesson =>
      <span key={lesson.id}>{lesson.title}</span>
    );

    return (
      <div>
        <h3>Lessons</h3>
        {lessonForm}
        {lessonTabs}
      </div>
    );
  }
}

export default LessonTabs;
