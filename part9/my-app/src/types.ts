export interface HeaderProps {
    name: string
}

interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  
  interface CoursePartBasic extends CoursePartBase {
    description: string;
    kind: "basic"
  }
  
  interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
  }
  
  interface CoursePartBackground extends CoursePartBase {
    description: string;
    backgroundMaterial: string;
    kind: "background"
  }

  interface CourseSpecial extends CoursePartBase {
    exerciseCount: number,
    description: string,
    requirements: string[],
    kind: "special"
  }
  
  export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CourseSpecial;
  

  export interface Courses {
    courses: CoursePart[]
  }

  export interface PartProps {
    part: CoursePart
  }