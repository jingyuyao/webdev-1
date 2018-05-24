package com.jingyuyao.webdev1.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonSubTypes.Type;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

@JsonTypeInfo(
    use = JsonTypeInfo.Id.NAME,
    property = "type"
)
@JsonSubTypes({
    @Type(value = Heading.class),
    @Type(value = Paragraph.class),
    @Type(value = List.class),
    @Type(value = Image.class),
    @Type(value = Link.class),
})
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Widget {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private String name;
  private int position;
  @Lob
  private String text;
  private int width;
  private int height;
  @JsonProperty(access = Access.WRITE_ONLY)
  @ManyToOne(optional = false, fetch = FetchType.LAZY)
  private Lesson lesson;

  public int getId() {
    return id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public int getPosition() {
    return position;
  }

  public void setPosition(int position) {
    this.position = position;
  }

  public String getText() {
    return text;
  }

  public void setText(String text) {
    this.text = text;
  }

  public int getWidth() {
    return width;
  }

  public void setWidth(int width) {
    this.width = width;
  }

  public int getHeight() {
    return height;
  }

  public void setHeight(int height) {
    this.height = height;
  }

  public void setLesson(Lesson lesson) {
    this.lesson = lesson;
  }

  public Lesson getLesson() {
    return lesson;
  }

  public <T extends Widget> void update(T widget) {
    if (!getClass().equals(widget.getClass())) {
      throw new IllegalArgumentException("Can only update from object of the same class");
    }
    setName(widget.getName());
    setPosition(widget.getPosition());
    setText(widget.getText());
    setWidth(widget.getWidth());
    setHeight(widget.getHeight());
  }
}
