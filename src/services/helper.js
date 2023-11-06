class HelperService {
  diffDays(val1, val2) {
    const date1 = new Date(val1);
    const date2 = new Date(val2);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + " days";
  }
  diffHours(start, end) {
    start = start.split(":");
    end = end.split(":");
    var startDate = new Date(
      0,
      0,
      0,
      parseInt(start[0]),
      parseInt(start[1]),
      0
    );
    var endDate = new Date(0, 0, 0, parseInt(end[0]), parseInt(end[1]), 0);
    var diff = endDate.getTime() - startDate.getTime();
    var hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;
    var minutes = Math.floor(diff / 1000 / 60);

    // If using time pickers with 24 hours format, add the below line get exact hours
    if (hours < 0) hours = hours + 24;

    return (
      (hours <= 9 ? "0" : "") +
      hours +
      ":" +
      (minutes <= 9 ? "0" : "") +
      minutes
    );
  }

  formArrayToObject(arr) {
    const objTemplate = {};
    arr.forEach((e) => {
      if (e.type === "select") {
        objTemplate[e.name] = {
          type: e.type,
          label: e.title,
          value: e.value,
          required: e.required ? true : false,
          options: e.options,
          isMulti: e.isMulti ? true : false,
        };
      } else {
        objTemplate[e.name] = {
          type: e.type,
          label: e.title,
          value: e.value,
          required: e.required ? true : false,
          disabled: e.disabled ? true : false,
        };
      }
    });
    return objTemplate;
  }
  arrayToJSONObject(arr) {
    //header

    var keys = arr[0];

    //vacate keys from main array
    var newArr = arr.slice(1, arr.length);

    var formatted = [],
      data = newArr,
      cols = keys,
      l = cols.length;
    for (var i = 0; i < data.length; i++) {
      var d = data[i],
        o = {};
      for (var j = 0; j < l; j++) o[cols[j]] = d[j];
      formatted.push(o);
    }
    return formatted;
  }
  shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  uniqueArray(array) {
    return array.filter((thing, index) => {
      const _thing = JSON.stringify(thing);
      return (
        index ===
        array.findIndex((obj) => {
          return JSON.stringify(obj) === _thing;
        })
      );
    });
  }
  handleEdit(row) {
    let hash = {};
    for (let d in row) {
      if (typeof row[d] == "object" && row[d] !== null) {
        hash[d] = row[d]._id;
      } else {
        hash[d] = row[d];
      }
    }
    delete hash.__v;
    delete hash.createdAt;
    delete hash.updatedAt;
    delete hash.slug;
    return hash;
  }
  handleMoneyFormat(number) {
    return "₦" + new Intl.NumberFormat("en-NG", { minimumFractionDigits: 2 }).format(
      number
    );
  }
  capitalize(str) {
    if (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return "";
  }
  generateArrayOfYears = () => {
    var max = new Date().getFullYear();
    var min = max - 9;
    var years = [];

    for (var i = max; i >= min; i--) {
      years.push(i);
    }
    return years.map((e) => ({
      label: e,
      value: e,
    }));
  };
}
export default new HelperService();
