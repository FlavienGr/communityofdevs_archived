"use strict";
const { sanitizeEntity } = require("strapi-utils");
const reduceObject = require("../../../utils/reduceObject");

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.cgu.search(ctx.query);
    } else {
      entities = await strapi.services.cgu.find(ctx.query);
    }

    return entities.map((entity) => {
      const cgu = sanitizeEntity(entity, {
        model: strapi.models.cgu,
      });

      const field = ["created_at", "updated_at", "updated_by", "created_by"];
      const obj = reduceObject(cgu, field);
      return obj;
    });
  },
};
