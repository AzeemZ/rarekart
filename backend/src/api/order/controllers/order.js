"use strict";
const Stripe = require("stripe");
// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const { products, user, total } = ctx.request.body;
    try {
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::product.product")
            .findOne(product.id);

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
              },
              unit_amount: Math.round(item.price * 2.9),
            },
            quantity: product.quantity,
          };
        })
      );

      const session = await stripe.checkout.sessions.create({
        shipping_address_collection: { allowed_countries: ["PK"] },
        payment_method_types: ["card"],
        mode: "payment",
        success_url: process.env.CLIENT_URL + `/success`,
        cancel_url: process.env.CLIENT_URL + "/failed",
        line_items: lineItems,
      });

      const order = await strapi
        .service("api::order.order")
        .create({ data: { products, stripeId: session.id, user, total } });

      await strapi.plugins["email"].services.email.send({
        to: user.email,
        from: process.env.SENDGRID_DEFAULT_FROM,
        replyTo: process.env.SENDGRID_DEFAULT_REPLY_TO,
        subject: "Purchase Confirmation - Order #" + order.id,
        text: `Thank you for your purchase! Your order (#${order.id}) is confirmed.`,
        html: `<p>Thank you for your purchase! Your order (#${order.id}) is confirmed.</p>`,
      });

      return { stripeSession: session };
    } catch (error) {
      ctx.response.status = 500;
      return { error };
    }
  },
}));
