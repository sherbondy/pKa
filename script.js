(function() {
  var c1, c2, compounds, flash, is_less, random_compound, render_compounds, render_timeout;
  String.prototype.is_plural = function() {
    return this.charAt(this.length - 1) === 's';
  };
  String.prototype.has_have = function() {
    if (this.is_plural()) {
      return 'have';
    } else {
      return 'has';
    }
  };
  compounds = [
    {
      name: "alkanes",
      formula: "H-C sp<sup>3</sup>",
      pka_string: "> 50",
      pka: 50
    }, {
      name: "alkenes and arenes",
      formula: "H-C sp<sup>2</sup>",
      pka_string: "40-45",
      pka: 40
    }, {
      name: "amines",
      formula: "RNH<sub>2</sub>, R<sub>2</sub>NH",
      pka_string: "35-36",
      pka: 35
    }, {
      name: "ammonia",
      formula: "NH<sub>3</sub>",
      pka: 33
    }, {
      name: "alkynes",
      formula: "H-C sp",
      pka: 25
    }, {
      name: "alcohols",
      formula: "ROH",
      pka_string: "16-19",
      pka: 16
    }, {
      name: "water",
      formula: "H<sub>2</sub>0",
      pka: 15.7
    }, {
      name: "phenols",
      formula: "Aromatic-OH",
      pka: 10
    }, {
      name: "ammonium ions",
      formula: "NH<sub>4</sub><sup>+</sup>, RNH<sub>3</sub><sup>+</sup>, R<sub>2</sub>NH<sub>2</sub><sup>+</sup>, R<sub>3</sub>HN<sup>+</sup>",
      pka_string: "9-12",
      pka: 10
    }, {
      name: "acetic acid",
      formula: "CH<sub>3</sub>CO<sub>2</sub>H",
      pka: 4.8
    }, {
      name: "hydrochloric acid",
      formula: "HCl",
      pka: -7
    }, {
      name: "sulfuric acid",
      formula: "H<sub>2</sub>SO<sub>4</sub>",
      pka: -9
    }
  ];
  c1 = {};
  c2 = {};
  random_compound = function() {
    return compounds[Math.floor(Math.random() * compounds.length)];
  };
  render_compounds = function() {
    var source, template;
    ($('#message')).fadeOut();
    c2 = c1 = random_compound();
    while (c2 === c1) {
      c2 = random_compound();
    }
    console.log(c1);
    console.log(c2);
    source = ($('#compound_template')).html();
    template = Handlebars.compile(source);
    ($('#c1')).html(template(c1));
    return ($('#c2')).html(template(c2));
  };
  render_timeout = null;
  flash = function(correct, message) {
    var $p;
    clearTimeout(render_timeout);
    ($('#message')).hide();
    $p = $('<p/>');
    $p.addClass(correct ? 'right' : 'wrong');
    $p.text(message);
    ($('#message')).html($p);
    ($('#message')).fadeIn();
    return render_timeout = setTimeout(render_compounds, 2000);
  };
  is_less = function(a, b) {
    var a_pka, b_pka, statement;
    a_pka = a.pka_string != null ? a.pka_string : a.pka;
    b_pka = b.pka_string != null ? b.pka_string : b.pka;
    statement = ("" + a.name + " " + (a.name.has_have()) + " a pKa of " + a_pka + ", ") + ("and " + b.name + " " + (b.name.has_have()) + " a pKa of " + b_pka + ".");
    if (a.pka < b.pka) {
      return flash(true, "Good Job! " + statement);
    } else {
      return flash(false, "Actually, " + statement);
    }
  };
  ($('document')).ready(function() {
    render_compounds();
    return ($('#c1, #c2')).click(function(e) {
      e.preventDefault();
      if (($(this))[0] === ($('#c1'))[0]) {
        return is_less(c1, c2);
      } else {
        return is_less(c2, c1);
      }
    });
  });
}).call(this);
