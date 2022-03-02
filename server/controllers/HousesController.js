import { Auth0Provider } from "@bcwdev/auth0provider";
import { housesService } from "../services/HousesService";
import BaseController from "../utils/BaseController";

export class HousesController extends BaseController {
  constructor() {
    super("api/houses");
    this.router
      .get("", this.getAllHouses)
      .get("/:id", this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .put("/:id", this.editHouse)
      .post("", this.createHouse)
      .delete("/:id", this.deleteHouse);
  }

  async getAllHouses(req, res, next) {
    try {
      const houses = await housesService.getAllHouses(req.query);
      return res.send(houses);
    } catch (error) {
      next(error);
    }
  }

  async createHouse(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id;
      const house = await housesService.createHouse(req.body);
      return res.send(house);
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      const house = await housesService.getById(req.params.id);
      return res.send(house);
    } catch (error) {
      next(error);
    }
  }
  async editHouse(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id;

      req.body.id = req.params.id;
      const update = await housesService.editHouse(req.body);
      return res.send(update);
    } catch (error) {
      next(error);
    }
  }

  async deleteHouse(req, res, next) {
    try {
      const userId = req.userInfo.id;
      const house = req.params.id;
      await housesService.deleteHouse(userId, house);
      return res.send("delete");
    } catch (error) {
      next(error);
    }
  }
}
