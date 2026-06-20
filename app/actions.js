"use server";

import { Resend } from "resend";

const resend = new Resend("re_cssoB8G8_DeqcwRWbsBxuvg3GfqGAyy1H");

export async function subscribeUser(formData) {
  const email = formData.get("email");
  if (!email) {
    return { success: false, error: "Email is required" };
  }

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "brunomvaraujo1997@gmail.com",
      subject: "New User Subscription - Offpeak.pt",
      html: `
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.5; color: #222;">
          <h2 style="color: #0070f3;">New early access request</h2>
          <p>A new user has subscribed to early access notifications for Offpeak.pt.</p>
          <p><strong>User Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subscribed At:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Resend Email Error:", error);
    return { success: false, error: error.message };
  }
}

export async function submitBusinessPartner(formData) {
  const businessName = formData.get("businessName");
  const contactName = formData.get("contactName");
  const email = formData.get("email");
  const activityType = formData.get("activityType");
  const message = formData.get("message") || "No comments provided";

  if (!businessName || !contactName || !email || !activityType) {
    return { success: false, error: "Missing required fields" };
  }

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "brunomvaraujo1997@gmail.com",
      subject: `New Business Listing Request: ${businessName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.5; color: #222;">
          <h2 style="color: #0070f3;">New Business Partner Lead</h2>
          <p>A business owner has requested to list their off-peak promotions on Offpeak.pt.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Business Name:</strong> ${businessName}</p>
          <p><strong>Contact Name:</strong> ${contactName}</p>
          <p><strong>Email Address:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Activity / Experience Type:</strong> ${activityType}</p>
          <p><strong>Message / Comments:</strong></p>
          <blockquote style="background: #f9f9f9; padding: 15px; border-left: 4px solid #0070f3; margin: 0; border-radius: 4px;">
            ${message.replace(/\n/g, "<br>")}
          </blockquote>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Submitted At:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Resend Email Error:", error);
    return { success: false, error: error.message };
  }
}
