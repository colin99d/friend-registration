import { genders, relationships } from "~/drizzle/schema.server";

export function validateAddress(text: string): boolean {
  return text.length > 0;
}

export function validateCity(text: string): boolean {
  return text.length > 0;
}

export function validateZipCode(text: string): boolean {
  if (text.length !== 5) return false;
  try {
    parseInt(text);
    return true;
  } catch {
    return false;
  }
}

export function validateEmail(text: string): boolean {
  const regex_pattern =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex_pattern.test(text);
}

export function validatePhone(text: string): boolean {
  const regex_pattern = /^\d{3}-?\d{3}-?\d{4}$/;
  return regex_pattern.test(text);
}

export function validateName(text: string): boolean {
  return text.length > 0;
}

export function validateBirthday(text: string): boolean {
  return !isNaN(new Date(text));
}

export function validateGender(text: string): boolean {
  return genders.includes(text);
}

export function validateRelationship(text: string): boolean {
  return relationships.includes(text);
}

export function validateInteger(text?: string): boolean {
  if (!text) return false;
  return !isNaN(parseInt(text));
}
