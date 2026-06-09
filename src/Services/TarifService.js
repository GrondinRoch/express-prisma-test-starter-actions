export default class TarifService {
  static calculMontantLigne = (prix, qty) => {
    return prix * qty;
  };

  static calculTVA = (montantHT, taux = 18) => {
    return montantHT * (taux / 100);
  };

  static calculTTC = (montantHT, montantTVA) => {
    return montantHT + montantTVA;
  };

  static calculTotalLigne = (prix, qty, taux = 18) => {
    const montantHT = TarifService.calculMontantLigne(prix, qty);
    const montantTVA = TarifService.calculTVA(montantHT, taux);
    return TarifService.calculTTC(montantHT, montantTVA);
  };
}
