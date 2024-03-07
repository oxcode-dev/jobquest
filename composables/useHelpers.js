export function randomStr() {
    return (Math.floor(Math.random() * 100000) * Date.now()).toString(16);
  }
  
  export function objectMerge(obj, src) {
    Object.keys(src).forEach(function (key) {
      obj[key] = src[key];
    });
    return obj;
  }
  
  export function scrollToTop(options = {}) {
    options.element = options.element === undefined ? window : options.element;
    options.top = options.top === undefined ? 0 : options.top;
    options.element.scroll({ top: options.top, left: 0, behavior: "smooth" });
  }
  
  export function strBetween(str, start, stop) {
    str = typeof str !== "string" ? str.toString() : str;
  
    let result = str.split(start).pop().split(stop);
  
    if (result.length === 0) return false;
  
    return result[0];
  }
  
  export function convertToUnit(str, unit = "px") {
    if (str == null || str === "") {
      return undefined;
    } else if (isNaN(+str)) {
      return String(str);
    } else {
      return `${Number(str)}${unit}`;
    }
  }
  
  export function kebabCase(str) {
    return (str || "").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }
  
  export const camelize = (str) => {
    const camelizeRE = /-(\w)/g;
  
    return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
  };
  
  // KeyboardEvent.keyCode aliases
  export const keyCodes = Object.freeze({
    enter: 13,
    tab: 9,
    delete: 46,
    esc: 27,
    space: 32,
    up: 38,
    down: 40,
    left: 37,
    right: 39,
    end: 35,
    home: 36,
    del: 46,
    backspace: 8,
    insert: 45,
    pageup: 33,
    pagedown: 34,
  });
  
  export function arrayDiff(a, b) {
    const diff = [];
    for (let i = 0; i < b.length; i++) {
      if (a.indexOf(b[i]) < 0) diff.push(b[i]);
    }
    return diff;
  }
  
  export function upperFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  export function flatten(array) {
    let queries = [];
    array.forEach(function (item) {
      if (typeof item === "string") {
        queries.push(item);
      } else {
        queries = queries.concat(flatten(item));
      }
    });
    return queries;
  }
  
  export function slugify(value) {
    const a =
      "àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;" +
      "ąàáäâãåæćęęèéëêìíïîłńòóöôõøśùúüûñçżź";
    const b =
      "aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------" +
      "aaaaaaaaceeeeeeiiiilnoooooosuuuunczz";
    const p = new RegExp(a.split("").join("|"), "g");
  
    return value
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special chars
      .replace(/&/g, "-and-") // Replace & with 'and'
      .replace(/[^\w-]+/g, "") // Remove all non-word chars
      .replace(/--+/g, "-"); // Replace multiple - with single -
  }
  
  export function o_O(promise) {
    return promise
      .then(({ data }) => {
        if (data instanceof Error) return [data];
        return [null, data];
      })
      .catch((err) => [err]);
  }
  
  export function formatParams(queryName, value) {
    queryName = queryName.replace(/=/g, "");
  
    let result = [];
  
    switch (value.constructor) {
      case String:
      case Number:
      case Boolean:
        result.push(
          encodeURIComponent(queryName) + "=" + encodeURIComponent(value),
        );
        break;
  
      case Array:
        value.forEach(function (item) {
          result = result.concat(formatParams(queryName + "[]=", item));
        });
        break;
  
      case Object:
        Object.keys(value).forEach(function (key) {
          let item = value[key];
          result = result.concat(formatParams(queryName + "[" + key + "]", item));
        });
        break;
    }
  
    return result;
  }
  
  export function makeBlankSrc(width, height, color) {
    const src = encodeURIComponent(
      `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
                    <rect width="100%" height="100%" style="fill:${color};"></rect>
                  </svg>`,
    );
    return `data:image/svg+xml;charset=UTF-8,${src}`;
  }
  
  export function addPrefetch(kind, url, as) {
    const linkElem = document.createElement("link");
  
    linkElem.rel = kind;
    linkElem.href = url;
    if (as) {
      linkElem.as = as;
    }
    linkElem.crossorigin = true;
    document.head.appendChild(linkElem);
  }
  
  /**
   * Get the thumbnail dimensions to use for a given player size.
   *
   * @param {Object} options
   * @param {number} options.width The width of the player
   * @param {number} options.height The height of the player
   * @return {Object} The width and height
   */
  export function getThumbnailDimensions({ width, height }) {
    let roundedWidth = width;
    let roundedHeight = height;
  
    // If the original width is a multiple of 320 then we should
    // not round up. This is to keep the native image dimensions
    // so that they match up with the actual frames from the video.
    //
    // For example 640x360, 960x540, 1280x720, 1920x1080
    //
    // Round up to nearest 100 px to improve cacheability at the
    // CDN. For example, any width between 601 pixels and 699
    // pixels will render the thumbnail at 700 pixels width.
    if (roundedWidth % 320 !== 0) {
      roundedWidth = Math.ceil(width / 100) * 100;
      roundedHeight = Math.round((roundedWidth / width) * height);
    }
  
    return {
      width: roundedWidth,
      height: roundedHeight,
    };
  }
  
  export function cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  
  export const getQueryParams = (params, url) => {
    let href = url;
    //this expression is to get the query strings
    let reg = new RegExp("[?&]" + params + "=([^&#]*)", "i");
    let queryString = reg.exec(href);
    return queryString ? queryString[1] : null;
  };
  
  export function prettierUrl(value) {
    return value.replace(/^\/\/|^.*?:(\/\/)?/, "");
  }
  
  export function uppercase(value) {
    return value || value === 0 ? value.toString().toUpperCase() : "";
  }
  
  export function lowercase(value) {
    return value || value === 0 ? value.toString().toLowerCase() : "";
  }
  
  export function capitalize(value) {
    if (!value) return "";
  
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  
  export function dehyphenate(value) {
    if (!value) return "";
    return value.replace(/-/g, " ").replace(/_/g, " ");
  }
  
  export function ucwords(value) {
    if (!value) return "";
  
    return value
      .toLowerCase()
      .replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g, (a) => a.toUpperCase());
  }
  
  export function getName(value) {
    if (value.name !== undefined) return value.name;
    return value.first_name + " " + value.last_name;
  }
  
  export function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  
  export function numberRange(start, stop, step) {
    let a = [],
      b = start;
    while (b < stop) {
      a.push((b += step || 1));
    }
    return a;
  }
  
  export function numberFormat(num) {
    return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }
  
  export function naturalSort(a, b) {
    let re = /(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi,
      sre = /(^[ ]*|[ ]*$)/g,
      dre =
        /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[/-]\d{1,4}[/-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
      hre = /^0x[0-9a-f]+$/i,
      ore = /^0/,
      i = function (s) {
        return (naturalSort.insensitive && ("" + s).toLowerCase()) || "" + s;
      },
      // convert all to strings strip whitespace
      x = i(a).replace(sre, "") || "",
      y = i(b).replace(sre, "") || "",
      // chunk/tokenize
      xN = x
        .replace(re, "\0$1\0")
        .replace(/\0$/, "")
        .replace(/^\0/, "")
        .split("\0"),
      yN = y
        .replace(re, "\0$1\0")
        .replace(/\0$/, "")
        .replace(/^\0/, "")
        .split("\0"),
      // numeric, hex or date detection
      xD =
        parseInt(x.match(hre)) ||
        (xN.length != 1 && x.match(dre) && Date.parse(x)),
      yD =
        parseInt(y.match(hre)) || (xD && y.match(dre) && Date.parse(y)) || null,
      oFxNcL,
      oFyNcL;
    // first try and sort Hex codes or Dates
    if (yD)
      if (xD < yD) return -1;
      else if (xD > yD) return 1;
    // natural sorting through split numeric strings and default strings
    for (
      let cLoc = 0, numS = Math.max(xN.length, yN.length);
      cLoc < numS;
      cLoc++
    ) {
      // find floats not starting with '0', string or 0 if not defined (Clint Priest)
      oFxNcL =
        (!(xN[cLoc] || "").match(ore) && parseFloat(xN[cLoc])) || xN[cLoc] || 0;
      // handle numeric vs string comparison - number < string - (Kyle Adams)
      if (isNaN(oFxNcL) !== isNaN(oFyNcL)) {
        return isNaN(oFxNcL) ? 1 : -1;
      }
      // rely on string comparison if different types - i.e. '02' < 2 != '02' < '2'
      else if (typeof oFxNcL !== typeof oFyNcL) {
        oFxNcL += "";
        oFyNcL += "";
      }
      if (oFxNcL < oFyNcL) return -1;
      if (oFxNcL > oFyNcL) return 1;
    }
    return 0;
  }
  
  export const cartesian = (arraysToCombine) => {
    let divisors = [];
    for (let i = arraysToCombine.length - 1; i >= 0; i--) {
      divisors[i] = divisors[i + 1]
        ? divisors[i + 1] * arraysToCombine[i + 1].length
        : 1;
    }
    function getPermutation(n, arraysToCombine) {
      let result = [],
        curArray;
      for (let i = 0; i < arraysToCombine.length; i++) {
        curArray = arraysToCombine[i];
        result.push(curArray[Math.floor(n / divisors[i]) % curArray.length]);
      }
      return result;
    }
    let numPerms = arraysToCombine[0].length;
    for (let i = 1; i < arraysToCombine.length; i++) {
      numPerms *= arraysToCombine[i].length;
    }
    let combinations = [];
    for (let i = 0; i < numPerms; i++) {
      combinations.push(getPermutation(i, arraysToCombine));
    }
    return combinations;
  };
  
  export const bytesToHumanReadable = (size) => {
    const i = Math.floor(Math.log(size) / Math.log(1024));
    return (
      (size / Math.pow(1024, i)).toFixed(2) * 1 +
      " " +
      ["B", "kB", "MB", "GB", "TB"][i]
    );
  };
  
  export const buildQueryParameters = (params) => {
    for (const key in params) {
      if (
        params[key] === null ||
        params[key] === undefined ||
        params[key] === false ||
        params[key] === "" ||
        key === "tab"
      ) {
        delete params[key];
      }
    }
  
    return params;
  };
  