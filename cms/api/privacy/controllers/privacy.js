"use strict";
const { sanitizeEntity } = require("strapi-utils");
const reduceObject = require("../../../utils/reduceObject");

module.exports = {
  async find(ctx) {
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.privacy.search(ctx.query);
    } else {
      entities = await strapi.services.privacy.find(ctx.query);
    }

    return entities.map((entity) => {
      const privacy = sanitizeEntity(entity, {
        model: strapi.models.privacy,
      });

      const field = ["created_at", "updated_at", "updated_by", "created_by"];
      const obj = reduceObject(privacy, field);
      return obj;
    });
  },
};
