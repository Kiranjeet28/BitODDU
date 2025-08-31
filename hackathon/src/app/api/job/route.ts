// lib/job/router.ts
import { JobHandler } from './handlers/job.handler';
import { JobApplicationHandler } from './handlers/jobApplication.handler';
import { CreateJobApplicationInput, CreateJobInput, UpdateJobInput } from './schema';

export type JobAction =
  | { type: 'CREATE_JOB'; companyId: string; payload: CreateJobInput }
  | { type: 'UPDATE_JOB'; jobId: string; payload: UpdateJobInput }
  | { type: 'DELETE_JOB'; jobId: string }
  | { type: 'GET_JOB'; jobId: string }
  | { type: 'APPLY_JOB'; studentId: string; jobId: string; payload: CreateJobApplicationInput }
  | { type: 'GET_APPLICATIONS'; jobId: string };

export async function jobRouter(action: JobAction) {
  switch (action.type) {
    case 'CREATE_JOB':
      return JobHandler.createJob(action.companyId, action.payload);

    case 'UPDATE_JOB':
      return JobHandler.updateJob(action.jobId, action.payload);

    case 'DELETE_JOB':
      return JobHandler.deleteJob(action.jobId);

    case 'GET_JOB':
      return JobHandler.getJobById(action.jobId);

    case 'APPLY_JOB':
      return JobApplicationHandler.applyJob(action.studentId, action.jobId, action.payload);

    case 'GET_APPLICATIONS':
      return JobApplicationHandler.getApplicationsByJob(action.jobId);

    default:
      throw new Error('Invalid action type');
  }
}
