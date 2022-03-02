import { Auth0Provider } from "@bcwdev/auth0provider";
import { jobsService } from "../services/JobsService";
import BaseController from "../utils/BaseController";

export class JobsController extends BaseController {
  constructor() {
    super("api/jobs");
    this.router
      .get("", this.getAllJobs)
      .get("/:id", this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.createJob)
      .delete("/:id", this.deleteJob)
      .put("/:id", this.editJob);
  }

  async getById(req, res, next) {
    try {
      const job = await jobsService.getById(req.params.id);
      return res.send(job);
    } catch (error) {
      next(error);
    }
  }

  async getAllJobs(req, res, next) {
    try {
      const jobs = await jobsService.getAllJobs(req.query);
      return res.send(jobs);
    } catch (error) {
      next(error);
    }
  }

  async createJob(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id;
      const job = await jobsService.createJob(req.body);
      return res.send(job);
    } catch (error) {
      next(error);
    }
  }
  async editJob(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id;

      req.body.id = req.params.id;
      const update = await jobsService.editJob(req.body);
      return res.send(update);
    } catch (error) {
      next(error);
    }
  }
  async deleteJob(req, res, next) {
    try {
      const remove = await jobsService.deleteJob(
        req.userInfo.id,
        req.params.id
      );
      return res.send("deleted job");
    } catch (error) {
      next(error);
    }
  }
}
