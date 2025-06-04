/**
 * Interface: Student
 */
export interface Student {

  //A unique identifier for the student.
  id: string;

  //Full name of the student.
  name: string;

  qca: number;

  //Attendance percentage, often on a scale of 0 to 100.
  attendance: number;

  //A general score or composite ranking score that may combine QCA, attendance
  score: number;

  //A qualitative attribute that describes the student's behavioral style.
  //Can be used to assess cultural fit with a company or team environment.
  behavioralTrait: string;

  //Indicates whether the student has submitted their company rankings.
  hasRanked: boolean;
}
