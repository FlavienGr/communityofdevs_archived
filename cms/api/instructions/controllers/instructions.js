"use strict";

const { sanitizeEntity } = require("strapi-utils");
const reduceObject = require("../../../utils/reduceObject");

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.instructions.search(ctx.query);
    } else {
      entities = await strapi.services.instructions.find(ctx.query);
    }

    return entities.map((entity) => {
      const instructions = sanitizeEntity(entity, {
        model: strapi.models.instructions,
      });

      const field = ["created_at", "updated_at", "updated_by", "created_by"];
      const obj = reduceObject(instructions, field);
      return obj;
    });
  },
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.instructions.findOne({ id });

    const instructions = sanitizeEntity(entity, {
      model: strapi.models.instructions,
    });

    const field = ["created_at", "updated_at", "updated_by", "created_by"];
    const obj = reduceObject(instructions, field);

    return obj;
  },
};
