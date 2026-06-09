import { describe, expect, test } from "@jest/globals";
import TarifService from "../../src/Services/TarifService.js";

describe("TarifService - unit", () => {
  test("calculMontantLigne multiplie le prix par la quantite", () => {
    expect(TarifService.calculMontantLigne(1000, 3)).toBe(3000);
  });

  test("calculTVA calcule la TVA avec le taux par defaut de 18%", () => {
    expect(TarifService.calculTVA(1000)).toBe(180);
  });

  test("calculTVA calcule la TVA avec un taux personnalise", () => {
    expect(TarifService.calculTVA(1000, 20)).toBe(200);
  });

  test("calculTTC additionne le montant HT et le montant de TVA", () => {
    expect(TarifService.calculTTC(1000, 180)).toBe(1180);
  });
});
