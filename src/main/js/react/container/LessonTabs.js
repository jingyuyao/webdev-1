import React from "react";
import LessonTab from "../component/LessonTab";
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

    const lesson = {
      title: this.state.newLessonTitle,
      module: {
        id: this.props.optModuleId
      }
    };
    this.setState({newLessonTitle: ""});

    lessonService
      .create(lesson)
      .then(this.refreshLessons);
  }

  newLessonTitleChanged(event) {
    this.setState({newLessonTitle: event.target.value});
  }

  removeLesson(id) {
    lessonService
      .remove(id)
      .then(this.refreshLessons);
  }

  render() {
    if (!this.props.optModuleId) {
      return null;
    }

    const courseId = this.props.courseId;
    const moduleId = this.props.optModuleId;
    const lessonTabs = this.state.lessons.map(lesson =>
      <LessonTab
        key={lesson.id}
        courseId={courseId}
        moduleId={moduleId}
        lesson={lesson}
        removeLesson={this.removeLesson}/>
    );

    return (
      <div>
        <h3>Lessons</h3>
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
        {lessonTabs}
      </div>
    );
  }
}

export default LessonTabs;
