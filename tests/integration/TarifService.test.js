import { describe, expect, test } from "@jest/globals";
import TarifService from "../../src/Services/TarifService.js";

describe("TarifService - integration", () => {
  test("calculTotalLigne calcule le total TTC avec le taux par defaut", () => {
    expect(TarifService.calculTotalLigne(1000, 3)).toBe(3540);
  });

  test("calculTotalLigne calcule le total TTC avec un taux personnalise", () => {
    expect(TarifService.calculTotalLigne(1000, 3, 20)).toBe(3600);
  });
});
