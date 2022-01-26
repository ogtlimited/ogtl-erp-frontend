class AccountingUtils {
  currentRatios(cAssets, cLiabilities) {
    return cAssets / cLiabilities;
  }
  quickRatios(cLiabilities, inventory, cAssets) {
    return (cAssets - inventory) / cLiabilities;
  }

  workingCapital(cAssets, cLiabilities) {
    return cAssets - cLiabilities;
  }

  absoluteLiquidRatio(absliquidAssets, cLiabilities) {
    return absliquidAssets / cLiabilities;
  }
  debtToAssetRatio(totalDebt, totalAssets) {
    return totalDebt / totalAssets;
  }

  debtRatio(totalLiabilities, totalAssets) {
    return totalLiabilities / totalAssets;
  }
}
export default new AccountingUtils();
