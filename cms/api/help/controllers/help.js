"use strict";

const { sanitizeEntity } = require("strapi-utils");
const reduceObject = require("../../../utils/reduceObject");

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.help.search(ctx.query);
    } else {
      entities = await strapi.services.help.find(ctx.query);
    }

    return entities.map((entity) => {
      const help = sanitizeEntity(entity, {
        model: strapi.models.help,
      });

      const field = ["created_at", "updated_at", "updated_by", "created_by"];
      const obj = reduceObject(help, field);
      return obj;
    });
  },
  async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.help.findOne({ id });

    const help = sanitizeEntity(entity, {
      model: strapi.models.help,
    });

    const field = ["created_at", "updated_at", "updated_by", "created_by"];
    const obj = reduceObject(help, field);

    return obj;
  },
};
