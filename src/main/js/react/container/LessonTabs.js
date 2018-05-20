import React from "react";
import lessonService from "../service/LessonService";

class LessonTabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lessons: []
    };
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

  render() {
    const lessonTabs = this.state.lessons.map(lesson =>
      <span key={lesson.id}>{lesson.title}</span>
    );

    return (
      <div>
        {lessonTabs}
      </div>
    );
  }
}

export default LessonTabs;
