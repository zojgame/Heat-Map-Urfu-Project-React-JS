import L from "leaflet";
import s from './Heatmap.module.scss';

//создание одного маркера
const CreateMarker = (point) => {
    const mark = point.score;
    //определение цвета маркера в зависимости от оценки
    let color = '#ff0000';
    if(mark > 2 && mark < 5)
        color = '#ff7f50';
    if(mark > 4 && mark < 7)
        color = '#ffff00';
    if(mark > 6 && mark < 9)
        color = '#9acd32';
    if(mark > 8 && mark < 11)
        color = '#00ff00';

    const divMark = L.divIcon({
        html: `<div class='${s.mymarker}' style="background: ${color}"><div class='${s.div_circle}'><span>`
        + mark + `</span></div></div>`,
         className: ''
    });

    return divMark;
}

export default CreateMarker;