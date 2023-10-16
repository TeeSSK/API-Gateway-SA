/* eslint-disable */

export const protobufPackage = "subject";

export interface Section {
  id: number;
  subjectId: number;
  number: number;
  description: string;
  instructorIds: number[];
}

export interface Subject {
  id: number;
  subjectId: string;
  name: string;
  semester: number;
  sectionIds: number[];
  year: number;
  faculty: string;
  description: string;
  prerequisites: string[];
}

export interface SubjectMetadata {
  id: number;
  subjectId: string;
  name: string;
  semester: number;
  year: number;
}

export interface Instructor {
  id: number;
  fullName: string;
  faculty: string;
  email: string;
  phoneNumber: string;
  website: string;
  degree: string;
  taughtSubjectIds: number[];
}

export interface InstructorMetadata {
  id: number;
  fullName: string;
}

export interface PostMetadata {
}

export interface FileMetadata {
}

export const SUBJECT_PACKAGE_NAME = "subject";
