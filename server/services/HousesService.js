import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";

class HousesService {
  async getAllHouses(query = {}) {
    const houses = await dbContext.Houses.find(query);
    return houses;
  }
  async createHouse(body) {
    const house = await dbContext.Houses.create(body);
    return house;
  }
  async getById(id) {
    const house = await dbContext.Houses.findById(id);
    if (!house) {
      throw new BadRequest("bad house id");
    }
    return house;
  }
  async deleteHouse(userId, houseId) {
    const house = await this.getById(houseId);

    if (house.creatorId.toString() !== userId) {
      throw new Forbidden("this is not your car");
    }
    await dbContext.Houses.findByIdAndDelete(houseId);
  }

  async editHouse(update) {
    const original = await this.getById(update.id);
    if (original.creatorId.toString() !== update.creatorId) {
      throw new Forbidden("you cant edit this house its not user");
    }
    original.bedrooms = update.bedrooms ? update.bedrooms : original.bedrooms;
    original.bathrooms = update.bathrooms
      ? update.bathrooms
      : original.bathrooms;
    original.price = update.price ? update.price : original.price;
    original.sqft = update.sqft ? update.sqft : original.sqft;
    original.description = update.description
      ? update.description
      : original.description;
    await original.save({ runValidators: true });
    return original;
  }
}

export const housesService = new HousesService();
