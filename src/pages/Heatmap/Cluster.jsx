import s from './Heatmap.module.scss';

//получение оценок от всех точек кластера
function GetMarksInCluster(points){
    //создаём словарь со всеми цветами и количеством пройденных опросов
    let marksInSurvey = new Map();
    marksInSurvey
    .set('brightRed', 0)
    .set('pareRed', 0)
    .set('yellow', 0)
    .set('pareGreen', 0)
    .set('brightGreen', 0);

    //заполняем словарь
    points.forEach((point)=> {
        if(point.score > 2 && point.score < 5){
            let countSurved = marksInSurvey.get('pareRed');
            countSurved++;
            marksInSurvey.set('pareRed', countSurved)
        }
        else if(point.score > 4 && point.score < 7)
        {
            let countSurved = marksInSurvey.get('yellow');
            countSurved++;
            marksInSurvey.set('yellow', countSurved)
        }
        else if(point.score > 6 && point.score < 9)
        {
            let countSurved = marksInSurvey.get('pareGreen');
            countSurved++;
            marksInSurvey.set('pareGreen', countSurved)
        }
        else if(point.score > 8 && point.score < 11)
        {
            let countSurved = marksInSurvey.get('brightGreen');
            countSurved++;
            marksInSurvey.set('brightGreen', countSurved)
        }
        else{
            let countSurved = marksInSurvey.get('brightRed');
            countSurved++;
            marksInSurvey.set('brightRed', countSurved)
        }
    }) 

    return marksInSurvey;
}

//функция раскраски кластера 
function SplitAndColoringCluster(marks, pointsInCluster) {
    //считаем сумму всех ответов
    let sum = 0;
    pointsInCluster.forEach((point) => {
        sum += point.score; 
    })

    // считаем количество всех ответов
    let countMarks = 0;
    for(let count of marks.values()){
        countMarks += count
    }

    //считаем количество каждой оценки
    const brightRedPercent = marks.get('brightRed') * 360 / countMarks;
    const pareRed = brightRedPercent + 5 + marks.get('pareRed') * 360 / countMarks;
    const yellow = pareRed + 5 + marks.get('yellow') * 360 / countMarks;
    const pareGreen = yellow + 5 + marks.get('pareGreen') * 360 / countMarks;
    const brightGreen = pareGreen + 5 + marks.get('brightGreen') * 360 / countMarks;

    //вставляем расчеты в html 
    const html = `<div class='${s.mycluster}' 
    style="background: conic-gradient(#ff0000 0deg ${brightRedPercent}deg , white ${brightRedPercent}deg ${brightRedPercent + 5}deg,
        #ff7f50 ${brightRedPercent + 5}deg ${pareRed}deg, white ${pareRed}deg ${pareRed + 5}deg,
        #ffff00 ${pareRed + 5}deg ${yellow}deg,white ${yellow}deg ${yellow + 5}deg,
        #9acd32 ${yellow + 5}deg ${pareGreen}deg, white  ${pareGreen}deg  ${pareGreen + 5}deg,
        #00ff00 ${pareGreen + 5}deg ${brightGreen}deg)"'><div class=${s.circle}><span>` 
    +  Math.round(sum / countMarks) + 
    '</span></div></div>';

    return html;
}

//получение всех точек в кластере
function GetPointsInCluster(markers, points){
    //находим координаты маркеров и поинтов для удобства
    const markersCords = markers.map((marker) => [String(marker._latlng.lat), String(marker._latlng.lng)]);

    //удаляем повторяющиеся координаты из маркеров
    const markersCordsWithoutRepeat = [];
    let prevIndex = 0;
    if(markersCords.length !== 1)
        markersCords.forEach((marker, index) => {
            if(index === 0)        
                markersCordsWithoutRepeat.push(marker);           
            else {
                let prev = markersCordsWithoutRepeat[prevIndex];
                if(prev[0] !== marker[0] || prev[1] !== marker[1]){
                    prevIndex++;
                    markersCordsWithoutRepeat.push(marker)
                }
            }        
        });
    else
        markersCordsWithoutRepeat.push(markersCords[0])

    //находим поинты которые есть в кластере
    const pointsInCluster = [];
    markersCordsWithoutRepeat.forEach((marker) => {
        points.forEach((point) => {
            if(marker[0] === point.map_object.latitude && marker[1] === point.map_object.longitude){
                pointsInCluster.push(point)
            }
        })
    })

    return pointsInCluster;
}

export {GetMarksInCluster, SplitAndColoringCluster, GetPointsInCluster};