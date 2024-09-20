function func_alphabetsOnly(id) {
    $(id).keypress(function (e) {
        var key = e.keyCode;
        if (key < 65 || key > 122) {
            if (key != 32) e.preventDefault();
        }
        // console.log(key);
    });
}

function capitalizeWords(string) {
    return string.split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
}

function func_toCharCode(str) {
    // str = str.replace(/\s/g, '');
    str = str.trim().replace(/\s+/g,' ').toLowerCase();
    var result = '';
    for (var i = 0; i < str.length; i++) {
        result += str.charCodeAt(i);
        // result += str.charCodeAt(i).toString(16);
    }
    return result;
}

function func_findArr(str, arrDbs) {
    var result = false;
    for (var i in arrDbs) {
        if (str.match(arrDbs[i])) {
            result = true;
        }
    }
    if (!result) {
        var newResult = '';
        for (i = 0; i < str.length; i++) {
            if (str[i] != str[i + 1]) {
                newResult += '' + str[i];
            }
        }
        for (var i in arrDbs) {
            if (newResult.match(arrDbs[i])) {
                result = true;
            }
        }
    }
    return result;
}

// Chart.register(ChartDataLabels);
// Change default options for ALL charts
Chart.defaults.set('plugins.datalabels', {
    opacity: 1,
    color: 'white',
    borderColor: window.theme.danger,
    borderWidth: 2,
    borderRadius: 100,
    font: {
        weight: 'bold',
        size: 10,
        lineHeight: 1 /* align v center */
    },
    padding: {
        top: 4,
        bottom: 1,
        left: 3,
        right: 3
    },
    /* hover styling */
    backgroundColor: function(context) {
        return context.hovered ? context.dataset.borderColor : 'white';
    },
    color: function(context) {
        return context.hovered ? 'white' : context.dataset.borderColor;
    },
    listeners: {
        enter: function(context) {
            context.hovered = true;
            return true;
    },
    leave: function(context) {
            context.hovered = false;
            return true;
        }
    }
});

// Chart.scaleService.updateScaleDefaults('radar', {
//     ticks: {
//         min: 0
//     }
// });

var options = {
    responsive: true,
    tooltips: false,
    title: {
        text: 'chartjs-plugin-datalabels - basic example',
        display: true,
        position: `bottom`,
    },
    plugins: {
        /* ######### https://chartjs-plugin-datalabels.netlify.com/ #########*/
        datalabels: {
            /* formatter */
            formatter: function(value, context) {
            return context.chart.data.labels[context.value];
            }
        }
    },
    /* scale: https://www.chartjs.org/docs/latest/axes/radial/linear.html#axis-range-settings */
    scale: {
        angleLines: {
            display: true
        },
        pointLabels:{
            /* https://www.chartjs.org/docs/latest/axes/radial/linear.html#point-label-options */
            fontSize: 15,
            fontColor: 'black',
            fontStyle: 'bold',
            callback: function(value, index, values) {
                return value;
            }
        },
        ticks: {
            /* https://www.chartjs.org/docs/latest/axes/styling.html#tick-configuration */
            /* suggestedMax and suggestedMin settings only change the data values that are used to scale the axis */
            suggestedMin: 0,
            suggestedMax: 100,
            stepSize: 25, /* 25 - 50 - 75 - 100 */
            maxTicksLimit: 11, /* Or use maximum number of ticks and gridlines to show */
            display: false, // remove label text only,
        }
    },
    legend: {
        display: false,
        /* https://www.chartjs.org/docs/latest/configuration/legend.html */
        labels: {
            padding: 10,
            fontSize: 14,
            lineHeight: 30,
        },
    },
};

// ["Pengocog Handal", "Pedo", "Jomok", "Wibu", "Resing", "Caboel"]
// labels
// Update ini kalau mau nambah/ngurangi gambar
var jpg_aman = 1;
var jpg_global = 8;
var jpg_pengocog = 3;
var jpg_pedo = 4;
var jpg_jomok = 9;
var jpg_wibu = 1;
var jpg_resing = 1;
var jpg_caboel = 0;

// function func_max(arr) {
//     max = Math.max.apply(null, arr);
//     max_arr = [];
//     for (var i in arr) {
//         if (arr[i] == max) max_arr.push(i);
//     }
//     return {'maxVal' : max, 'maxArr' : max_arr};
// }

function func_max(arr) {
    // max = Math.max.apply(null, arr);
    var max_arr = [];
    for (var i in arr) {
        if (arr[i] >= 50) max_arr.push(i);
    }

    var maxData = [];
    if (max_arr.length == 0) {
        maxData = ', kamu aman cui :v';
    } else if (max_arr.length > 0) {
        for (var i in max_arr) {
            maxData.push((labels[max_arr[i]]).toLocaleLowerCase());
        }
        maxData = ' ' + maxData.join(" + ") + ' bejir';
    }
    
    return { 'maxData' : maxData, 'maxArr' : max_arr};
}

function func_getImg(maxArr) {
    var imgSrc_global = []
    var imgSrc = [];
    var imgPos;
    var imgTotalInPos;
    for (i = 1; i <= jpg_global; i++) {
        imgSrc_global.push('global/global_' + i + '.jpg');
    }
    
    if (maxArr.length < 1) {
        for (i = 1; i <= jpg_aman; i++) {
            imgSrc.push('zonaaman/aman_' + i + '.jpg');
        }
    } else if (maxArr.length > 1) {
        imgSrc = imgSrc_global;
    } else if ((maxArr.length)-1 == 0){
        switch (maxArr[0]) {
            case '0':
                imgPos = '0_pengocog/pengocog_';
                imgTotalInPos = jpg_pengocog;
                break;
            case '1':
                imgPos = '1_pdo/pdo_';
                imgTotalInPos = jpg_pedo;
                break;
            case '2':
                imgPos = '2_jmk/jmk_';
                imgTotalInPos = jpg_jomok;
                break;
            case '3':
                imgPos = '3_wibu/wibu_';
                imgTotalInPos = jpg_wibu;
                break;
            case '4':
                imgPos = '4_resing/resing_';
                imgTotalInPos = jpg_resing;
                break;
            case '5':
                imgPos = '5_caboel/caboel_';
                imgTotalInPos = jpg_caboel;
                break;
        }
        if (imgTotalInPos != 0) {
            for (i = 1; i <= imgTotalInPos; i++) {
                imgSrc.push(imgPos + '' + i + '.jpg');
            }
        } else {
            imgSrc = imgSrc_global;
        }
        // imgSrc = imgSrc.concat(imgSrc_global);
    }
    return imgSrc[(Math.floor(Math.random() * imgSrc.length))];
}


var anggota_jmk = [
    'diki', 'dicky', 'diky',
    'jimi', 'jimmy',
    'langbang', 'lambang',
    'carko', 'caroko',
    'marko', 'marco',
];

var pengecualian = [
    'galih', 'jokowi'
]