import { User } from './user.model';

export interface TDataModel {
  task: TDataModelTask;
  tags: string[];
  uploaderName: string;
  uploaderSurname: string;
  uploaderEmail: string;
  applied: User;
}

export interface TDataModelTask {
  taskId: number;
  uploaderId: number;
  taskDescription: string;
  shortDescription: string;
  pointsGained: number;
  uploadDate: string;
  workFinishDate: string;
  stateoftask: string;
  signingFinishDate: string;
  noOfStudents: number;
  workStartDate: string;
}

export class ShortTask {
  taskId: number;
  uploaderId: number;
  taskDescription: string;
  shortDescription: string;
  pointsGained: number;
  uploadDate: string;
  workFinishDate: string;
  stateoftask: string;
  signingFinishDate: string;
  noOfStudents: number;
  workStartDate: string;
  tags: string[];

  constructor(data: TDataModelTask) {
    this.taskId = data.taskId;
    this.taskDescription = data.taskDescription;
    this.shortDescription = data.shortDescription;
    this.pointsGained = data.pointsGained;
    this.uploadDate = data.uploadDate;
    this.workFinishDate = data.workFinishDate;
    this.stateoftask = data.stateoftask;
    this.signingFinishDate = data.signingFinishDate;
    this.workStartDate = data.workStartDate;
    this.noOfStudents = data.noOfStudents;
  }
}

export class Task {
  taskId: number;
  uploaderId: number;
  uploaderName: string;
  uploaderSurname: string;
  uploaderEmail: string;
  tags: string[];
  taskDescription: string;
  taskShortDescription: string;
  pointsGained: number;
  uploadDate: string;
  finishDate: string;
  stateoftask: string;
  applied: User;

  constructor(data: TDataModel) {
    this.taskId = data.task.taskId;
    this.uploaderId = data.task.uploaderId;
    this.uploaderName = data.uploaderName;
    this.uploaderSurname = data.uploaderSurname;
    this.uploaderEmail = data.uploaderEmail;
    this.tags = data.tags;
    this.taskDescription = data.task.taskDescription;
    this.taskShortDescription = data.task.shortDescription;
    this.pointsGained = data.task.pointsGained;
    this.uploadDate = data.task.uploadDate;
    this.finishDate = data.task.workFinishDate;
    this.stateoftask = data.task.stateoftask;
    this.applied = data.applied;
  }
}
