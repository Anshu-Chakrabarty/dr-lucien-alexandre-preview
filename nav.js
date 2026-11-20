(function () {
  var W = 1920;
  var img = document.querySelector("img.page");
  var stage = document.querySelector(".stage");
  var H = Number(img.getAttribute("data-h"));
  var headerKey = document.body.getAttribute("data-header");
  var page = document.body.getAttribute("data-page");
  var section = document.body.getAttribute("data-section");

  var header = {
    a: { y: 70, h: 126 },
    b: { y: 58, h: 126 }
  }[headerKey];

  var book = {
    a: { x: 1528, y: 93, w: 290, h: 70 },
    b: { x: 1532, y: 84, w: 294, h: 70 }
  }[headerKey];

  var sections = {
    concerns: { href: "concerns.html", x: 308, w: 112 },
    treatments: { href: "treatments.html", x: 308, w: 128 },
    regenerative: { href: "regenerative.html", x: 308, w: 196 },
    concierge: { href: "concierge.html", x: 308, w: 118 },
    about: { href: "about.html", x: 308, w: 78 },
    resources: { href: "resources-blogs.html", x: 308, w: 118 }
  };

  var menus = {
    concerns: null,
    treatments: [
      ["Treatments", "treatments.html"],
      ["Discseel® Procedure", "treatments-discseel.html"],
      ["Minimally Invasive Spine Procedures", "treatments-spine.html"],
      ["Nerve Blocks & Neuromodulation", "treatments-nerve-blocks.html"],
      ["Migraine Shield Treatment", "treatments-migraine-shield.html"],
      ["Performance & Longevity Treatments", "treatments-performance.html"]
    ],
    regenerative: [
      ["Regenerative Care", "regenerative.html"],
      ["Pioneer Authority", "regenerative-pioneer.html"],
      ["Targeted Cellular & Tissue Repair", "regenerative-tissue.html"],
      ["Targeted PRP & Exosomes", "regenerative-prp.html"],
      ["Targeted Non-Surgical Treatments", "regenerative-nonsurgical.html"]
    ],
    concierge: [
      ["Concierge", "concierge.html"],
      ["Direct Physician Text & Phone Line", "concierge-direct.html"],
      ["Guaranteed Priority Booking", "concierge-priority.html"],
      ["Extended Consultation Visits", "concierge-visits.html"],
      ["Annual Procedure Credits", "concierge-credits.html"]
    ],
    about: [
      ["About", "about.html"],
      ["Meet Dr. Alexandre", "about-meet.html"],
      ["Decades of Cellular Research", "about-research.html"],
      ["Diagnostic Precision Philosophy", "about-philosophy.html"]
    ],
    resources: [
      ["Articles & Patient Guides", "resources-blogs.html"],
      ["Educational Video Series", "resources-videos.html"],
      ["Patient Reviews & Testimonials", "resources-testimonials.html"]
    ]
  };

  var nav = [
    { key: "logo", label: "Home", x: 100, w: 400, href: "index.html" },
    { key: "concerns", label: "Concerns", x: 520, w: 160, href: "concerns.html" },
    { key: "treatments", label: "Treatments", x: 680, w: 165, href: "treatments.html" },
    { key: "regenerative", label: "Regenerative Care", x: 845, w: 230, href: "regenerative.html" },
    { key: "concierge", label: "Concierge", x: 1075, w: 150, href: "concierge.html" },
    { key: "about", label: "About", x: 1225, w: 110, href: "about.html" },
    { key: "resources", label: "Resources", x: 1335, w: 160, href: "resources-blogs.html" }
  ];

  var pills = {
    concerns: {
      y: 704, h: 58,
      items: [
        [228, 206, "concerns-spine.html", "Spine & Back Pain"],
        [434, 292, "concerns-joint.html", "Joint & Musculoskeletal Pain"],
        [728, 336, "concerns-nerve.html", "Complex Nerve Pain & Neuropathy"],
        [1064, 326, "concerns-migraines.html", "Chronic Migraines & Headaches"],
        [1390, 310, "concerns-sports.html", "Sports Injury & Athletic Recovery"]
      ]
    },
    treatments: {
      y: 704, h: 58,
      items: [
        [228, 230, "treatments-discseel.html", "Discseel Procedure"],
        [448, 350, "treatments-spine.html", "Minimally Invasive Spine Procedures"],
        [788, 330, "treatments-nerve-blocks.html", "Nerve Blocks & Neuromodulation"],
        [1110, 260, "treatments-migraine-shield.html", "Migraine Shield Treatment"],
        [1360, 360, "treatments-performance.html", "Performance & Longevity Treatments"]
      ]
    },
    regenerative: {
      y: 704, h: 58,
      items: [
        [240, 200, "regenerative-pioneer.html", "Pioneer Authority"],
        [448, 324, "regenerative-tissue.html", "Targeted Cellular & Tissue Repair"],
        [776, 274, "regenerative-prp.html", "Targeted PRP & Exosomes"],
        [1048, 350, "regenerative-nonsurgical.html", "Targeted Non-Surgical Treatments"]
      ]
    },
    concierge: {
      y: 708, h: 60,
      items: [
        [228, 252, "concierge-direct.html", "Direct Physician Contact"],
        [484, 290, "concierge-priority.html", "Guaranteed Priority Booking"],
        [784, 290, "concierge-visits.html", "Extended Consultation Visits"],
        [1084, 276, "concierge-credits.html", "Annual Procedure Credits"]
      ]
    },
    about: {
      y: 694, h: 58,
      items: [
        [214, 236, "about-meet.html", "Meet Dr. Alexandre"],
        [454, 306, "about-research.html", "Decades of Cellular Research"],
        [764, 330, "about-philosophy.html", "Diagnostic Precision Philosophy"]
      ]
    }
  };

  function place(el, box) {
    el.style.left = (box.x / W) * 100 + "%";
    el.style.top = (box.y / H) * 100 + "%";
    el.style.width = (box.w / W) * 100 + "%";
    el.style.height = (box.h / H) * 100 + "%";
  }

  function addLink(className, box, href, label) {
    var a = document.createElement("a");
    a.className = className;
    a.href = href;
    a.setAttribute("aria-label", label);
    a.textContent = label;
    place(a, box);
    stage.appendChild(a);
    return a;
  }

  nav.forEach(function (item) {
    var box = { x: item.x, y: header.y, w: item.w, h: header.h };
    if (!menus[item.key]) {
      addLink("hot", box, item.href, item.label);
      return;
    }
    var wrap = document.createElement("div");
    wrap.className = "menu";
    place(wrap, box);
    var hit = document.createElement("a");
    hit.className = "hit";
    hit.href = item.href;
    hit.setAttribute("aria-label", item.label);
    hit.textContent = item.label;
    wrap.appendChild(hit);

    if (item.key === "concerns") {
      var panel = document.createElement("div");
      panel.className = "panel mega";
      panel.style.left = (-item.x / item.w) * 100 + "%";
      panel.style.width = (W / item.w) * 100 + "%";
      panel.style.height = (600 / header.h) * 100 + "%";
      var shot = document.createElement("img");
      shot.src = "Big%20Menu%20-%20Concerns.jpg";
      shot.alt = "";
      panel.appendChild(shot);
      var columns = [
        [165, 20, 250, 530, "concerns-spine.html", "Spine & Back Pain"],
        [415, 20, 270, 530, "concerns-joint.html", "Joint & Musculoskeletal Pain"],
        [685, 20, 260, 530, "concerns-nerve.html", "Complex Nerve Pain & Neuropathy"],
        [945, 20, 250, 530, "concerns-migraines.html", "Chronic Migraines & Headaches"],
        [1195, 20, 260, 530, "concerns-sports.html", "Sports Injury & Athletic Recovery"]
      ];
      columns.forEach(function (col) {
        var a = document.createElement("a");
        a.href = col[4];
        a.setAttribute("aria-label", col[5]);
        a.style.left = (col[0] / W) * 100 + "%";
        a.style.top = (col[1] / 600) * 100 + "%";
        a.style.width = (col[2] / W) * 100 + "%";
        a.style.height = (col[3] / 600) * 100 + "%";
        a.textContent = col[5];
        panel.appendChild(a);
      });
      var specifics = [
        [170, 160, 240, 52, "concerns-lower-back.html", "Lower Back Pain"],
        [170, 368, 240, 52, "concerns-degenerative-disc.html", "Degenerative Disc Disease"]
      ];
      specifics.forEach(function (col) {
        var a = document.createElement("a");
        a.href = col[4];
        a.setAttribute("aria-label", col[5]);
        a.style.left = (col[0] / W) * 100 + "%";
        a.style.top = (col[1] / 600) * 100 + "%";
        a.style.width = (col[2] / W) * 100 + "%";
        a.style.height = (col[3] / 600) * 100 + "%";
        a.style.zIndex = "2";
        a.textContent = col[5];
        panel.appendChild(a);
      });
      var schedule = document.createElement("a");
      schedule.href = "concierge.html";
      schedule.setAttribute("aria-label", "Schedule consultation");
      schedule.style.left = (1488 / W) * 100 + "%";
      schedule.style.top = (475 / 600) * 100 + "%";
      schedule.style.width = (270 / W) * 100 + "%";
      schedule.style.height = (55 / 600) * 100 + "%";
      schedule.style.zIndex = "2";
      schedule.textContent = "Schedule consultation";
      panel.appendChild(schedule);
      wrap.appendChild(panel);
    } else {
      var list = document.createElement("div");
      list.className = "panel list";
      menus[item.key].forEach(function (entry) {
        var a = document.createElement("a");
        a.href = entry[1];
        a.textContent = entry[0];
        list.appendChild(a);
      });
      wrap.appendChild(list);
    }
    stage.appendChild(wrap);
  });

  addLink("hot", book, "concierge.html", "Book consultation");

  if (section && sections[section]) {
    addLink("hot", { x: 228, y: 200, w: 78, h: 52 }, "index.html", "Home");
    var sec = sections[section];
    addLink("hot", { x: sec.x, y: 200, w: sec.w, h: 52 }, sec.href, section);
  }

  if (pills[page]) {
    var group = pills[page];
    group.items.forEach(function (item) {
      addLink("hot pill", { x: item[0], y: group.y, w: item[1], h: group.h }, item[2], item[3]);
    });
  }
})();
