"use server";

import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createCheckoutSession() {
  const { userId } = await auth(); 

  if (!userId) {
    throw new Error("Debes estar logueado para realizar esta acción");
  }

    const baseUrl = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
        {
        price: "price_1SrMupEmI6Xl6FenGKndsvS8", 
        quantity: 1,
        },
    ],
    mode: "subscription",
    success_url: `${baseUrl}/success`,
    cancel_url: `${baseUrl}/dashboard`, 
    metadata: {
        clerkId: userId,
    },
    });

  redirect(session.url!);
}