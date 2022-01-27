class AccountingUtils {
    workingRatios(cAssets, cLiabilities) {
        return cAssets / cLiabilities
    }
    quickRatios(cLiabilities, inventory, cAssets) {
        return (cAssets - inventory) / cLiabilities
    }

  }
  export default new AccountingUtils();
  