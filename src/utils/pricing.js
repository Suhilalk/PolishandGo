// src/utils/pricing.js
export function calculateQuote(a) {
  const missing = [];
  if (!a.vehicleType) missing.push("Vehicle type");
  if (!a.detailType) missing.push("Detail type");
  if (!a.seatRows) missing.push("Seat rows");
  if (!a.serviceLocation) missing.push("Mobile or drop off");

  if ((a.detailType === "interior" || a.detailType === "full") && !a.interiorCondition) {
    missing.push("Interior condition");
  }

  if ((a.detailType === "exterior" || a.detailType === "full") && !a.exteriorCondition) {
    missing.push("Exterior condition");
  }

  if (missing.length > 0) {
    return { ok: false, missing, price: 0 };
  }

  let price = 0;
  const { vehicleType, detailType, interiorCondition, exteriorCondition } = a;

  if (vehicleType === "sedan") {
    if (detailType === "interior") {
      if (interiorCondition === "light") {
        price = 75;
      }
      else if (interiorCondition === "moderate") {
        price = 100;
      }
      else if (interiorCondition === "heavy") price = 125;
    } else if (detailType === "exterior") {
      if (exteriorCondition === "light") price = 50;
      else if (exteriorCondition === "moderate") price = 75;
      else if (exteriorCondition === "heavy") price = 100;
    } else if (detailType === "full") {
      if (interiorCondition === "light" || exteriorCondition === "light") price = 110;
      else if (interiorCondition === "moderate" || exteriorCondition === "moderate") price = 140;
      else if (interiorCondition === "heavy" || exteriorCondition === "heavy") price = 200;
    }
  } else if (vehicleType === "suv") {
    if (detailType === "interior") {
      if (interiorCondition === "light") price = 85;
      else if (interiorCondition === "moderate") price = 110;
      else if (interiorCondition === "heavy") price = 140;
    } else if (detailType === "exterior") {
      if (exteriorCondition === "light") price = 75;
      else if (exteriorCondition === "moderate") price = 100;
      else if (exteriorCondition === "heavy") price = 100;
    } else if (detailType === "full") {
      if (interiorCondition === "light" || exteriorCondition === "light") price = 130;
      else if (interiorCondition === "moderate" || exteriorCondition === "moderate") price = 170;
      else if (interiorCondition === "heavy" || exteriorCondition === "heavy") price = 250;
    }
  } else if (vehicleType === "truck" || vehicleType === "van") {
    if (detailType === "interior") {
      if (interiorCondition === "light") price = 95;
      else if (interiorCondition === "moderate") price = 120;
      else if (interiorCondition === "heavy") price = 150;
    } else if (detailType === "exterior") {
      if (exteriorCondition === "light") price = 60;
      else if (exteriorCondition === "moderate") price = 85;
      else if (exteriorCondition === "heavy") price = 110;
    } else if (detailType === "full") {
      if (interiorCondition === "light" || exteriorCondition === "light") price = 120;
      else if (interiorCondition === "moderate" || exteriorCondition === "moderate") price = 160;
      else if (interiorCondition === "heavy" || exteriorCondition === "heavy") price = 230;
    }
  }

  if (a.petHairRemoval === "yes") price += 50;
  if (a.protection === "yes") price += 30;
  if (a.seatRows === "3") price += 25;
  if (a.serviceLocation === "mobile") price += 20;

  return { ok: true, missing: [], price };
}