"use server";

import { Resend } from "resend";
import fs from "fs/promises";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function subscribeUser(formData) {
  const email = formData.get("email");
  if (!email) {
    return { success: false, error: "Email is required" };
  }

  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.NOTIFICATION_EMAIL || "info@offpeak.pt",
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
      to: process.env.NOTIFICATION_EMAIL || "info@offpeak.pt",
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

    // Generate slug from PT title
    const generateSlug = (title) => {
      return title
        .toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
    };

    if (dealData.id) {
      const idx = deals.findIndex(d => d.id === parseInt(dealData.id));
      if (idx !== -1) {
        deals[idx] = {
          ...deals[idx],
          slug: dealData.slug || deals[idx].slug || generateSlug(dealData.titlePt),
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
          price: dealData.price ? parseFloat(dealData.price) : (deals[idx].price || null),
          image: dealData.image || deals[idx].image || "/hero-padel.png",
          isPartner: dealData.isPartner !== undefined ? dealData.isPartner : deals[idx].isPartner,
          address: {
            en: dealData.addressEn || (deals[idx].address && deals[idx].address.en) || "",
            pt: dealData.addressPt || (deals[idx].address && deals[idx].address.pt) || ""
          },
          lat: dealData.lat ? parseFloat(dealData.lat) : (deals[idx].lat || null),
          lng: dealData.lng ? parseFloat(dealData.lng) : (deals[idx].lng || null),
          description: {
            en: dealData.descriptionEn || (deals[idx].description && deals[idx].description.en) || "",
            pt: dealData.descriptionPt || (deals[idx].description && deals[idx].description.pt) || ""
          },
          hours: {
            en: dealData.hoursEn || (deals[idx].hours && deals[idx].hours.en) || "",
            pt: dealData.hoursPt || (deals[idx].hours && deals[idx].hours.pt) || ""
          },
          terms: {
            en: dealData.termsEn || (deals[idx].terms && deals[idx].terms.en) || "",
            pt: dealData.termsPt || (deals[idx].terms && deals[idx].terms.pt) || ""
          },
          photos: dealData.photos || deals[idx].photos || [],
          bookingMethod: dealData.bookingMethod || deals[idx].bookingMethod || "form",
          bookingTarget: dealData.bookingTarget || deals[idx].bookingTarget || null
        };
      } else {
        return { success: false, error: "Deal not found to edit" };
      }
    } else {
      const maxId = deals.reduce((max, d) => d.id > max ? d.id : max, 0);
      const slug = dealData.slug || generateSlug(dealData.titlePt);
      const newDeal = {
        id: maxId + 1,
        slug,
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
        ownerEmail: dealData.ownerEmail || "admin@offpeak.pt",
        price: dealData.price ? parseFloat(dealData.price) : null,
        address: {
          en: dealData.addressEn || "",
          pt: dealData.addressPt || ""
        },
        lat: dealData.lat ? parseFloat(dealData.lat) : null,
        lng: dealData.lng ? parseFloat(dealData.lng) : null,
        description: {
          en: dealData.descriptionEn || "",
          pt: dealData.descriptionPt || ""
        },
        hours: {
          en: dealData.hoursEn || "",
          pt: dealData.hoursPt || ""
        },
        terms: {
          en: dealData.termsEn || "",
          pt: dealData.termsPt || ""
        },
        photos: dealData.photos || [],
        bookingMethod: dealData.bookingMethod || "form",
        bookingTarget: dealData.bookingTarget || null
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

export async function submitBooking(formData) {
  const dealId = formData.get("dealId");
  const name = formData.get("name");
  const date = formData.get("date");
  const time = formData.get("time") || "";
  const people = formData.get("people");
  const phone = formData.get("phone") || "";

  if (!dealId || !name || !date || !people) {
    return { success: false, error: "Missing required fields" };
  }

  try {
    const fileContent = await fs.readFile(dealsPath, "utf-8");
    const deals = JSON.parse(fileContent);
    const deal = deals.find(d => d.id === parseInt(dealId));

    if (!deal) {
      return { success: false, error: "Deal not found" };
    }

    const partnerEmail = deal.ownerEmail || "info@offpeak.pt";
    const dealTitle = deal.title?.pt || deal.title?.en || "Oferta Offpeak";

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.NOTIFICATION_EMAIL || "info@offpeak.pt",
      subject: `Nova Reserva Offpeak — ${dealTitle}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; line-height: 1.5; color: #222;">
          <h2 style="color: #059669;">Nova Reserva via Offpeak.pt</h2>
          <p>Uma nova reserva foi submetida para a oferta <strong>${dealTitle}</strong>.</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Data pretendida:</strong> ${date}</p>
          <p><strong>Horário pretendido:</strong> ${time || "Não especificado"}</p>
          <p><strong>Número de pessoas:</strong> ${people}</p>
          ${phone ? `<p><strong>Telefone:</strong> ${phone}</p>` : ""}
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>E-mail do parceiro:</strong> <a href="mailto:${partnerEmail}">${partnerEmail}</a></p>
          <p><strong>Submetido em:</strong> ${new Date().toLocaleString("pt-PT")}</p>
          <p style="color: #6b7280; font-size: 0.85rem; margin-top: 20px;">
            Esta reserva foi gerada automaticamente via Offpeak.pt. 
            O parceiro deve confirmar diretamente com o cliente.
          </p>
        </div>
      `,
    });

    try {
      const idx = deals.findIndex(d => d.id === parseInt(dealId));
      if (idx !== -1) {
        deals[idx].bookings = (deals[idx].bookings || 0) + 1;
        await fs.writeFile(dealsPath, JSON.stringify(deals, null, 2), "utf-8");
      }
    } catch {}

    return { success: true };
  } catch (error) {
    console.error("Booking submission error:", error);
    return { success: false, error: error.message };
  }
}
