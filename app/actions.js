"use server";

import { Resend } from "resend";
import fs from "fs/promises";
import path from "path";

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

const dealsPath = path.join(process.cwd(), "app", "deals.json");

export async function getDeals() {
  try {
    const data = await fs.readFile(dealsPath, "utf-8");
    return { success: true, deals: JSON.parse(data) };
  } catch (error) {
    console.error("Error reading deals.json:", error);
    return { success: false, error: "Could not read deals list" };
  }
}

export async function saveDeal(dealData) {
  try {
    const fileContent = await fs.readFile(dealsPath, "utf-8");
    const deals = JSON.parse(fileContent);

    if (dealData.id) {
      const idx = deals.findIndex(d => d.id === parseInt(dealData.id));
      if (idx !== -1) {
        deals[idx] = {
          ...deals[idx],
          category: {
            en: dealData.categoryEn,
            pt: dealData.categoryPt
          },
          title: {
            en: dealData.titleEn,
            pt: dealData.titlePt
          },
          timeSlot: {
            en: dealData.timeSlotEn,
            pt: dealData.timeSlotPt
          },
          days: {
            en: dealData.daysEn,
            pt: dealData.daysPt
          },
          discount: {
            en: `${dealData.baseDiscountPercent}% off`,
            pt: `${dealData.baseDiscountPercent}% desc.`
          },
          baseDiscountPercent: parseInt(dealData.baseDiscountPercent),
          minDiscountPercent: parseInt(dealData.minDiscountPercent),
          decayRate: parseFloat(dealData.decayRate || 1.0),
          ownerEmail: dealData.ownerEmail || deals[idx].ownerEmail || "admin@offpeak.pt",
          image: dealData.image || deals[idx].image || "/hero-padel.png",
          isPartner: dealData.isPartner !== undefined ? dealData.isPartner : deals[idx].isPartner
        };
      } else {
        return { success: false, error: "Deal not found to edit" };
      }
    } else {
      const maxId = deals.reduce((max, d) => d.id > max ? d.id : max, 0);
      const newDeal = {
        id: maxId + 1,
        image: dealData.image || "/hero-padel.png",
        isPartner: dealData.isPartner !== undefined ? dealData.isPartner : true,
        category: {
          en: dealData.categoryEn,
          pt: dealData.categoryPt
        },
        title: {
          en: dealData.titleEn,
          pt: dealData.titlePt
        },
        discount: {
          en: `${dealData.baseDiscountPercent}% off`,
          pt: `${dealData.baseDiscountPercent}% desc.`
        },
        timeSlot: {
          en: dealData.timeSlotEn,
          pt: dealData.timeSlotPt
        },
        days: {
          en: dealData.daysEn,
          pt: dealData.daysPt
        },
        baseDiscountPercent: parseInt(dealData.baseDiscountPercent),
        minDiscountPercent: parseInt(dealData.minDiscountPercent),
        views: 0,
        bookings: 0,
        decayRate: parseFloat(dealData.decayRate || 1.0),
        ownerEmail: dealData.ownerEmail || "admin@offpeak.pt"
      };
      deals.push(newDeal);
    }

    await fs.writeFile(dealsPath, JSON.stringify(deals, null, 2), "utf-8");
    return { success: true };
  } catch (error) {
    console.error("Error writing to deals.json:", error);
    return { success: false, error: "Could not save deal changes" };
  }
}

export async function deleteDeal(dealId) {
  try {
    const fileContent = await fs.readFile(dealsPath, "utf-8");
    const deals = JSON.parse(fileContent);

    const updatedDeals = deals.filter(d => d.id !== parseInt(dealId));
    if (deals.length === updatedDeals.length) {
      return { success: false, error: "Deal not found to delete" };
    }

    await fs.writeFile(dealsPath, JSON.stringify(updatedDeals, null, 2), "utf-8");
    return { success: true };
  } catch (error) {
    console.error("Error deleting from deals.json:", error);
    return { success: false, error: "Could not delete deal" };
  }
}
