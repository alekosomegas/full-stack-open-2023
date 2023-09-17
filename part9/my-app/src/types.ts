export interface HeaderProps {
    name: string
}

export interface CourseParts {
    name: string,
    exerciseCount: number
}

export interface Courses {
    courses: CourseParts[]
}