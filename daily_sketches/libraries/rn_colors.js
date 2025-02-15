function skyGradient(xs, ys, xe, ye, cStart, cEnd) {

    noFill();
    for (let i = ys; i <= ye; i++) {
        let inter = map(i, ys, ye, 0, 1);
        let c = lerpColor(cStart, cEnd, inter);
        stroke(c);
        line(xs, i, xe, i);
    }

}

purples = [
    "#7400b8",
    "#6930c3",
    "#5e60ce",
    "#5390d9",
    "#4ea8de",
    "#48bfe3",
    "#56cfe1",
    "#64dfdf",
    "#72efdd",
    "#80ffdb",
];  // purple - cyan, courtesy Coolors

melons = [
    "#fec5bb",
    "#fcd5ce",
    "#fae1dd",
    "#f8edeb",
    "#e8e8e4",
    "#d8e2dc",
    "#ece4db",
    "#ffe5d9",
    "#ffd7ba",
    "#fec89a",
];  // melon-cantaloupe, courtesy Coolors

//includes darks. The first 4 are darker
red_brown_orange = [
    "#03071e",
    "#370617",
    "#6a040f",
    "#9d0208",
    "#d00000",
    "#dc2f02",
    "#e85d04",
    "#f48c06",
    "#faa307",
    "#ffba08",
];  // brown-orange-red


red_orange = [
    "#d00000",
    "#dc2f02",
    "#e85d04",
    "#f48c06",
    "#faa307",
    "#ffba08",
];  // red-orange without darks


green_yellow = ["#0b6623",
    "#9dc183",
    "#708238",
    "#c7ea46",
    "#3f704d",
    "#00A86B",
    "#4f7942",
    "#29AB87",
    "#8a9a5b",
    "#98FB98",
    "#01796F",
    "#d0f0c0",
    "#00A572",
    "#50C878",
    "#4cbb17",
    "#39FF14",
    "#2e8b57",];



greys = [
    "#000000",
    "#080808",
    "#101010",
    "#181818",
    "#202020",
    "#282828",
    "#303030",
    "#383838",
    "#404040",
    "#484848",
    "#505050"
]

seablue = "#006994"
brickRed = "#cb4154" // brickred


take5 = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"];
rainbowDash = ["#ee4035", "#f37736", "#fdf498", "#7bc043", "#0392cf"];
cappuccino = ["#4b3832", "#854442", "#fff4e6", "#3c2f2f", "#be9b7b"];
dark_cappuccino = ["#4b3832", "#854442", "#3c2f2f", "#be9b7b"];

flame = ["#801100", "#B62203", "#D73502", "#FC6400", "#FF7500", "#FAC000"]
flame_r = ["#FAC000", "#FF7500", "#FC6400", "#D73502", "#B62203", "#801100",]

gen2 = ["#2E294E", "#541388", "#F1E9DA", '#FFD400', "#D90368",]

test_palette = ['black', 'red', 'green', 'blue', 'white']
allpalettes = [rainbowDash, take5, cappuccino, purples, melons, red_brown_orange, red_orange, greys, green_yellow, flame]

RGBPalList = [rainbowDash, take5, cappuccino, purples, melons, red_orange, green_yellow, flame]

//HSB Palettes

Hred_orange = [
    [0.0, 100.0, 81.56862745098039],
    [12.385321100917452, 99.0909090909091, 86.27450980392157],
    [23.42105263157896, 98.27586206896551, 90.98039215686275],
    [33.781512605041996, 97.54098360655738, 95.68627450980392],
    [38.51851851851853, 97.2, 98.0392156862745],
    [43.238866396761125, 96.86274509803921, 100.0],
]
Hflame = [
    [7.96875, 100.0, 50.19607843137255],
    [10.391061452513952, 98.35164835164835, 71.37254901960785],
    [14.36619718309862, 99.06976744186046, 84.31372549019608],
    [23.809523809523796, 100.0, 98.82352941176471],
    [27.529411764705856, 100.0, 100.0],
    [46.079999999999984, 100.0, 98.0392156862745],
]

Hred_yellow = [[90, 27, 86], [60, 67, 60], [30, 27, 60], [0, 67, 60], [76, 89, 40], [82, 29, 70], [35, 32, 76], [40, 10, 50], [45, 20, 50]]
Hblue_green = [[210, 27, 86], [180, 67, 60], [150, 27, 60], [120, 67, 60], [196, 89, 40], [202, 29, 70], [155, 32, 76], [160, 10, 50], [165, 20, 50]]
Hgreen_yellow = [[150, 27, 86], [120, 67, 60], [90, 27, 60], [60, 67, 60], [136, 89, 40], [142, 29, 70], [95, 32, 76], [100, 10, 50], [105, 20, 50]]
Htake5 = [
    [197.33333333333331, 54.21686746987952, 32.549019607843135],
    [172.69565217391303, 73.2484076433121, 61.568627450980394],
    [42.519685039370074, 54.50643776824033, 91.37254901960785],
    [26.530612244897952, 60.24590163934427, 95.68627450980392],
    [12.0, 64.93506493506493, 90.58823529411765],
]

Hcappuccino = [
    [14.399999999999977, 33.333333333333336, 29.411764705882355],
    [1.7910447761194064, 50.37593984962406, 52.156862745098046],
    [33.60000000000002, 9.80392156862745, 100.0],
    [0.0, 21.66666666666666, 23.52941176470588],
    [28.656716417910445, 35.26315789473684, 74.50980392156863],
]

HrainbowDash = [
    [3.5675675675675507, 77.73109243697479, 93.33333333333333],
    [20.63492063492066, 77.77777777777779, 95.29411764705881],
    [54.65346534653463, 39.920948616600796, 99.2156862745098],
    [93.12, 65.10416666666666, 75.29411764705883],
    [197.94117647058823, 98.55072463768117, 81.17647058823529],
]

palList = [HrainbowDash, Hcappuccino, Htake5, Hred_orange, Hred_yellow, Hblue_green, Hgreen_yellow, Hflame]