import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";

class JobsService {
  async getById(id) {
    const job = await dbContext.Jobs.findById(id);
    if (!job) {
      throw BadRequest("they are no jobs with that id");
    }
    return job;
  }

  async getAllJobs(query = {}) {
    const jobs = await dbContext.Jobs.find(query);
    return jobs;
  }

  async createJob(body) {
    const job = await dbContext.Jobs.create(body);
    return job;
  }
  async editJob(update) {
    const original = await this.getById(update.id);
    if (original.creatorId.toString() !== update.creatorId) {
      throw new Forbidden("not your job to edit man");
    }
    original.salary = update.salary ? update.salary : original.salary;
    original.hours = update.hours ? update.hours : original.hours;
    original.description = update.description
      ? update.description
      : original.description;
    original.title = update.title ? update.title : original.title;
    await original.save({ runValidators: true });
    return original;
  }

  async deleteJob(userId, jobId) {
    const job = await this.getById(jobId);
    if (job.creatorId.toString() !== userId) {
      throw new Forbidden("not yours to delete");
    }
    const remove = await dbContext.Jobs.findByIdAndDelete(jobId);
    return remove;
  }
}

export const jobsService = new JobsService();
